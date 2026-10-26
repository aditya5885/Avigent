import { NextResponse } from "next/server";
import { LIMITS, validateContact, type ContactFields } from "@/lib/contact-validation";

/**
 * POST /api/contact
 *
 * Delivers enquiries via Resend (https://resend.com) when configured:
 *   RESEND_API_KEY      — Resend API key
 *   CONTACT_TO_EMAIL    — inbox that receives enquiries (e.g. info@avigent.in)
 *   CONTACT_FROM_EMAIL  — verified sender, e.g. "AVIGENT Website <web@avigent.in>"
 *
 * If not configured, responds 503 with code "not_configured" so the UI can
 * tell the visitor honestly that nothing was sent and offer alternatives.
 */

// Very small in-memory rate limit (per server instance)
const hits = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.reset < now) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: Request) {
  let body: Partial<ContactFields & { website: string }>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: silently accept bots without sending anything
  if (body.website) return NextResponse.json({ ok: true });

  const fields: ContactFields = {
    name: String(body.name ?? "").slice(0, LIMITS.name + 1),
    phone: String(body.phone ?? "").slice(0, LIMITS.phone + 1),
    email: String(body.email ?? "").slice(0, LIMITS.email + 1),
    company: String(body.company ?? "").slice(0, LIMITS.company + 1),
    service: String(body.service ?? "").slice(0, LIMITS.service + 1),
    message: String(body.message ?? "").slice(0, LIMITS.message + 1),
  };

  const errors = validateContact(fields);
  if (Object.keys(errors).length) {
    return NextResponse.json(
      { ok: false, error: "Please correct the highlighted fields.", fields: errors },
      { status: 422 },
    );
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many enquiries from this connection. Please try again later or call us." },
      { status: 429 },
    );
  }

  const web3Key = process.env.WEB3FORMS_ACCESS_KEY;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!web3Key && (!apiKey || !to || !from)) {
    return NextResponse.json(
      {
        ok: false,
        code: "not_configured",
        error:
          "Online enquiries are not connected yet. Please reach us on WhatsApp, by phone or by email — your details are prefilled below.",
      },
      { status: 503 },
    );
  }

  // 1. Deliver via Web3Forms if access key is configured
  if (web3Key) {
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: web3Key,
          name: fields.name,
          phone: fields.phone,
          email: fields.email,
          company: fields.company || "—",
          service: fields.service || "—",
          message: fields.message,
          subject: `Website enquiry: ${fields.service || "General"} — ${fields.name}`,
          from_name: "AVIGENT Website",
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };
      if (res.ok && data.success) {
        return NextResponse.json({ ok: true });
      }
      console.error("[contact] Web3Forms error", res.status, data);
      return NextResponse.json(
        { ok: false, error: data.message || "Our mail service rejected the message. Please contact us directly." },
        { status: 502 },
      );
    } catch (err) {
      console.error("[contact] Web3Forms delivery failed", err);
      return NextResponse.json(
        { ok: false, error: "We couldn't deliver your enquiry right now. Please contact us directly." },
        { status: 502 },
      );
    }
  }

  // 2. Deliver via Resend
  const rows: [string, string][] = [
    ["Name", fields.name],
    ["Phone", fields.phone],
    ["Email", fields.email],
    ["Company", fields.company || "—"],
    ["Service", fields.service || "—"],
  ];
  const html = `
    <h2 style="font-family:sans-serif">New website enquiry — AVIGENT Technologies</h2>
    <table style="font-family:sans-serif;border-collapse:collapse">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:6px 12px;color:#555">${k}</td><td style="padding:6px 12px"><strong>${escapeHtml(v)}</strong></td></tr>`,
        )
        .join("")}
    </table>
    <p style="font-family:sans-serif;white-space:pre-wrap;margin-top:16px">${escapeHtml(fields.message)}</p>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: to!.split(",").map((s) => s.trim()),
        reply_to: fields.email,
        subject: `Website enquiry: ${fields.service || "General"} — ${fields.name}`,
        html,
        text: `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${fields.message}`,
      }),
    });
    if (!res.ok) {
      console.error("[contact] Resend error", res.status, await res.text().catch(() => ""));
      return NextResponse.json(
        { ok: false, error: "Our mail service rejected the message. Please contact us directly." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] delivery failed", err);
    return NextResponse.json(
      { ok: false, error: "We couldn't deliver your enquiry right now. Please contact us directly." },
      { status: 502 },
    );
  }
}
