import Image from "next/image";

import { Card, Container, Heading, Section } from "@/components/ui";

/*
 * Replace this path when the real founder portrait is available.
 * The container and image layout will remain unchanged.
 */
const FOUNDER_IMAGE = "/images/founder/founder-portrait-placeholder.svg";

export function FounderNote() {
  return (
    <Section id="founder" background="peach">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          {/* Portrait: first on mobile, left on desktop */}
          <div className="mx-auto w-full max-w-md lg:mx-0">
            <div className="aspect-[4/5] overflow-hidden rounded-panel border border-line bg-lavender shadow-card">
              <Image
                src={FOUNDER_IMAGE}
                alt="Placeholder illustration for the Writespace founder portrait."
                width={720}
                height={900}
                sizes="(min-width: 1024px) 36vw, 90vw"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Founder note */}
          <Card className="p-6 sm:p-8 lg:p-10">
            <p className="font-code text-xs font-medium uppercase tracking-wider text-muted">
              A note from the founder
            </p>

            <Heading level={2} className="mt-4">
              Why I&apos;m building Writespace
            </Heading>

            <div className="mt-6 space-y-4 font-copy text-base leading-8 text-body">
              <p>
                I&apos;m Afzal. I kept seeing great technical ideas scattered across
                notes, gists, and short posts that disappear.
              </p>

              <p>
                So I started building Writespace, a home for both quick thoughts
                and deep articles. The backend is done and the app is next.
              </p>

              <p>Join the waitlist and tell me what you&apos;d write first.</p>

              <p className="pt-2 font-semibold text-ink">Md Afzal Ansari</p>
            </div>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
