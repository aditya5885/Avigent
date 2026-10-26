"use client";

import { motion, useInView, useReducedMotion, useScroll, useTransform, animate, MotionConfig } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import clsx from "clsx";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Respect the OS "reduce motion" preference for every motion component. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  as?: "div" | "section" | "li" | "article" | "span" | "header";
  amount?: number;
};

/** Scroll-triggered fade + rise. */
export function Reveal({ children, className, delay = 0, y = 28, x = 0, as = "div", amount = 0.2 }: RevealProps) {
  const Cmp = motion[as];
  return (
    <Cmp
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </Cmp>
  );
}

/** Parent for staggered children (use with <StaggerItem>). */
export function Stagger({
  children,
  className,
  stagger = 0.09,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: "div" | "ul" | "ol";
}) {
  const Cmp = motion[as];
  return (
    <Cmp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </Cmp>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const Cmp = motion[as];
  return (
    <Cmp
      className={className}
      variants={{
        hidden: { opacity: 0, y: 32 },
        show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
      }}
    >
      {children}
    </Cmp>
  );
}

/** Subtle vertical parallax for imagery. Wrap a `fill` <Image>. */
export function Parallax({
  children,
  className,
  strength = 8,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);
  return (
    <div ref={ref} className={clsx("relative overflow-hidden", className)}>
      <motion.div className="absolute inset-[-10%_0]" style={reduce ? undefined : { y }}>
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Animated counter — use ONLY for verified figures.
 * `sinceYear` computes years elapsed on the client (avoids prerendering a
 * time-dependent value).
 */
export function Counter({
  value,
  sinceYear,
  suffix = "",
  className,
  duration = 1.8,
  from = 0,
}: {
  value?: number;
  sinceYear?: number;
  suffix?: string;
  className?: string;
  duration?: number;
  from?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!inView || !el) return;
    const target = sinceYear ? new Date().getFullYear() - sinceYear : (value ?? 0);
    if (reduce) {
      el.textContent = `${target}${suffix}`;
      return;
    }
    const controls = animate(from, target, {
      duration,
      ease: EASE,
      onUpdate: (v) => {
        el.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, sinceYear, reduce, duration, from, suffix]);

  // Server/first render shows the final static value (or a dash for computed values)
  return (
    <span ref={ref} className={clsx("tabular-nums", className)}>
      {value !== undefined ? `${value}${suffix}` : "—"}
    </span>
  );
}
