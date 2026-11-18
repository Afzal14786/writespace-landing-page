import { Container, Reveal, Section } from "@/components/ui";
import { WaitlistForm } from "@/components/sections/waitlist-form";

export function Waitlist() {
  return (
    <Section id="waitlist" background="ink">
      <Container>
        <div className="mx-auto max-w-copy text-center">
          <Reveal>
            <h2 className="font-headline text-4xl font-semibold leading-tight tracking-tight text-surface sm:text-5xl lg:text-6xl">
              Your next idea deserves a home.
            </h2>
          </Reveal>

          <Reveal>
            <WaitlistForm />
          </Reveal>

          <Reveal>
            <p className="mt-5 font-copy text-sm leading-6 text-surface/80">
              We’ll only use your email to tell you when Writespace opens.
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
