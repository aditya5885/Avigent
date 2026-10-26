"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import clsx from "clsx";
import { projectCategories, projects, type ProjectCategory } from "@/lib/site";

type Filter = "All" | ProjectCategory;

export function ProjectGallery({ limit, idPrefix = "gallery" }: { limit?: number; idPrefix?: string }) {
  const [filter, setFilter] = useState<Filter>("All");
  const filtered = projects.filter((p) => filter === "All" || p.category === filter);
  const shown = limit ? filtered.slice(0, limit) : filtered;
  const filters: Filter[] = ["All", ...projectCategories];

  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const count = f === "All" ? projects.length : projects.filter((p) => p.category === f).length;
          const activeF = filter === f;
          return (
            <button
              key={f}
              id={`${idPrefix}-filter-${f.toLowerCase().replace(/\s+/g, "-")}`}
              type="button"
              aria-pressed={activeF}
              onClick={() => setFilter(f)}
              className={clsx(
                "relative px-4 py-2.5 text-sm font-medium transition-colors duration-300",
                activeF ? "text-ink" : "border border-white/15 text-steel-300 hover:border-white/40 hover:text-white",
              )}
            >
              {activeF && (
                <motion.span
                  layoutId={`${idPrefix}-filter-pill`}
                  className="absolute inset-0 bg-volt-400"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">
                {f} <span className="ml-1 font-mono text-[0.7rem] opacity-60">{count}</span>
              </span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {shown.length} {filter === "All" ? "" : filter} projects
      </p>

      <motion.ul layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((p, i) => (
            <motion.li
              layout
              key={p.id}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 }}
              className={clsx(i === 0 && !limit && filter === "All" ? "sm:col-span-2 sm:row-span-2" : "")}
            >
              <article
                tabIndex={0}
                aria-label={`${p.title} — ${p.category}`}
                className="group relative block h-full min-h-[22rem] overflow-hidden bg-navy-900"
              >
                <Image
                  src={p.image}
                  alt={p.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  quality={70}
                  className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-110 group-focus-visible:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/40 to-transparent transition-opacity duration-500" />
                <div className="absolute left-5 top-5 flex gap-2">
                  <span className="glass px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-white">
                    {p.category}
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-volt-400">{p.sector}</p>
                  <h3 className="mt-2 text-xl font-semibold text-white md:text-2xl">{p.title}</h3>
                  <div className="grid grid-rows-[0fr] transition-all duration-500 group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]">
                    <p className="overflow-hidden text-sm leading-relaxed text-steel-300">
                      <span className="block pt-3">{p.description}</span>
                    </p>
                  </div>
                </div>
              </article>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
