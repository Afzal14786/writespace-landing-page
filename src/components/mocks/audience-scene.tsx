import {
  BookOpen,
  Code2,
  FileText,
  GitBranch,
  MessageSquare,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type AudienceSceneId =
  | "developers"
  | "maintainers"
  | "students"
  | "communities";

type SceneContent = {
  sourceLabel: string;
  sourceTitle: string;
  sourceLines: string[];
  documentLabel: string;
  documentTitle: string;
  documentDescription: string;
  sourceIcon: LucideIcon;
};

type AudienceSceneProps = {
  audienceId: string;
  samplePostTitle: string;
};

const scenes: Record<AudienceSceneId, SceneContent> = {
  developers: {
    sourceLabel: "CODE EDITOR",
    sourceTitle: "refactor/cache.ts",
    sourceLines: [
      "const result = await",
      "cache.get(key);",
      "return result ?? fallback;",
    ],
    documentLabel: "TECHNICAL WRITE-UP",
    documentTitle: "Explain the decision",
    documentDescription: "The problem, trade-offs, and solution.",
    sourceIcon: Code2,
  },

  maintainers: {
    sourceLabel: "OPEN-SOURCE PROJECT",
    sourceTitle: "release/v2.0",
    sourceLines: [
      "Release branch",
      "3 changes merged",
      "Ready for release notes",
    ],
    documentLabel: "RELEASE NOTES",
    documentTitle: "What changed in v2.0",
    documentDescription: "The reasoning behind the release.",
    sourceIcon: GitBranch,
  },

  students: {
    sourceLabel: "LEARNING NOTES",
    sourceTitle: "Rust · Week 01",
    sourceLines: ["Ownership", "Borrowing", "Lifetimes"],
    documentLabel: "LEARNING LOG",
    documentTitle: "What I learned this week",
    documentDescription: "Notes, examples, and lessons learned.",
    sourceIcon: BookOpen,
  },

  communities: {
    sourceLabel: "COMMUNITY DISCUSSION",
    sourceTitle: "Testing meetup",
    sourceLines: ["8 contributors", "Shared discussion", "Ideas worth keeping"],
    documentLabel: "COMMUNITY RECAP",
    documentTitle: "Bring the discussion together",
    documentDescription: "Turn shared knowledge into something lasting.",
    sourceIcon: Users,
  },
};

/**
 * A small vector-style scene that connects a person's working context
 * to a write-up and then to a shareable post.
 *
 * These are conceptual illustrations, not screenshots of integrations.
 */
export function AudienceScene({
  audienceId,
  samplePostTitle,
}: AudienceSceneProps) {
  const scene = scenes[audienceId as AudienceSceneId] ?? scenes.developers;

  const SourceIcon = scene.sourceIcon;

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto h-[315px] w-full max-w-[480px] sm:h-[350px]"
    >
      {/* Soft illustration backdrop. */}
      <div className="absolute right-[8%] top-[7%] size-44 rounded-full bg-lavender/90 blur-2xl sm:size-56" />

      <div className="absolute bottom-[5%] left-[12%] size-32 rounded-full bg-peach/80 blur-2xl" />

      {/* Flow connectors between the working context, write-up, and post. */}
      <svg
        viewBox="0 0 480 340"
        fill="none"
        className="absolute inset-0 size-full"
      >
        <path
          d="M165 86 C215 86 222 118 270 118"
          stroke="#8878F0"
          strokeWidth="2"
          strokeDasharray="5 6"
          strokeLinecap="round"
        />

        <path
          d="M270 118 L260 110 M270 118 L259 124"
          stroke="#8878F0"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <path
          d="M330 166 C350 198 315 219 280 244"
          stroke="#E85A41"
          strokeWidth="2"
          strokeDasharray="5 6"
          strokeLinecap="round"
        />

        <path
          d="M280 244 L281 232 M280 244 L292 240"
          stroke="#E85A41"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <circle cx="165" cy="86" r="4" fill="#8878F0" />
        <circle cx="330" cy="166" r="4" fill="#E85A41" />
      </svg>

      {/* Step 1: the person's original working context. */}
      <div className="absolute left-0 top-2 z-10 w-[58%] max-w-[245px] -rotate-[3deg] rounded-2xl border border-line bg-surface p-3 shadow-card sm:p-4">
        <div className="flex items-center gap-2">
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-lavender text-violet">
            <SourceIcon size={16} strokeWidth={1.8} />
          </span>

          <div className="min-w-0">
            <p className="truncate font-mono text-[9px] tracking-wider text-muted">
              {scene.sourceLabel}
            </p>
            <p className="truncate font-copy text-xs font-semibold text-ink">
              {scene.sourceTitle}
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-2 rounded-lg bg-paper p-3">
          {scene.sourceLines.map((line, index) => (
            <div key={line} className="flex items-center gap-2">
              <span className="font-mono text-[9px] text-muted">
                0{index + 1}
              </span>

              <span
                className={[
                  "h-1.5 rounded-full",
                  index === 0
                    ? "w-[78%] bg-violet/60"
                    : index === 1
                      ? "w-[62%] bg-ink/20"
                      : "w-[88%] bg-coral/45",
                ].join(" ")}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Step 2: organizing the work into something others can read. */}
      <div className="absolute right-0 top-[4.5rem] z-20 w-[58%] max-w-[245px] rotate-[2deg] rounded-2xl border border-line bg-surface p-3 shadow-soft sm:p-4">
        <div className="flex items-center gap-2">
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-peach text-coral-text">
            <FileText size={16} strokeWidth={1.8} />
          </span>

          <span className="font-mono text-[9px] tracking-wider text-muted">
            {scene.documentLabel}
          </span>
        </div>

        <h4 className="mt-4 font-headline text-base font-semibold leading-snug text-ink sm:text-lg">
          {scene.documentTitle}
        </h4>

        <p className="mt-2 font-copy text-xs leading-5 text-body">
          {scene.documentDescription}
        </p>

        <div className="mt-4 space-y-2">
          <div className="h-1.5 w-full rounded-full bg-line" />
          <div className="h-1.5 w-[84%] rounded-full bg-line" />
        </div>
      </div>

      {/* Step 3: the idea becomes a post people can discover and discuss. */}
      <div className="absolute bottom-0 left-[12%] z-30 w-[84%] max-w-[365px] rotate-[1.5deg] rounded-2xl border border-line bg-surface p-4 shadow-soft sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-full bg-ink font-headline text-sm font-semibold text-surface">
              W
            </span>

            <div>
              <p className="font-copy text-xs font-semibold text-ink">
                Writespace
              </p>
              <p className="font-copy text-[10px] text-muted">
                A post worth sharing
              </p>
            </div>
          </div>

          <span className="rounded-pill bg-lavender px-3 py-1 font-mono text-[9px] tracking-wide text-lavender-text">
            POST
          </span>
        </div>

        <p className="mt-4 line-clamp-2 font-headline text-lg font-semibold leading-snug text-ink">
          {samplePostTitle}
        </p>

        <div className="mt-4 flex items-center gap-4 border-t border-line pt-3">
          <span className="inline-flex items-center gap-1.5 font-copy text-[10px] text-muted">
            <MessageSquare size={12} />
            Reply
          </span>

          <span className="inline-flex items-center gap-1.5 font-copy text-[10px] text-muted">
            <span className="size-1.5 rounded-full bg-coral" />
            React
          </span>

          <span className="ml-auto font-mono text-[9px] text-violet">
            SHARED
          </span>
        </div>
      </div>
    </div>
  );
}
