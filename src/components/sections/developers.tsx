import type { LucideIcon } from "lucide-react";
import { AtSign, Code2, GitBranch, Link2, LockKeyhole } from "lucide-react";

import { Container, Heading, Section } from "@/components/ui";

import { site } from "@/content/site";

const pointIcons: Record<string, LucideIcon> = {
  github: GitBranch,
  lock: LockKeyhole,
  "at-sign": AtSign,
  "link-2": Link2,
};

const stageStyles = {
  violet: {
    dot: "bg-violet",
    status: "bg-violet/15 text-[#C7BEFF]",
  },
  amber: {
    dot: "bg-amber-400",
    status: "bg-amber-400/15 text-amber-200",
  },
  coral: {
    dot: "bg-coral",
    status: "bg-coral/15 text-coral",
  },
} as const;

export function Developers() {
  const content = site.developers;

  return (
    <Section id="developers" background="ink">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Section introduction */}
          <div className="lg:col-span-5">
            <p className="font-mono text-[13px] tracking-[0.16em] text-violet">
              {content.eyebrow}
            </p>

            <Heading level={2} className="mt-4 text-surface">
              {content.heading}
            </Heading>

            <p className="mt-5 max-w-copy font-copy text-base leading-7 text-[#D8D4E4] sm:text-[17px]">
              {content.description}
            </p>
          </div>

          {/* Draft → Scheduled → Published pipeline */}
          <div className="lg:col-span-7">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute left-[16%] right-[16%] top-[22px] hidden h-px bg-white/20 sm:block"
              />

              <ol
                aria-label="Example publishing workflow"
                className="relative grid grid-cols-1 gap-4 sm:grid-cols-3"
              >
                {content.pipeline.stages.map((stage) => {
                  const style = stageStyles[stage.color];

                  return (
                    <li
                      key={stage.id}
                      className="relative rounded-panel border border-white/10 bg-[#231E4D] p-4 sm:min-h-[205px] sm:p-5"
                    >
                      <div className="relative z-10 flex items-center gap-2">
                        <span
                          aria-hidden="true"
                          className={`size-2.5 shrink-0 rounded-full ring-4 ring-[#231E4D] ${style.dot}`}
                        />

                        <span className="font-mono text-xs tracking-wide text-surface/90">
                          {stage.label}
                        </span>
                      </div>

                      <h3 className="mt-6 font-headline text-lg font-semibold leading-snug text-surface">
                        {content.pipeline.title}
                      </h3>

                      <p className="mt-3 font-copy text-sm leading-6 text-[#D8D4E4]">
                        {stage.description}
                      </p>

                      <span
                        className={`mt-5 inline-flex rounded-pill px-3 py-1 font-mono text-[11px] ${style.status}`}
                      >
                        {stage.statusText}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>

        {/* Supporting developer-focused capabilities */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {content.points.map((point) => {
            const PointIcon = pointIcons[point.icon] ?? Code2;

            return (
              <article
                key={point.id}
                className="group rounded-panel border border-white/10 bg-white/[0.035] p-5 transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="grid size-10 place-items-center rounded-full bg-white/10 text-violet transition-colors duration-200 group-hover:bg-coral group-hover:text-ink">
                  <PointIcon aria-hidden="true" className="size-5" />
                </div>

                <h3 className="mt-5 font-copy text-[17px] font-semibold text-surface">
                  {point.title}
                </h3>

                <p className="mt-2 font-copy text-[15px] leading-6 text-[#D8D4E4]">
                  {point.description}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
