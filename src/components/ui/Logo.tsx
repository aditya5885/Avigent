import Link from "next/link";
import clsx from "clsx";

/**
 * REVIEW: The official AVIGENT logo could not be retrieved from the current
 * site. This is a typographic wordmark — replace with the official asset.
 */
export function Logo({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return (
    <Link
      href="/"
      aria-label="AVIGENT Technologies — home"
      className={clsx("group inline-flex items-center gap-3", className)}
    >
      <LogoMark className="h-9 w-9 shrink-0 transition-transform duration-500 ease-out group-hover:rotate-[8deg]" />
      <span className="flex flex-col leading-none">
        <span
          className={clsx(
            "font-display text-[1.2rem] font-bold tracking-[0.16em]",
            tone === "light" ? "text-white" : "text-navy-900",
          )}
        >
          AVIGENT
        </span>
        <span
          className={clsx(
            "mt-1 font-mono text-[0.58rem] tracking-[0.32em] uppercase",
            tone === "light" ? "text-steel-300" : "text-steel-500",
          )}
        >
          Technologies
        </span>
      </span>
    </Link>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="lm-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#55a6ff" />
          <stop offset="1" stopColor="#45e6a2" />
        </linearGradient>
      </defs>
      <path d="M20 2 37 36H3L20 2Z" fill="none" stroke="url(#lm-g)" strokeWidth="2" strokeLinejoin="round" />
      <path d="M22.5 13 14.5 25.5h6l-2.5 8.5 8.5-13h-6l2-8Z" fill="url(#lm-g)" />
    </svg>
  );
}
