import Image from "next/image";
import { Check } from "lucide-react";
import { Parallax, Reveal } from "@/components/motion";
import { Button } from "@/components/ui/Button";
import { company } from "@/lib/site";

export function AboutIntro() {
  return (
    <section aria-labelledby="about-title" className="relative overflow-hidden bg-mist-50 py-24 text-navy-900 md:py-36">
      <div className="bg-grid-light pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-x relative grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <Reveal className="relative" y={40}>
          <Parallax className="aspect-[4/5] w-full sm:aspect-[4/3] lg:aspect-[4/5]" strength={6}>
            <Image
              src="/images/engineering-team.jpg"
              alt="Team of electrical engineers in hard hats walking through an industrial electrical facility"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              quality={70}
              className="object-cover"
            />
          </Parallax>
          <div className="absolute -bottom-8 left-6 right-6 bg-navy-900 p-6 text-white shadow-2xl shadow-navy-900/30 sm:left-auto sm:right-[-1.5rem] sm:w-72">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-volt-400">Est. {company.foundedYear}</p>
            <p className="mt-3 font-display text-xl font-semibold leading-snug">
              Founded by {company.founder}
            </p>
            <p className="mt-2 text-sm text-steel-300">Headquartered in Kakkanad, Kochi</p>
          </div>
          <div
            className="absolute -left-4 -top-4 h-24 w-24 border-l-2 border-t-2 border-electric-500"
            aria-hidden="true"
          />
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow text-electric-600">About AVIGENT</p>
            <h2 id="about-title" className="mt-5 text-4xl font-semibold leading-[1.05] md:text-6xl">
              Powering Progress <span className="text-electric-600">Since 2012</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-lg leading-relaxed text-steel-600">
              Founded by {company.founder} in 2012, AVIGENT Technologies helps organisations with electrical
              maintenance, safety audits, engineering advice and renewable energy projects. Our goal is to make sure
              your systems work well and are safe.
            </p>
            <p className="mt-5 leading-relaxed text-steel-600">
              We use the latest technology, and our team is dedicated to giving you the best service — making your
              environment safer and more efficient, and leading the way to a brighter, greener future.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {["Electrical maintenance", "Safety audits", "Engineering advice", "Renewable energy projects"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-3 font-medium">
                    <span className="flex h-6 w-6 items-center justify-center bg-volt-400/20 text-volt-600">
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ),
              )}
            </ul>
            <div className="mt-12">
              <Button href="/about" variant="outline-dark">
                More about AVIGENT
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
