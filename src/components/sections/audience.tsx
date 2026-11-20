"use client";

import { useEffect, useId, useRef, useState } from "react";

import type { FocusEvent, KeyboardEvent } from "react";

import {
  animate,
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "motion/react";

import { BookOpen, Code2, GitBranch, Users } from "lucide-react";

import type { LucideIcon } from "lucide-react";

import { Container, Heading, Reveal, Section } from "@/components/ui";

import { AudienceScene } from "@/components/mocks/audience-scene";
import type { AudienceTab } from "@/content/site";
import { site } from "@/content/site";

const audienceIcons: Record<string, LucideIcon> = {
  code: Code2,
  "git-branch": GitBranch,
  "graduation-cap": BookOpen,
  users: Users,
};

type AudienceTabButtonProps = {
  tab: AudienceTab;
  index: number;
  active: boolean;
  tabId: string;
  panelId: string;
  onSelect: (index: number) => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>, index: number) => void;
  buttonRef: (element: HTMLButtonElement | null) => void;
};

function AudienceTabButton({
  tab,
  index,
  active,
  tabId,
  panelId,
  onSelect,
  onKeyDown,
  buttonRef,
}: AudienceTabButtonProps) {
  const Icon = audienceIcons[tab.icon] ?? Code2;

  return (
    <button
      ref={buttonRef}
      type="button"
      role="tab"
      id={tabId}
      aria-selected={active}
      aria-controls={panelId}
      tabIndex={active ? 0 : -1}
      onClick={() => onSelect(index)}
      onKeyDown={(event) => onKeyDown(event, index)}
      className={[
        "flex min-h-11 shrink-0 items-center gap-3 rounded-pill",
        "border px-4 py-2 text-left transition-[background-color,box-shadow,border-color]",
        "duration-200 focus-visible:outline-3",
        "focus-visible:outline-offset-2 focus-visible:outline-violet",
        "lg:min-h-[72px] lg:w-full lg:rounded-xl lg:rounded-l-none",
        "lg:border-y-0 lg:border-r-0 lg:border-l-4 lg:px-4 lg:py-3",
        active
          ? "border-coral bg-surface shadow-card lg:border-l-coral"
          : "border-transparent bg-transparent hover:bg-surface/60 lg:hover:bg-surface/50",
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className={[
          "grid size-8 shrink-0 place-items-center rounded-full",
          "transition-colors duration-200 lg:size-10",
          active ? "bg-peach text-coral-text" : "bg-surface text-muted",
        ].join(" ")}
      >
        <Icon size={18} strokeWidth={1.8} />
      </span>

      <span className="min-w-0">
        <span
          className={[
            "block whitespace-nowrap font-copy text-sm font-semibold",
            active ? "text-ink" : "text-body",
          ].join(" ")}
        >
          {tab.label}
        </span>

        <span className="mt-0.5 hidden truncate font-copy text-xs text-muted lg:block">
          {tab.hint}
        </span>
      </span>
    </button>
  );
}

type TopicMarqueeProps = {
  topics: readonly string[];
  label: string;
  prefersReducedMotion: boolean;
};

type MarqueeAnimationControls = {
  pause: () => void;
  play: () => void;
  stop: () => void;
};

/**
 * Controls one row of the topic marquee.
 *
 * Animation playback is paused rather than reset when the marquee
 * leaves the viewport or the visitor hovers over it. This preserves
 * the current position when the animation resumes.
 */
function MarqueeTrack({
  row,
  rowIndex,
  isPaused,
  prefersReducedMotion,
}: {
  row: readonly string[];
  rowIndex: number;
  isPaused: boolean;
  prefersReducedMotion: boolean;
}) {
  const x = useMotionValue("0%");
  const animationRef = useRef<MarqueeAnimationControls | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      x.set("0%");
      return;
    }

    const start = rowIndex === 0 ? "0%" : "-50%";
    const end = rowIndex === 0 ? "-50%" : "0%";

    // Set the starting position before creating the infinite animation.
    x.set(start);

    const controls = animate(x, [start, end], {
      duration: rowIndex === 0 ? 38 : 44,
      repeat: Infinity,
      ease: "linear",
    });

    animationRef.current = controls;

    return () => {
      controls.stop();
      animationRef.current = null;
    };
  }, [x, rowIndex, prefersReducedMotion]);

  useEffect(() => {
    const controls = animationRef.current;

    if (!controls) return;

    if (isPaused || prefersReducedMotion) {
      controls.pause();
    } else {
      controls.play();
    }
  }, [isPaused, prefersReducedMotion]);

  return (
    <motion.div aria-hidden="true" className="flex w-max gap-3" style={{ x }}>
      {[...row, ...row].map((topic, index) => (
        <span
          key={`${rowIndex}-${topic}-${index}`}
          className="inline-flex min-h-10 items-center rounded-pill border border-[#D8D0EF] bg-surface/80 px-4 font-copy text-sm font-medium text-lavender-text"
        >
          {topic}
        </span>
      ))}
    </motion.div>
  );
}

function TopicMarquee({
  topics,
  label,
  prefersReducedMotion,
}: TopicMarqueeProps) {
  const [isHovered, setIsHovered] = useState(false);

  const marqueeRef = useRef<HTMLDivElement>(null);

  // Track visibility so continuous animation pauses outside the viewport.
  const isInView = useInView(marqueeRef, { amount: 0.1 });

  const firstRow = [...topics];
  const secondRow = [...topics].reverse();

  const rows = [firstRow, secondRow];

  const shouldPause = prefersReducedMotion || isHovered || !isInView;

  return (
    <div
      ref={marqueeRef}
      className="mt-12 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <p className="mb-5 text-center font-mono text-xs tracking-wide text-lavender-text">
        {label}
      </p>

      <div className="space-y-3">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="overflow-hidden">
            <MarqueeTrack
              row={row}
              rowIndex={rowIndex}
              isPaused={shouldPause}
              prefersReducedMotion={prefersReducedMotion}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Audience() {
  const tabs = site.audience.tabs;

  const [activeIndex, setActiveIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const id = useId();
  const panelId = `${id}-audience-panel`;

  const motionPreference = useReducedMotion();
  const activeTab = tabs[activeIndex];

  // Keep animations disabled until the motion preference is known.
  const prefersReducedMotion = motionPreference !== false;

  /*
   * Rotate through the audience examples until the visitor interacts.
   * Hover and keyboard focus pause the timer. Reduced-motion users
   * see a stable first selection instead of automatic changes.
   */
  useEffect(() => {
    if (
      prefersReducedMotion ||
      hasInteracted ||
      isHovered ||
      isFocused ||
      tabs.length < 2
    ) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % tabs.length);
    }, 7000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [hasInteracted, isFocused, isHovered, prefersReducedMotion, tabs.length]);

  function selectTab(index: number) {
    setHasInteracted(true);
    setActiveIndex(index);
  }

  function handleTabKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    currentIndex: number,
  ) {
    let nextIndex = currentIndex;

    switch (event.key) {
      case "ArrowRight":
        nextIndex = (currentIndex + 1) % tabs.length;
        break;

      case "ArrowLeft":
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        break;

      case "Home":
        nextIndex = 0;
        break;

      case "End":
        nextIndex = tabs.length - 1;
        break;

      default:
        return;
    }

    event.preventDefault();

    selectTab(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    const nextTarget = event.relatedTarget as Node | null;

    // Moving focus between tabs and panel controls should keep the timer paused.
    if (!nextTarget || !event.currentTarget.contains(nextTarget)) {
      setIsFocused(false);
    }
  }

  return (
    <Section id="audience" background="peach">
      <Container>
        <Reveal>
          <div className="max-w-copy">
            <Heading level={2}>{site.audience.heading}</Heading>
          </div>
        </Reveal>

        <div
          className="mt-8 grid gap-5 lg:grid-cols-12 lg:gap-7"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocusCapture={() => setIsFocused(true)}
          onBlurCapture={handleBlur}
        >
          {/* One responsive tablist: horizontal pills on mobile, vertical tabs on desktop. */}
          <div
            role="tablist"
            aria-label="Who Writespace is for"
            className="-mx-page-gutter flex snap-x gap-2 overflow-x-auto px-page-gutter pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:col-span-4 lg:flex-col lg:gap-2 lg:overflow-visible lg:px-0 lg:pb-0"
          >
            {tabs.map((tab, index) => (
              <AudienceTabButton
                key={tab.id}
                tab={tab}
                index={index}
                active={activeIndex === index}
                tabId={`${id}-${tab.id}-tab`}
                panelId={panelId}
                onSelect={selectTab}
                onKeyDown={handleTabKeyDown}
                buttonRef={(element) => {
                  tabRefs.current[index] = element;
                }}
              />
            ))}
          </div>

          {/* Large content panel */}
          <div className="lg:col-span-8">
            <div
              id={panelId}
              role="tabpanel"
              aria-labelledby={`${id}-${activeTab.id}-tab`}
              tabIndex={0}
              className={[
                "min-h-[420px] overflow-hidden rounded-panel",
                "border border-line bg-surface p-5 shadow-card",
                "outline-none focus-visible:ring-2 focus-visible:ring-violet",
                "focus-visible:ring-offset-4 sm:p-7 lg:p-8",
              ].join(" ")}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeTab.id}
                  initial={{
                    opacity: prefersReducedMotion ? 1 : 0,
                    y: prefersReducedMotion ? 0 : 8,
                  }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: prefersReducedMotion ? 1 : 0,
                    y: prefersReducedMotion ? 0 : -8,
                  }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.25,
                    ease: "easeInOut",
                  }}
                  className="grid h-full items-center gap-5 lg:grid-cols-2 lg:gap-7"
                >
                  {/* Audience-specific copy */}
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] tracking-[0.14em] text-violet">
                      {activeTab.label.toUpperCase()}
                    </p>

                    <h3 className="mt-4 font-headline text-[26px] font-semibold leading-tight tracking-tight text-ink sm:text-[28px]">
                      {activeTab.headline}
                    </h3>

                    <p className="mt-4 max-w-[34rem] font-copy text-base leading-7 text-body">
                      {activeTab.description}
                    </p>

                    <div className="mt-6 inline-flex items-center gap-2 rounded-pill bg-lavender/80 px-3 py-2">
                      <span className="size-1.5 rounded-full bg-coral" />
                      <span className="font-copy text-xs font-medium text-lavender-text">
                        {activeTab.hint}
                      </span>
                    </div>
                  </div>

                  {/* Custom vector-style workflow illustration */}
                  <div className="min-w-0">
                    <motion.div
                      initial={{
                        opacity: prefersReducedMotion ? 1 : 0,
                        x: prefersReducedMotion ? 0 : 24,
                      }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.3,
                        delay: prefersReducedMotion ? 0 : 0.05,
                        ease: "easeOut",
                      }}
                    >
                      <AudienceScene
                        audienceId={activeTab.id}
                        samplePostTitle={activeTab.samplePostTitle}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <TopicMarquee
          topics={site.audience.topics}
          label={site.audience.topicsLabel}
          prefersReducedMotion={prefersReducedMotion}
        />
      </Container>
    </Section>
  );
}
