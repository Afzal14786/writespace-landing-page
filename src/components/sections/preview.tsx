"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

import type { FocusEvent, KeyboardEvent, ReactNode } from "react";
import { HeroVideo } from "@/components/ui/hero-video";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import {
  Bookmark,
  CalendarClock,
  FileText,
  Heart,
  LockKeyhole,
  MessageCircle,
} from "lucide-react";

import {
  Badge,
  BrowserFrame,
  Container,
  Heading,
  PhoneFrame,
  Reveal,
  Section,
} from "@/components/ui";

import { site } from "@/content/site";
import type { PreviewTab } from "@/content/site";
import { assets } from "@/lib/assets";
import type { ImageAsset } from "@/lib/assets";

type ScreenId = PreviewTab["id"];

const desktopScreens: Record<ScreenId, ImageAsset> = {
  feed: assets.previews.feedDesktop,
  article: assets.previews.articleDesktop,
  write: assets.previews.composerDesktop,
};

const calloutIcons: Record<ScreenId, readonly [typeof FileText, typeof Heart]> =
  {
    feed: [FileText, Heart],
    article: [MessageCircle, Bookmark],
    write: [CalendarClock, LockKeyhole],
  };

type PreviewScreenImageProps = {
  asset: ImageAsset;
  aspectRatio: "desktop" | "phone";
  sizes: string;
};

/**
 * Product screenshots are already optimized WebP files.
 *
 * Using next/image with unoptimized avoids another lossy encoding pass
 * on the small text and UI details inside these screenshots.
 *
 * The fixed aspect ratio reserves the layout space before the image loads.
 */
function PreviewScreenImage({
  asset,
  aspectRatio,
  sizes,
}: PreviewScreenImageProps) {
  const aspectClasses = {
    desktop: "aspect-[16/10]",
    phone: "aspect-[780/1688]",
  };

  return (
    <div
      className={[
        "relative w-full overflow-hidden bg-lavender",
        aspectClasses[aspectRatio],
      ].join(" ")}
    >
      <Image
        src={asset.src}
        alt={asset.alt}
        fill
        sizes={sizes}
        unoptimized
        className="object-cover"
      />
    </div>
  );
}

type PreviewTransitionProps = {
  screenId: ScreenId;
  reducedMotion: boolean;
  children: ReactNode;
};

/**
 * Animate only the changing screen content.
 * BrowserFrame and PhoneFrame remain stationary during tab changes.
 */
function PreviewTransition({
  screenId,
  reducedMotion,
  children,
}: PreviewTransitionProps) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={screenId}
        initial={reducedMotion ? false : { opacity: 0, x: 24 }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        exit={reducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
        transition={{
          duration: reducedMotion ? 0 : 0.25,
          ease: "easeOut",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Mobile Article preview.
 *
 * The real article phone screenshot will replace this coded screen
 * once article-phone.webp is available.
 */
function ArticlePhonePlaceholder() {
  const article = site.mocks.heroArticle;

  return (
    <div className="aspect-[780/1688] w-full bg-paper px-4 py-5">
      <div className="flex items-center justify-between border-b border-line pb-3">
        <span className="font-headline text-base font-semibold text-ink">
          Writespace
        </span>

        <span className="rounded-pill bg-lavender px-3 py-1 font-mono text-[9px] text-lavender-text">
          ARTICLE
        </span>
      </div>

      <article className="mt-6">
        <p className="font-mono text-[9px] uppercase tracking-widest text-violet">
          Engineering
        </p>

        <h3 className="mt-3 font-headline text-[21px] font-semibold leading-tight text-ink">
          {article.title}
        </h3>

        <p className="mt-3 font-copy text-xs text-muted">
          Aisha K. · {article.readTime}
        </p>

        <div
          aria-hidden="true"
          className="relative mt-5 aspect-[16/9] overflow-hidden rounded-lg border border-line bg-gradient-to-br from-ink via-[#51448F] to-violet"
        >
          <div className="absolute -right-5 -top-5 size-24 rounded-full border-[12px] border-surface/10" />

          <div className="absolute bottom-3 left-3 font-mono text-[9px] text-surface/80">
            ARTICLE COVER
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <p className="font-copy text-sm font-semibold text-ink">
            Why change it?
          </p>

          <div className="h-2 rounded-full bg-line" />
          <div className="h-2 w-[92%] rounded-full bg-line" />
          <div className="h-2 w-[82%] rounded-full bg-line" />
          <div className="h-2 w-[96%] rounded-full bg-line" />
          <div className="h-2 w-[68%] rounded-full bg-line" />

          <p className="pt-3 font-copy text-sm font-semibold text-ink">
            The result
          </p>

          <div className="h-2 rounded-full bg-line" />
          <div className="h-2 w-[85%] rounded-full bg-line" />
        </div>
      </article>
    </div>
  );
}

/**
 * Mobile Write preview.
 *
 * The real composer phone screenshot will replace this coded screen
 * once composer-phone.webp is available.
 */
function WritePhonePlaceholder() {
  const article = site.mocks.heroArticle;

  return (
    <div className="aspect-[780/1688] w-full bg-paper px-4 py-5">
      <div className="flex items-center justify-between border-b border-line pb-3">
        <span className="font-headline text-base font-semibold text-ink">
          Writespace
        </span>

        <span className="font-mono text-[9px] tracking-wide text-muted">
          COMPOSER
        </span>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between gap-2">
          <span className="font-copy text-sm font-semibold text-ink">
            New Article
          </span>

          <Badge variant="lavender">Draft</Badge>
        </div>

        <h3 className="mt-7 font-headline text-[22px] font-semibold leading-tight text-ink">
          {article.title}
        </h3>

        <div
          aria-hidden="true"
          className="mt-5 aspect-[16/9] rounded-lg border border-line bg-gradient-to-br from-lavender to-peach"
        />

        <p className="mt-6 font-copy text-xs text-muted">
          Start with the idea you want to share...
        </p>

        <div className="mt-5 space-y-3">
          <div className="h-2 rounded-full bg-line" />
          <div className="h-2 w-[92%] rounded-full bg-line" />
          <div className="h-2 w-[80%] rounded-full bg-line" />
          <div className="h-2 w-[95%] rounded-full bg-line" />
          <div className="h-2 w-[65%] rounded-full bg-line" />
        </div>

        <div className="mt-7 rounded-xl border border-line bg-surface p-3">
          <p className="font-mono text-[9px] tracking-wide text-muted">
            PUBLISHING
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            <Badge variant="lavender">Draft</Badge>
            <Badge variant="peach">Scheduled</Badge>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-2">
          <span className="font-copy text-xs text-muted">Save your work</span>

          <span className="rounded-pill bg-coral px-4 py-2 font-copy text-xs font-semibold text-ink">
            Publish
          </span>
        </div>
      </div>
    </div>
  );
}

function MobileScreen({ screenId }: { screenId: ScreenId }) {
  switch (screenId) {
    case "feed":
      return (
        <PreviewScreenImage
          asset={assets.previews.feedPhone}
          aspectRatio="phone"
          sizes="(min-width: 1024px) 260px, min(300px, 84vw)"
        />
      );

    case "article":
      return <ArticlePhonePlaceholder />;

    case "write":
      return <WritePhonePlaceholder />;
  }
}

type PreviewCalloutProps = {
  screenId: ScreenId;
  text: string;
  index: number;
  reducedMotion: boolean;
  className: string;
};

/**
 * Floating callouts are the only continuously moving elements
 * in the product preview.
 */
function PreviewCallout({
  screenId,
  text,
  index,
  reducedMotion,
  className,
}: PreviewCalloutProps) {
  const icons = calloutIcons[screenId];
  const Icon = icons[index % icons.length];

  return (
    <motion.span
      className={[
        "inline-flex min-h-10 items-center gap-2 rounded-pill",
        "border border-line bg-surface px-4 py-2",
        "font-copy text-xs font-medium text-ink shadow-card",
        className,
      ].join(" ")}
      animate={reducedMotion ? { y: 0 } : { y: [0, -6, 0] }}
      transition={{
        duration: 4,
        delay: index * 0.5,
        repeat: reducedMotion ? 0 : Infinity,
        ease: "easeInOut",
      }}
    >
      <Icon
        aria-hidden="true"
        className="size-3.5 shrink-0 text-violet"
        strokeWidth={1.8}
      />

      {text}
    </motion.span>
  );
}

export function Preview() {
  const tabs = site.preview.tabs;

  const [activeIndex, setActiveIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const id = useId();
  const panelId = `${id}-preview-panel`;

  const prefersReducedMotion = useReducedMotion();

  // Treat an unresolved motion preference conservatively.
  const reducedMotion = prefersReducedMotion !== false;

  const activeTab = tabs[activeIndex];

  /*
   * Advance every six seconds until the visitor interacts.
   *
   * Hover and keyboard focus pause the timer temporarily.
   * Selecting a tab manually stops automatic advancement.
   * Reduced-motion users never receive automatic tab changes.
   */
  useEffect(() => {
    if (
      reducedMotion ||
      hasInteracted ||
      isHovered ||
      isFocused ||
      tabs.length < 2
    ) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % tabs.length);
    }, 6000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [reducedMotion, hasInteracted, isHovered, isFocused, tabs.length]);

  function selectTab(index: number) {
    setHasInteracted(true);
    setActiveIndex(index);
  }

  /**
   * Support standard tablist keyboard navigation:
   * Left/Right arrows, Home, and End.
   */
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

  /**
   * Keep auto-advance paused while focus moves between the tabs
   * and the preview panel. Resume only after focus leaves the section.
   */
  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    const nextTarget = event.relatedTarget as Node | null;

    if (!nextTarget || !event.currentTarget.contains(nextTarget)) {
      setIsFocused(false);
    }
  }

  return (
    <Section id="preview" background="paper">
      <Container>
        {/* Section introduction */}
        <Reveal>
          <div className="max-w-copy">
            <Badge variant="lavender">{site.preview.badge}</Badge>

            <Heading level={2} className="mt-5">
              {site.preview.heading}
            </Heading>

            <p className="mt-4 font-copy text-lg leading-7 text-body">
              {site.preview.description}
            </p>
          </div>
        </Reveal>

        <div
          className="mt-9"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocusCapture={() => setIsFocused(true)}
          onBlurCapture={handleBlur}
        >
          {/* Accessible, horizontally scrollable tablist. */}
          <div
            role="tablist"
            aria-label="Writespace product design previews"
            className={[
              "-mx-page-gutter flex snap-x gap-2 overflow-x-auto",
              "px-page-gutter pb-2 [scrollbar-width:none]",
              "[&::-webkit-scrollbar]:hidden",
              "sm:mx-0 sm:justify-center sm:px-0",
            ].join(" ")}
          >
            {tabs.map((tab, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={tab.id}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  type="button"
                  role="tab"
                  id={`${id}-${tab.id}-tab`}
                  aria-selected={isActive}
                  aria-controls={panelId}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => selectTab(index)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  className={[
                    "min-h-11 min-w-[88px] shrink-0 snap-start",
                    "rounded-pill border px-5",
                    "font-copy text-[15px] font-semibold",
                    "transition-colors duration-150",
                    "focus-visible:outline-3 focus-visible:outline-offset-2",
                    "focus-visible:outline-violet",
                    isActive
                      ? "border-ink bg-ink text-surface"
                      : "border-line bg-surface text-body hover:border-ink/30 hover:text-ink",
                  ].join(" ")}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* One tab panel contains both responsive device layouts. */}
          <div
            id={panelId}
            role="tabpanel"
            aria-labelledby={`${id}-${activeTab.id}-tab`}
            tabIndex={0}
            className="relative mt-6 outline-none focus-visible:ring-2 focus-visible:ring-violet focus-visible:ring-offset-4"
          >
            {/* Desktop: large browser frame with overlapping phone. */}
            <div className="relative isolate mx-auto hidden max-w-[1000px] pb-12 pt-2 lg:block">
              {/* Soft coral-to-violet glow behind the frames. */}
              <div
                aria-hidden="true"
                className={[
                  "pointer-events-none absolute left-1/2 top-1/2 -z-10",
                  "size-[480px] -translate-x-1/2 -translate-y-1/2",
                  "rounded-full bg-gradient-to-br",
                  "from-coral/20 to-violet/20 blur-3xl",
                ].join(" ")}
              />

              {/* The frame remains still; only its screen content changes. */}
              <BrowserFrame
                aria-label={`${activeTab.label} desktop product preview`}
                className="mx-auto w-[calc(100%-72px)] max-w-[880px]"
              >
                <PreviewTransition
                  screenId={activeTab.id}
                  reducedMotion={reducedMotion}
                >
                  {activeTab.id === "feed" ? (
                    <HeroVideo className="!rounded-none !border-0 !shadow-none" />
                  ) : (
                    <PreviewScreenImage
                      asset={desktopScreens[activeTab.id]}
                      aspectRatio="desktop"
                      sizes="(min-width: 1024px) 880px, 100vw"
                    />
                  )}
                </PreviewTransition>
              </BrowserFrame>

              {/* Phone frame overlaps the browser by its lower-right corner. */}
              <div className="absolute bottom-0 right-0 z-20 w-[260px] translate-y-12">
                <PhoneFrame
                  aria-label={`${activeTab.label} mobile product preview`}
                  className="w-full"
                >
                  <PreviewTransition
                    screenId={activeTab.id}
                    reducedMotion={reducedMotion}
                  >
                    <MobileScreen screenId={activeTab.id} />
                  </PreviewTransition>
                </PhoneFrame>
              </div>

              {/* Floating callouts change with the selected tab. */}
              {activeTab.callouts.map((callout, index) => (
                <PreviewCallout
                  key={`${activeTab.id}-${callout}`}
                  screenId={activeTab.id}
                  text={callout}
                  index={index}
                  reducedMotion={reducedMotion}
                  className={
                    index === 0
                      ? "absolute left-0 top-[18%] z-30"
                      : "absolute right-[19%] top-[70%] z-30"
                  }
                />
              ))}
            </div>

            {/* Mobile and tablet: phone frame only, centered. */}
            <div className="mx-auto mt-7 flex w-full max-w-[300px] justify-center lg:hidden">
              <PhoneFrame
                aria-label={`${activeTab.label} mobile product preview`}
                className="w-full"
              >
                <PreviewTransition
                  screenId={activeTab.id}
                  reducedMotion={reducedMotion}
                >
                  <MobileScreen screenId={activeTab.id} />
                </PreviewTransition>
              </PhoneFrame>
            </div>
          </div>

          {/* Caption changes with the active tab. */}
          <p
            aria-live="polite"
            aria-atomic="true"
            className="mt-6 text-center font-copy text-sm leading-5 text-muted"
          >
            {activeTab.caption}
          </p>
        </div>
      </Container>
    </Section>
  );
}
