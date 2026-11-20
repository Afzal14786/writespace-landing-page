import type { LucideIcon } from "lucide-react";
import { Bookmark, FileText, MessageCircle, Share2 } from "lucide-react";

import {
  Card,
  Container,
  Heading,
  Reveal,
  Section,
  Stagger,
  StaggerItem,
  TiltCard,
} from "@/components/ui";

import { ComeBackPreview } from "@/components/mocks/come-back-preview";
import { ConnectPreview } from "@/components/mocks/connect-preview";
import { SharePreview } from "@/components/mocks/share-preview";
import { WritePreview } from "@/components/mocks/write-preview";

import type { BenefitItem } from "@/content/site";
import { site } from "@/content/site";

const benefitIcons: Record<string, LucideIcon> = {
  "file-pen-line": FileText,
  "messages-square": MessageCircle,
  bookmark: Bookmark,
  "share-2": Share2,
};

function BenefitMock({ id }: { id: string }) {
  switch (id) {
    case "write":
      return <WritePreview />;
    case "connect":
      return <ConnectPreview />;
    case "come-back":
      return <ComeBackPreview />;
    case "share":
      return <SharePreview />;
    default:
      return null;
  }
}

function BenefitCard({ item }: { item: BenefitItem }) {
  const Icon = benefitIcons[item.icon] ?? FileText;

  return (
    <StaggerItem className="h-full">
      <TiltCard className="h-full">
        <Card
          className={[
            "group flex h-full min-h-[390px] flex-col",
            "overflow-hidden rounded-panel border border-line",
            "bg-surface p-6 shadow-card sm:p-7",
            "transition-shadow duration-200 hover:shadow-soft",
          ].join(" ")}
        >
          {/* Feature identity and description stay consistently aligned. */}
          <div>
            <span
              aria-hidden="true"
              className={[
                "grid size-12 place-items-center rounded-2xl",
                item.id === "connect" || item.id === "share"
                  ? "bg-peach text-coral-text"
                  : "bg-lavender text-violet",
              ].join(" ")}
            >
              <Icon className="size-5" strokeWidth={1.8} />
            </span>

            <Heading level={3} className="mt-5">
              {item.title}
            </Heading>

            <p className="mt-3 max-w-[38rem] font-copy text-sm leading-7 text-body sm:text-base">
              {item.description}
            </p>
          </div>

          {/* Keep the preview close to its feature description. */}
          <div className="mt-6 w-full">
            <BenefitMock id={item.id} />
          </div>
        </Card>
      </TiltCard>
    </StaggerItem>
  );
}

export function Benefits() {
  return (
    <Section id="features" background="lavender">
      <Container>
        <Reveal>
          <div className="max-w-copy">
            <Heading level={2}>{site.benefits.heading}</Heading>

            <p className="mt-4 font-copy text-base leading-7 text-body sm:text-[17px]">
              {site.benefits.description}
            </p>
          </div>
        </Reveal>

        {/* Four equally sized cards create a balanced, readable grid. */}
        <Stagger className="mt-10 grid auto-rows-fr grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
          {site.benefits.items.map((item) => (
            <BenefitCard key={item.id} item={item} />
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
