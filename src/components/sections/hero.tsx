import { Badge, Button, Container, Reveal, Section } from "@/components/ui";

import { HeroHeadline } from "./hero-headline";

import { ArticleCard } from "@/components/mocks/article-card";
import { NotificationPill } from "@/components/mocks/notification-pill";
import { PostCard } from "@/components/mocks/post-card";

import { site } from "@/content/site";

export function Hero() {
  return (
    <Section id="top" background="paper">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
          {/* Left: Hero content */}
          <div className="max-w-copy">
            <Badge variant="lavender">{site.hero.badge}</Badge>

            <Reveal>
              <HeroHeadline />
            </Reveal>

            <p className="mt-6 max-w-copy font-copy text-lg leading-8 text-body">
              {site.hero.description}
            </p>

            {/* Hero actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                href={site.hero.primaryAction.href}
                size="lg"
                className="w-full sm:w-auto"
              >
                {site.hero.primaryAction.label}
              </Button>

              <Button
                href={site.hero.secondaryAction.href}
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                {site.hero.secondaryAction.label}
              </Button>
            </div>

            <p className="mt-5 font-copy text-sm text-muted">
              {site.hero.reassurance}
            </p>
          </div>

          {/* Right: Static product mock cards */}
          <div className="relative mx-auto w-full max-w-xl pb-2 lg:mx-0 lg:pb-10">
            {/* Post preview */}
            <div className="relative z-20 lg:-rotate-2">
              <Reveal>
                <PostCard />
              </Reveal>
            </div>

            {/* Article preview */}
            <div className="relative z-10 mt-5 lg:-mt-5 lg:ml-8 lg:rotate-[1.5deg]">
              <Reveal>
                <ArticleCard />
              </Reveal>
            </div>

            {/* Floating notification */}
            <div className="relative z-30 mt-4 flex justify-start sm:justify-end lg:absolute lg:-right-2 lg:bottom-0 lg:mt-0">
              <Reveal>
                <NotificationPill />
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
