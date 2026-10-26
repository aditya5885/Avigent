"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { SplitButton } from "@/components/ui/SplitButton";
import { WhatsAppIcon } from "@/components/ui/Icon";
import { Icon3D, type Icon3DName } from "@/components/ui/Icon3D";
import { useBackgroundVideo, VideoLayer, VideoToggle } from "@/components/media/BackgroundVideo";
import { company } from "@/lib/site";

const trust: { icon: Icon3DName; label: string }[] = [
  { icon: "medal", label: "Serving industries since 2012" },
  { icon: "map-pin", label: "Based in Kakkanad, Kochi" },
  { icon: "tool", label: "End-to-end engineering support" },
];

/**
 * Inset, rounded hero card with a full-bleed background video.
 * Headline top-left · supporting copy bottom-left · CTA bottom-right.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const video = useBackgroundVideo();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section ref={ref} aria-labelledby="hero-title" className="p-2 md:p-3">
      <div className="relative isolate flex h-[calc(100svh-1rem)] min-h-[640px] flex-col overflow-hidden rounded-2xl bg-ink md:h-[calc(100svh-1.5rem)] md:min-h-[680px] md:rounded-[1.25rem]">
        {/* Background video */}
        <motion.div className="absolute inset-0 -z-20" style={reduce ? undefined : { scale: mediaScale }}>
          <VideoLayer
            state={video}
            priority
            poster="/images/hero-video-poster.jpg"
            posterAlt="Aerial view of a large solar power plant at sunset"
            sources={[
              { src: "/videos/hero-solar-640.mp4", media: "(max-width: 767px)" },
              { src: "/videos/hero-solar.mp4" },
            ]}
          />
        </motion.div>

        {/* Readability layers */}
        <div className="absolute inset-0 -z-10 bg-linear-to-br from-ink/80 via-ink/35 to-ink/5" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-3/5 bg-linear-to-t from-ink/90 via-ink/40 to-transparent" aria-hidden="true" />
        <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-linear-to-b from-ink/50 to-transparent" aria-hidden="true" />

        <motion.div
          className="flex flex-1 flex-col justify-between px-5 pb-6 pt-28 md:px-9 md:pb-9 md:pt-36 xl:px-11"
          style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        >
          <h1
            id="hero-title"
            className="max-w-6xl text-[2.2rem] font-medium leading-[1.02] tracking-[-0.04em] text-white sm:text-5xl md:text-7xl lg:text-[5.4rem] xl:text-[6.6rem]"
          >
            {["Reliable electrical solutions.", "Safer systems.", "Cleaner energy."].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <span
                  className={`block animate-line ${i === 2 ? "text-volt-300" : ""}`}
                  style={{ animationDelay: `${150 + i * 130}ms` }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-xl animate-rise [animation-delay:600ms]">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-volt-300">
                Electrical · Safety · Renewable energy
              </p>
              <p className="mt-3 text-base leading-relaxed text-white/85 md:text-lg">
                From routine maintenance and safety audits to complete solar EPC, {company.name} keeps your electrical
                systems safe, efficient, and ready for tomorrow.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {trust.map((t) => (
                  <li
                    key={t.label}
                    className="flex items-center gap-2 rounded-lg bg-white/10 py-1 pl-1 pr-3 text-xs font-medium text-white ring-1 ring-white/15 backdrop-blur-md"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white/10">
                      <Icon3D name={t.icon} tone="white" size={22} />
                    </span>
                    {t.label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex animate-rise flex-col items-start gap-4 [animation-delay:750ms] lg:items-end">
              <SplitButton href="/contact#enquiry" id="hero-quote-cta">
                Request a quote
              </SplitButton>
              <div className="flex items-center gap-4">
                <a
                  id="hero-whatsapp-cta"
                  href={company.whatsappWithText("Hello AVIGENT Technologies, I'd like to discuss a requirement.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp (opens in a new tab)"
                  className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-white/80 transition-colors hover:text-[#25D366]"
                >
                  <WhatsAppIcon className="h-4 w-4" /> Chat on WhatsApp
                </a>
                <VideoToggle state={video} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
