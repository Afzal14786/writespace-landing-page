import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type BrowserFrameProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

/** Browser-like window frame for static product screenshots. */
export function BrowserFrame({
  children,
  className,
  ...props
}: BrowserFrameProps) {
  return (
    <div
      role="group"
      aria-label="Browser preview"
      className={cn(
        "overflow-hidden rounded-panel border border-line bg-surface shadow-card",
        className,
      )}
      {...props}
    >
      {/* Decorative browser controls */}
      <div
        aria-hidden="true"
        className="flex h-9 items-center gap-1.5 border-b border-line bg-surface px-3"
      >
        <span className="size-2 rounded-full bg-coral" />
        <span className="size-2 rounded-full bg-violet" />
        <span className="size-2 rounded-full bg-line" />
      </div>

      {children}
    </div>
  );
}
