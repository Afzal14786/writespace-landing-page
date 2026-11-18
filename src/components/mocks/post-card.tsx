import { Heart, MessageCircle } from "lucide-react";

import { Avatar, Card } from "@/components/ui";

export function PostCard() {
  return (
    <Card className="w-full p-5 sm:p-6">
      {/* Author information */}
      <div className="flex items-center gap-3">
        <Avatar initials="AK" label="Aisha K." color="peach" size="lg" />

        <div className="min-w-0">
          <p className="font-copy text-sm font-semibold text-ink">Aisha K.</p>

          <p className="mt-0.5 font-copy text-xs text-muted">
            Post · 2 min ago
          </p>
        </div>
      </div>

      {/* Post content */}
      <p className="mt-5 font-copy text-base leading-7 text-ink">
        A small idea can lead to a much better system.
      </p>

      {/* Reactions and comments */}
      <div className="mt-5 flex items-center gap-5">
        <span
          className="inline-flex items-center gap-2 font-copy text-sm text-body"
          aria-label="24 reactions"
        >
          <Heart
            aria-hidden="true"
            size={17}
            strokeWidth={1.8}
            className="text-coral-text"
          />
          24
        </span>

        <span
          className="inline-flex items-center gap-2 font-copy text-sm text-body"
          aria-label="6 comments"
        >
          <MessageCircle
            aria-hidden="true"
            size={17}
            strokeWidth={1.8}
            className="text-muted"
          />
          6
        </span>
      </div>
    </Card>
  );
}
