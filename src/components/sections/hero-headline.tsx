"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

import { Squiggle } from "@/components/ui";
import { site } from "@/content/site";

export function HeroHeadline() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  // The cursor blinks only while the headline is visible.
  const isInView = useInView(headingRef, { amount: 0.25 });

  const prefersReducedMotion = useReducedMotion();

  // Do not animate until the motion preference is known.
  const shouldReduceMotion = prefersReducedMotion !== false;

  return (
    <h1
      ref={headingRef}
      className="mt-7 font-headline text-[40px] font-semibold leading-[44px] tracking-[-0.04em] text-ink md:text-[64px] md:leading-[68px]"
    >
      <span className="block">{site.hero.headline.firstLine}</span>

      <span className="mt-1 block">
        {site.hero.headline.secondLinePrefix}
        <Squiggle>
          <span className="text-coral-text">
            {site.hero.headline.highlightedPhrase}
          </span>
        </Squiggle>

        <motion.span
          aria-hidden="true"
          className="ml-1 inline-block text-ink"
          animate={
            !shouldReduceMotion && isInView
              ? { opacity: [1, 0] }
              : { opacity: 1 }
          }
          transition={{
            duration: 0.4,
            repeat: !shouldReduceMotion && isInView ? Infinity : 0,
            repeatType: "reverse",
            ease: "easeOut",
          }}
        >
          |
        </motion.span>
      </span>
    </h1>
  );
}
