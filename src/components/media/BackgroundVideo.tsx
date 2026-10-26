"use client";

import Image from "next/image";
import clsx from "clsx";
import { Pause, Play } from "lucide-react";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(cb: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", cb);
  return () => mql.removeEventListener("change", cb);
}

/** Hydration-safe reduced-motion preference (false on the server). */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}

/**
 * Playback state for a decorative, muted background video:
 * - never plays when the user prefers reduced motion (poster image stays)
 * - pauses while off-screen to save battery/CPU
 * - `lazy` defers loading the file until the container is near the viewport
 * - user can pause/resume (WCAG 2.2.2)
 */
export function useBackgroundVideo({ lazy = false }: { lazy?: boolean } = {}) {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null);
  const reduce = usePrefersReducedMotion();
  const [near, setNear] = useState(!lazy);
  const [visible, setVisible] = useState(true);
  const [userPaused, setUserPaused] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!container) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setNear(true);
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(container);
    return () => io.disconnect();
  }, [container]);

  const shouldPlay = near && visible && !reduce && !userPaused;

  // React can skip `muted` during hydration; browsers only autoplay muted media.
  const attachVideo = useCallback((el: HTMLVideoElement | null) => {
    if (el) el.muted = true;
    setVideoEl(el);
  }, []);

  useEffect(() => {
    if (!videoEl) return;
    if (shouldPlay) {
      videoEl.play().catch(() => {
        /* autoplay blocked — poster remains visible */
      });
    } else {
      videoEl.pause();
    }
  }, [shouldPlay, videoEl]);

  return {
    attachContainer: setContainer,
    attachVideo,
    near,
    reduce,
    playing,
    userPaused,
    onPlaying: () => setPlaying(true),
    toggle: () => setUserPaused((p) => !p),
  };
}

export type BackgroundVideoState = ReturnType<typeof useBackgroundVideo>;

export function VideoLayer({
  state,
  sources,
  poster,
  posterAlt = "",
  priority = false,
  className,
}: {
  state: BackgroundVideoState;
  /** Ordered list; first matching `media` wins. */
  sources: { src: string; media?: string }[];
  poster: string;
  posterAlt?: string;
  priority?: boolean;
  className?: string;
}) {
  const { attachContainer, attachVideo, near, reduce, playing, onPlaying } = state;
  return (
    <div ref={attachContainer} className={clsx("absolute inset-0 overflow-hidden", className)}>
      <Image
        src={poster}
        alt={posterAlt}
        fill
        sizes="100vw"
        quality={priority ? 80 : 70}
        preload={priority}
        fetchPriority={priority ? "high" : undefined}
        className="object-cover"
      />
      {near && !reduce && (
        <video
          ref={attachVideo}
          muted
          loop
          playsInline
          disablePictureInPicture
          preload={priority ? "auto" : "metadata"}
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={onPlaying}
          className={clsx(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000",
            playing ? "opacity-100" : "opacity-0",
          )}
        >
          {sources.map((s) => (
            <source key={s.src} src={s.src} type="video/mp4" media={s.media} />
          ))}
        </video>
      )}
    </div>
  );
}

export function VideoToggle({ state, className }: { state: BackgroundVideoState; className?: string }) {
  if (state.reduce) return null;
  const Icon = state.userPaused ? Play : Pause;
  return (
    <button
      type="button"
      onClick={state.toggle}
      aria-label={state.userPaused ? "Play background video" : "Pause background video"}
      className={clsx(
        "flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/25 backdrop-blur-md transition-colors hover:bg-white/20",
        className,
      )}
    >
      <Icon className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true" />
    </button>
  );
}
