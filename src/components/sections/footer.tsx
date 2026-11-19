import Link from "next/link";
import { ArrowUp, GitBranch } from "lucide-react";

import { Button, Container } from "@/components/ui";
import { site } from "@/content/site";

type SocialLink = {
  label: string;
  href: string;
  mark: "linkedin" | "github" | "x";
};

function SocialMark({ mark }: { mark: SocialLink["mark"] }) {
  if (mark === "github") {
    return <GitBranch size={17} strokeWidth={1.8} aria-hidden="true" />;
  }

  if (mark === "linkedin") {
    return (
      <span
        aria-hidden="true"
        className="font-copy text-sm font-bold tracking-tight"
      >
        in
      </span>
    );
  }

  return (
    <span aria-hidden="true" className="font-copy text-base font-semibold">
      𝕏
    </span>
  );
}

const footerLinkClasses =
  "font-copy text-[15px] leading-6 text-[#D8D4E4] transition-colors duration-150 hover:text-surface hover:underline hover:underline-offset-4 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-violet";

const footerHeadingClasses =
  "mb-5 font-copy text-sm font-semibold text-surface";

export function Footer() {
  const { brand, product, contact, legal, bottomBar } = site.footer;

  const currentYear = new Date().getFullYear();

  // Empty contact placeholders are intentionally omitted instead of
  // rendering invented or non-functional social links.
  const socialLinks: SocialLink[] = [
    {
      label: "LinkedIn",
      href: contact.linkedin,
      mark: "linkedin",
    },
    {
      label: "GitHub",
      href: contact.github,
      mark: "github",
    },
    {
      label: "X",
      href: contact.x,
      mark: "x",
    },
  ].filter((link) => link.href.trim().length > 0);

  const helloHref = contact.email
    ? `mailto:${contact.email}?subject=${encodeURIComponent(contact.sayHelloSubject)}`
    : undefined;

  return (
    <footer
      id="contact"
      className="border-t border-white/10 bg-ink-deep py-14 sm:py-16"
    >
      <Container>
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-4 xl:gap-x-10">
          {/* Column 1: Brand */}
          <div className="order-1">
            <Link
              href="#top"
              aria-label="Writespace home"
              className="inline-flex items-center gap-3 rounded-md focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-violet"
            >
              <span
                aria-hidden="true"
                className="relative grid size-10 place-items-center rounded-xl bg-violet font-headline text-2xl font-semibold text-surface after:absolute after:-right-1 after:-top-1 after:size-2.5 after:rounded-full after:bg-coral after:ring-2 after:ring-ink-deep"
              >
                W
              </span>

              <span className="font-headline text-xl font-semibold tracking-tight text-surface">
                Writespace
              </span>
            </Link>

            <p className="mt-5 font-headline text-lg font-semibold leading-snug text-surface">
              {brand.tagline}
            </p>

            <p className="mt-3 max-w-[300px] font-copy text-sm leading-7 text-[#D8D4E4]">
              {brand.description}
            </p>
          </div>

          {/* Column 2 on desktop, third on mobile: Product */}
          <nav aria-label="Product links" className="order-3 sm:order-2">
            <h2 className={footerHeadingClasses}>{product.heading}</h2>

            <ul className="space-y-3">
              {product.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerLinkClasses}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3 on desktop, immediately after Brand on mobile: Contact */}
          <div className="order-2 sm:order-3">
            <h2 className={footerHeadingClasses}>{contact.heading}</h2>

            <p className="max-w-[280px] font-copy text-sm leading-7 text-[#D8D4E4]">
              {contact.description}
            </p>

            {contact.email ? (
              <a
                href={`mailto:${contact.email}`}
                className="mt-5 inline-block break-all font-copy text-[17px] font-semibold text-coral transition-colors duration-150 hover:text-surface hover:underline hover:underline-offset-4 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-violet"
              >
                {contact.email}
              </a>
            ) : (
              <p className="mt-5 font-copy text-sm leading-6 text-surface/60">
                Email contact details will be added before launch.
              </p>
            )}

            {socialLinks.length > 0 ? (
              <div className="mt-5 flex flex-wrap gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Writespace on ${link.label} (opens in a new tab)`}
                    className="grid size-10 place-items-center rounded-full border border-white/15 text-surface transition-colors duration-150 hover:border-coral hover:bg-coral hover:text-ink focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-violet"
                  >
                    <SocialMark mark={link.mark} />
                  </a>
                ))}
              </div>
            ) : (
              <p className="mt-4 font-copy text-xs text-surface/60">
                Social profile links will be added before launch.
              </p>
            )}

            {helloHref ? (
              <div className="mt-6">
                <Button href={helloHref} variant="secondary" size="md">
                  {contact.sayHelloLabel}
                </Button>
              </div>
            ) : null}
          </div>

          {/* Column 4: Legal */}
          <nav aria-label="Legal links" className="order-4">
            <h2 className={footerHeadingClasses}>{legal.heading}</h2>

            <ul className="space-y-3">
              {legal.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerLinkClasses}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Footer bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 sm:mt-14 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-copy text-xs leading-6 text-[#D8D4E4]">
            © {currentYear} {bottomBar.copyrightLabel} Made by{" "}
            {bottomBar.madeBy}.
          </p>

          <Link
            href="#top"
            className="inline-flex min-h-11 items-center gap-2 self-start rounded-md font-copy text-sm font-medium text-[#D8D4E4] transition-colors duration-150 hover:text-surface focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-violet sm:self-auto"
          >
            {bottomBar.backToTop}
            <ArrowUp size={15} aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </footer>
  );
}
