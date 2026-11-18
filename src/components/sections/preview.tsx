import Image from "next/image";
import type { ReactNode } from "react";

import {
  Badge,
  BrowserFrame,
  Card,
  Container,
  Heading,
  PhoneFrame,
  Reveal,
  Section,
} from "@/components/ui";

/*
 * Replace these placeholder paths with the real screenshot paths
 * once the Writespace frontend screenshots are available.
 */
const PREVIEW_IMAGES = {
  feedDesktop: "/images/previews/feed-desktop-placeholder.svg",
  articleDesktop: "/images/previews/article-desktop-placeholder.svg",
  composerDesktop: "/images/previews/composer-desktop-placeholder.svg",
  feedPhone: "/images/previews/feed-phone-placeholder.svg",
} as const;

type PreviewImageProps = {
  src: string;
  alt: string;
  aspectRatio: "desktop" | "phone";
  sizes: string;
};

function PreviewImage({ src, alt, aspectRatio, sizes }: PreviewImageProps) {
  const aspectClasses = {
    desktop: "aspect-[16/10]",
    phone: "aspect-[9/19]",
  };

  return (
    <div
      className={`relative w-full overflow-hidden bg-lavender ${aspectClasses[aspectRatio]}`}
    >
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
    </div>
  );
}

type PreviewCardProps = {
  title: string;
  children: ReactNode;
};

function PreviewCard({ title, children }: PreviewCardProps) {
  return (
    <Card className="h-full p-4 sm:p-5">
      <figure className="flex h-full flex-col gap-4">
        <figcaption className="font-headline text-xl font-semibold text-ink">
          {title}
        </figcaption>

        <div className="min-w-0">{children}</div>
      </figure>
    </Card>
  );
}

export function Preview() {
  return (
    <Section id="preview" background="paper">
      <Container>
        {/* Section introduction */}
        <Reveal>
          <div className="max-w-copy">
            <Badge variant="lavender">Early design preview</Badge>

            <Heading level={2} className="mt-5">
              A first look
            </Heading>

            <p className="mt-4 font-copy text-base leading-7 text-body sm:text-lg">
              Early design previews. The real thing is on its way.
            </p>
          </div>
        </Reveal>

        {/* Screenshot collection */}
        <div
          aria-label="Writespace product design previews"
          className="-mx-page-gutter mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-page-gutter pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0 lg:snap-none"
        >
          {/* Feed preview */}
          <Reveal className="w-[84%] max-w-[34rem] shrink-0 snap-start lg:w-auto lg:max-w-none">
            <PreviewCard title="Feed">
              <div className="relative">
                <BrowserFrame aria-label="Desktop feed browser preview">
                  <PreviewImage
                    src={PREVIEW_IMAGES.feedDesktop}
                    alt="Writespace desktop feed design preview showing the layout for browsing developer posts."
                    aspectRatio="desktop"
                    sizes="(min-width: 1024px) 28vw, 88vw"
                  />
                </BrowserFrame>

                <div className="absolute right-2 top-1/2 z-10 w-[26%] max-w-24 -translate-y-1/2">
                  <PhoneFrame aria-label="Mobile feed design preview">
                    <PreviewImage
                      src={PREVIEW_IMAGES.feedPhone}
                      alt="Writespace mobile feed design preview showing the feed layout on a phone screen."
                      aspectRatio="phone"
                      sizes="(min-width: 1024px) 90px, 25vw"
                    />
                  </PhoneFrame>
                </div>
              </div>
            </PreviewCard>
          </Reveal>

          {/* Article page preview */}
          <Reveal className="w-[84%] max-w-[34rem] shrink-0 snap-start lg:w-auto lg:max-w-none">
            <PreviewCard title="Article page">
              <BrowserFrame aria-label="Article page browser preview">
                <PreviewImage
                  src={PREVIEW_IMAGES.articleDesktop}
                  alt="Writespace article page design preview showing the reading layout for a long-form technical article."
                  aspectRatio="desktop"
                  sizes="(min-width: 1024px) 28vw, 88vw"
                />
              </BrowserFrame>
            </PreviewCard>
          </Reveal>

          {/* Writing screen preview */}
          <Reveal className="w-[84%] max-w-[34rem] shrink-0 snap-start lg:w-auto lg:max-w-none">
            <PreviewCard title="Writing screen">
              <BrowserFrame aria-label="Writing screen browser preview">
                <PreviewImage
                  src={PREVIEW_IMAGES.composerDesktop}
                  alt="Writespace writing screen design preview showing the composition area for creating an article."
                  aspectRatio="desktop"
                  sizes="(min-width: 1024px) 28vw, 88vw"
                />
              </BrowserFrame>
            </PreviewCard>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
