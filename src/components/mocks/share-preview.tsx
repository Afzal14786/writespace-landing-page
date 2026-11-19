import { ExternalLink } from "lucide-react";

export function SharePreview() {
  return (
    <div
      role="group"
      aria-label="Shared article link preview"
      className="rounded-tl-card border border-line bg-paper p-4 shadow-card"
    >
      {/* Coded image placeholder for the shared link card. */}
      <div
        aria-hidden="true"
        className="relative aspect-[16/8] overflow-hidden rounded-lg border border-line bg-gradient-to-br from-ink via-[#51448F] to-violet"
      >
        <div className="absolute -right-7 -top-9 size-28 rounded-full border-[14px] border-surface/10" />
        <div className="absolute -bottom-10 left-8 size-32 rounded-full bg-coral/70 blur-2xl" />

        <span className="absolute bottom-3 left-3 font-mono text-[10px] tracking-widest text-surface/80">
          ARTICLE
        </span>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-headline text-lg font-semibold leading-snug text-ink">
            Why I rewrote our job queue worker
          </p>

          <p className="mt-2 font-mono text-[11px] text-muted">
            writespace.example
          </p>
        </div>

        <span
          aria-hidden="true"
          className="grid size-8 shrink-0 place-items-center rounded-full bg-peach text-ink"
        >
          <ExternalLink size={15} />
        </span>
      </div>
    </div>
  );
}
