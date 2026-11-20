"use client";

import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import type { HTMLMotionProps } from "motion/react";

import { cn } from "@/lib/cn";

type TiltCardProps = Omit<
  HTMLMotionProps<"div">,
  "children" | "style" | "onPointerMove" | "onPointerLeave"
> & {
  children: ReactNode;
};

const springConfig = {
  stiffness: 180,
  damping: 22,
  mass: 0.5,
};

/**
 * Adds a subtle cursor-following tilt and glow to a card.
 *
 * The tilt is capped at 3 degrees in each direction and is enabled
 * only for fine-pointer devices. Touch and reduced-motion users
 * receive the original static card without interactive transforms.
 */
export function TiltCard({ children, className, ...props }: TiltCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const shouldReduceMotion = prefersReducedMotion !== false;

  const supportsFinePointer = useRef(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glowOpacity = useMotionValue(0);

  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);
  const springGlowOpacity = useSpring(glowOpacity, {
    stiffness: 200,
    damping: 24,
  });

  // Detect devices that support a hovering, precise pointer.
  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    function updatePointerSupport() {
      supportsFinePointer.current = mediaQuery.matches;

      if (!mediaQuery.matches) {
        rotateX.set(0);
        rotateY.set(0);
        glowOpacity.set(0);
      }
    }

    updatePointerSupport();
    mediaQuery.addEventListener("change", updatePointerSupport);

    return () => {
      mediaQuery.removeEventListener("change", updatePointerSupport);
    };
  }, [rotateX, rotateY, glowOpacity]);

  // Reset the card if the visitor enables reduced motion.
  useEffect(() => {
    if (shouldReduceMotion) {
      rotateX.set(0);
      rotateY.set(0);
      glowOpacity.set(0);
    }
  }, [shouldReduceMotion, rotateX, rotateY, glowOpacity]);

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (
      shouldReduceMotion ||
      !supportsFinePointer.current ||
      event.pointerType === "touch"
    ) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();

    if (!bounds.width || !bounds.height) return;

    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;

    // Map the pointer position to a maximum rotation of 3 degrees.
    rotateX.set((0.5 - y) * 6);
    rotateY.set((x - 0.5) * 6);

    // Position the subtle highlight beneath the cursor.
    event.currentTarget.style.setProperty("--tilt-glow-x", `${x * 100}%`);
    event.currentTarget.style.setProperty("--tilt-glow-y", `${y * 100}%`);

    glowOpacity.set(1);
  }

  function handlePointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
    glowOpacity.set(0);
  }

  return (
    <motion.div
      {...props}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 1000,
      }}
      className={cn("relative h-full will-change-transform", className)}
    >
      {/* A soft violet highlight follows the cursor inside the card. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 rounded-[24px]"
        style={{
          opacity: springGlowOpacity,
          background:
            "radial-gradient(circle at var(--tilt-glow-x, 50%) var(--tilt-glow-y, 50%), rgba(136, 120, 240, 0.14), transparent 68%)",
        }}
      />

      {children}
    </motion.div>
  );
}
