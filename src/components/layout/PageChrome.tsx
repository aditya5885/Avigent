import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { company } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";

export type Crumb = { label: string; href: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ label: "Home", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-steel-400">
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.href} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="text-volt-400">
                    {c.label}
                  </span>
                ) : (
                  <>
                    <Link href={c.href} className="transition-colors hover:text-white">
                      {c.label}
                    </Link>
                    <ChevronRight className="h-3 w-3" aria-hidden="true" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            item: `${company.url}${c.href === "/" ? "" : c.href}`,
          })),
        }}
      />
    </>
  );
}

/** Inner-page header. CSS entrance animations so content paints before hydration. */
export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  image,
  imageAlt = "",
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  crumbs: Crumb[];
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
}) {
  return (
    <section className="p-2 md:p-3">
      <div className="relative isolate overflow-hidden rounded-2xl bg-navy-900 pb-16 pt-32 md:rounded-[1.25rem] md:pb-24 md:pt-44">
        {image && (
          <div className="absolute inset-0 -z-20">
            <Image
              src={image}
              alt={imageAlt}
              fill
              preload
              sizes="100vw"
              quality={70}
              className="animate-zoom-out object-cover opacity-55"
            />
          </div>
        )}
        <div
          className="absolute inset-0 -z-10 bg-linear-to-r from-navy-950 via-navy-950/85 to-navy-950/30"
          aria-hidden="true"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-t from-navy-950/90 via-transparent to-navy-950/40" aria-hidden="true" />
        <div className="bg-grid absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
        <div
          className="absolute -right-40 top-10 -z-10 h-[30rem] w-[30rem] rounded-full bg-electric-500/15 blur-3xl"
          aria-hidden="true"
        />

        <div className="px-5 md:px-9 xl:px-11">
          <div className="animate-fade">
            <Breadcrumbs items={crumbs} />
          </div>
          <p className="eyebrow mt-10 animate-rise text-volt-300 [animation-delay:80ms]">{eyebrow}</p>
          <h1 className="mt-5 max-w-5xl animate-rise text-4xl font-medium leading-[1.02] tracking-[-0.035em] text-white [animation-delay:160ms] sm:text-5xl md:text-6xl lg:text-[5rem]">
            {title}
          </h1>
          {description && (
            <p className="mt-7 max-w-2xl animate-rise text-lg leading-relaxed text-white/80 [animation-delay:260ms] md:text-xl">
              {description}
            </p>
          )}
          {children && <div className="mt-10 animate-rise [animation-delay:360ms]">{children}</div>}
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "dark",
  align = "left",
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
}) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      <p className={`eyebrow ${tone === "dark" ? "text-volt-400" : "text-electric-600"}`}>{eyebrow}</p>
      <h2
        className={`mt-5 text-3xl font-semibold leading-[1.08] sm:text-4xl md:text-5xl ${
          tone === "dark" ? "text-white" : "text-navy-900"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-6 text-lg leading-relaxed ${tone === "dark" ? "text-steel-300" : "text-steel-600"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
