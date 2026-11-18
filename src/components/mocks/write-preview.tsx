import { FileText } from "lucide-react";

import { Badge } from "@/components/ui";

export function WritePreview() {
  return (
    <div
      role="group"
      aria-label="Writing composer preview"
      className="rounded-card border border-line bg-paper p-4"
    >
      {/* Composer header */}
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

        <span className="font-code text-xs text-muted">COMPOSER</span>
      </div>

      {/* Title line */}
      <div className="mt-5 border-b border-line pb-3">
        <p className="font-headline text-lg font-medium text-ink">
          Give your idea a title...
        </p>
      </div>

      {/* Different content status examples */}
      <div className="mt-4">
        <p className="mb-2 font-copy text-xs font-medium text-muted">
          Content status examples
        </p>

        <div className="flex flex-wrap gap-2">
          <Badge variant="lavender">Draft</Badge>
          <Badge variant="peach">Scheduled</Badge>
        </div>
      </div>
    </div>
  );
}
