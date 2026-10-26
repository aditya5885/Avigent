import Image from "next/image";
import { PageHero, SectionHeading } from "@/components/layout/PageChrome";
import { Counter, Parallax, Reveal, Stagger, StaggerItem } from "@/components/motion";
import { WhyChooseUs, Industries } from "@/components/home/WhyIndustries";
import { CtaBanner } from "@/components/home/Spotlight";
import { processSteps } from "@/components/services/ServiceBlocks";
import { Icon } from "@/components/ui/Icon";
import { company, services, industries } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = pageMetadata({
  title: "About Us — Powering Progress Since 2012",
  description:
    "Founded by Avinash Mohandas in 2012, AVIGENT Technologies delivers electrical maintenance, safety audits, engineering consultancy and renewable energy EPC from Kakkanad, Kochi.",
  path: "/about",
  image: "/images/engineering-team.jpg",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={
          <>
            Powering progress <span className="text-gradient">since 2012.</span>
          </>
        }
        description="A Kochi-based engineering company helping organisations keep their electrical systems safe, efficient and ready for a cleaner energy future."
        crumbs={[{ label: "About", href: "/about" }]}
        image="/images/engineering-team.jpg"
      />

      {/* Story */}
      <section aria-labelledby="story-title" className="bg-mist-50 py-24 text-navy-900 md:py-36">
        <div className="container-x grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
          <div>
            <Reveal>
              <p className="eyebrow text-electric-600">Our story</p>
              <h2 id="story-title" className="mt-5 text-4xl font-semibold leading-[1.05] md:text-6xl">
                Empowering tomorrow&apos;s energy solutions.
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="mt-10 space-y-6 text-lg leading-relaxed text-steel-600">
              <p>
                Welcome to AVIGENT Technologies! Founded by {company.founder} in 2012, we&apos;re here to help with
                electrical maintenance, safety audits, engineering advice and renewable energy projects. Our goal is to
                make sure your systems work well and are safe.
              </p>
              <p>
                At AVIGENT, we use the latest technology and our team is dedicated to giving you the best service. We
                want to make your environment safer and more efficient.
              </p>
              <p>
                Join us as we work towards better and more reliable electrical solutions. AVIGENT Technologies is
                leading the way to a brighter and greener future.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="relative">
            <Parallax className="aspect-[4/5]" strength={6}>
              <Image
                src="/images/engineering-consultancy.jpg"
                alt="Engineers reviewing electrical drawings together"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                quality={70}
                className="object-cover"
              />
            </Parallax>
            <div className="absolute -bottom-6 -left-6 hidden h-32 w-32 border-b-2 border-l-2 border-electric-500 lg:block" aria-hidden="true" />
          </Reveal>
        </div>
      </section>

      {/* Facts — verified only */}
      <section aria-label="Company facts" className="border-b border-white/10 bg-navy-950">
        <div className="container-x">
          <dl className="grid grid-cols-2 md:grid-cols-4">
            {[
              { label: "Founded", node: <Counter value={company.foundedYear} from={2000} /> },
              { label: "Years of experience", node: <Counter sinceYear={company.foundedYear} suffix="+" /> },
              { label: "Service lines", node: <Counter value={services.length} /> },
              { label: "Industries served", node: <Counter value={industries.length} /> },
            ].map((s, i) => (
              <div key={s.label} className={`flex flex-col gap-2 py-12 ${i > 0 ? "md:border-l md:border-white/10 md:pl-10" : ""} ${i % 2 ? "border-l border-white/10 pl-6" : ""}`}>
                <dt className="order-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-steel-400">{s.label}</dt>
                <dd className="order-1 font-display text-5xl font-semibold text-white">{s.node}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Founder */}
      <section aria-labelledby="founder-title" className="relative overflow-hidden bg-navy-950 py-24 md:py-32">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="container-x relative grid items-center gap-12 lg:grid-cols-[auto_1fr] lg:gap-20">
          <Reveal className="glass ticks flex h-56 w-56 flex-col items-center justify-center text-center">
            <span className="font-display text-6xl font-bold text-gradient">AM</span>
            <span className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-steel-400">Founder</span>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow text-volt-400">Leadership</p>
            <h2 id="founder-title" className="mt-5 text-3xl font-semibold text-white md:text-5xl">
              {company.founder}
            </h2>
            <p className="mt-2 text-steel-400">Founder, {company.name}</p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-steel-300">
              {company.founder} founded AVIGENT Technologies in 2012 with a simple goal: to make sure clients&apos;
              electrical systems work well and are safe — and to help them move towards cleaner, more reliable energy.
            </p>
          </Reveal>
        </div>
      </section>

      {/* What we do */}
      <section aria-labelledby="what-title" className="bg-navy-900 py-24 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="What we do" title={<span id="what-title">Five disciplines. One dependable team.</span>} />
          <Stagger as="ul" className="mt-14 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
            {services.map((s) => (
              <StaggerItem as="li" key={s.slug} className="bg-navy-900">
                <Link href={`/services/${s.slug}`} className="group flex h-full flex-col gap-10 p-7 transition-colors hover:bg-navy-800">
                  <span className="flex items-center justify-between">
                    <Icon name={s.icon} className="h-7 w-7 text-electric-400 transition-colors group-hover:text-volt-400" />
                    <span className="font-mono text-xs text-steel-500">{s.index}</span>
                  </span>
                  <span>
                    <span className="block font-display text-lg font-semibold text-white">{s.title}</span>
                    <span className="mt-2 block text-sm leading-relaxed text-steel-300">{s.short}</span>
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-24">
            <p className="eyebrow text-volt-400">Our approach</p>
            <Stagger as="ol" className="mt-8 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((p, i) => (
                <StaggerItem as="li" key={p.title} className="bg-navy-900 p-7">
                  <span className="font-display text-5xl font-semibold text-white/10">0{i + 1}</span>
                  <h3 className="mt-4 text-xl font-semibold text-white">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-steel-300">{p.text}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <Industries />
      <CtaBanner />
    </>
  );
}
