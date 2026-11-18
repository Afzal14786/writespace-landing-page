import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "md" | "lg";

type SharedButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

type LinkButtonProps = SharedButtonProps &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "children" | "className" | "href"
  > & {
    href: string;
  };

type NativeButtonProps = SharedButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & {
    href?: never;
  };

export type ButtonProps = LinkButtonProps | NativeButtonProps;

const variantClasses: Record<ButtonVariant, string> = {
  // Coral buttons intentionally use ink text to preserve the brand contrast.
  primary: "bg-coral text-ink hover:brightness-95 active:brightness-90",
  secondary: "border border-line bg-surface text-ink hover:bg-lavender",
  ghost: "bg-transparent text-ink hover:bg-lavender",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-14 px-7 text-base",
};

function getButtonClassName(
  variant: ButtonVariant,
  size: ButtonSize,
  className?: string,
): string {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-pill font-copy font-semibold leading-none transition-colors duration-200 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-violet disabled:cursor-not-allowed disabled:opacity-60",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}

/** A consistently styled control that can render as a link or native button. */
export function Button(props: ButtonProps) {
  if ("href" in props && typeof props.href === "string") {
    const {
      href,
      children,
      variant = "primary",
      size = "md",
      className: customClassName,
      ...linkProps
    } = props;

    const className = getButtonClassName(variant, size, customClassName);

    return (
      <Link href={href} className={className} {...linkProps}>
        {children}
      </Link>
    );
  }

  const {
    children,
    variant = "primary",
    size = "md",
    className: customClassName,
    type = "button",
    ...buttonProps
  } = props as NativeButtonProps;

  const className = getButtonClassName(variant, size, customClassName);

  return (
    <button type={type} className={className} {...buttonProps}>
      {children}
    </button>
  );
}
