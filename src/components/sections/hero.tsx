import { Badge, Button, Container, Section, Squiggle } from "@/components/ui";

import { ArticleCard } from "@/components/mocks/article-card";
import { NotificationPill } from "@/components/mocks/notification-pill";
import { PostCard } from "@/components/mocks/post-card";

export function Hero() {
  return (
    <Section id="top" background="paper">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
          {/* Left: Hero content */}
          <div className="max-w-copy">
            <Badge variant="lavender">Early access, opening soon</Badge>

            <h1 className="mt-7 font-headline text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
              <span className="block">Think out loud.</span>

              <span className="mt-1 block">
                Then{" "}
                <Squiggle>
                  <span className="text-coral-text">go deep.</span>
                </Squiggle>
              </span>
            </h1>

            <p className="mt-6 max-w-copy font-copy text-base leading-7 text-body sm:text-lg sm:leading-8">
              A home for developers to share quick thoughts and long-form
              articles, and get real conversations back.
            </p>

            {/* Hero actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="#waitlist" size="lg" className="w-full sm:w-auto">
                Get early access
              </Button>

              <Button
                href="#features"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                See how it works
              </Button>
            </div>

            <p className="mt-5 font-copy text-sm text-muted">
              One email when the doors open. No spam.
            </p>
          </div>

          {/* Right: Static product previews */}
          <div className="relative mx-auto w-full max-w-xl pb-2 lg:mx-0 lg:pb-10">
            {/* Post preview */}
            <div className="relative z-20 lg:-rotate-2">
              <PostCard />
            </div>

            {/* Article preview */}
            <div className="relative z-10 mt-5 lg:-mt-5 lg:ml-8 lg:rotate-[1.5deg]">
              <ArticleCard />
            </div>

            {/* Floating notification */}
            <div className="relative z-30 mt-4 flex justify-start sm:justify-end lg:absolute lg:-right-2 lg:bottom-0 lg:mt-0">
              <NotificationPill />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
