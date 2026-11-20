"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { HTMLMotionProps } from "motion/react";

import { cn } from "@/lib/cn";

type StaggerProps = Omit<
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

type StaggerItemProps = Omit<
  HTMLMotionProps<"div">,
  "children" | "initial" | "animate" | "exit" | "variants" | "transition"
> & {
  children: ReactNode;
};

/**
 * Coordinates the entrance of a group of elements.
 *
 * Children enter one after another with an 80ms stagger.
 * The group animates only the first time it enters the viewport.
 */
export function Stagger({ children, className, ...props }: StaggerProps) {
  const prefersReducedMotion = useReducedMotion();
  const shouldReduceMotion = prefersReducedMotion !== false;

  return (
    <motion.div
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: shouldReduceMotion ? 0 : 0.08,
          },
        },
      }}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      animate={shouldReduceMotion ? "visible" : undefined}
      viewport={
        shouldReduceMotion
          ? undefined
          : {
              once: true,
              amount: 0.15,
            }
      }
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * An individual item controlled by its parent Stagger component.
 *
 * Each item rises 24px while fading in. Reduced-motion users
 * receive the final state immediately.
 */
export function StaggerItem({
  children,
  className,
  ...props
}: StaggerItemProps) {
  const prefersReducedMotion = useReducedMotion();
  const shouldReduceMotion = prefersReducedMotion !== false;

  return (
    <motion.div
      variants={{
        hidden: shouldReduceMotion
          ? {}
          : {
              opacity: 0,
              y: 24,
            },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: shouldReduceMotion ? 0 : 0.36,
            ease: "easeOut",
          },
        },
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
