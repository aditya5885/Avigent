import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { services } from "@/lib/site";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden bg-navy-950 pt-32 pb-20">
      <div className="bg-grid absolute inset-0 -z-10 opacity-70" aria-hidden="true" />
      <div className="absolute left-1/2 top-1/3 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-electric-500/15 blur-3xl" aria-hidden="true" />
      <div className="container-x">
        <p className="eyebrow text-volt-400">Error 404</p>
        <h1 className="mt-5 text-5xl font-semibold text-white md:text-7xl">
          This circuit is <span className="text-gradient">open.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-steel-300">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you reconnected.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/">Back to home</Button>
          <Button href="/contact" variant="secondary">
            Contact us
          </Button>
        </div>
        <ul className="mt-14 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`} className="text-steel-400 hover:text-white">
                {s.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
