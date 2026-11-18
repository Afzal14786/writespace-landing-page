import { Badge, Card } from "@/components/ui";

export function ArticleCard() {
  return (
    <Card className="w-full p-5 sm:p-6">
      {/* Article metadata */}
      <div className="flex items-center justify-between gap-3">
        <Badge variant="lavender">Article</Badge>

        <span className="font-copy text-xs font-medium text-muted">
          8 min read
        </span>
      </div>

      {/* Article title */}
      <h3 className="mt-5 max-w-md font-headline text-2xl font-semibold leading-snug tracking-tight text-ink sm:text-3xl">
        Why I rewrote our job queue worker
      </h3>

      {/* Illustrative code preview */}
      <div className="mt-5 overflow-hidden rounded-card bg-ink px-4 py-4">
        <pre className="overflow-x-auto">
          <code className="font-code text-xs leading-6 text-surface sm:text-sm">
            await queue.process(job);
          </code>
        </pre>
      </div>
    </Card>
  );
}
