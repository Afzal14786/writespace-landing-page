import { Card, Container, Heading, Section } from "@/components/ui";

const audiences = [
  "Developers who write.",
  "Open-source maintainers.",
  "Students building in public.",
  "Technical communities.",
] as const;

export function Audience() {
  return (
    <Section id="audience" background="paper">
      <Container>
        <div className="max-w-copy">
          <Heading level={2}>Who it’s for</Heading>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((audience) => (
            <Card
              key={audience}
              className="flex min-h-28 items-center gap-3 p-5"
            >
              <span
                aria-hidden="true"
                className="size-2 shrink-0 rounded-full bg-violet"
              />

              <p className="font-copy text-sm font-semibold leading-6 text-ink">
                {audience}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
