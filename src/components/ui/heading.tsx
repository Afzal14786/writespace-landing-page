import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type HeadingLevel = 1 | 2 | 3;

type HeadingProps = Omit<ComponentPropsWithoutRef<"h1">, "children"> & {
  level?: HeadingLevel;
  children: string;
  /** Highlights the first whole-word match, if present. */
  highlight?: string;
};

const levelClasses: Record<HeadingLevel, string> = {
  1: "text-4xl md:text-5xl lg:text-6xl",
  2: "text-3xl md:text-4xl lg:text-5xl",
  3: "text-2xl md:text-3xl",
};

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function renderHighlightedText(text: string, highlight?: string): ReactNode {
  if (!highlight?.trim()) return text;

  const match = new RegExp(`\\b${escapeRegExp(highlight)}\\b`, "i").exec(text);

  if (!match || match.index === undefined) return text;

  const start = match.index;
  const end = start + match[0].length;

  // Only the first whole-word match is highlighted to keep emphasis intentional.
  return (
    <>
      {text.slice(0, start)}
      <span className="text-coral-text">{text.slice(start, end)}</span>
      {text.slice(end)}
    </>
  );
}

/** Semantic heading that consistently uses the Fraunces display face. */
export function Heading({
  level = 2,
  highlight,
  children,
  className,
  ...props
}: HeadingProps) {
  const classes = cn(
    "font-headline font-semibold leading-tight tracking-tight text-ink",
    levelClasses[level],
    className,
  );

  const content = renderHighlightedText(children, highlight);

  if (level === 1) {
    return (
      <h1 className={classes} {...props}>
        {content}
      </h1>
    );
  }

  if (level === 2) {
    return (
      <h2 className={classes} {...props}>
        {content}
      </h2>
    );
  }

  return (
    <h3 className={classes} {...props}>
      {content}
    </h3>
  );
}
