import { Card, Container, Heading, Reveal, Section } from "@/components/ui";

import { WritePreview } from "@/components/mocks/write-preview";
import { ConnectPreview } from "@/components/mocks/connect-preview";
import { ComeBackPreview } from "@/components/mocks/come-back-preview";

export function Benefits() {
  return (
    <Section id="features" background="lavender">
      <Container>
        {/* Section heading */}
        <Reveal>
          <div className="max-w-copy">
            <Heading level={2}>
              Everything you need to write, and be read.
            </Heading>
          </div>
        </Reveal>

        {/* Benefit cards */}
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {/* Write */}
          <Reveal className="h-full">
            <Card className="flex h-full flex-col p-5 sm:p-6">
              <div>
                <Heading level={3}>Write</Heading>

                <p className="mt-3 font-copy text-sm leading-7 text-body sm:text-base">
                  Posts for quick thoughts, Articles for deep dives. Draft,
                  schedule, and publish when it’s ready. Links look great when
                  shared.
                </p>
              </div>

              <div className="mt-auto pt-7">
                <WritePreview />
              </div>
            </Card>
          </Reveal>

          {/* Connect */}
          <Reveal className="h-full">
            <Card className="flex h-full flex-col p-5 sm:p-6">
              <div>
                <Heading level={3}>Connect</Heading>

                <p className="mt-3 font-copy text-sm leading-7 text-body sm:text-base">
                  Conversations that stay readable. React in more than one way,
                  reply in threads, and follow the people worth reading.
                </p>
              </div>

              <div className="mt-auto pt-7">
                <ConnectPreview />
              </div>
            </Card>
          </Reveal>

          {/* Come back */}
          <Reveal className="h-full">
            <Card className="flex h-full flex-col p-5 sm:p-6">
              <div>
                <Heading level={3}>Come back</Heading>

                <p className="mt-3 font-copy text-sm leading-7 text-body sm:text-base">
                  Never lose a good read. Save what matters, and know the moment
                  someone reacts or replies.
                </p>
              </div>

              <div className="mt-auto pt-7">
                <ComeBackPreview />
              </div>
            </Card>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
