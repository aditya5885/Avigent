import { Counter, Reveal } from "@/components/motion";
import { Icon3D, type Icon3DName } from "@/components/ui/Icon3D";
import { company, industries, services } from "@/lib/site";

interface CapabilityItem {
  icon: Icon3DName;
  title: string;
  tag: string;
}

const capabilities: CapabilityItem[] = [
  { icon: "sun", title: "Turnkey Solar EPC", tag: "Rooftop & Ground" },
  { icon: "shield", title: "Electrical Safety Audits", tag: "Compliance Verified" },
  { icon: "tool", title: "Preventive LT Switchgear", tag: "Periodic Servicing" },
  { icon: "bulb", title: "Engineering Consultancy", tag: "Feasibility & Scoping" },
  { icon: "setting", title: "Custom Control Panels", tag: "Engineered Wiring" },
  { icon: "flash", title: "Thermography Scanning", tag: "Hazard Prevention" },
  { icon: "battery", title: "Power Distribution", tag: "HT/LT Substations" },
  { icon: "map-pin", title: "Headquartered in Kochi", tag: "Pan-Kerala Reach" },
];

export function TrustStrip() {
  const stats = [
    {
      icon: "medal" as Icon3DName,
      badge: "ESTABLISHED",
      node: <Counter value={company.foundedYear} from={2000} />,
      title: "Year Founded",
      detail: `Founded by ${company.founder} in Kakkanad, Kochi.`,
    },
    {
      icon: "battery" as Icon3DName,
      badge: "RELIABILITY",
      node: <Counter sinceYear={company.foundedYear} suffix="+" />,
      title: "Years in Operation",
      detail: "Providing dependable industrial electrical solutions.",
    },
    {
      icon: "tool" as Icon3DName,
      badge: "DISCIPLINES",
      node: <Counter value={services.length} />,
      title: "Core Service Lines",
      detail: "From preventive maintenance to full Solar EPC.",
    },
    {
      icon: "target" as Icon3DName,
      badge: "COVERAGE",
      node: <Counter value={industries.length} suffix="+" />,
      title: "Key Industry Sectors",
      detail: "Commercial, manufacturing, healthcare, IT, and more.",
    },
  ];

  return (
    <section aria-labelledby="metrics-title" className="relative overflow-hidden bg-white py-20 text-navy-900 md:py-28">
      <div className="bg-grid-light pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="container-x relative">
        {/* Section Heading */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow text-electric-600">Company Track Record</p>
            <h2 id="metrics-title" className="mt-4 text-3xl font-semibold leading-[1.08] sm:text-4xl md:text-5xl text-navy-950">
              Engineering excellence, <span className="text-electric-600">measured in results.</span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-steel-600 md:text-lg">
            Every engagement is backed by verified standards, dedicated electrical engineers, and over a decade of operational trust.
          </p>
        </div>

        {/* 4 Premium Metric Cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.title}
              delay={i * 0.08}
              className="group relative flex flex-col justify-between rounded-2xl border border-navy-900/10 bg-mist-50/70 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-electric-400/40 hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(10,21,48,0.08)]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-xs ring-1 ring-navy-900/5 transition-transform duration-500 ease-out-expo group-hover:scale-110 group-hover:rotate-[-6deg]">
                    <Icon3D name={s.icon} tone="brand" size={32} />
                  </span>
                  <span className="rounded-full bg-mist-200/60 px-2.5 py-0.5 font-mono text-[0.6rem] font-medium uppercase tracking-[0.14em] text-steel-600">
                    {s.badge}
                  </span>
                </div>

                <div className="mt-8 font-display text-5xl font-semibold tracking-tight text-navy-950 sm:text-6xl">
                  {s.node}
                </div>

                <h3 className="mt-3 text-lg font-semibold text-navy-900">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-steel-600">{s.detail}</p>
              </div>

              <div
                className="mt-6 h-1 w-10 rounded-full bg-linear-to-r from-electric-500 to-volt-500 transition-all duration-500 group-hover:w-full"
                aria-hidden="true"
              />
            </Reveal>
          ))}
        </div>

        {/* Modern Capability Stream (Replaces old text marquee) */}
        <div className="relative mt-16 overflow-hidden rounded-2xl border border-navy-900/8 bg-mist-100/50 py-5 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max animate-marquee gap-5 hover:[animation-play-state:paused]">
            {[...capabilities, ...capabilities].map((item, idx) => (
              <div
                key={idx}
                className="group flex items-center gap-3.5 rounded-full border border-navy-900/8 bg-white py-2.5 pl-3 pr-4 shadow-[0_2px_12px_-4px_rgba(10,21,48,0.04)] transition-all hover:border-electric-400 hover:shadow-md"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mist-100">
                  <Icon3D name={item.icon} tone="brand" size={20} />
                </span>
                <span className="whitespace-nowrap text-sm font-semibold text-navy-950">{item.title}</span>
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-volt-500" aria-hidden="true" />
                <span className="whitespace-nowrap font-mono text-[0.65rem] uppercase tracking-wider text-steel-500">
                  {item.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
