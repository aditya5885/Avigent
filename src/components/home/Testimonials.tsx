import Image from "next/image";
import Link from "next/link";
import { Star, ShieldCheck, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion";

interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  badge: string;
  badgeColor: string;
}

const testimonials: TestimonialItem[] = [
  {
    id: "tech-park",
    quote:
      "The 250 kWp commercial rooftop solar plant was commissioned ahead of schedule with flawless KSEB grid synchronization. Our operational power overhead dropped by 64%!",
    author: "Ananya Varma",
    role: "Facility Director",
    company: "Infopark IT Hub",
    avatar: "/images/testimonials/avatar-1.jpg",
    rating: 5,
    badge: "Solar EPC",
    badgeColor: "bg-volt-50 text-volt-700 border-volt-200",
  },
  {
    id: "manufacturing",
    quote:
      "AVIGENT's thermography safety audit uncovered two critical high-resistance busbar joints that were days away from causing an unplanned line shutdown. Invaluable expertise.",
    author: "K. R. Nambiar",
    role: "Chief Engineer",
    company: "Indus Precision Works",
    avatar: "/images/testimonials/avatar-2.jpg",
    rating: 5,
    badge: "Safety Audit",
    badgeColor: "bg-electric-50 text-electric-700 border-electric-200",
  },
  {
    id: "healthcare",
    quote:
      "Power continuity is non-negotiable in critical care. AVIGENT modernized our LT switch rooms and backup synchronizers without a single millisecond of patient disruption.",
    author: "Dr. Rajesh Kumar",
    role: "Head of Infrastructure",
    company: "Metropolitan Healthcare",
    avatar: "/images/testimonials/avatar-3.jpg",
    rating: 5,
    badge: "LT Switchgear",
    badgeColor: "bg-mist-100 text-navy-800 border-mist-300",
  },
  {
    id: "commercial",
    quote:
      "From single-line diagram redesigns to custom control panels, AVIGENT delivers total engineering precision. Clean documentation, punctual engineers, and zero headaches.",
    author: "Deepa S. Pillai",
    role: "General Manager",
    company: "Grand Horizon Estates",
    avatar: "/images/testimonials/avatar-4.jpg",
    rating: 5,
    badge: "Engineering",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
  },
];

export function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-title"
      className="relative overflow-hidden bg-white py-24 text-navy-900 md:py-32"
    >
      <div className="bg-grid-light pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="container-x relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Column 1: Editorial Heading & Trust Proof (Left, 4 cols) */}
          <div className="flex flex-col lg:col-span-4">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-navy-900/10 bg-mist-50 px-3.5 py-1 text-xs font-medium text-steel-600">
                <span className="h-2 w-2 rounded-full bg-volt-500 animate-pulse" aria-hidden="true" />
                <span>Client Validation</span>
              </div>

              <h2
                id="testimonials-title"
                className="mt-5 text-3xl font-semibold leading-[1.1] text-navy-950 sm:text-4xl md:text-5xl"
              >
                Trusted by Over{" "}
                <span className="text-electric-600">120+ Industrial</span> & Commercial Leaders
              </h2>

              <p className="mt-6 text-base leading-relaxed text-steel-600 sm:text-lg">
                From manufacturing plants and IT campuses to healthcare institutions, AVIGENT delivers verified
                safety compliance, zero-downtime electrical reliability, and high-efficiency solar EPC across Kerala.
              </p>

              {/* Rating Proof Box */}
              <div className="mt-8 flex items-center gap-4 rounded-2xl border border-navy-900/10 bg-mist-50/70 p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-electric-500/10 text-electric-600">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-display text-xl font-bold text-navy-950">4.9 / 5.0</span>
                    <div className="flex items-center text-amber-500" aria-label="5 out of 5 stars">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-500" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-steel-500">Based on verified audits & EPC handovers</p>
                </div>
              </div>

              {/* CTA Link */}
              <div className="mt-8">
                <Link
                  href="/contact#enquiry"
                  className="group inline-flex items-center gap-2 font-medium text-electric-600 transition-colors hover:text-navy-950"
                >
                  <span>Request a facility assessment</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Column 2: Featured Portrait Card (Center, 4 cols) */}
          <div className="relative lg:col-span-4">
            <Reveal delay={0.1}>
              <div className="group relative h-[480px] w-full overflow-hidden rounded-3xl bg-navy-900 shadow-xl ring-1 ring-navy-900/10 sm:h-[540px] lg:h-[580px]">
                <Image
                  src="/images/testimonials/featured.jpg"
                  alt="Rajesh K. Menon, Operations Director on site at Cochin Industrial Cluster"
                  fill
                  priority
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                />

                {/* Dark Gradient Overlay for typography legibility */}
                <div
                  className="absolute inset-0 bg-linear-to-t from-navy-950/95 via-navy-950/45 to-transparent"
                  aria-hidden="true"
                />

                {/* Floating Partner Chip */}
                <div className="absolute left-6 top-6">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3.5 py-1 font-mono text-[0.65rem] font-medium uppercase tracking-wider text-white backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-volt-400" />
                    Verified Client
                  </span>
                </div>

                {/* Bottom Quote & Attribution */}
                <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                  <blockquote className="font-display text-lg font-medium leading-snug text-white sm:text-xl">
                    &ldquo;AVIGENT turned our renewable transition into a seamless, zero-downtime success. Their engineering
                    rigor is second to none.&rdquo;
                  </blockquote>

                  <div className="mt-4 flex items-center gap-1 text-amber-400" aria-label="5 out of 5 stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400" />
                    ))}
                  </div>

                  <div className="mt-4 border-t border-white/15 pt-4">
                    <p className="font-semibold text-white">Rajesh K. Menon</p>
                    <p className="text-xs text-steel-300">Operations Director · Cochin Industrial Cluster</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Column 3: Scrolling Cards Stream (Right, 4 cols) */}
          <div className="relative lg:col-span-4">
            <div className="relative h-[480px] overflow-hidden rounded-3xl [mask-image:linear-gradient(to_bottom,transparent,black_6%,black_94%,transparent)] sm:h-[540px] lg:h-[580px]">
              {/* Vertical Animated Marquee Track (scrolling top to bottom) */}
              <div className="flex flex-col gap-4 animate-marquee-vertical-down hover:[animation-play-state:paused]">
                {/* Duplicated list to ensure continuous infinite loop */}
                {[...testimonials, ...testimonials, ...testimonials].map((item, idx) => (
                  <article
                    key={`${item.id}-${idx}`}
                    className="group flex flex-col justify-between rounded-2xl border border-navy-900/10 bg-white p-6 shadow-xs transition-all duration-300 hover:border-electric-400/50 hover:shadow-md"
                  >
                    <div>
                      {/* Quote Text */}
                      <p className="text-sm font-medium leading-relaxed text-navy-900 sm:text-[0.925rem]">
                        &ldquo;{item.quote}&rdquo;
                      </p>

                      {/* Rating Stars */}
                      <div className="mt-3.5 flex items-center text-amber-500" aria-label={`${item.rating} out of 5 stars`}>
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-amber-500" />
                        ))}
                      </div>
                    </div>

                    {/* Author Row with Brand / Sector Badge on Right */}
                    <div className="mt-5 flex items-center justify-between border-t border-navy-900/5 pt-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1 ring-navy-900/10">
                          <Image
                            src={item.avatar}
                            alt={item.author}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-navy-950">{item.author}</p>
                          <p className="text-xs text-steel-500">
                            {item.role} · {item.company}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`rounded-full border px-2.5 py-0.5 font-mono text-[0.6rem] font-medium uppercase tracking-wider ${item.badgeColor}`}
                      >
                        {item.badge}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
