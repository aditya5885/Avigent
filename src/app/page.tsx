import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { AboutIntro } from "@/components/home/AboutIntro";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { WhyChooseUs, Industries } from "@/components/home/WhyIndustries";
import { Testimonials } from "@/components/home/Testimonials";
import { RenewableSpotlight, CtaBanner } from "@/components/home/Spotlight";
import { ProjectGallery } from "@/components/ProjectGallery";
import { ContactDetails, MapEmbed } from "@/components/contact/ContactDetails";
import { SectionHeading } from "@/components/layout/PageChrome";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "AVIGENT Technologies | Electrical Solutions, Safety Audits & Solar EPC in Kochi",
  absoluteTitle: true,
  description:
    "Reliable electrical solutions, safer systems, cleaner energy. AVIGENT Technologies, Kakkanad, Kochi — electrical maintenance, safety audits, engineering consultancy and solar EPC since 2012.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutIntro />

      <section aria-labelledby="services-title" className="relative overflow-hidden bg-navy-950 py-24 md:py-36">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="container-x relative">
          <div className="mb-16 flex flex-col justify-between gap-8 md:mb-20 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Our services"
              title={
                <span id="services-title">
                  Complete electrical capability, <span className="text-gradient">one accountable partner.</span>
                </span>
              }
            />
            <Reveal>
              <Button href="/services" variant="secondary">
                All services
              </Button>
            </Reveal>
          </div>
          <ServicesShowcase />
        </div>
      </section>

      <TrustStrip />
      <WhyChooseUs />
      <Industries />

      <section aria-labelledby="projects-title" className="relative bg-navy-950 py-24 md:py-36">
        <div className="container-x">
          <div className="mb-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Featured work"
              title={<span id="projects-title">The kind of work we deliver, every day.</span>}
              description="Explore our work by discipline — from rooftop solar to switch-room maintenance and safety audits."
            />
            <Reveal>
              <Button href="/projects" variant="secondary">
                View all projects
              </Button>
            </Reveal>
          </div>
          <ProjectGallery limit={6} idPrefix="home-gallery" />
          <p className="mt-6 text-xs text-steel-500">Representative imagery shown.</p>
        </div>
      </section>

      <Testimonials />

      <RenewableSpotlight />
      <CtaBanner />

      <section aria-labelledby="contact-title" className="relative bg-navy-950 pb-24 md:pb-36">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title={<span id="contact-title">Talk to our engineers in Kochi.</span>}
              description="Call, WhatsApp, email or visit our Kakkanad office — we're ready to help with your next requirement."
            />
            <Reveal className="mt-10">
              <ContactDetails />
            </Reveal>
          </div>
          <Reveal delay={0.1} className="min-h-[24rem]">
            <MapEmbed className="h-full min-h-[24rem]" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
