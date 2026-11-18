import { Bookmark, MessageCircle, ThumbsUp } from "lucide-react";

export function ComeBackPreview() {
  return (
    <div
      role="group"
      aria-label="Saved content and notification preview"
      className="rounded-card border border-line bg-paper p-4"
    >
      {/* Saved content indicator */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Bookmark
            size={17}
            strokeWidth={1.8}
            className="text-violet"
            aria-hidden="true"
          />

          <span className="font-copy text-sm font-semibold text-ink">
            Saved for later
          </span>
        </div>

        <span className="font-code text-xs text-muted">SAVED</span>
      </div>

      {/* Notification rows */}
      <div className="mt-5 space-y-3 border-t border-line pt-4">
        <div className="flex items-center gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-lavender text-ink">
            <ThumbsUp size={15} aria-hidden="true" />
          </span>

          <p className="font-copy text-sm leading-5 text-body">
            Someone reacted to your post
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-peach text-ink">
            <MessageCircle size={15} aria-hidden="true" />
          </span>

          <p className="font-copy text-sm leading-5 text-body">
            Someone replied to your thread
          </p>
        </div>
      </div>
    </div>
  );
}
