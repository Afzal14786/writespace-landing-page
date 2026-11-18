import { clsx, type ClassValue } from "clsx";

/** Combine conditional class names without introducing a styling dependency. */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
