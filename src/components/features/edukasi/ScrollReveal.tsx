"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

type HeroRole = "title" | "subtitle" | "cta" | "window";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  mode?: "scroll" | "mount";
  heroRole?: HeroRole;
  distance?: number;
}

const HERO_PRESETS: Record<
  HeroRole,
  {
    initial: { opacity: number; y: number; filter?: string; scale?: number };
    animate: { opacity: number; y: number; filter?: string; scale?: number };
    duration: number;
    delay: number;
  }
> = {
  title: {
    initial: { opacity: 0, y: 34, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    duration: 1.05,
    delay: 0,
  },
  subtitle: {
    initial: { opacity: 0, y: 30, filter: "blur(5px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    duration: 1.05,
    delay: 0.16,
  },
  cta: {
    initial: { opacity: 0, y: 26, filter: "blur(4px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    duration: 1.05,
    delay: 0.32,
  },
  window: {
    initial: { opacity: 0, y: 48, scale: 0.985 },
    animate: { opacity: 1, y: 0, scale: 1 },
    duration: 1.2,
    delay: 0.42,
  },
};

/**
 * 1:1 mirror of Beranda's Framer Motion focus-blur & slide animation signature
 * (`EASE_OUT_EXPO`, blur(5..6px) -> blur(0px), and `viewport={{ once: false }}`).
 */
export default function ScrollReveal({
  children,
  className,
  delay = 0,
  mode = "scroll",
  heroRole,
  distance = 34,
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  if (mode === "mount" || heroRole) {
    const preset = heroRole ? HERO_PRESETS[heroRole] : HERO_PRESETS.title;
    return (
      <motion.div
        initial={preset.initial}
        animate={preset.animate}
        transition={{
          duration: preset.duration,
          delay: heroRole ? preset.delay : delay,
          ease: EASE_OUT_EXPO,
        }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: distance, filter: "blur(5px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.16 }}
      transition={{ duration: 1.0, delay, ease: EASE_OUT_EXPO }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
