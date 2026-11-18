import {
  Avatar,
  Badge,
  Button,
  Card,
  Container,
  Heading,
  Section,
  Squiggle,
} from "@/components/ui";

export default function StyleguidePage() {
  return (
    <main>
      {/* Introduction */}
      <Section id="intro" background="paper">
        <Container>
          <div className="max-w-copy space-y-4">
            <Badge variant="lavender">Temporary styleguide</Badge>

            <Heading level={1} highlight="pieces">
              The small pieces behind Writespace
            </Heading>

            <p className="font-copy text-base leading-7 text-body md:text-lg">
              A visual check of the shared components, their variants, and the
              brand tokens they use.
            </p>
          </div>
        </Container>
      </Section>

      {/* Container and Section */}
      <Section id="container" background="lavender">
        <Container>
          <div className="space-y-6">
            <Heading level={2}>Container and section backgrounds</Heading>

            <Card className="border-dashed p-6">
              <p className="font-code text-sm text-muted">
                Container · max width 1152px · responsive side gutter
              </p>

              <p className="mt-3 text-body">
                This card sits inside the shared content container.
              </p>
            </Card>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-card border border-line bg-paper p-4 text-ink">
                <p className="font-code text-xs">paper</p>
              </div>

              <div className="rounded-card border border-line bg-lavender p-4 text-ink">
                <p className="font-code text-xs">lavender</p>
              </div>

              <div className="rounded-card border border-line bg-peach p-4 text-ink">
                <p className="font-code text-xs">peach</p>
              </div>

              <div className="rounded-card border border-ink bg-ink p-4 text-surface">
                <p className="font-code text-xs">ink</p>
              </div>
            </div>

            <p className="text-sm text-body">
              This route uses all four Section background options. The swatches
              make the background tokens easy to compare.
            </p>
          </div>
        </Container>
      </Section>

      {/* Buttons */}
      <Section id="buttons" background="paper">
        <Container>
          <div className="space-y-6">
            <Heading level={2}>Buttons</Heading>

            <div className="space-y-3">
              <p className="font-code text-xs text-muted">Button · md</p>

              <div className="flex flex-wrap items-center gap-3">
                <Button>Primary button</Button>
                <Button variant="secondary">Secondary button</Button>
                <Button variant="ghost">Ghost button</Button>
              </div>
            </div>

            <div className="space-y-3">
              <p className="font-code text-xs text-muted">Button · lg</p>

              <div className="flex flex-wrap items-center gap-3">
                <Button size="lg">Primary button</Button>

                <Button size="lg" variant="secondary">
                  Secondary button
                </Button>

                <Button size="lg" variant="ghost">
                  Ghost button
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <p className="font-code text-xs text-muted">Link rendering</p>

              <div className="flex flex-wrap items-center gap-3">
                <Button href="#badges">Primary link</Button>

                <Button href="#cards" variant="secondary">
                  Secondary link
                </Button>

                <Button href="#avatars" variant="ghost">
                  Ghost link
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Badges */}
      <Section id="badges" background="peach">
        <Container>
          <div className="space-y-6">
            <Heading level={2}>Badges</Heading>

            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="lavender">Lavender badge</Badge>
              <Badge variant="peach">Peach badge</Badge>
              <Badge variant="coral">Coral badge</Badge>
            </div>
          </div>
        </Container>
      </Section>

      {/* Cards */}
      <Section id="cards" background="paper">
        <Container>
          <div className="space-y-6">
            <Heading level={2}>Cards</Heading>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="p-6">
                <Badge variant="lavender">Short Posts</Badge>

                <Heading level={3} className="mt-4">
                  A card surface
                </Heading>

                <p className="mt-2 text-sm leading-6 text-body">
                  White surface, line border, 16px radius, and a soft ink-tinted
                  shadow.
                </p>
              </Card>

              <Card className="p-6">
                <Badge variant="peach">Long-form Articles</Badge>

                <Heading level={3} className="mt-4">
                  Another card
                </Heading>

                <p className="mt-2 text-sm leading-6 text-body">
                  Card spacing can be set by the section that composes it.
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Avatars */}
      <Section id="avatars" background="lavender">
        <Container>
          <div className="space-y-6">
            <Heading level={2}>Avatars</Heading>

            <div className="flex flex-wrap items-end gap-4">
              <Avatar initials="AA" label="Afzal Ansari" size="sm" />

              <Avatar initials="WS" label="Writespace" color="peach" />

              <Avatar
                initials="CP"
                label="Community member"
                color="coral"
                size="lg"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Typography and Squiggle */}
      <Section id="type" background="paper">
        <Container>
          <div className="max-w-copy space-y-6">
            <Heading level={2}>Headings and highlights</Heading>

            <div className="space-y-4">
              <Heading level={1} highlight="out">
                Think out loud. Then go deep.
              </Heading>

              <Heading level={2} highlight="write">
                Make room to write and think.
              </Heading>

              <Heading level={3} highlight="ideas">
                Share ideas with your community.
              </Heading>
            </div>

            <p className="text-base leading-7 text-body">
              A <Squiggle>thoughtful underline</Squiggle> scales to the width of
              the text above it.
            </p>
          </div>
        </Container>
      </Section>

      {/* Dark section */}
      <Section id="ink-section" background="ink">
        <Container>
          <div className="space-y-4">
            <Badge variant="coral">Ink section</Badge>

            <h2 className="font-headline text-3xl font-semibold leading-tight text-surface md:text-4xl">
              A darker section background
            </h2>

            <p className="max-w-copy leading-7 text-surface">
              Section supports all four requested background options. Text
              colors remain the responsibility of the content placed inside.
            </p>
          </div>
        </Container>
      </Section>
    </main>
  );
}
