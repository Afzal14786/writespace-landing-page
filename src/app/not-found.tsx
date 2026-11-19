import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Container, Section } from "@/components/ui";

export default function NotFound() {
  return (
    <main>
      <Section
        background="paper"
        className="relative isolate grid min-h-[75svh] place-items-center overflow-hidden"
      >
        {/* Subtle brand-coloured background accents. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-10 -z-10 size-80 rounded-full bg-lavender blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-24 -z-10 size-72 rounded-full bg-peach blur-3xl"
        />

        <Container>
          <div className="mx-auto max-w-[640px] text-center">
            <span className="inline-flex items-center rounded-pill border border-line bg-surface px-4 py-2 font-mono text-xs tracking-widest text-lavender-text">
              404 · PAGE NOT FOUND
            </span>

            <p
              aria-hidden="true"
              className="mt-8 font-headline text-[clamp(100px,22vw,180px)] font-semibold leading-none tracking-[-0.07em] text-violet/30"
            >
              404
            </p>

            <h1 className="mt-5 font-headline text-[34px] font-semibold leading-tight tracking-tight text-ink sm:text-[48px]">
              Looks like this page wandered off.
            </h1>

            <p className="mx-auto mt-5 max-w-[460px] font-copy text-base leading-7 text-body">
              We couldn&apos;t find the page you&apos;re looking for. It may have moved,
              or the address might be incorrect.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-pill bg-coral px-6 font-copy text-sm font-semibold text-ink transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-violet"
              >
                <ArrowLeft size={16} aria-hidden="true" />
                Back to homepage
              </Link>

              <Link
                href="/#waitlist"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-pill border border-line bg-surface px-6 font-copy text-sm font-semibold text-ink transition-colors duration-150 hover:border-ink/30 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-violet"
              >
                Join the waitlist
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
