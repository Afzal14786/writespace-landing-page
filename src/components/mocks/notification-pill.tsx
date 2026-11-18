import { Bell } from "lucide-react";

export function NotificationPill() {
  return (
    <div
      className="inline-flex max-w-full items-center gap-3 rounded-pill bg-peach px-4 py-3 shadow-card"
      role="note"
      aria-label="Notification preview"
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface text-coral-text">
        <Bell size={16} strokeWidth={2} aria-hidden="true" />
      </span>

      <p className="font-copy text-xs font-semibold text-ink sm:text-sm">
        Maya replied to your post
      </p>
    </div>
  );
}
