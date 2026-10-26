"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Icon3D } from "@/components/ui/Icon3D";
import { Stagger, StaggerItem } from "@/components/motion";
import { services } from "@/lib/site";

/**
 * Image-led services showcase: hovering/focusing a row swaps the large image
 * (desktop). On mobile each row carries its own image.
 */
export function ServicesShowcase() {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
      <Stagger as="ol" className="border-t border-white/10">
        {services.map((s, i) => (
          <StaggerItem as="li" key={s.slug} className="border-b border-white/10">
            <Link
              href={`/services/${s.slug}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group relative block py-7 outline-offset-0 md:py-9"
            >
              <span
                className={`absolute inset-y-0 left-0 w-px bg-linear-to-b from-electric-400 to-volt-400 transition-transform duration-500 origin-top ${
                  active === i ? "scale-y-100" : "scale-y-0"
                }`}
                aria-hidden="true"
              />
              <div className="flex items-start gap-5 pl-0 transition-[padding] duration-500 lg:group-hover:pl-6 lg:group-focus-visible:pl-6">
                <span className="mt-2 font-mono text-xs text-electric-400">{s.index}</span>
                <div className="flex-1">
                  <h3
                    className={`font-display text-2xl font-semibold transition-colors md:text-4xl ${
                      active === i ? "text-white" : "text-steel-400 lg:text-steel-400"
                    } group-hover:text-white`}
                  >
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-lg text-steel-300">{s.short}</p>
                  {/* Mobile image */}
                  <div className="relative mt-6 aspect-[16/10] overflow-hidden lg:hidden">
                    <Image src={s.image} alt={s.imageAlt} fill sizes="100vw" quality={70} className="object-cover" />
                  </div>
                </div>
                <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center border border-white/15 text-white transition-all duration-500 group-hover:rotate-45 group-hover:border-volt-400 group-hover:bg-volt-400 group-hover:text-ink">
                  <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>

      {/* Desktop sticky preview */}
      <div className="hidden lg:block">
        <div className="ticks sticky top-28 aspect-[4/5] overflow-hidden border border-white/10 bg-navy-900">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={current.slug}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image src={current.image} alt={current.imageAlt} fill sizes="45vw" quality={70} className="object-cover" />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/20 to-transparent" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 p-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.slug}
                initial={{ opacity: 0, y: 16, rotate: -8 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15 backdrop-blur-md"
              >
                <Icon3D name={current.icon3d} tone="brand" size={64} className="animate-float" />
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.p
                key={current.slug}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="mt-5 max-w-md leading-relaxed text-steel-300"
              >
                {current.summary}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
