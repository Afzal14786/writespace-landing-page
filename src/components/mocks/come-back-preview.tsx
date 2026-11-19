import { Bookmark, Bell } from "lucide-react";

export function ComeBackPreview() {
  return (
    <div
      role="group"
      aria-label="Saved article and grouped notification preview"
      className="rounded-tl-card border border-line bg-paper p-4 shadow-card"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-full bg-lavender text-violet">
            <Bookmark size={16} aria-hidden="true" />
          </span>

          <div>
            <p className="font-copy text-sm font-semibold text-ink">
              Saved for later
            </p>
            <p className="font-copy text-xs text-muted">Your reading list</p>
          </div>
        </div>

        <span className="font-mono text-[10px] tracking-wide text-muted">
          SAVED
        </span>
      </div>

      <div className="mt-5 flex items-start gap-3 rounded-xl border border-line bg-surface p-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-peach text-ink">
          <Bell size={16} aria-hidden="true" />
        </span>

        <div className="min-w-0">
          <p className="font-copy text-sm font-semibold leading-5 text-ink">
            12 people reacted to your article
          </p>

          <p className="mt-1 font-copy text-xs text-muted">
            Grouped activity · Just now
          </p>
        </div>

        <span
          aria-label="12 notifications"
          className="ml-auto grid size-6 shrink-0 place-items-center rounded-full bg-lavender font-mono text-[10px] font-semibold text-lavender-text"
        >
          12
        </span>
      </div>
    </div>
  );
}
