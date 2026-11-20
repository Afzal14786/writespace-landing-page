"use client";

import { useId, useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

import {
  Bookmark,
  CircleUserRound,
  Heart,
  MessageCircle,
  Network,
  Share2,
} from "lucide-react";

import { Avatar, Container, Heading, Reveal, Section } from "@/components/ui";

import { site } from "@/content/site";

/*
 * The interaction points are part of the artwork, not a toolbar.
 * Each point represents an action shared by Posts and Articles.
 */
const actionIcons = {
  React: Heart,
  Reply: MessageCircle,
  Save: Bookmark,
  Share: Share2,
} as const;

type ArtworkMotionProps = {
  isConnected: boolean;
  reducedMotion: boolean;
  gradientId: string;
};

/**
 * Draws organic connection paths between the Post, Article,
 * central profile, and shared interaction points.
 *
 * Light particles travel along the paths once when the artwork
 * enters the viewport. Nothing loops continuously.
 */
function DesktopFlowArtwork({
  isConnected,
  reducedMotion,
  gradientId,
}: ArtworkMotionProps) {
  const postPath = "M 355 120 C 425 120, 425 154, 500 154";
  const articlePath = "M 645 120 C 575 120, 575 154, 500 154";
  const centrePath = "M 500 184 C 500 208, 500 220, 500 245";

  const interactionPaths = [
    "M 500 245 C 420 270, 270 270, 125 320",
    "M 500 245 C 460 285, 420 285, 375 320",
    "M 500 245 C 540 285, 580 285, 625 320",
    "M 500 245 C 580 270, 730 270, 875 320",
  ];

  const paths = [
    { path: postPath, delay: 0 },
    { path: articlePath, delay: 0.12 },
    { path: centrePath, delay: 0.9 },
    ...interactionPaths.map((path, index) => ({
      path,
      delay: 1.5 + index * 0.14,
    })),
  ];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1000 360"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 top-0 hidden h-[360px] w-full overflow-visible lg:block"
    >
      <defs>
        <linearGradient
          id={`${gradientId}-desktop`}
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0%" stopColor="#8878F0" />
          <stop offset="50%" stopColor="#B39EF1" />
          <stop offset="100%" stopColor="#FC745C" />
        </linearGradient>

        <filter
          id={`${gradientId}-glow`}
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
        >
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* Soft underlying paths remain visible before the animation starts. */}
      {paths.map(({ path }, index) => (
        <path
          key={`base-${index}`}
          d={path}
          fill="none"
          stroke="#D9D1F1"
          strokeWidth="1.5"
          strokeOpacity="0.7"
          strokeLinecap="round"
        />
      ))}

      {/* The active paths gradually reveal themselves. */}
      {paths.map(({ path, delay }, index) => (
        <motion.path
          key={`flow-${index}`}
          d={path}
          fill="none"
          stroke={`url(#${gradientId}-desktop)`}
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: reducedMotion ? 1 : 0 }}
          animate={{
            pathLength: isConnected ? 1 : 0,
          }}
          transition={{
            duration: reducedMotion ? 0 : 0.85,
            delay: reducedMotion ? 0 : delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Light travels from both writing sources to the profile,
          then branches toward all four interaction points. */}
      {isConnected &&
        !reducedMotion &&
        paths.map(({ path, delay }, index) => (
          <g key={`particle-${index}`}>
            <circle
              r="8"
              fill="#FC745C"
              opacity="0.25"
              filter={`url(#${gradientId}-glow)`}
            >
              <animateMotion
                path={path}
                begin={`${delay + 0.55}s`}
                dur="1.15s"
                repeatCount="1"
                fill="remove"
              />
            </circle>

            <circle r="3.5" fill="#FFFFFF" stroke="#8878F0" strokeWidth="2">
              <animateMotion
                path={path}
                begin={`${delay + 0.55}s`}
                dur="1.15s"
                repeatCount="1"
                fill="remove"
              />
            </circle>
          </g>
        ))}
    </svg>
  );
}

/**
 * Mobile uses shorter vertical connections between the editorial
 * compositions. The same light-travel effect is retained.
 */
function MobileFlowConnector({
  isConnected,
  reducedMotion,
  delay,
}: ArtworkMotionProps & { delay: number }) {
  const path = "M 50 0 C 50 18, 50 42, 50 64";

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 64"
      className="h-16 w-16 shrink-0 overflow-visible lg:hidden"
    >
      <path
        d={path}
        fill="none"
        stroke="#D9D1F1"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <motion.path
        d={path}
        fill="none"
        stroke="url(#mobile-idea-flow)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: reducedMotion ? 1 : 0 }}
        animate={{
          pathLength: isConnected ? 1 : 0,
        }}
        transition={{
          duration: reducedMotion ? 0 : 0.65,
          delay: reducedMotion ? 0 : delay,
          ease: "easeInOut",
        }}
      />

      {isConnected && !reducedMotion && (
        <circle r="3.5" fill="#FFFFFF" stroke="#8878F0" strokeWidth="2">
          <animateMotion
            path={path}
            begin={`${delay + 0.45}s`}
            dur="0.9s"
            repeatCount="1"
            fill="remove"
          />
        </circle>
      )}
    </svg>
  );
}

/**
 * The Post is presented as an editorial composition.
 * It has no product-card background or enclosing border.
 */
function PostArtwork() {
  const post = site.mocks.heroPost;

  return (
    <div className="relative mx-auto w-full max-w-[390px] py-5">
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-lavender-text">
          <span className="size-1.5 rounded-full bg-violet" />
          SHORT FORM / 01
        </span>

        <span className="font-mono text-[10px] text-muted">
          {site.idea.post.badge}
        </span>
      </div>

      <div className="mt-7 flex items-center gap-3">
        <Avatar
          initials={post.initials}
          label={`${post.author} profile`}
          color="lavender"
          size="md"
        />

        <div className="min-w-0">
          <p className="font-copy text-sm font-semibold text-ink">
            {post.author}
          </p>

          <p className="font-copy text-xs text-muted">{post.metadata}</p>
        </div>
      </div>

      <blockquote className="mt-7 max-w-[390px] font-headline text-[27px] font-medium leading-[1.3] tracking-tight text-ink sm:text-[32px]">
        {post.text}
      </blockquote>

      {/* Abstract image fragments represent the visual possibilities of a Post. */}
      <div className="mt-7 flex items-center gap-3">
        <div className="relative h-[68px] w-[110px] overflow-hidden rounded-[20px_8px_20px_8px] bg-gradient-to-br from-lavender via-[#E7E1FF] to-peach">
          <div className="absolute -right-4 -top-5 size-16 rounded-full border-[9px] border-white/40" />
          <div className="absolute bottom-3 left-3 h-1.5 w-10 rounded-full bg-violet/30" />
        </div>

        <div className="relative h-[52px] w-[82px] overflow-hidden rounded-[8px_20px_8px_20px] bg-gradient-to-br from-peach to-lavender">
          <div className="absolute -bottom-5 -right-2 size-14 rounded-full border-[8px] border-white/50" />
        </div>

        <span className="font-mono text-[10px] text-muted">+ images</span>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted">
        <span>{post.reactions} reactions</span>
        <span>{post.comments} replies</span>
      </div>

      <p className="mt-3 font-copy text-xs leading-5 text-muted">
        {site.idea.post.caption}
      </p>
    </div>
  );
}

/**
 * The Article is an editorial composition with an organic cover
 * shape rather than a rectangular product-card frame.
 */
function ArticleArtwork() {
  const article = site.idea.article;

  return (
    <div className="relative mx-auto w-full max-w-[390px] py-5">
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-coral-text">
          <span className="size-1.5 rounded-full bg-coral" />
          LONG FORM / 02
        </span>

        <span className="font-mono text-[10px] text-muted">
          {article.readTime}
        </span>
      </div>

      {/* Organic cover artwork — deliberately not presented as a card. */}
      <div className="relative mx-auto mt-7 aspect-[16/8] w-full max-w-[340px] overflow-hidden rounded-[42%_58%_49%_51%/38%_43%_57%_62%] bg-gradient-to-br from-[#17132F] via-[#51448F] to-[#8878F0]">
        <div className="absolute -right-8 -top-12 size-40 rounded-full border-[18px] border-white/10" />

        <div className="absolute -bottom-16 left-8 size-48 rounded-full bg-coral/60 blur-3xl" />

        <svg
          aria-hidden="true"
          viewBox="0 0 340 170"
          className="absolute inset-0 size-full"
        >
          <path
            d="M-20 130 C70 20, 120 170, 205 75 S315 25, 370 100"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="1.5"
            fill="none"
          />

          <path
            d="M-20 145 C65 45, 130 185, 220 90 S320 45, 370 115"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1"
            fill="none"
          />

          <circle cx="245" cy="42" r="4" fill="#FC745C" />
        </svg>

        <div className="absolute bottom-5 left-6">
          <p className="font-mono text-[9px] tracking-[0.2em] text-white/60">
            WRITESPACE
          </p>

          <p className="mt-1 font-headline text-xl font-semibold text-white">
            ARTICLE
          </p>
        </div>
      </div>

      <h3 className="mt-7 font-headline text-[25px] font-medium leading-[1.22] tracking-tight text-ink sm:text-[30px]">
        {article.title}
      </h3>

      <p className="mt-4 max-w-[360px] font-copy text-sm leading-7 text-body">
        {site.idea.article.caption}
      </p>

      <p className="mt-5 font-mono text-[10px] tracking-wide text-coral-text">
        OPEN TO A DEEPER CONVERSATION
      </p>
    </div>
  );
}

/**
 * A central point representing the shared profile.
 * It is a small visual anchor, not a card or container.
 */
function ProfileNode({
  isConnected,
  reducedMotion,
}: {
  isConnected: boolean;
  reducedMotion: boolean;
}) {
  return (
    <div className="relative z-10 flex flex-col items-center gap-3">
      <motion.div
        initial={false}
        animate={{
          scale: isConnected ? 1 : 0.82,
          opacity: isConnected ? 1 : 0.65,
        }}
        transition={{
          duration: reducedMotion ? 0 : 0.5,
          ease: "easeOut",
        }}
        className="relative grid size-[76px] place-items-center rounded-full border border-violet/30 bg-paper shadow-[0_0_40px_rgba(136,120,240,0.16)]"
      >
        <span
          aria-hidden="true"
          className="absolute inset-2 rounded-full border border-dashed border-violet/35"
        />

        <CircleUserRound
          aria-hidden="true"
          className="size-8 text-violet"
          strokeWidth={1.4}
        />

        <span
          aria-hidden="true"
          className="absolute right-1 top-3 size-2.5 rounded-full bg-coral ring-4 ring-paper"
        />
      </motion.div>

      <span className="font-mono text-[9px] font-semibold tracking-[0.17em] text-lavender-text">
        ONE PROFILE
      </span>
    </div>
  );
}

/**
 * Interaction destinations are independent points in the artwork.
 * They are intentionally not placed inside pills or a toolbar.
 */
function InteractionArtwork({
  isConnected,
  reducedMotion,
}: {
  isConnected: boolean;
  reducedMotion: boolean;
}) {
  return (
    <div className="relative z-10 mx-auto w-full max-w-[760px]">
      <p className="mb-7 text-center font-mono text-[10px] tracking-[0.18em] text-muted">
        THE CONVERSATION CONTINUES
      </p>

      <div
        role="group"
        aria-label="Interactions shared by Posts and Articles"
        className="grid grid-cols-4 gap-2 sm:gap-8"
      >
        {site.idea.sharedActions.map((action, index) => {
          const Icon = actionIcons[action as keyof typeof actionIcons];

          return (
            <motion.div
              key={action}
              initial={{
                opacity: reducedMotion ? 1 : 0,
                y: reducedMotion ? 0 : 12,
              }}
              animate={{
                opacity: isConnected ? 1 : 0,
                y: isConnected ? 0 : 12,
              }}
              transition={{
                duration: reducedMotion ? 0 : 0.4,
                delay: reducedMotion ? 0 : 2.1 + index * 0.12,
                ease: "easeOut",
              }}
              className="flex min-w-0 flex-col items-center gap-3 text-center"
            >
              <span className="relative grid size-11 place-items-center rounded-full bg-lavender/70 text-violet sm:size-12">
                <Icon aria-hidden="true" className="size-5" strokeWidth={1.7} />

                <span
                  aria-hidden="true"
                  className={[
                    "absolute right-0 top-0 size-2 rounded-full",
                    index % 2 === 0 ? "bg-coral" : "bg-violet",
                    "ring-2 ring-surface",
                  ].join(" ")}
                />
              </span>

              <span className="font-copy text-xs font-semibold text-ink sm:text-sm">
                {action}
              </span>
            </motion.div>
          );
        })}
      </div>

      <p className="mt-7 text-center font-copy text-xs leading-6 text-muted">
        {site.idea.sharedCaption}
      </p>
    </div>
  );
}

export function OneIdea() {
  const artworkRef = useRef<HTMLDivElement>(null);

  // Animate the composition once when it enters the visitor's viewport.
  const artworkInView = useInView(artworkRef, {
    once: true,
    amount: 0.12,
  });

  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = prefersReducedMotion !== false;

  const isConnected = reducedMotion || artworkInView;

  // Give each SVG artwork instance unique gradient/filter identifiers.
  const generatedId = useId();
  const gradientId = `idea-art-${generatedId.replace(/:/g, "")}`;

  return (
    <Section
      id="idea"
      background="surface"
      className="overflow-hidden border-y border-line"
    >
      <Container>
        <div className="mx-auto max-w-content">
          {/* Editorial section heading */}
          <Reveal>
            <div className="max-w-copy">
              <Heading level={2}>{site.idea.heading}</Heading>

              <p className="mt-5 font-copy text-base leading-7 text-body sm:text-[17px] sm:leading-7">
                {site.idea.description}
              </p>
            </div>
          </Reveal>

          <div ref={artworkRef} className="relative mx-auto mt-12">
            {/* Shared mobile SVG gradient. */}
            <svg
              aria-hidden="true"
              className="absolute size-0"
              viewBox="0 0 1 1"
            >
              <defs>
                <linearGradient
                  id="mobile-idea-flow"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#8878F0" />
                  <stop offset="100%" stopColor="#FC745C" />
                </linearGradient>
              </defs>
            </svg>

            {/* Desktop: two editorial sources converging on one profile. */}
            <div className="relative hidden lg:block">
              <DesktopFlowArtwork
                gradientId={gradientId}
                isConnected={isConnected}
                reducedMotion={reducedMotion}
              />

              <div className="relative z-10 grid min-h-[240px] grid-cols-[minmax(0,1fr)_112px_minmax(0,1fr)] items-center gap-4">
                <motion.div
                  initial={
                    reducedMotion
                      ? false
                      : {
                          opacity: 0,
                          x: -22,
                        }
                  }
                  animate={{
                    opacity: isConnected ? 1 : 0,
                    x: isConnected ? 0 : -22,
                  }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.5,
                    ease: "easeOut",
                  }}
                >
                  <PostArtwork />
                </motion.div>

                <ProfileNode
                  isConnected={isConnected}
                  reducedMotion={reducedMotion}
                />

                <motion.div
                  initial={
                    reducedMotion
                      ? false
                      : {
                          opacity: 0,
                          x: 22,
                        }
                  }
                  animate={{
                    opacity: isConnected ? 1 : 0,
                    x: isConnected ? 0 : 22,
                  }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.5,
                    delay: reducedMotion ? 0 : 0.12,
                    ease: "easeOut",
                  }}
                >
                  <ArticleArtwork />
                </motion.div>
              </div>

              {/* Interaction points sit along the organic connection branches. */}
              <div className="relative mt-16">
                <InteractionArtwork
                  isConnected={isConnected}
                  reducedMotion={reducedMotion}
                />
              </div>
            </div>

            {/* Mobile: a vertical editorial composition with travelling light. */}
            <div className="flex flex-col items-center lg:hidden">
              <motion.div
                initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                animate={{
                  opacity: isConnected ? 1 : 0,
                  y: isConnected ? 0 : 18,
                }}
                transition={{
                  duration: reducedMotion ? 0 : 0.45,
                  ease: "easeOut",
                }}
                className="w-full"
              >
                <PostArtwork />
              </motion.div>

              <MobileFlowConnector
                gradientId={gradientId}
                isConnected={isConnected}
                reducedMotion={reducedMotion}
                delay={0}
              />

              <motion.div
                initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                animate={{
                  opacity: isConnected ? 1 : 0,
                  y: isConnected ? 0 : 18,
                }}
                transition={{
                  duration: reducedMotion ? 0 : 0.45,
                  delay: reducedMotion ? 0 : 0.12,
                  ease: "easeOut",
                }}
                className="w-full"
              >
                <ArticleArtwork />
              </motion.div>

              <MobileFlowConnector
                gradientId={gradientId}
                isConnected={isConnected}
                reducedMotion={reducedMotion}
                delay={0.8}
              />

              <ProfileNode
                isConnected={isConnected}
                reducedMotion={reducedMotion}
              />

              <MobileFlowConnector
                gradientId={gradientId}
                isConnected={isConnected}
                reducedMotion={reducedMotion}
                delay={1.7}
              />

              <div className="mt-3 w-full">
                <InteractionArtwork
                  isConnected={isConnected}
                  reducedMotion={reducedMotion}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
