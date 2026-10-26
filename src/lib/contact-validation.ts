/** Shared by the contact form (client) and /api/contact (server). */
export type ContactFields = {
  name: string;
  phone: string;
  email: string;
  company: string;
  service: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

export const LIMITS = { name: 100, phone: 20, email: 150, company: 150, service: 80, message: 4000 } as const;

export function validateContact(f: ContactFields): ContactErrors {
  const e: ContactErrors = {};
  if (f.name.trim().length < 2) e.name = "Please enter your name.";
  const digits = f.phone.replace(/[^\d]/g, "");
  if (digits.length < 10 || digits.length > 13) e.phone = "Please enter a valid phone number (10–13 digits).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = "Please enter a valid email address.";
  if (f.message.trim().length < 10) e.message = "Please tell us a little more (at least 10 characters).";
  (Object.keys(LIMITS) as (keyof ContactFields)[]).forEach((k) => {
    if ((f[k] ?? "").length > LIMITS[k] && !e[k]) e[k] = `Please keep this under ${LIMITS[k]} characters.`;
  });
  return e;
}
