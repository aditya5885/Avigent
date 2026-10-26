import { PageHero, SectionHeading } from "@/components/layout/PageChrome";
import { Reveal } from "@/components/motion";
import { ServiceCard } from "@/components/services/ServiceBlocks";
import { CtaBanner } from "@/components/home/Spotlight";
import { Button } from "@/components/ui/Button";
import { services } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Electrical & Renewable Energy Services",
  description:
    "Explore AVIGENT Technologies' services: electrical maintenance, electrical safety audits, engineering consultancy, renewable energy EPC and engineering services in Kochi, Kerala.",
  path: "/services",
  image: "/images/electrical-maintenance.jpg",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Electrical expertise, <span className="text-gradient">end to end.</span>
          </>
        }
        description="From routine maintenance and safety audits to complete solar EPC — five disciplines delivered by one accountable team."
        crumbs={[{ label: "Services", href: "/services" }]}
        image="/images/engineering-services.jpg"
      >
        <nav aria-label="Jump to service" className="flex flex-wrap gap-2">
          {services.map((s) => (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              className="border border-white/15 px-4 py-2 text-sm text-steel-300 transition-colors hover:border-volt-400 hover:text-white"
            >
              {s.title}
            </a>
          ))}
        </nav>
      </PageHero>

      <section aria-label="All services" className="relative bg-navy-950 py-24 md:py-32">
        <div className="container-x space-y-28 md:space-y-40">
          {services.map((s, i) => (
            <Reveal key={s.slug} y={40}>
              <div id={s.slug} className="scroll-mt-28">
                <ServiceCard service={s} reverse={i % 2 === 1} />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section aria-labelledby="consulting-title" className="border-y border-white/10 bg-navy-900 py-24">
        <div className="container-x grid items-end gap-10 lg:grid-cols-[1.5fr_1fr]">
          <SectionHeading
            eyebrow="Consulting agency"
            title={<span id="consulting-title">Expert guidance and strategic insight.</span>}
            description="AVIGENT Technologies serves as a trusted consulting agency, offering expert guidance and strategic insights. Our seasoned consultants collaborate with clients to navigate challenges, optimize operations, and achieve sustainable growth."
          />
          <Reveal className="lg:justify-self-end">
            <Button href="/services/engineering-consultancy" variant="secondary">
              Engineering consultancy
            </Button>
          </Reveal>
        </div>
      </section>

      <CtaBanner title="Not sure which service you need?" text="Describe your requirement and our engineers will recommend the right approach for your facility." />
    </>
  );
}
