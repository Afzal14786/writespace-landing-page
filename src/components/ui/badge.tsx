import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export type BadgeVariant = "lavender" | "peach" | "coral";

type BadgeProps = Omit<ComponentPropsWithoutRef<"span">, "children"> & {
  children: string;
  variant?: BadgeVariant;
};

const variantClasses: Record<BadgeVariant, string> = {
  lavender: "bg-lavender text-ink",
  peach: "bg-peach text-ink",
  coral: "bg-coral text-ink",
};

/** Small status or category label using the brand's soft color fills. */
export function Badge({
  children,
  variant = "lavender",
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-3 py-1 font-copy text-xs font-semibold leading-5",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
