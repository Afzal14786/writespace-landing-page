import { ArrowDown, ArrowRight } from "lucide-react";

import { Card, Container, Heading, Reveal, Section } from "@/components/ui";

export function Problem() {
  return (
    <Section id="problem" background="paper">
      <Container>
        <div className="mx-auto max-w-content">
          {/* Section introduction */}
          <div className="max-w-copy">
            <Reveal>
              <Heading level={2}>
                Your best ideas deserve better than a notes app.
              </Heading>
            </Reveal>

            <p className="mt-5 font-copy text-base leading-7 text-body sm:text-lg sm:leading-8">
              Great ideas end up in notes apps, half-written gists, and posts
              that vanish in a day. Writespace gives them one place to live and
              be found.
            </p>
          </div>

          {/* Sources flowing into Writespace */}
          <div className="mt-10 grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-3 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:grid-rows-3 lg:items-center lg:gap-x-6">
            {/* Source 1 */}
            <div className="col-start-1 row-start-1 flex min-h-12 items-center rounded-pill border border-line bg-surface px-4 py-3 shadow-card">
              <span className="font-copy text-sm font-medium text-body">
                Notes app
              </span>
            </div>

            <ArrowDown
              aria-hidden="true"
              className="col-start-2 row-start-1 size-5 text-violet lg:hidden"
            />

            <ArrowRight
              aria-hidden="true"
              className="hidden size-5 text-violet lg:col-start-2 lg:row-start-1 lg:block"
            />

            {/* Source 2 */}
            <div className="col-start-1 row-start-2 flex min-h-12 items-center rounded-pill border border-line bg-surface px-4 py-3 shadow-card">
              <span className="font-copy text-sm font-medium text-body">
                Half-written gist
              </span>
            </div>

            <ArrowDown
              aria-hidden="true"
              className="col-start-2 row-start-2 size-5 text-violet lg:hidden"
            />

            <ArrowRight
              aria-hidden="true"
              className="hidden size-5 text-violet lg:col-start-2 lg:row-start-2 lg:block"
            />

            {/* Source 3 */}
            <div className="col-start-1 row-start-3 flex min-h-12 items-center rounded-pill border border-line bg-surface px-4 py-3 shadow-card">
              <span className="font-copy text-sm font-medium text-body">
                A post from last week
              </span>
            </div>

            <ArrowDown
              aria-hidden="true"
              className="col-start-2 row-start-3 size-5 text-violet lg:hidden"
            />

            <ArrowRight
              aria-hidden="true"
              className="hidden size-5 text-violet lg:col-start-2 lg:row-start-3 lg:block"
            />

            {/* Destination */}
            <Reveal className="col-span-2 row-start-4 lg:col-span-1 lg:col-start-3 lg:row-start-1 lg:row-span-3">
              <Card className="flex min-h-32 items-center gap-4 p-5 sm:p-6">
                <div
                  aria-hidden="true"
                  className="grid size-14 shrink-0 place-items-center rounded-panel bg-lavender font-headline text-3xl font-semibold text-ink"
                >
                  W
                </div>

                <div className="min-w-0">
                  <h3 className="font-headline text-2xl font-semibold tracking-tight text-ink">
                    Writespace
                  </h3>

                  <p className="mt-1 font-copy text-sm leading-6 text-body">
                    Your place for Posts and Articles.
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-pill bg-lavender px-3 py-1 font-copy text-xs font-medium text-ink">
                      Posts
                    </span>

                    <span className="rounded-pill bg-peach px-3 py-1 font-copy text-xs font-medium text-ink">
                      Articles
                    </span>
                  </div>
                </div>
              </Card>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
