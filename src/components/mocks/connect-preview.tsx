import { Heart, Lightbulb, MessageCircle, Sparkles } from "lucide-react";

export function ConnectPreview() {
  return (
    <div
      role="group"
      aria-label="Threaded conversation preview with a reply and reactions"
      className="rounded-tl-card border border-line bg-paper p-4 shadow-card"
    >
      {/* Original comment */}
      <div className="flex items-start gap-3">
        <div
          aria-hidden="true"
          className="grid size-9 shrink-0 place-items-center rounded-full bg-lavender font-mono text-xs text-ink"
        >
          AK
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-copy text-sm font-semibold text-ink">Aisha K.</p>

          <p className="mt-1 font-copy text-sm leading-6 text-body">
            A small change made this much easier to maintain.
          </p>
        </div>
      </div>

      {/* Indented reply */}
      <div className="ml-4 mt-4 border-l-2 border-line py-1 pl-5">
        <div className="flex items-start gap-3">
          <div
            aria-hidden="true"
            className="grid size-8 shrink-0 place-items-center rounded-full bg-peach font-mono text-xs text-ink"
          >
            MR
          </div>

          <div className="min-w-0">
            <p className="font-copy text-sm font-semibold text-ink">Maya R.</p>

            <p className="mt-1 font-copy text-sm leading-6 text-body">
              I ran into the same thing. This approach helped.
            </p>
          </div>
        </div>
      </div>

      {/* Reaction examples with counts */}
      <div
        aria-label="Reaction examples"
        className="mt-5 flex flex-wrap gap-2 border-t border-line pt-4"
      >
        <span className="inline-flex min-h-8 items-center gap-1.5 rounded-pill border border-line bg-surface px-3 text-xs text-body">
          <Heart size={14} className="text-coral-text" aria-hidden="true" />
          12
        </span>

        <span className="inline-flex min-h-8 items-center gap-1.5 rounded-pill border border-line bg-surface px-3 text-xs text-body">
          <Lightbulb size={14} className="text-violet" aria-hidden="true" />4
        </span>

        <span className="inline-flex min-h-8 items-center gap-1.5 rounded-pill border border-line bg-surface px-3 text-xs text-body">
          <Sparkles size={14} className="text-ink" aria-hidden="true" />3
        </span>

        <span className="sr-only">
          <MessageCircle aria-hidden="true" />
          Reactions on the conversation
        </span>
      </div>
    </div>
  );
}
