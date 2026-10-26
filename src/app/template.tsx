"use client";

import { motion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

// Module-level flag: the very first render (SSR + hydration) must not start
// hidden, otherwise content would be invisible until JS loads.
let hasNavigated = false;

export default function Template({ children }: { children: ReactNode }) {
  const [animateIn] = useState(() => hasNavigated);

  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <motion.div
      initial={animateIn ? { opacity: 0, y: 14 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
