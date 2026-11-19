import { CalendarClock, FileText } from "lucide-react";

import { Badge } from "@/components/ui";

export function WritePreview() {
  return (
    <div
      role="group"
      aria-label="Article composer preview with a title, cover, and publishing status"
      className="rounded-tl-card border border-line bg-paper p-4 shadow-card"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <FileText
            size={16}
            strokeWidth={1.8}
            className="text-violet"
            aria-hidden="true"
          />

          <span className="font-copy text-xs font-semibold text-ink">
            New article
          </span>
        </div>

        <span className="font-mono text-[10px] tracking-wide text-muted">
          COMPOSER
        </span>
      </div>

      <div className="mt-5 border-b border-line pb-3">
        <p className="font-headline text-lg font-semibold leading-snug text-ink">
          Why I rewrote our job queue worker
        </p>
      </div>

      {/* Coded cover placeholder keeps the mock independent of final imagery. */}
      <div
        aria-hidden="true"
        className="mt-4 aspect-[16/5] overflow-hidden rounded-lg border border-line bg-gradient-to-br from-lavender via-[#E8E2FF] to-peach"
      >
        <div className="flex h-full items-end p-3">
          <span className="font-mono text-[10px] tracking-widest text-lavender-text">
            ARTICLE COVER
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Badge variant="lavender">Draft</Badge>
          <span className="text-muted" aria-hidden="true">
            →
          </span>
          <Badge variant="peach">Scheduled</Badge>
        </div>

        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          className="inline-flex min-h-9 items-center gap-2 rounded-pill bg-coral px-4 font-copy text-xs font-semibold text-ink"
        >
          <CalendarClock size={14} aria-hidden="true" />
          Publish
        </button>
      </div>
    </div>
  );
}
