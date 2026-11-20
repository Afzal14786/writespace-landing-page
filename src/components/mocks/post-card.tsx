"use client";

import { useEffect, useRef, useState } from "react";
import { Heart, MessageCircle } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";

import { Avatar, Badge, Card } from "@/components/ui";

const POST_TEXT = "A small idea can lead to a much better system.";

const TYPE_INTERVAL = 36;
const PUBLISHED_DELAY = 300;
const PUBLISHED_PAUSE = 1600;
const START_DELAY = 450;

export function PostCard() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Run the typing sequence only while the PostCard is visible.
  const isInView = useInView(containerRef, { amount: 0.2 });

  const prefersReducedMotion = useReducedMotion();
  const shouldReduceMotion = prefersReducedMotion !== false;

  // Start with the complete post for SSR and reduced-motion users.
  const [typedText, setTypedText] = useState(POST_TEXT);
  const [isPublished, setIsPublished] = useState(true);

  useEffect(() => {
    // Never run the typing sequence when reduced motion is requested
    // or when the PostCard is outside the viewport.
    if (shouldReduceMotion || !isInView) {
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let characterIndex = 0;
    let cancelled = false;

    /**
     * Schedule the next animation step.
     *
     * The cancellation check prevents an old timer from updating
     * state after the component leaves the viewport.
     */
    function schedule(callback: () => void, delay: number) {
      timeoutId = setTimeout(() => {
        if (!cancelled) {
          callback();
        }
      }, delay);
    }

    /**
     * Types the post one character at a time.
     */
    function typeNextCharacter() {
      if (cancelled) return;

      if (characterIndex < POST_TEXT.length) {
        schedule(() => {
          characterIndex += 1;

          setTypedText(POST_TEXT.slice(0, characterIndex));

          typeNextCharacter();
        }, TYPE_INTERVAL);

        return;
      }

      // Show Published after the complete sentence has appeared.
      schedule(() => {
        setIsPublished(true);

        // Keep the published post visible before restarting.
        schedule(() => {
          setIsPublished(false);
          setTypedText("");

          characterIndex = 0;

          typeNextCharacter();
        }, PUBLISHED_PAUSE);
      }, PUBLISHED_DELAY);
    }

    // Keep the initial complete post visible briefly.
    schedule(() => {
      setTypedText("");
      setIsPublished(false);

      typeNextCharacter();
    }, START_DELAY);

    return () => {
      // Cancel the active timer when the card leaves the viewport.
      cancelled = true;

      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, [shouldReduceMotion, isInView]);

  // Reduced-motion users always receive the completed static post.
  const visibleText = shouldReduceMotion ? POST_TEXT : typedText;
  const showPublished = shouldReduceMotion || isPublished;

  return (
    <div ref={containerRef}>
      <Card className="w-full p-5 sm:p-6">
        {/* Author information */}
        <div className="flex items-center gap-3">
          <Avatar initials="AK" label="Aisha K." color="peach" size="lg" />

          <div className="min-w-0 flex-1">
            <p className="font-copy text-sm font-semibold text-ink">Aisha K.</p>

            <div className="mt-1 flex flex-wrap items-center gap-2">
              <p className="font-copy text-xs text-muted">Post · 2 min ago</p>

              {showPublished && <Badge variant="lavender">Published</Badge>}
            </div>
          </div>
        </div>

        {/* Post content */}
        <p
          aria-label={POST_TEXT}
          className="mt-5 min-h-14 font-copy text-base leading-7 text-ink"
        >
          <span aria-hidden="true">{visibleText}</span>

          {!shouldReduceMotion && !isPublished && (
            <span aria-hidden="true" className="ml-0.5 text-violet">
              |
            </span>
          )}
        </p>

        {/* Reactions and comments */}
        <div className="mt-5 flex items-center gap-5">
          {/* Decorative reaction animation in the product mock. */}
          <span
            className="inline-flex items-center gap-2 font-copy text-sm text-body"
            aria-label="24 reactions"
          >
            <motion.span
              aria-hidden="true"
              className="inline-flex"
              whileHover={
                shouldReduceMotion ? undefined : { scale: 1.18, rotate: -8 }
              }
              whileTap={
                shouldReduceMotion ? undefined : { scale: 1.25, rotate: 8 }
              }
              transition={{
                type: "spring",
                duration: 0.32,
                bounce: 0.4,
              }}
            >
              <Heart size={17} strokeWidth={1.8} className="text-coral-text" />
            </motion.span>
            24
          </span>

          {/* Comments */}
          <span
            className="inline-flex items-center gap-2 font-copy text-sm text-body"
            aria-label="6 comments"
          >
            <MessageCircle
              size={17}
              strokeWidth={1.8}
              className="text-muted"
              aria-hidden="true"
            />
            6
          </span>
        </div>
      </Card>
    </div>
  );
}
