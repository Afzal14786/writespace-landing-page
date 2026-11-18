import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type SectionBackground = "paper" | "lavender" | "peach" | "ink";

type SectionProps = Omit<ComponentPropsWithoutRef<"section">, "children"> & {
  background?: SectionBackground;
  children: ReactNode;
};

const backgroundClasses: Record<SectionBackground, string> = {
  paper: "bg-paper",
  lavender: "bg-lavender",
  peach: "bg-peach",
  ink: "bg-ink",
};

/** Full-width section with the shared responsive vertical rhythm. */
export function Section({
  background = "paper",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "py-section-mobile md:py-section-desktop",
        backgroundClasses[background],
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}
