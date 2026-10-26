import { PageHero, SectionHeading } from "@/components/layout/PageChrome";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactDetails, MapEmbed } from "@/components/contact/ContactDetails";
import { Reveal } from "@/components/motion";
import { company } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Us — Kakkanad, Kochi",
  description:
    "Request a quote or consultation from AVIGENT Technologies. Call +91 96200 94100, WhatsApp, email info@avigent.in or visit KC Arcade, Kakkanad, Kochi 682037.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s power your <span className="text-gradient">next project.</span>
          </>
        }
        description="Request a quote, book a safety audit or ask about solar. Reach us however suits you — we're based in Kakkanad, Kochi."
        crumbs={[{ label: "Contact", href: "/contact" }]}
      />

      <section aria-label="Contact details" className="bg-navy-950 pb-8">
        <div className="container-x">
          <Reveal>
            <ContactDetails />
          </Reveal>
        </div>
      </section>

      <section id="enquiry" aria-labelledby="enquiry-title" className="scroll-mt-24 bg-navy-950 py-20 md:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Request a quote"
              title={<span id="enquiry-title">Tell us about your requirement.</span>}
              description="Share a few details about your facility and what you need. Our team will review your enquiry and get back to you."
            />
            <div className="mt-10 border-l-2 border-volt-400 pl-6">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-steel-400">Prefer to talk?</p>
              <a href={company.phoneHref} className="mt-2 block font-display text-3xl font-semibold text-white hover:text-volt-400">
                {company.phoneDisplay}
              </a>
              <a href={company.emailHref} className="mt-2 block text-steel-300 hover:text-white">
                {company.email}
              </a>
            </div>
          </div>
          <Reveal>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="visit-title" className="bg-navy-950 pb-24 md:pb-32">
        <div className="container-x">
          <h2 id="visit-title" className="eyebrow text-volt-400">Visit our office</h2>
          <p className="mt-4 max-w-xl text-lg text-steel-300">{company.address.full}</p>
          <Reveal className="mt-8">
            <MapEmbed className="aspect-[4/3] md:aspect-[21/9]" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
