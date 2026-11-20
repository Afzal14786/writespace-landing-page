"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import Link from "next/link";

import {
  Container,
  Heading,
  Reveal,
  Section,
  Stagger,
  StaggerItem,
} from "@/components/ui";

import { site } from "@/content/site";

export function FAQ() {
  // Start with the first answer expanded, as specified in the design guide.
  const [openId, setOpenId] = useState<string | null>(
    site.faq.questions[0]?.id ?? null,
  );

  const prefersReducedMotion = useReducedMotion();

  // Keep animations disabled until the motion preference is known.
  const shouldReduceMotion = prefersReducedMotion !== false;

  const transition = {
    duration: shouldReduceMotion ? 0 : 0.25,
    ease: "easeInOut" as const,
  };

  function toggleQuestion(questionId: string) {
    setOpenId((currentId) => (currentId === questionId ? null : questionId));
  }

  return (
    <Section id="faq" background="paper">
      <Container>
        <div className="mx-auto max-w-[760px]">
          {/* Centered section introduction enters when it reaches the viewport. */}
          <Reveal>
            <div className="text-center">
              <Heading level={2}>{site.faq.heading}</Heading>

              <p className="mt-4 font-copy text-base leading-7 text-body sm:text-[17px]">
                {site.faq.description}
              </p>
            </div>
          </Reveal>

          {/* FAQ rows enter sequentially with an 80ms stagger. */}
          <Stagger className="mt-10 border-t border-line">
            {site.faq.questions.map((question) => {
              const isOpen = openId === question.id;

              const triggerId = `faq-trigger-${question.id}`;
              const panelId = `faq-panel-${question.id}`;

              return (
                <StaggerItem key={question.id} className="border-b border-line">
                  <h3>
                    <button
                      id={triggerId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleQuestion(question.id)}
                      className={[
                        "flex min-h-[76px] w-full items-center justify-between gap-5 py-5",
                        "text-left font-copy text-[16px] font-semibold leading-7 text-ink",
                        "transition-colors hover:text-coral-text",
                        "focus-visible:outline-3 focus-visible:outline-offset-[-3px]",
                        "focus-visible:outline-violet sm:text-[18px]",
                      ].join(" ")}
                    >
                      <span>{question.question}</span>

                      <motion.span
                        aria-hidden="true"
                        animate={{
                          rotate: isOpen ? 45 : 0,
                        }}
                        transition={transition}
                        className="grid size-9 shrink-0 place-items-center rounded-full border border-line bg-surface text-violet"
                      >
                        <Plus size={18} strokeWidth={1.8} />
                      </motion.span>
                    </button>
                  </h3>

                  {/* Preserve the existing accordion expand/collapse animation. */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key={panelId}
                        id={panelId}
                        role="region"
                        aria-labelledby={triggerId}
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={transition}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[680px] pb-6 pr-10 font-copy text-base leading-7 text-body sm:text-[17px]">
                          {question.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </StaggerItem>
              );
            })}
          </Stagger>

          {/* Contact link below the accordion. */}
          <p className="mt-9 text-center font-copy text-sm text-muted sm:text-base">
            {site.faq.closingText}{" "}
            <Link
              href="#contact"
              className="font-semibold text-coral-text underline decoration-coral-text/40 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-violet"
            >
              {site.faq.contactLabel}
            </Link>
          </p>
        </div>
      </Container>
    </Section>
  );
}
