"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Button, Container } from "@/components/ui";
import { cn } from "@/lib/cn";

const navigationLinks = [
  { label: "Features", href: "#features" },
  { label: "Preview", href: "#preview" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "FAQ", href: "#faq" },
] as const;

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Update the navbar border only when the page's scroll state changes.
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
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
        "sticky top-0 z-50 border-b bg-paper",
        isScrolled ? "border-line" : "border-transparent",
      )}
    >
      <Container>
        <div className="flex min-h-16 items-center justify-between gap-3 py-3 md:min-h-20 md:gap-6">
          {/* Brand */}
          <Link
            href="#top"
            aria-label="Writespace home"
            className="inline-flex shrink-0 items-center gap-2"
          >
            <span
              aria-hidden="true"
              className="grid size-9 place-items-center rounded-lg bg-lavender font-headline text-xl font-semibold text-ink"
            >
              W
            </span>

            <span className="font-headline text-xl font-semibold tracking-tight text-ink">
              Writespace
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-5 lg:gap-7 md:flex"
          >
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-copy text-sm font-medium text-body hover:text-ink focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-violet"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Waitlist CTA */}
          <Button
            href="#waitlist"
            size="md"
            className="shrink-0 max-[380px]:px-3 max-[380px]:text-xs"
          >
            Get early access
          </Button>
        </div>
      </Container>
    </header>
  );
}
