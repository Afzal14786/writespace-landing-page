import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type SectionBackground =
  | "paper"
  | "surface"
  | "lavender"
  | "peach"
  | "ink";

type SectionProps = Omit<ComponentPropsWithoutRef<"section">, "children"> & {
  background?: SectionBackground;
  children: ReactNode;
};

const backgroundClasses: Record<SectionBackground, string> = {
  paper: "bg-paper",
  surface: "bg-surface",
  lavender: "bg-lavender",
  peach: "bg-peach",
  ink: "bg-ink",
};

/**
 * Full-width section with the shared responsive vertical rhythm.
 *
 * The surface background is used for white sections, such as the
 * One idea section, while paper remains the default page background.
 */
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
