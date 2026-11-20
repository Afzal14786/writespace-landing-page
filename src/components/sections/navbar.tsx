"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button, Container } from "@/components/ui";
import { site } from "@/content/site";
import { assets } from "@/lib/assets";
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
            <span aria-hidden="true" className="relative size-9 shrink-0">
              <Image
                src={assets.brand.emblem.src}
                alt=""
                fill
                sizes="36px"
                className="object-contain"
                priority
              />
            </span>

            <span
              aria-hidden="true"
              className="relative h-7 w-[112px] shrink-0 sm:w-[132px]"
            >
              <Image
                src={assets.brand.wordmark.src}
                alt=""
                fill
                sizes="(min-width: 640px) 132px, 112px"
                className="object-contain object-left"
                priority
              />
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
