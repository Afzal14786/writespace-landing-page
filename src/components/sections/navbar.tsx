"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Button, Container } from "@/components/ui";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-paper transition-colors duration-200",
        isScrolled ? "border-line" : "border-transparent",
      )}
    >
      <Container>
        <div className="flex h-[72px] items-center justify-between gap-3">
          <Link
            href="#top"
            aria-label="Writespace home"
            className="inline-flex shrink-0 items-center gap-2"
          >
            <span
              aria-hidden="true"
              className={cn(
                "relative grid size-9 place-items-center rounded-lg",
                "bg-ink font-headline text-xl font-semibold text-surface",
                "after:absolute after:-right-1 after:-top-1 after:size-2.5",
                "after:rounded-full after:bg-violet after:ring-2 after:ring-paper",
              )}
            >
              W
            </span>

            <span className="font-headline text-xl font-semibold tracking-tight text-ink">
              Writespace
            </span>
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-5 md:flex lg:gap-7"
          >
            {site.navigation.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-copy text-[15px] font-medium text-body transition-colors hover:text-ink focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-violet"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Button
            href={site.hero.primaryAction.href}
            size="md"
            className="shrink-0 max-[380px]:px-3 max-[380px]:text-xs"
          >
            {site.hero.primaryAction.label}
          </Button>
        </div>
      </Container>
    </header>
  );
}
