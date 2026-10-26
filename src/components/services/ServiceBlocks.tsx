import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Icon3D } from "@/components/ui/Icon3D";
import { Reveal, Stagger, StaggerItem, Parallax } from "@/components/motion";
import { PageHero, SectionHeading } from "@/components/layout/PageChrome";
import { ContactForm } from "@/components/contact/ContactForm";
import { CtaBanner } from "@/components/home/Spotlight";
import { JsonLd } from "@/components/seo/JsonLd";
import { SplitButton } from "@/components/ui/SplitButton";
import { WhatsAppIcon } from "@/components/ui/Icon";
import { company, services, type Service } from "@/lib/site";

export const processSteps = [
  { title: "Understand", text: "We listen to your requirement and assess your site and existing systems." },
  { title: "Plan", text: "A clear scope, approach and recommendations — no surprises." },
  { title: "Execute", text: "Work carried out safely and carefully by our engineering team." },
  { title: "Support", text: "Reporting, handover and ongoing support whenever you need us." },
];

/** Image-led service card used on the Services overview. */
export function ServiceCard({ service, reverse = false }: { service: Service; reverse?: boolean }) {
  return (
    <article className="group grid items-center gap-8 md:grid-cols-2 md:gap-14">
      <Link
        href={`/services/${service.slug}`}
        aria-label={`${service.title} — learn more`}
        className={`ticks relative block aspect-[4/3] overflow-hidden ${reverse ? "md:order-2" : ""}`}
      >
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          quality={70}
          className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink/70 to-transparent" aria-hidden="true" />
        <span className="absolute left-5 top-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/85 shadow-lg ring-1 ring-white/60 backdrop-blur-md">
          <Icon3D
            name={service.icon3d}
            tone="navy"
            size={48}
            className="transition-transform duration-700 ease-out-expo group-hover:-translate-y-0.5 group-hover:rotate-[-8deg]"
          />
        </span>
      </Link>
      <div>
        <p className="font-mono text-sm text-electric-400">{service.index} / 05</p>
        <h2 className="mt-4 text-3xl font-semibold text-white md:text-5xl">
          <Link href={`/services/${service.slug}`} className="transition-colors hover:text-volt-400">
            {service.title}
          </Link>
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-steel-300">{service.summary}</p>
        <ul className="mt-7 grid gap-2.5">
          {service.scope.slice(0, 3).map((item) => (
            <li key={item} className="flex gap-3 text-steel-300">
              <Check className="mt-1 h-4 w-4 shrink-0 text-volt-400" aria-hidden="true" /> {item}
            </li>
          ))}
        </ul>
        <Link
          href={`/services/${service.slug}`}
          className="mt-9 inline-flex items-center gap-3 border-b border-white/20 pb-2 font-semibold text-white transition-colors hover:border-volt-400 hover:text-volt-400"
        >
          Explore {service.title}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

/** Shared template for each service detail page. */
export function ServiceDetail({ service }: { service: Service }) {
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.summary,
          serviceType: service.title,
          url: `${company.url}/services/${service.slug}`,
          areaServed: { "@type": "State", name: "Kerala" },
          provider: { "@id": `${company.url}/#organization` },
        }}
      />
      <PageHero
        eyebrow={`Service ${service.index}`}
        title={service.title}
        description={service.short}
        crumbs={[
          { label: "Services", href: "/services" },
          { label: service.title, href: `/services/${service.slug}` },
        ]}
        image={service.image}
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          <SplitButton href="#enquiry">Request a quote</SplitButton>
          <a
            href={company.whatsappWithText(`Hello AVIGENT Technologies, I'm interested in ${service.title}.`)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp (opens in a new tab)"
            className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-white/80 transition-colors hover:text-[#25D366]"
          >
            <WhatsAppIcon className="h-4 w-4" /> Chat on WhatsApp
          </a>
        </div>
      </PageHero>

      {/* Overview */}
      <section aria-labelledby="overview-title" className="bg-mist-50 py-24 text-navy-900 md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <p className="eyebrow text-electric-600">Overview</p>
            <h2 id="overview-title" className="mt-5 text-3xl font-semibold leading-tight md:text-5xl">
              {service.short}
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-steel-600">{service.summary}</p>
            {service.extra && <p className="mt-5 leading-relaxed text-steel-600">{service.extra}</p>}
          </Reveal>
          <Reveal delay={0.1}>
            <Parallax className="aspect-[4/3]" strength={6}>
              <Image src={service.image} alt={service.imageAlt} fill sizes="(min-width: 1024px) 50vw, 100vw" quality={70} className="object-cover" />
            </Parallax>
          </Reveal>
        </div>
      </section>

      {/* Scope */}
      <section aria-labelledby="scope-title" className="relative overflow-hidden bg-navy-950 py-24 md:py-32">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="container-x relative grid gap-14 lg:grid-cols-[1fr_1.3fr]">
          <SectionHeading
            eyebrow="What's included"
            title={<span id="scope-title">Scope of work</span>}
            description="Every engagement is tailored to your site. A typical scope includes:"
          />
          <Stagger as="ul" className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
            {service.scope.map((item, i) => (
              <StaggerItem as="li" key={item} className="flex gap-4 bg-navy-950 p-6">
                <span className="font-mono text-xs text-electric-400">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-mist-100">{item}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Outcomes + process */}
      <section aria-labelledby="outcomes-title" className="bg-navy-900 py-24 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Outcomes" title={<span id="outcomes-title">What you gain</span>} />
          <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
            {service.outcomes.map((o) => (
              <StaggerItem key={o.title} className="ticks border border-white/10 bg-navy-950/60 p-8">
                <h3 className="text-2xl font-semibold text-white">{o.title}</h3>
                <p className="mt-3 leading-relaxed text-steel-300">{o.text}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-24">
            <p className="eyebrow text-volt-400">How we work</p>
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

      {/* Enquiry */}
      <section id="enquiry" aria-labelledby="enquiry-title" className="scroll-mt-24 bg-navy-950 py-24 md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Get started"
              title={<span id="enquiry-title">Request a quote for {service.title.toLowerCase()}</span>}
              description="Share a few details and our team will get back to you. Prefer to talk? Call or WhatsApp us."
            />
            <div className="mt-10 grid gap-3 text-steel-300">
              <a href={company.phoneHref} className="hover:text-white">{company.phoneDisplay}</a>
              <a href={company.emailHref} className="hover:text-white">{company.email}</a>
            </div>
          </div>
          <Reveal>
            <ContactForm defaultService={service.title} />
          </Reveal>
        </div>
      </section>

      {/* Other services */}
      <section aria-labelledby="other-title" className="border-t border-white/10 bg-navy-950 py-20">
        <div className="container-x">
          <h2 id="other-title" className="eyebrow text-steel-400">Explore other services</h2>
          <ul className="mt-8 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="group flex h-full flex-col justify-between gap-8 bg-navy-950 p-6 transition-colors hover:bg-navy-900">
                  <span className="flex items-center justify-between">
                    <Icon3D
                      name={s.icon3d}
                      tone="brand"
                      size={52}
                      className="transition-transform duration-700 ease-out-expo group-hover:-translate-y-1 group-hover:rotate-[-8deg]"
                    />
                    <ArrowUpRight className="h-5 w-5 text-steel-500 transition-all group-hover:rotate-45 group-hover:text-volt-400" aria-hidden="true" />
                  </span>
                  <span className="font-display text-lg font-semibold text-white">{s.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
