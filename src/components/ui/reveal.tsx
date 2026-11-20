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
 * Fades content in and lifts it by 24px the first time it enters view.
 *
 * Reduced-motion users receive the content immediately, without
 * entrance transforms or opacity transitions.
 *
 * Motion's HTMLMotionProps avoids conflicts between native DOM
 * event handlers and Motion-specific event handler types.
 */
export function Reveal({ children, className, ...props }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  // Disable entrance animation until the user's motion preference is known.
  const shouldReduceMotion = prefersReducedMotion !== false;

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={
        shouldReduceMotion
          ? undefined
          : {
              once: true,
              amount: 0.15,
            }
      }
      transition={{
        ...revealTransition,
        duration: shouldReduceMotion ? 0 : revealTransition.duration,
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
