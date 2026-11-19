import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type HeadingLevel = 1 | 2 | 3;

type HeadingProps = Omit<ComponentPropsWithoutRef<"h1">, "children"> & {
  level?: HeadingLevel;
  children: string;
  /** Highlights the first matching word or phrase in coral text. */
  highlight?: string;
};

/*
 * Typography follows the landing-page design guide.
 * Values are mobile first, followed by desktop sizes at the md breakpoint.
 */
const levelClasses: Record<HeadingLevel, string> = {
  1: "text-[40px] leading-[44px] md:text-[64px] md:leading-[68px] tracking-[-0.04em]",
  2: "text-[30px] leading-[36px] md:text-[40px] md:leading-[46px]",
  3: "text-[20px] leading-[26px] md:text-[24px] md:leading-[30px]",
};

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function renderHighlightedText(text: string, highlight?: string): ReactNode {
  const phrase = highlight?.trim();

  if (!phrase) return text;

  /*
   * Match the requested phrase without accidentally highlighting it
   * when it appears as part of a larger word.
   */
  const pattern = new RegExp(`(^|\\W)(${escapeRegExp(phrase)})(?=$|\\W)`, "i");

  const match = pattern.exec(text);

  if (!match || match.index === undefined) return text;

  const prefixLength = match[1].length;
  const highlightedText = match[2];

  const start = match.index + prefixLength;
  const end = start + highlightedText.length;

  // Only the first matching phrase is highlighted to keep emphasis intentional.
  return (
    <>
      {text.slice(0, start)}
      <span className="text-coral-text">{highlightedText}</span>
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
    "font-headline font-semibold tracking-tight text-ink",
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
