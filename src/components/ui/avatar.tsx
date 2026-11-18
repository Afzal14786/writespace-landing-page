import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type AvatarColor = "lavender" | "peach" | "coral";
export type AvatarSize = "sm" | "md" | "lg";

type AvatarProps = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
  initials: string;
  label?: string;
  color?: AvatarColor;
  size?: AvatarSize;
};

const colorClasses: Record<AvatarColor, string> = {
  lavender: "bg-lavender text-ink",
  peach: "bg-peach text-ink",
  coral: "bg-coral text-ink",
};

const sizeClasses: Record<AvatarSize, string> = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
};

/** Initial-based avatar; a readable label is exposed to assistive technology. */
export function Avatar({
  initials,
  label,
  color = "lavender",
  size = "md",
  className,
  ...props
}: AvatarProps) {
  return (
    <span
      role="img"
      aria-label={label ?? `Avatar: ${initials}`}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-copy font-bold uppercase",
        colorClasses[color],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {initials}
    </span>
  );
}
