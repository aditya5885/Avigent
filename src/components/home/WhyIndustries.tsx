import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Icon3D } from "@/components/ui/Icon3D";
import { Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "@/components/layout/PageChrome";
import { industries, whyChooseUs } from "@/lib/site";

const panelTones = [
  { bg: "bg-volt-300", title: "text-navy-950", text: "text-navy-900/80", num: "text-navy-900/70", icon: "navy" },
  { bg: "bg-navy-900", title: "text-white", text: "text-steel-300", num: "text-white/60", icon: "brand" },
  { bg: "bg-mist-200", title: "text-navy-950", text: "text-steel-600", num: "text-navy-900/60", icon: "navy" },
  { bg: "bg-electric-600", title: "text-white", text: "text-white/85", num: "text-white/70", icon: "white" },
] as const;

export function WhyChooseUs() {
  return (
    <section aria-labelledby="why-title" className="relative bg-mist-50 pt-24 text-navy-900 md:pt-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            tone="light"
            eyebrow="Why choose us"
            title={<span id="why-title">Engineering you can trust, delivered with care.</span>}
          />
          <p className="max-w-md text-steel-600 lg:pb-2">
            Four principles guide every maintenance visit, audit, consultation and installation we take on.
          </p>
        </div>
      </div>

      <Stagger className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4">
        {whyChooseUs.map((w, i) => {
          const tone = panelTones[i % panelTones.length];
          return (
            <StaggerItem
              key={w.title}
              className={`group relative flex min-h-[22rem] flex-col justify-between overflow-hidden p-7 md:min-h-[26rem] md:p-8 ${tone.bg}`}
            >
              <div className="flex items-start justify-between">
                <Icon3D
                  name={w.icon3d}
                  tone={tone.icon}
                  size={96}
                  className="-ml-2 -mt-2 transition-transform duration-700 ease-out-expo group-hover:-translate-y-1.5 group-hover:rotate-[-8deg] group-hover:scale-105"
                />
                <span className={`font-mono text-xs ${tone.num}`}>0{i + 1}.</span>
              </div>
              <div>
                <h3 className={`text-2xl font-medium tracking-tight md:text-[1.7rem] ${tone.title}`}>{w.title}</h3>
                <p className={`mt-3 max-w-sm text-[0.95rem] leading-relaxed ${tone.text}`}>{w.text}</p>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}

export function Industries() {
  return (
    <section aria-labelledby="industries-title" className="relative bg-white py-24 text-navy-900 md:py-36">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              tone="light"
              eyebrow="Industries we serve"
              title={<span id="industries-title">Built for facilities that can&apos;t afford downtime.</span>}
              description="From production floors to patient wards, we support the electrical backbone of organisations across sectors."
            />
          </div>
          <Stagger as="ul" className="grid grid-cols-2 border-l border-t border-navy-900/10 md:grid-cols-3">
            {industries.map((ind, i) => (
              <StaggerItem
                as="li"
                key={ind.name}
                className="group relative aspect-square border-b border-r border-navy-900/10 p-5 transition-colors duration-500 hover:bg-navy-900 md:p-7"
              >
                <span className="font-mono text-[0.65rem] text-steel-400 transition-colors group-hover:text-steel-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="absolute inset-x-5 bottom-5 md:inset-x-7 md:bottom-7">
                  <Icon
                    name={ind.icon as IconName}
                    className="h-8 w-8 text-electric-600 transition-all duration-500 group-hover:-translate-y-1 group-hover:text-volt-400 md:h-10 md:w-10"
                  />
                  <p className="mt-4 font-display text-lg font-semibold leading-tight transition-colors group-hover:text-white md:text-xl">
                    {ind.name}
                  </p>
                </div>
              </StaggerItem>
            ))}
            <li className="relative hidden aspect-square border-b border-r border-navy-900/10 bg-linear-to-br from-electric-500 to-volt-500 p-7 md:col-span-2 md:block md:aspect-auto">
              <p className="font-display text-2xl font-semibold leading-snug text-white">
                Don&apos;t see your sector? We tailor engineering support to your site.
              </p>
              <Link
                href="/contact#enquiry"
                className="mt-6 inline-flex items-center gap-2 border-b border-white/60 pb-1 font-semibold text-white hover:border-white"
              >
                Talk to an engineer →
              </Link>
            </li>
          </Stagger>
        </div>
      </div>
    </section>
  );
}
