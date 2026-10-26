"use client";

import { useId, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CircleAlert, CircleCheck, LoaderCircle, Send, Phone, Mail } from "lucide-react";
import clsx from "clsx";
import { WhatsAppIcon } from "@/components/ui/Icon";
import { company, services } from "@/lib/site";
import { validateContact as validate, type ContactFields as Fields, type ContactErrors as Errors } from "@/lib/contact-validation";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success" }
  | { state: "error"; message: string; notConfigured?: boolean };

const initial: Fields = { name: "", phone: "", email: "", company: "", service: "", message: "" };

export function ContactForm({ defaultService = "" }: { defaultService?: string }) {
  const uid = useId();
  const [fields, setFields] = useState<Fields>({ ...initial, service: defaultService });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [honeypot, setHoneypot] = useState("");

  const set = (k: keyof Fields) => (v: string) => {
    const next = { ...fields, [k]: v };
    setFields(next);
    if (touched[k]) setErrors(validate(next));
  };
  const blur = (k: keyof Fields) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validate(fields));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const v = validate(fields);
    setErrors(v);
    setTouched({ name: true, phone: true, email: true, message: true });
    if (Object.keys(v).length) {
      const first = Object.keys(v)[0];
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }
    setStatus({ state: "submitting" });
    const web3Key = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "1866ad8e-926f-47f6-b400-1e66fbb0d63b";
    try {
      if (web3Key) {
        if (honeypot) {
          setStatus({ state: "success" });
          setFields({ ...initial });
          setTouched({});
          return;
        }
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
          setStatus({ state: "success" });
          setFields({ ...initial });
          setTouched({});
        } else {
          setStatus({
            state: "error",
            message: data.message ?? "Something went wrong while sending your enquiry.",
          });
        }
      } else {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...fields, website: honeypot }),
        });
        const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; code?: string };
        if (res.ok && data.ok) {
          setStatus({ state: "success" });
          setFields({ ...initial });
          setTouched({});
        } else {
          setStatus({
            state: "error",
            message: data.error ?? "Something went wrong while sending your enquiry.",
            notConfigured: data.code === "not_configured",
          });
        }
      }
    } catch {
      setStatus({
        state: "error",
        message: "We couldn't reach the server. Please check your connection and try again.",
      });
    }
  }

  const whatsappText = `Hello AVIGENT Technologies,\nName: ${fields.name}\nPhone: ${fields.phone}\nEmail: ${fields.email}${
    fields.service ? `\nService: ${fields.service}` : ""
  }\n\n${fields.message}`;

  if (status.state === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        role="status"
        className="flex min-h-[28rem] flex-col items-start justify-center border border-volt-400/30 bg-volt-400/5 p-10"
      >
        <CircleCheck className="h-12 w-12 text-volt-400" aria-hidden="true" />
        <h3 className="mt-6 text-3xl font-semibold text-white">Thank you — enquiry received.</h3>
        <p className="mt-4 max-w-md text-steel-300">
          Your message has been sent to our team. We&apos;ll get back to you shortly. For anything urgent, call{" "}
          <a href={company.phoneHref} className="text-white underline underline-offset-4">
            {company.phoneDisplay}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus({ state: "idle" })}
          className="mt-8 border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white"
        >
          Send another enquiry
        </button>
      </motion.div>
    );
  }

  const submitting = status.state === "submitting";

  return (
    <form noValidate onSubmit={onSubmit} aria-describedby={`${uid}-required-note`} className="grid gap-5">
      <p id={`${uid}-required-note`} className="text-sm text-steel-400">
        Fields marked <span className="text-volt-400">*</span> are required.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={`${uid}-name`} label="Full name" required error={touched.name ? errors.name : undefined}>
          {(p) => (
            <input {...p} type="text" autoComplete="name" value={fields.name} onChange={(e) => set("name")(e.target.value)} onBlur={blur("name")} />
          )}
        </Field>
        <Field id={`${uid}-phone`} label="Phone" required error={touched.phone ? errors.phone : undefined}>
          {(p) => (
            <input {...p} type="tel" inputMode="tel" autoComplete="tel" placeholder="+91" value={fields.phone} onChange={(e) => set("phone")(e.target.value)} onBlur={blur("phone")} />
          )}
        </Field>
        <Field id={`${uid}-email`} label="Email" required error={touched.email ? errors.email : undefined}>
          {(p) => (
            <input {...p} type="email" autoComplete="email" value={fields.email} onChange={(e) => set("email")(e.target.value)} onBlur={blur("email")} />
          )}
        </Field>
        <Field id={`${uid}-company`} label="Company / organisation">
          {(p) => (
            <input {...p} type="text" autoComplete="organization" value={fields.company} onChange={(e) => set("company")(e.target.value)} />
          )}
        </Field>
      </div>

      <Field id={`${uid}-service`} label="Service of interest">
        {(p) => (
          <select {...p} value={fields.service} onChange={(e) => set("service")(e.target.value)}>
            <option value="">Select a service (optional)</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Other">Other / not sure</option>
          </select>
        )}
      </Field>

      <Field id={`${uid}-message`} label="How can we help?" required error={touched.message ? errors.message : undefined}>
        {(p) => (
          <textarea {...p} rows={5} value={fields.message} onChange={(e) => set("message")(e.target.value)} onBlur={blur("message")} />
        )}
      </Field>

      {/* Honeypot — hidden from humans */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input id={`${uid}-website`} tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      <AnimatePresence>
        {status.state === "error" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            role="alert"
            className="overflow-hidden"
          >
            <div className="flex gap-4 border border-red-400/40 bg-red-500/10 p-5">
              <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-red-300" aria-hidden="true" />
              <div className="text-sm">
                <p className="font-semibold text-white">Your enquiry was not sent.</p>
                <p className="mt-1 text-steel-300">{status.message}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href={company.whatsappWithText(whatsappText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] px-3 py-2 font-semibold text-[#05280f]"
                  >
                    <WhatsAppIcon className="h-4 w-4" /> Send via WhatsApp
                  </a>
                  <a
                    href={`${company.emailHref}?subject=${encodeURIComponent("Website enquiry")}&body=${encodeURIComponent(whatsappText)}`}
                    className="inline-flex items-center gap-2 border border-white/20 px-3 py-2 font-semibold text-white"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" /> Email us
                  </a>
                  <a href={company.phoneHref} className="inline-flex items-center gap-2 border border-white/20 px-3 py-2 font-semibold text-white">
                    <Phone className="h-4 w-4" aria-hidden="true" /> Call
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-start gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          id="contact-submit"
          disabled={submitting}
          className="group relative inline-flex items-center gap-2.5 bg-volt-400 px-7 py-4 font-semibold text-ink transition-all hover:bg-volt-300 hover:shadow-[0_10px_40px_-8px_rgba(69,230,162,0.6)] disabled:cursor-wait disabled:opacity-70"
        >
          {submitting ? (
            <>
              <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" /> Sending…
            </>
          ) : (
            <>
              Send enquiry <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </>
          )}
        </button>
        <p className="text-xs text-steel-400">We only use your details to respond to this enquiry.</p>
      </div>
    </form>
  );
}

type ControlProps = {
  id: string;
  name: string;
  required?: boolean;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
  className: string;
};

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: (p: ControlProps) => React.ReactNode;
}) {
  const errId = `${id}-error`;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-mist-100">
        {label} {required && <span className="text-volt-400">*</span>}
      </label>
      {children({
        id,
        name: id.split("-").pop() ?? id,
        required,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": error ? errId : undefined,
        className: clsx(
          "w-full border bg-white/[0.04] px-4 py-3.5 text-white placeholder:text-steel-500 transition-colors duration-300 focus:bg-white/[0.07] focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-volt-400 [&>option]:bg-navy-900",
          error ? "border-red-400/70" : "border-white/15 hover:border-white/30",
        ),
      })}
      {error && (
        <p id={errId} className="flex items-center gap-1.5 text-sm text-red-300">
          <CircleAlert className="h-3.5 w-3.5" aria-hidden="true" /> {error}
        </p>
      )}
    </div>
  );
}
