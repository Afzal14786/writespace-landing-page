import { ArrowDown, ArrowRight } from "lucide-react";

import { Card, Container, Heading, Reveal, Section } from "@/components/ui";
import { site } from "@/content/site";

const chipRotations = [
  "-rotate-[3deg]",
  "rotate-[2deg]",
  "-rotate-[1deg]",
] as const;

export function Problem() {
  return (
    <Section id="problem" background="paper">
      <Container>
        <div className="mx-auto max-w-[720px] text-center">
          <Reveal>
            <Heading level={2}>{site.problem.heading}</Heading>
          </Reveal>

          <p className="mx-auto mt-5 max-w-[680px] font-copy text-base leading-7 text-body sm:text-[17px] sm:leading-7">
            {site.problem.description}
          </p>
        </div>

        {/* Scattered sources lead into one Writespace destination. */}
        <div className="mx-auto mt-12 flex max-w-[1000px] flex-col items-center gap-6 lg:flex-row lg:justify-center lg:gap-7">
          <div className="flex w-full flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-4">
            {site.problem.sources.map((source, index) => (
              <div
                key={source}
                className={`flex min-h-12 w-full max-w-[230px] items-center justify-center rounded-pill border border-dashed border-violet/50 bg-surface/60 px-5 py-3 shadow-card ${chipRotations[index]}`}
              >
                <span className="font-copy text-sm font-medium text-body">
                  {source}
                </span>
              </div>
            ))}
          </div>

          <ArrowDown
            aria-hidden="true"
            className="size-6 shrink-0 text-violet lg:hidden"
          />

          <ArrowRight
            aria-hidden="true"
            className="hidden size-6 shrink-0 text-violet lg:block"
          />

          <Reveal className="w-full max-w-[340px]">
            <Card className="flex min-h-[112px] items-center gap-4 p-5 sm:p-6">
              <div
                aria-hidden="true"
                className="grid size-14 shrink-0 place-items-center rounded-panel bg-ink font-headline text-3xl font-semibold text-surface"
              >
                W
              </div>

              <div className="min-w-0">
                <h3 className="font-headline text-2xl font-semibold tracking-tight text-ink">
                  Writespace
                </h3>

                <p className="mt-1 font-copy text-sm leading-6 text-body">
                  {site.problem.destination}
                </p>
              </div>
            </Card>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
