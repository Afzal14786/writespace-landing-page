/**
 * Writespace asset manifest.
 *
 * This is the central registry for public images, brand assets,
 * video files, and original editing sources.
 *
 * Keep paths, alt text, and intrinsic dimensions here rather than
 * scattering asset information throughout components.
 */

export type ImageAsset = {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
};

export type BrandAsset = {
  readonly src: string;
  readonly alt: string;
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
    // Dark emblem for the light Writespace landing page.
    emblem: {
      src: "/images/brand/writespace-emblem-monochrome-black.svg",
      alt: "Writespace circular vintage pen emblem.",
    },

    // White emblem reserved for dark backgrounds.
    emblemOnDark: {
      src: "/images/brand/writespace-emblem-monochrome-white.svg",
      alt: "Writespace white circular pen emblem.",
    },

    monochromeBlack: {
      src: "/images/brand/writespace-emblem-monochrome-black.svg",
      alt: "Writespace monochrome black emblem.",
    },

    monochromeWhite: {
      src: "/images/brand/writespace-emblem-monochrome-white.svg",
      alt: "Writespace monochrome white emblem.",
    },

    wordmark: {
      src: "/images/brand/writespace-wordmark.svg",
      alt: "Writespace wordmark.",
    },

    appIcon: {
      src: "/images/brand/writespace-app-icon.svg",
      alt: "Writespace application icon.",
    },

    favicon: {
      src: "/images/brand/favicon.svg",
      alt: "Writespace favicon.",
    },

    // Browser tab icon.
    favicon32: {
      src: "/images/brand/favicon-32.png",
      alt: "Writespace 32 pixel browser icon.",
      width: 32,
      height: 32,
    },

    // iOS home-screen icon.
    appleTouchIcon: {
      src: "/images/brand/apple-touch-icon.png",
      alt: "Writespace Apple touch icon.",
      width: 180,
      height: 180,
    },

    // 512px application icon, available for a future web app manifest.
    appIcon512: {
      src: "/images/brand/app-icon-512.png",
      alt: "Writespace application icon, 512 pixel export.",
      width: 512,
      height: 512,
    },

    // High-resolution application icon.
    appIconPng: {
      src: "/images/brand/writespace-app-icon-1024.png",
      alt: "Writespace application icon.",
      width: 1024,
      height: 1024,
    },

    emblem512: {
      src: "/images/brand/writespace-emblem-512.png",
      alt: "Writespace emblem, 512 pixel export.",
      width: 512,
      height: 512,
    },

    emblem1024: {
      src: "/images/brand/writespace-emblem-1024.png",
      alt: "Writespace emblem, 1024 pixel export.",
      width: 1024,
      height: 1024,
    },

    emblemDark1024: {
      src: "/images/brand/writespace-emblem-dark-1024.png",
      alt: "Writespace dark emblem, 1024 pixel export.",
      width: 1024,
      height: 1024,
    },

    wordmarkPng: {
      src: "/images/brand/writespace-wordmark.png",
      alt: "Writespace wordmark raster export.",
      width: 1240,
      height: 240,
    },

    presentationPng: {
      src: "/images/brand/writespace-brand-presentation.png",
      alt: "Writespace brand identity presentation.",
      width: 1200,
      height: 760,
    },

    presentationSvg: {
      src: "/images/brand/writespace-brand-presentation.svg",
      alt: "Writespace vector brand identity presentation.",
    },
  },

  illustrations: {
    cta: {
      src: "/images/illustrations/cta-illustration.svg",
      alt: "Decorative illustration for the Writespace call to action.",
      width: 480,
      height: 360,
    },

    featureWrite: {
      src: "/images/illustrations/feature-write.svg",
      alt: "Illustration representing writing Posts and Articles.",
      width: 480,
      height: 360,
    },

    featureConnect: {
      src: "/images/illustrations/feature-connect.svg",
      alt: "Illustration representing conversations and threaded replies.",
      width: 480,
      height: 360,
    },

    featureComeBack: {
      src: "/images/illustrations/feature-come-back.svg",
      alt: "Illustration representing saved content and notifications.",
      width: 480,
      height: 360,
    },

    heroAccent: {
      src: "/images/illustrations/hero-accent.svg",
      alt: "Decorative Writespace hero accent.",
      width: 480,
      height: 360,
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

  previews: {
    // Desktop screens.
    feedDesktop: {
      src: "/images/previews/feed-desktop.webp",
      alt: "Writespace desktop preview showing a Post and an Article together in a social writing interface.",
      width: 1600,
      height: 1000,
    },

    articleDesktop: {
      src: "/images/previews/article-desktop.webp",
      alt: "Writespace desktop article preview showing a long-form technical article.",
      width: 1586,
      height: 992,
    },

    composerDesktop: {
      src: "/images/previews/composer-desktop.webp",
      alt: "Writespace desktop writing preview showing the article composer and publishing controls.",
      width: 1586,
      height: 992,
    },

    // Mobile screens.
    feedPhone: {
      src: "/images/previews/feed-phone.webp",
      alt: "Writespace mobile preview showing Posts and Articles in a vertical layout.",
      width: 853,
      height: 1844,
    },

    articlePhone: {
      src: "/images/previews/article-phone.webp",
      alt: "Writespace mobile article preview showing the article cover, reading content, and discussion.",
      width: 852,
      height: 1846,
    },

    composerPhone: {
      src: "/images/previews/composer-phone.webp",
      alt: "Writespace mobile composer preview showing article writing and publishing controls.",
      width: 853,
      height: 1844,
    },
  },

  video: {
    hero: {
      alt: "A short looping visual introducing Writespace.",

      poster: {
        src: "/video/posters/hero-poster.webp",
        alt: "Poster image for the Writespace hero video.",
        width: 1280,
        height: 800,
      },

      mp4: {
        src: "/video/hero-loop.mp4",
        type: "video/mp4",
        alt: "Writespace hero video in MP4 format.",
        width: 1280,
        height: 800,
      },

      webm: {
        src: "/video/hero-loop.webm",
        type: "video/webm",
        alt: "Writespace hero video in WebM format.",
        width: 1280,
        height: 800,
      },

      width: 1280,
      height: 800,
    },
  },

  /*
   * Original source videos.
   *
   * These remain outside public/ because they are editing sources,
   * not files intended for direct browser delivery.
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
