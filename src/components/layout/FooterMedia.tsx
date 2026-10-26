"use client";

import { ArrowUp } from "lucide-react";
import { useBackgroundVideo, VideoLayer, VideoToggle, usePrefersReducedMotion } from "@/components/media/BackgroundVideo";

/** Lazy-loaded background video + overlays for the footer card. */
export function FooterMedia() {
  const video = useBackgroundVideo({ lazy: true });
  return (
    <>
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <VideoLayer
          state={video}
          poster="/images/footer-video-poster.jpg"
          sources={[{ src: "/videos/footer-panels.mp4" }]}
          className="scale-110"
        />
        <div className="absolute inset-0 bg-navy-950/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-linear-to-b from-navy-950/80 via-navy-950/30 to-navy-950/70" />
      </div>
      <VideoToggle state={video} className="absolute bottom-4 right-4 z-10 md:bottom-5 md:right-9 xl:right-11" />
    </>
  );
}

export function BackToTop() {
  const reduce = usePrefersReducedMotion();
  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}
      className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/25 backdrop-blur-md transition-colors hover:bg-white hover:text-navy-950"
    >
      <ArrowUp className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5" aria-hidden="true" />
    </button>
  );
}
