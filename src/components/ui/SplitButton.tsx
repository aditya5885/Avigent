import Link from "next/link";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Two-part CTA: a dark (or light) label block with a slanted edge, paired with
 * a volt arrow tile. One link, one focus target. Label text rolls on hover.
 */
export function SplitButton({
  href,
  children,
  tone = "dark",
  id,
  className,
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  tone?: "dark" | "light";
  id?: string;
  className?: string;
  ariaLabel?: string;
}) {
  const external = /^(https?:|mailto:|tel:)/.test(href);
  const classes = clsx(
    "group inline-flex items-stretch font-mono text-[0.72rem] font-medium uppercase tracking-[0.08em]",
    className,
  );

  const inner = (
    <>
      <span
        className={clsx(
          "flex items-center rounded-l-lg py-3.5 pl-5 pr-7 transition-colors duration-300 [clip-path:polygon(0_0,100%_0,calc(100%-9px)_100%,0_100%)]",
          tone === "dark"
            ? "bg-navy-950 text-white group-hover:bg-navy-800"
            : "bg-white text-navy-950 group-hover:bg-mist-100",
        )}
      >
        <span className="relative block overflow-hidden">
          <span className="block transition-transform duration-500 ease-out-expo group-hover:-translate-y-full">
            {children}
          </span>
          <span
            className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-out-expo group-hover:translate-y-0"
            aria-hidden="true"
          >
            {children}
          </span>
        </span>
      </span>
      <span className="-ml-1.5 flex w-12 items-center justify-center rounded-r-lg bg-volt-300 pl-1.5 text-ink transition-colors duration-300 [clip-path:polygon(9px_0,100%_0,100%_100%,0_100%)] group-hover:bg-volt-400">
        <ArrowRight
          className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </>
  );

  if (external) {
    const newTab = href.startsWith("http");
    return (
      <a
        href={href}
        id={id}
        aria-label={ariaLabel}
        className={classes}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} id={id} aria-label={ariaLabel} className={classes}>
      {inner}
    </Link>
  );
}
