import Link from "next/link";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline-dark" | "whatsapp";

const base =
  "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden whitespace-nowrap px-6 py-3.5 text-[0.95rem] font-semibold tracking-tight transition-all duration-300 ease-out-expo active:scale-[0.98] focus-visible:outline-offset-4";

const variants: Record<Variant, string> = {
  primary:
    "bg-volt-400 text-ink hover:bg-volt-300 shadow-[0_0_0_0_rgba(69,230,162,0)] hover:shadow-[0_10px_40px_-8px_rgba(69,230,162,0.6)]",
  secondary:
    "glass text-white hover:bg-white/15 hover:border-white/30",
  "outline-dark":
    "border border-navy-900/20 text-navy-900 hover:border-navy-900 hover:bg-navy-900 hover:text-white",
  whatsapp:
    "bg-[#25D366] text-[#05280f] hover:bg-[#3be27a] hover:shadow-[0_10px_40px_-8px_rgba(37,211,102,0.6)]",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  icon?: ReactNode;
  arrow?: boolean;
  external?: boolean;
  id?: string;
  ariaLabel?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  icon,
  arrow = true,
  external,
  id,
  ariaLabel,
}: Props) {
  const content = (
    <>
      {/* light sheen on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/30 opacity-0 blur-sm transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100"
      />
      {icon}
      <span className="relative">{children}</span>
      {arrow && (
        <ArrowRight
          aria-hidden="true"
          className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </>
  );

  const cls = clsx(base, variants[variant], className);

  const isExternal = external ?? /^(https?:|tel:|mailto:)/.test(href);
  if (isExternal) {
    const newTab = href.startsWith("http");
    return (
      <a
        id={id}
        href={href}
        className={cls}
        aria-label={ariaLabel}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }
  return (
    <Link id={id} href={href} className={cls} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}
