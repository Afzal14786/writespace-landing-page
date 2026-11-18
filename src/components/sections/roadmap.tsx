import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import {
  Badge,
  Card,
  Container,
  Heading,
  Reveal,
  Section,
} from "@/components/ui";

import type { BadgeVariant } from "@/components/ui";

type RoadmapStatus = "Done" | "Building now" | "Next";

type RoadmapItem = {
  id: string;
  number: string;
  title: string;
  description: string;
  status: RoadmapStatus;
};

const roadmapItems: RoadmapItem[] = [
  {
    id: "backend",
    number: "01",
    title: "The backend",
    description: "Content, reactions, comments, and notifications.",
    status: "Done",
  },
  {
    id: "web-app",
    number: "02",
    title: "The web app",
    description: "The web application is being built now.",
    status: "Building now",
  },
  {
    id: "mobile-apps",
    number: "03",
    title: "Mobile apps",
    description: "The next product milestone after the web app.",
    status: "Next",
  },
];

const statusVariants = {
  Done: "lavender",
  "Building now": "coral",
  Next: "peach",
} satisfies Record<RoadmapStatus, BadgeVariant>;

/* Replace this placeholder with the actual public repository URL. */
const GITHUB_PROGRESS_URL = "https://writespace.gitbook.io/writespace-docs";

export function Roadmap() {
  return (
    <Section id="roadmap" background="paper">
      <Container>
        <Reveal>
          <div className="max-w-copy">
            <Heading level={2}>The roadmap</Heading>

            <p className="mt-4 font-copy text-base leading-7 text-body sm:text-lg">
              The backend is built. Here&apos;s what comes next.
            </p>
          </div>
        </Reveal>

        {/* Roadmap milestones */}
        <div className="mt-9 grid gap-4 lg:grid-cols-3">
          {roadmapItems.map((item) => (
            <Reveal key={item.id} className="h-full">
              <Card className="h-full p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-code text-xs font-medium text-muted">
                    {item.number}
                  </span>

                  <Badge variant={statusVariants[item.status]}>
                    {item.status}
                  </Badge>
                </div>

                <h3 className="mt-6 font-headline text-2xl font-semibold tracking-tight text-ink">
                  {item.title}
                </h3>

                <p className="mt-3 font-copy text-sm leading-7 text-body">
                  {item.description}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>

        {/* External progress link */}
        <div className="mt-8">
          <Link
            href={GITHUB_PROGRESS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-copy text-sm font-semibold text-coral-text underline decoration-transparent underline-offset-4 hover:decoration-current focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-violet"
          >
            Follow the documentation to get more details about this project
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
