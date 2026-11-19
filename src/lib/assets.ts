/**
 * Writespace asset manifest.
 *
 * Keep public image and video paths in this file rather than
 * scattering string paths throughout UI components.
 *
 * Dimensions for existing preview SVGs and the founder placeholder
 * match the viewBoxes used when those placeholders were created.
 *
 * Dimensions for the other existing assets are provisional metadata.
 * Verify their actual intrinsic dimensions before using them in
 * size-sensitive layouts.
 */

export type ImageAsset = {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
};

export type VideoSourceAsset = ImageAsset & {
  readonly type: "video/mp4" | "video/webm";
};

export type RawVideoAsset = {
  readonly path: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
};

export const assets = {
  brand: {
    favicon: {
      src: "/images/brand/favicon.svg",
      alt: "Writespace brand mark.",
      width: 64,
      height: 64,
    },
  },

  illustrations: {
    cta: {
      src: "/images/illustrations/cta-illustration.svg",
      alt: "Writespace call-to-action illustration.",
      width: 1200,
      height: 900,
    },

    featureWrite: {
      src: "/images/illustrations/feature-write.svg",
      alt: "Illustration representing writing Posts and Articles.",
      width: 800,
      height: 600,
    },

    featureConnect: {
      src: "/images/illustrations/feature-connect.svg",
      alt: "Illustration representing conversations and threaded replies.",
      width: 800,
      height: 600,
    },

    featureComeBack: {
      src: "/images/illustrations/feature-come-back.svg",
      alt: "Illustration representing saved content and notifications.",
      width: 800,
      height: 600,
    },

    heroAccent: {
      src: "/images/illustrations/hero-accent.svg",
      alt: "Decorative Writespace hero accent.",
      width: 1200,
      height: 300,
    },
  },

  social: {
    openGraph: {
      src: "/images/og/og-share-image.png",
      alt: "Writespace social sharing preview.",
      width: 1200,
      height: 630,
    },
  },

  founder: {
    portrait: {
      src: "/images/founder/founder-portrait-placeholder.webp",
      alt: "Illustrated placeholder for the Writespace founder portrait.",
      width: 800,
      height: 1000,
    },
  },

  previews: {
    feedDesktop: {
      src: "/images/previews/feed-desktop.webp",
      alt: "Writespace desktop feed showing Posts and Articles.",
      width: 1600,
      height: 1000,
    },

    articleDesktop: {
      src: "/images/previews/article-desktop.webp",
      alt: "Writespace article reading page showing a long-form technical article.",
      width: 1600,
      height: 1000,
    },

    composerDesktop: {
      src: "/images/previews/composer-desktop.webp",
      alt: "Writespace writing screen showing the article composer and content status examples.",
      width: 1600,
      height: 1000,
    },

    feedPhone: {
      src: "/images/previews/feed-phone.webp",
      alt: "Writespace mobile feed showing the responsive Post and Article layouts.",
      width: 780,
      height: 1688,
    },
  },

  video: {
    hero: {
      alt: "A short looping visual introducing Writespace.",

      poster: {
        src: "/video/posters/hero-poster.webp",
        alt: "Poster image for the Writespace hero video.",
        width: 1920,
        height: 1080,
      },

      mp4: {
        src: "/video/hero-loop.mp4",
        type: "video/mp4",
        alt: "Writespace hero video in MP4 format.",
        width: 1920,
        height: 1080,
      },

      webm: {
        src: "/video/hero-loop.webm",
        type: "video/webm",
        alt: "Writespace hero video in WebM format.",
        width: 1920,
        height: 1080,
      },

      width: 1920,
      height: 1080,
    },
  },

  /*
   * Original editing assets.
   *
   * These files are intentionally kept outside public/.
   * They must be processed into optimized public/video files
   * before being referenced by a browser component.
   *
   * Dimensions here are provisional and should be checked using ffprobe.
   */
  rawSources: {
    fireflyHero: {
      path: "assets-src/video-raw/firefly-hero.mp4",
      alt: "Original Firefly hero video source.",
      width: 1920,
      height: 1080,
    },

    runwayHero: {
      path: "assets-src/video-raw/runway-hero.mp4",
      alt: "Original Runway hero video source.",
      width: 1920,
      height: 1080,
    },
  },
} as const;
