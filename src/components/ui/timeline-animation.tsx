"use client";

import type { ComponentType, RefObject } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { HTMLMotionProps, Variants } from "framer-motion";

type TimelineContentProps = Pick<HTMLMotionProps<"a">, "children" | "className" | "href" | "rel" | "target"> & {
  as: "a" | "button" | "div" | "figure" | "span";
  animationNum: number;
  timelineRef: RefObject<HTMLDivElement>;
  customVariants: Variants;
};

export function TimelineContent({
  as,
  animationNum,
  timelineRef,
  customVariants,
  ...props
}: TimelineContentProps) {
  const inView = useInView(timelineRef, { once: true });
  const reducedMotion = useReducedMotion();
  const Tag = motion[as] as ComponentType<HTMLMotionProps<"a">>;

  return (
    <Tag
      {...props}
      custom={reducedMotion ? 0 : animationNum}
      variants={customVariants}
      initial={reducedMotion ? false : "hidden"}
      animate={inView || reducedMotion ? "visible" : "hidden"}
      transition={reducedMotion ? { duration: 0 } : undefined}
    />
  );
}
