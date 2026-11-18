"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { HTMLMotionProps } from "motion/react";

import { cn } from "@/lib/cn";

type RevealProps = Omit<
  HTMLMotionProps<"div">,
  | "children"
  | "initial"
  | "animate"
  | "exit"
  | "variants"
  | "transition"
  | "whileInView"
  | "viewport"
> & {
  children: ReactNode;
};

const revealTransition = {
  duration: 0.36,
  ease: "easeOut" as const,
};

/**
 * Fades content in and lifts it by 12px the first time it enters view.
 *
 * Reduced-motion users receive the same content immediately,
 * without entrance transforms or opacity transitions.
 *
 * Motion's HTMLMotionProps avoids conflicts between native DOM
 * event handlers and Motion-specific event handler types.
 */
export function Reveal({ children, className, ...props }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  // Keep the content visible without entrance animation when requested.
  if (prefersReducedMotion) {
    return (
      <motion.div className={cn(className)} {...props}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={revealTransition}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
