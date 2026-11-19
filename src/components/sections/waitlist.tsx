import { Sparkles } from "lucide-react";

import { Container, Heading, Reveal, Section } from "@/components/ui";

import { WaitlistForm } from "@/components/sections/waitlist-form";
import { site } from "@/content/site";

export function Waitlist() {
  return (
    <Section
      id="waitlist"
      background="ink"
      className="relative isolate overflow-hidden"
    >
      {/* Decorative glow and sparkles stay behind the form. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(136,120,240,0.18)_0%,rgba(136,120,240,0.08)_42%,transparent_72%)] blur-2xl"
      />

      <Sparkles
        aria-hidden="true"
        className="pointer-events-none absolute left-[12%] top-[24%] size-5 text-violet/70"
      />

      <Sparkles
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[22%] right-[13%] size-4 text-coral/80"
      />

      <Container>
        <div className="relative mx-auto max-w-[640px] text-center">
          <Reveal>
            <Heading
              level={2}
              className="text-[30px] leading-[36px] text-surface md:text-[40px] md:leading-[46px]"
            >
              {site.waitlist.heading}
            </Heading>

            <p className="mx-auto mt-5 max-w-[540px] font-copy text-lg leading-8 text-[#D8D4E4]">
              {site.waitlist.description}
            </p>
          </Reveal>

          <Reveal>
            <WaitlistForm />
          </Reveal>

          <p className="mt-5 font-copy text-sm leading-6 text-[#D8D4E4]">
            {site.waitlist.privacyNote}
          </p>
        </div>
      </Container>
    </Section>
  );
}
