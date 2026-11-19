import type { LucideIcon } from "lucide-react";
import { Bookmark, FileText, MessageCircle, Share2 } from "lucide-react";

import { Card, Container, Heading, Reveal, Section } from "@/components/ui";

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

const cardLayout: Record<string, string> = {
  write: "lg:col-span-2 lg:row-span-2 lg:min-h-[620px]",
  connect: "lg:col-span-2 lg:min-h-[298px]",
  "come-back": "lg:min-h-[298px]",
  share: "lg:min-h-[298px]",
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
    <Reveal className={cardLayout[item.id] ?? ""}>
      <Card
        className={[
          "group relative flex h-full min-h-[350px] flex-col",
          "overflow-hidden rounded-panel border border-line bg-surface p-7",
          "transition-[box-shadow,transform] duration-200",
          "hover:shadow-soft",
        ].join(" ")}
      >
        <div className="relative z-10">
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

        {/* Mini interface mock sits toward the bottom of each bento card. */}
        <div className="relative z-0 mt-auto pt-8">
          <div className="-mb-7 -mr-7 ml-2">
            <BenefitMock id={item.id} />
          </div>
        </div>
      </Card>
    </Reveal>
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

        <div className="mt-10 grid auto-rows-fr grid-cols-1 gap-5 md:grid-cols-2 lg:min-h-[620px] lg:grid-cols-4 lg:gap-6">
          {site.benefits.items.map((item) => (
            <BenefitCard key={item.id} item={item} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
