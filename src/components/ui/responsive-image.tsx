import Image from "next/image";

import type { ImageAsset } from "@/lib/assets";
import { cn } from "@/lib/cn";

export type ImageAspectRatio =
  | "preview"
  | "phone"
  | "portrait"
  | "square"
  | "video"
  | "social";

export type ImageFit = "cover" | "contain";

type ResponsiveImageProps = {
  asset: ImageAsset;
  aspectRatio: ImageAspectRatio;
  sizes?: string;
  fit?: ImageFit;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

/*
 * A small lavender SVG used as a low-cost blur placeholder.
 * It matches the Writespace visual palette.
 */
const BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxMCI+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEwIiBmaWxsPSIjRjFFRUZGIi8+PC9zdmc+";

/**
 * Fixed image ratios prevent layout shifts while images load.
 */
const aspectRatioClasses: Record<ImageAspectRatio, string> = {
  preview: "aspect-[16/10]",
  phone: "aspect-[780/1688]",
  portrait: "aspect-[4/5]",
  square: "aspect-square",
  video: "aspect-video",
  social: "aspect-[1200/630]",
};

/**
 * Default responsive source sizes for common Writespace layouts.
 */
const responsiveSizes: Record<ImageAspectRatio, string> = {
  preview: "(max-width: 767px) 84vw, (max-width: 1023px) 70vw, 33vw",
  phone: "(max-width: 767px) 26vw, 104px",
  portrait: "(max-width: 1023px) 90vw, 36vw",
  square: "(max-width: 767px) 40vw, 160px",
  video: "(max-width: 767px) 90vw, (max-width: 1023px) 70vw, 50vw",
  social: "1200px",
};

export function ResponsiveImage({
  asset,
  aspectRatio,
  sizes,
  fit = "cover",
  className,
  imageClassName,
  priority = false,
}: ResponsiveImageProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-lavender",
        aspectRatioClasses[aspectRatio],
        className,
      )}
    >
      <Image
        src={asset.src}
        alt={asset.alt}
        width={asset.width}
        height={asset.height}
        sizes={sizes ?? responsiveSizes[aspectRatio]}
        priority={priority}
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        className={cn(
          "absolute inset-0 h-full w-full",
          fit === "cover" ? "object-cover" : "object-contain",
          imageClassName,
        )}
      />
    </div>
  );
}
