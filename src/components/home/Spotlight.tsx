import Image from "next/image";
import { Phone } from "lucide-react";
import { Parallax, Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Button } from "@/components/ui/Button";
import { SplitButton } from "@/components/ui/SplitButton";
import { Icon3D } from "@/components/ui/Icon3D";
import { company, getService } from "@/lib/site";

export function RenewableSpotlight() {
  const epc = getService("renewable-energy-epc");
  const steps = ["Feasibility", "Design", "Procurement", "Installation", "Commissioning"];

  return (
    <section aria-labelledby="renewable-title" className="relative isolate overflow-hidden bg-ink">
      <Parallax className="absolute inset-0 -z-20" strength={10}>
        <Image
          src="/images/solar-plant-aerial.jpg"
          alt="Aerial view of a solar power plant among green hills and coconut palms at golden hour"
          fill
          sizes="100vw"
          quality={70}
          className="object-cover"
        />
      </Parallax>
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-ink via-ink/85 to-ink/20" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-ink/90 via-transparent to-ink/60" aria-hidden="true" />

      <div className="container-x py-28 md:py-44">
        <div className="max-w-2xl">
          <Reveal>
            <p className="eyebrow text-volt-400">Renewable energy spotlight</p>
            <h2 id="renewable-title" className="mt-5 text-4xl font-semibold leading-[1.04] text-white md:text-6xl">
              Clean energy, <span className="text-gradient">engineered end to end.</span>
            </h2>
            <p className="mt-7 text-lg leading-relaxed text-steel-300">{epc.summary}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href={`/services/${epc.slug}`}>Explore Solar EPC</Button>
              <Button href="/contact#enquiry" variant="secondary">
                Get a solar assessment
              </Button>
            </div>
          </Reveal>
        </div>

        <Stagger as="ol" className="mt-20 grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-5">
          {steps.map((s, i) => (
            <StaggerItem as="li" key={s} className="bg-ink/70 p-6 backdrop-blur-md">
              <span className="font-mono text-xs text-volt-400">0{i + 1}</span>
              <p className="mt-6 font-display text-lg font-semibold text-white">{s}</p>
              <div className="mt-4 h-px w-full bg-white/10">
                <div className="h-px bg-linear-to-r from-electric-400 to-volt-400" style={{ width: `${(i + 1) * 20}%` }} />
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export function CtaBanner({
  title = "Ready to make your electrical systems safer, smarter and greener?",
  text = "Tell us about your facility. Our engineers will understand your requirement and recommend the right next step.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden bg-navy-950 py-20 md:py-28">
      <div className="container-x">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-2xl bg-linear-to-br from-electric-600 via-electric-500 to-navy-700 px-7 py-16 md:rounded-[1.25rem] md:px-16 md:py-24">
            <div className="bg-grid absolute inset-0 -z-10 opacity-40 [mask-image:linear-gradient(to_left,black,transparent)]" aria-hidden="true" />
            <div className="absolute -right-24 -top-24 -z-10 h-96 w-96 rounded-full bg-volt-400/30 blur-3xl" aria-hidden="true" />
            <div className="pointer-events-none absolute right-10 top-8 -z-10 hidden opacity-90 lg:block" aria-hidden="true">
              <Icon3D name="flash" tone="white" size={220} className="animate-float" />
            </div>
            <div className="grid items-end gap-10 lg:grid-cols-[1.5fr_1fr]">
              <div>
                <p className="eyebrow text-white/80">Request a consultation</p>
                <h2 id="cta-title" className="mt-5 text-3xl font-medium leading-[1.06] tracking-[-0.03em] text-white md:text-5xl">
                  {title}
                </h2>
                <p className="mt-6 max-w-xl text-lg text-white/80">{text}</p>
              </div>
              <div className="flex flex-col items-start gap-4 lg:items-end">
                <SplitButton href="/contact#enquiry">Request a consultation</SplitButton>
                <a
                  href={company.phoneHref}
                  className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.12em] text-white/85 transition-colors hover:text-volt-300"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {company.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
