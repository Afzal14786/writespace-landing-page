"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { Card, Container, Heading, Section } from "@/components/ui";

type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

const faqItems: FAQItem[] = [
  {
    id: "opening",
    question: "When does it open?",
    answer:
      "Writespace is opening soon. Join the waitlist to hear when the doors open.",
  },
  {
    id: "pricing",
    question: "Is it free?",
    answer:
      "Yes, this is completely free, where you can write, share your thought and engage with other developers and many more features are comming soon",
  },
  {
    id: "mobile-app",
    question: "Will there be a mobile app?",
    answer: "Yes. Mobile apps are planned after the web app.",
  },
  {
    id: "open-source",
    question: "Is it open source?",
    answer:
      "No, the code is not available publically, but yes you can go through the documentation which is available.",
  },
  {
    id: "audience",
    question: "Who is it for?",
    answer:
      "Writespace is for developers and technical communities or for those students who loves to build in public.",
  },
];

export function FAQ() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  function toggleItem(id: string) {
    setOpenItem((current) => (current === id ? null : id));
  }

  return (
    <Section id="faq" background="paper">
      <Container>
        <div className="mx-auto max-w-copy">
          <Heading level={2}>Frequently asked questions</Heading>

          <p className="mt-4 font-copy text-base leading-7 text-body">
            A few things you might be wondering about.
          </p>

          <Card className="mt-8 divide-y divide-line px-5 sm:px-7">
            {faqItems.map((item) => {
              const isOpen = openItem === item.id;

              const triggerId = `faq-trigger-${item.id}`;
              const answerId = `faq-answer-${item.id}`;

              return (
                <div key={item.id} className="py-1">
                  <h3>
                    <button
                      id={triggerId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() => toggleItem(item.id)}
                      className="flex min-h-16 w-full items-center justify-between gap-4 rounded-card py-4 text-left focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-violet"
                    >
                      <span className="font-copy text-sm font-semibold leading-6 text-ink sm:text-base">
                        {item.question}
                      </span>

                      <ChevronDown
                        size={19}
                        aria-hidden="true"
                        className={`shrink-0 text-muted ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </h3>

                  <div
                    id={answerId}
                    role="region"
                    aria-labelledby={triggerId}
                    hidden={!isOpen}
                    className="pb-5 pr-8"
                  >
                    <p className="font-copy text-sm leading-7 text-body">
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </Card>
        </div>
      </Container>
    </Section>
  );
}
