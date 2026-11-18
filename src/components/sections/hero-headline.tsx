"use client";

import { motion, useReducedMotion } from "motion/react";

import { Squiggle } from "@/components/ui";

export function HeroHeadline() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <h1 className="mt-7 font-headline text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
      <span className="block">Think out loud.</span>

      <span className="mt-1 block">
        Then{" "}
        <Squiggle>
          <span className="text-coral-text">go deep.</span>
        </Squiggle>
        {prefersReducedMotion ? (
          <span aria-hidden="true" className="ml-1 inline-block text-ink">
            |
          </span>
        ) : (
          <motion.span
            aria-hidden="true"
            className="ml-1 inline-block text-ink"
            animate={{ opacity: [1, 0] }}
            transition={{
              duration: 0.4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeOut",
            }}
          >
            |
          </motion.span>
        )}
      </span>
    </h1>
  );
}
