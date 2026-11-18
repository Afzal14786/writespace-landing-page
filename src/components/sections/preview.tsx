import {
  Badge,
  BrowserFrame,
  Card,
  Container,
  Heading,
  PhoneFrame,
  ResponsiveImage,
  Reveal,
  Section,
} from "@/components/ui";

import type { ReactNode } from "react";

import { assets } from "@/lib/assets";

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

        {/* Responsive product preview collection */}
        <div
          aria-label="Writespace product design previews"
          className="-mx-page-gutter mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-page-gutter pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0 lg:snap-none"
        >
          {/* Feed preview */}
          <Reveal className="w-[84%] max-w-[34rem] shrink-0 snap-start lg:w-auto lg:max-w-none">
            <PreviewCard title="Feed">
              <div className="relative">
                <BrowserFrame aria-label="Desktop feed browser preview">
                  <ResponsiveImage
                    asset={assets.previews.feedDesktop}
                    aspectRatio="preview"
                    sizes="(min-width: 1024px) 28vw, 84vw"
                  />
                </BrowserFrame>

                {/* Mobile feed screenshot layered over desktop preview */}
                <div className="absolute right-2 top-1/2 z-10 w-[26%] max-w-24 -translate-y-1/2">
                  <PhoneFrame aria-label="Mobile feed design preview">
                    <ResponsiveImage
                      asset={assets.previews.feedPhone}
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
                <ResponsiveImage
                  asset={assets.previews.articleDesktop}
                  aspectRatio="preview"
                  sizes="(min-width: 1024px) 28vw, 84vw"
                />
              </BrowserFrame>
            </PreviewCard>
          </Reveal>

          {/* Writing screen preview */}
          <Reveal className="w-[84%] max-w-[34rem] shrink-0 snap-start lg:w-auto lg:max-w-none">
            <PreviewCard title="Writing screen">
              <BrowserFrame aria-label="Writing screen browser preview">
                <ResponsiveImage
                  asset={assets.previews.composerDesktop}
                  aspectRatio="preview"
                  sizes="(min-width: 1024px) 28vw, 84vw"
                />
              </BrowserFrame>
            </PreviewCard>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
