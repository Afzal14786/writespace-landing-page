"use client";

import { useEffect, useState } from "react";
import { Heart, MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { Avatar, Badge, Card } from "@/components/ui";

const POST_TEXT = "A small idea can lead to a much better system.";

const TYPE_INTERVAL = 36;
const PUBLISHED_DELAY = 300;
const PUBLISHED_PAUSE = 1600;
const START_DELAY = 450;

export function PostCard() {
  const prefersReducedMotion = useReducedMotion();

  // Start with the complete post for SSR and reduced-motion users.
  const [typedText, setTypedText] = useState(POST_TEXT);
  const [isPublished, setIsPublished] = useState(true);

  useEffect(() => {
    // Reduced-motion users keep the complete static post.
    // No state updates are needed inside this effect.
    if (prefersReducedMotion) {
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout>;
    let characterIndex = 0;

    /**
     * Types the post one character at a time.
     *
     * Each state update happens inside a timer callback rather
     * than synchronously inside the effect.
     */
    function typeNextCharacter() {
      if (characterIndex < POST_TEXT.length) {
        timeoutId = setTimeout(() => {
          characterIndex += 1;

          setTypedText(POST_TEXT.slice(0, characterIndex));

          typeNextCharacter();
        }, TYPE_INTERVAL);

        return;
      }

      // Show Published after the complete sentence has appeared.
      timeoutId = setTimeout(() => {
        setIsPublished(true);

        // Keep the published post visible before restarting.
        timeoutId = setTimeout(() => {
          setIsPublished(false);
          setTypedText("");

          characterIndex = 0;

          typeNextCharacter();
        }, PUBLISHED_PAUSE);
      }, PUBLISHED_DELAY);
    }

    /*
     * Keep the initial complete post visible briefly.
     * Then start the first typing cycle asynchronously.
     */
    timeoutId = setTimeout(() => {
      setTypedText("");
      setIsPublished(false);

      typeNextCharacter();
    }, START_DELAY);

    // Clear the pending timer when the component unmounts
    // or the reduced-motion preference changes.
    return () => {
      clearTimeout(timeoutId);
    };
  }, [prefersReducedMotion]);

  /*
   * Derive the visible state directly from the accessibility
   * preference. This avoids additional synchronous state updates.
   */
  const visibleText = prefersReducedMotion ? POST_TEXT : typedText;
  const showPublished = prefersReducedMotion || isPublished;

  return (
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

        {!prefersReducedMotion && !isPublished && (
          <span aria-hidden="true" className="ml-0.5 text-violet">
            |
          </span>
        )}
      </p>

      {/* Reactions and comments */}
      <div className="mt-5 flex items-center gap-5">
        {/* Heart interaction */}
        <span
          className="inline-flex items-center gap-2 font-copy text-sm text-body"
          aria-label="24 reactions"
        >
          <motion.span
            aria-hidden="true"
            className="inline-flex"
            whileHover={
              prefersReducedMotion ? undefined : { scale: 1.18, rotate: -8 }
            }
            whileTap={
              prefersReducedMotion ? undefined : { scale: 1.25, rotate: 8 }
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
  );
}
