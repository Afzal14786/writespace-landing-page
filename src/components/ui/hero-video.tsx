"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

import { ResponsiveImage } from "@/components/ui/responsive-image";
import { assets } from "@/lib/assets";
import { cn } from "@/lib/cn";

type HeroVideoProps = {
  className?: string;
};

type WindowWithOptionalObserver = {
  IntersectionObserver?: typeof IntersectionObserver;
};

export function HeroVideo({ className }: HeroVideoProps) {
  const prefersReducedMotion = useReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [shouldLoad, setShouldLoad] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  const motionAllowed = prefersReducedMotion === false;

  /*
   * Load video sources only when the component approaches
   * the viewport. The poster is visible before this happens.
   */
  useEffect(() => {
    if (!motionAllowed) return;

    const element = containerRef.current;

    if (!element) return;

    // Use an optional constructor reference for TypeScript-safe fallback.
    const ObserverConstructor = (
      window as unknown as WindowWithOptionalObserver
    ).IntersectionObserver;

    if (typeof ObserverConstructor !== "function") {
      // Timer fallback avoids the unreachable-window narrowing issue.
      const fallbackTimer = window.setTimeout(() => {
        setShouldLoad(true);
        setIsInView(true);
      }, 0);

      return () => {
        window.clearTimeout(fallbackTimer);
      };
    }

    const observer = new ObserverConstructor(
      (entries) => {
        const isNearViewport = entries.some((entry) => entry.isIntersecting);

        if (isNearViewport) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px 0px",
        threshold: 0,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [motionAllowed]);

  /*
   * Track actual viewport visibility independently.
   * The video pauses when it moves outside the viewport.
   */
  useEffect(() => {
    if (!motionAllowed) return;

    const element = containerRef.current;

    if (!element) return;

    const ObserverConstructor = (
      window as unknown as WindowWithOptionalObserver
    ).IntersectionObserver;

    if (typeof ObserverConstructor !== "function") {
      return;
    }

    const observer = new ObserverConstructor(
      (entries) => {
        const visible = entries.some((entry) => entry.isIntersecting);

        setIsInView(visible);
      },
      {
        threshold: 0.01,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [motionAllowed]);

  /*
   * Playback is allowed only when sources are loaded
   * and the video is actually visible.
   */
  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    if (!motionAllowed || !shouldLoad || !isInView || videoFailed) {
      video.pause();
      return;
    }

    const playPromise = video.play();

    if (playPromise !== undefined) {
      void playPromise.catch(() => {
        // Keep the poster visible if browser autoplay is blocked.
      });
    }

    return () => {
      video.pause();
    };
  }, [motionAllowed, shouldLoad, isInView, videoFailed]);

  const hero = assets.video.hero;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden rounded-panel border border-line bg-lavender shadow-card",
        className,
      )}
    >
      {/* Poster remains visible as the video fallback. */}
      <ResponsiveImage
        asset={hero.poster}
        aspectRatio="video"
        sizes="(max-width: 767px) 90vw, (max-width: 1023px) 70vw, 50vw"
        className="absolute inset-0 h-full w-full"
      />

      {/* Never create the video element for reduced-motion users. */}
      {motionAllowed && shouldLoad && !videoFailed && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster={hero.poster.src}
          aria-hidden="true"
          tabIndex={-1}
          onError={() => setVideoFailed(true)}
          className="absolute inset-0 size-full object-cover"
        >
          <source src={hero.webm.src} type={hero.webm.type} />
          <source src={hero.mp4.src} type={hero.mp4.type} />
        </video>
      )}
    </div>
  );
}
