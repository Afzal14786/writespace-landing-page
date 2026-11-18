import Link from "next/link";

import { Container } from "@/components/ui";

const footerLinks = [
  {
    label: "GitHub",
    href: "https://github.com/afzal14786/",
    external: true,
  },
  {
    label: "Contact",
    href: "mailto:contactwritespace@gmail.com",
    external: false,
  },
  {
    label: "Privacy",
    href: "/privacy",
    external: false,
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink py-10 sm:py-12">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          {/* Brand */}
          <div>
            <Link
              href="#top"
              aria-label="Writespace home"
              className="inline-flex items-center gap-2 rounded-md focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-violet"
            >
              <span
                aria-hidden="true"
                className="grid size-9 place-items-center rounded-lg bg-lavender font-headline text-xl font-semibold text-ink"
              >
                W
              </span>

              <span className="font-headline text-xl font-semibold tracking-tight text-surface">
                Writespace
              </span>
            </Link>

            <p className="mt-3 font-copy text-sm text-surface/80">
              Where your words find their readers.
            </p>
          </div>

          {/* Footer links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="font-copy text-sm font-medium text-surface hover:text-coral focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-violet"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Technology note */}
        <div className="mt-9 border-t border-surface/20 pt-5">
          <p className="font-copy text-xs leading-6 text-surface/70">
            Built with TypeScript, PostgreSQL, and Redis.
          </p>
        </div>
      </Container>
    </footer>
  );
}
