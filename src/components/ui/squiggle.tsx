import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SquiggleProps = {
  children: ReactNode;
  className?: string;
};

/** Decorative underline stretches to the width of the word or phrase inside. */
export function Squiggle({ children, className }: SquiggleProps) {
  return (
    <span className={cn("relative inline-block whitespace-nowrap", className)}>
      <span className="relative z-10">{children}</span>

      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 120 14"
        preserveAspectRatio="none"
        className="absolute -bottom-1 left-0 h-2 w-full overflow-visible text-violet"
      >
        {/* Stretching the SVG in both axes lets the underline follow any word width. */}
        <path
          d="M2 9 C 14 1, 25 13, 39 7 S 63 2, 77 8 S 103 13, 118 5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="3"
        />
      </svg>
    </span>
  );
}
