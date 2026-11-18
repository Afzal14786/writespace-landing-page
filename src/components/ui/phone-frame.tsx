import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type PhoneFrameProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

/** Compact phone frame for mobile product screenshots. */
export function PhoneFrame({ children, className, ...props }: PhoneFrameProps) {
  return (
    <div
      role="group"
      aria-label="Phone preview"
      className={cn(
        "overflow-hidden rounded-panel border-4 border-ink bg-ink p-1 shadow-soft",
        className,
      )}
      {...props}
    >
      <div className="overflow-hidden rounded-card bg-lavender">{children}</div>
    </div>
  );
}
