"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

import type { LucideIcon } from "lucide-react";
import { AtSign, Code2, GitBranch, Link2, LockKeyhole } from "lucide-react";

import { Container, Heading, Reveal, Section } from "@/components/ui";

import { site } from "@/content/site";

const pointIcons: Record<string, LucideIcon> = {
  github: GitBranch,
  lock: LockKeyhole,
  "at-sign": AtSign,
  "link-2": Link2,
};

const stageStyles = {
  violet: {
    dot: "bg-violet",
    status: "bg-violet/15 text-[#C7BEFF]",
  },
  amber: {
    dot: "bg-amber-400",
    status: "bg-amber-400/15 text-amber-200",
  },
  coral: {
    dot: "bg-coral",
    status: "bg-coral/15 text-coral",
  },
} as const;

export function Developers() {
  const content = site.developers;

  const pipelineRef = useRef<HTMLDivElement>(null);

  // Start the pipeline animation only when it enters the viewport.
  const pipelineInView = useInView(pipelineRef, {
    once: true,
    amount: 0.3,
  });

  const prefersReducedMotion = useReducedMotion();
  const shouldReduceMotion = prefersReducedMotion !== false;

  // Reduced-motion users see the completed publishing workflow immediately.
  const pipelineStarted = shouldReduceMotion || pipelineInView;

  const publishedDelay =
    Math.max(0, content.pipeline.stages.length - 1) * 0.35 + 0.35;

  return (
    <Section id="developers" background="ink">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Section introduction */}
          <Reveal className="lg:col-span-5">
            <div>
              <p className="font-mono text-[13px] tracking-[0.16em] text-violet">
                {content.eyebrow}
              </p>

              <Heading level={2} className="mt-4 text-surface">
                {content.heading}
              </Heading>

              <p className="mt-5 max-w-copy font-copy text-base leading-7 text-[#D8D4E4] sm:text-[17px]">
                {content.description}
              </p>
            </div>
          </Reveal>

          {/* Draft → Scheduled → Published pipeline */}
          <div className="lg:col-span-7">
            <div ref={pipelineRef} className="relative">
              {/* The timeline fills from Draft toward Published. */}
              <div
                aria-hidden="true"
                className="absolute left-[16%] right-[16%] top-[22px] hidden h-px overflow-hidden bg-white/20 sm:block"
              >
                <motion.div
                  initial={shouldReduceMotion ? false : { scaleX: 0 }}
                  animate={{
                    scaleX: pipelineStarted ? 1 : 0,
                  }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 1.05,
                    ease: "easeInOut",
                  }}
                  className="h-full origin-left bg-gradient-to-r from-violet via-amber-400 to-coral"
                />
              </div>

              <ol
                aria-label="Example publishing workflow"
                className="relative grid grid-cols-1 gap-4 sm:grid-cols-3"
              >
                {content.pipeline.stages.map((stage, index) => {
                  const style = stageStyles[stage.color];
                  const isPublished =
                    index === content.pipeline.stages.length - 1;

                  return (
                    <motion.li
                      key={stage.id}
                      initial={
                        shouldReduceMotion
                          ? false
                          : {
                              opacity: 0,
                              y: 12,
                            }
                      }
                      animate={
                        pipelineStarted
                          ? {
                              opacity: 1,
                              y: 0,
                            }
                          : {
                              opacity: 0,
                              y: 12,
                            }
                      }
                      transition={{
                        duration: shouldReduceMotion ? 0 : 0.35,
                        delay: shouldReduceMotion ? 0 : index * 0.35,
                        ease: "easeOut",
                      }}
                      className="relative rounded-panel border border-white/10 bg-[#231E4D] p-4 sm:min-h-[205px] sm:p-5"
                    >
                      <div className="relative z-10 flex items-center gap-2">
                        <motion.span
                          aria-hidden="true"
                          animate={{
                            scale: pipelineStarted ? 1 : 0.75,
                          }}
                          transition={{
                            duration: shouldReduceMotion ? 0 : 0.3,
                            delay: shouldReduceMotion ? 0 : index * 0.35,
                            ease: "easeOut",
                          }}
                          className={`size-2.5 shrink-0 rounded-full ring-4 ring-[#231E4D] ${style.dot}`}
                        />

                        <span className="font-mono text-xs tracking-wide text-surface/90">
                          {stage.label}
                        </span>
                      </div>

                      <h3 className="mt-6 font-headline text-lg font-semibold leading-snug text-surface">
                        {content.pipeline.title}
                      </h3>

                      <p className="mt-3 font-copy text-sm leading-6 text-[#D8D4E4]">
                        {stage.description}
                      </p>

                      <motion.span
                        initial={
                          shouldReduceMotion
                            ? false
                            : {
                                opacity: 0,
                                scale: 0.85,
                              }
                        }
                        animate={{
                          opacity: pipelineStarted ? 1 : 0,
                          scale: pipelineStarted ? 1 : 0.85,
                        }}
                        transition={{
                          duration: shouldReduceMotion ? 0 : 0.3,
                          delay: shouldReduceMotion
                            ? 0
                            : isPublished
                              ? publishedDelay
                              : index * 0.35 + 0.2,
                          ease: "easeOut",
                        }}
                        className={`mt-5 inline-flex rounded-pill px-3 py-1 font-mono text-[11px] ${style.status}`}
                      >
                        {stage.statusText}
                      </motion.span>
                    </motion.li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>

        {/* Supporting developer-focused capabilities */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {content.points.map((point) => {
            const PointIcon = pointIcons[point.icon] ?? Code2;

            return (
              <article
                key={point.id}
                className={[
                  "group rounded-panel border border-white/10",
                  "bg-white/[0.035] p-5",
                  "motion-safe:transition-transform motion-safe:duration-200",
                  "motion-safe:ease-out motion-safe:hover:-translate-y-0.5",
                ].join(" ")}
              >
                <div className="grid size-10 place-items-center rounded-full bg-white/10 text-violet transition-colors duration-200 group-hover:bg-coral group-hover:text-ink">
                  <PointIcon aria-hidden="true" className="size-5" />
                </div>

                <h3 className="mt-5 font-copy text-[17px] font-semibold text-surface">
                  {point.title}
                </h3>

                <p className="mt-2 font-copy text-[15px] leading-6 text-[#D8D4E4]">
                  {point.description}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
