import { Heart, Lightbulb, Sparkles } from "lucide-react";

export function ConnectPreview() {
  return (
    <div
      role="group"
      aria-label="Threaded conversation preview"
      className="rounded-card border border-line bg-paper p-4"
    >
      {/* Original comment */}
      <div className="flex items-start gap-3">
        <div
          aria-hidden="true"
          className="grid size-9 shrink-0 place-items-center rounded-full bg-lavender text-ink"
        >
          <span className="font-code text-xs">01</span>
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-copy text-sm font-semibold text-ink">Comment</p>

          <p className="mt-1 font-copy text-sm leading-6 text-body">
            A comment in the conversation.
          </p>
        </div>
      </div>

      {/* Indented reply */}
      <div className="ml-4 mt-4 border-l-2 border-line py-1 pl-5">
        <div className="flex items-start gap-3">
          <div
            aria-hidden="true"
            className="grid size-8 shrink-0 place-items-center rounded-full bg-peach text-ink"
          >
            <span className="font-code text-xs">↳</span>
          </div>

          <div className="min-w-0">
            <p className="font-copy text-sm font-semibold text-ink">Reply</p>

            <p className="mt-1 font-copy text-sm leading-6 text-body">
              A reply in the same thread.
            </p>
          </div>
        </div>
      </div>

      {/* Reaction examples */}
      <div aria-label="Reaction examples" className="mt-5 flex flex-wrap gap-2">
        <span className="inline-flex size-9 items-center justify-center rounded-pill border border-line bg-surface text-coral-text">
          <Heart size={15} aria-hidden="true" />
          <span className="sr-only">Reaction example</span>
        </span>

        <span className="inline-flex size-9 items-center justify-center rounded-pill border border-line bg-surface text-violet">
          <Lightbulb size={15} aria-hidden="true" />
          <span className="sr-only">Reaction example</span>
        </span>

        <span className="inline-flex size-9 items-center justify-center rounded-pill border border-line bg-surface text-ink">
          <Sparkles size={15} aria-hidden="true" />
          <span className="sr-only">Reaction example</span>
        </span>
      </div>
    </div>
  );
}
