"use client";

import { useId, useState, type FormEvent } from "react";

import { Button } from "@/components/ui";
import { site } from "@/content/site";
import { waitlistSubmissionSchema } from "@/lib/waitlist-schema";

type FormStatus = "idle" | "loading" | "success" | "error";
type TopicStatus = "idle" | "loading" | "saved" | "skipped" | "error";

type ApiResponse = {
  success?: boolean;
};

async function submitWaitlist(data: {
  email: string;
  website?: string;
  topic?: string;
}): Promise<void> {
  const response = await fetch("/api/waitlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const payload: unknown = await response.json();

  const succeeded =
    typeof payload === "object" &&
    payload !== null &&
    "success" in payload &&
    (payload as ApiResponse).success === true;

  if (!response.ok || !succeeded) {
    throw new Error("Waitlist submission failed.");
  }
}

export function WaitlistForm() {
  const emailId = useId();
  const websiteId = useId();
  const feedbackId = useId();
  const topicId = useId();
  const topicFeedbackId = useId();

  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [topic, setTopic] = useState("");

  const [status, setStatus] = useState<FormStatus>("idle");
  const [topicStatus, setTopicStatus] = useState<TopicStatus>("idle");

  async function handleEmailSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (status === "loading" || status === "success") {
      return;
    }

    const result = waitlistSubmissionSchema.safeParse({
      email,
      website,
    });

    if (!result.success) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      await submitWaitlist(result.data);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  async function handleTopicSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (topicStatus === "loading" || topicStatus === "saved") {
      return;
    }

    const trimmedTopic = topic.trim();

    // The follow-up is optional, so an empty answer is never submitted.
    if (!trimmedTopic) {
      setTopicStatus("skipped");
      return;
    }

    const result = waitlistSubmissionSchema.safeParse({
      email,
      topic: trimmedTopic,
    });

    if (!result.success) {
      setTopicStatus("error");
      return;
    }

    setTopicStatus("loading");

    try {
      await submitWaitlist(result.data);
      setTopicStatus("saved");
    } catch {
      setTopicStatus("error");
    }
  }

  const emailFeedback =
    status === "loading"
      ? "Joining the waitlist..."
      : status === "success"
        ? site.waitlist.successMessage
        : status === "error"
          ? site.waitlist.errorMessage
          : "";

  const topicFeedback =
    topicStatus === "loading"
      ? "Sending your answer..."
      : topicStatus === "saved"
        ? "Thanks for sharing what you'd write first."
        : topicStatus === "error"
          ? "We couldn't send that just now. Please try again."
          : topicStatus === "skipped"
            ? "No problem. You can leave it for another time."
            : "";

  return (
    <div className="relative mt-8 w-full text-left">
      {/* Initial signup form */}
      {status !== "success" && (
        <form
          onSubmit={handleEmailSubmit}
          aria-busy={status === "loading"}
          className="relative"
        >
          <label
            htmlFor={emailId}
            className="mb-2 block font-copy text-sm font-semibold text-surface"
          >
            {site.waitlist.emailLabel}
          </label>

          {/*
           * The button sits inside the pill on desktop.
           * On mobile, the input and button stack at full width.
           */}
          <div className="flex flex-col gap-2 rounded-[28px] border border-white/20 bg-surface p-2 sm:flex-row sm:items-center sm:rounded-pill">
            <input
              id={emailId}
              name="email"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.currentTarget.value);

                if (status === "error") {
                  setStatus("idle");
                }
              }}
              placeholder={site.waitlist.emailPlaceholder}
              autoComplete="email"
              inputMode="email"
              maxLength={254}
              required
              disabled={status === "loading"}
              aria-invalid={status === "error"}
              aria-describedby={feedbackId}
              className="min-h-12 min-w-0 flex-1 rounded-pill bg-transparent px-4 font-copy text-base text-ink outline-none placeholder:text-muted focus-visible:ring-2 focus-visible:ring-violet focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-70 sm:pl-5"
            />

            <Button
              type="submit"
              size="lg"
              disabled={status === "loading"}
              className="w-full shrink-0 sm:w-auto"
            >
              {status === "loading"
                ? site.waitlist.loadingLabel
                : site.waitlist.submitLabel}
            </Button>
          </div>

          {/* Honeypot: hidden from people and excluded from keyboard navigation. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[-10000px] top-auto h-px w-px overflow-hidden"
          >
            <label htmlFor={websiteId}>Leave this field empty</label>

            <input
              id={websiteId}
              name="website"
              type="text"
              value={website}
              onChange={(event) => setWebsite(event.currentTarget.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <p
            id={feedbackId}
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className={[
              "mt-3 min-h-6 font-copy text-sm leading-6",
              status === "error" ? "text-coral" : "text-surface",
            ].join(" ")}
          >
            {emailFeedback}
          </p>
        </form>
      )}

      {/* Optional follow-up is only shown after a successful signup. */}
      {status === "success" && (
        <div>
          <p
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="font-copy text-sm leading-6 text-surface"
          >
            {site.waitlist.successMessage}
          </p>

          {topicStatus === "idle" ||
          topicStatus === "loading" ||
          topicStatus === "error" ? (
            <form
              onSubmit={handleTopicSubmit}
              aria-busy={topicStatus === "loading"}
              className="mt-7"
            >
              <label
                htmlFor={topicId}
                className="mb-2 block font-copy text-sm font-semibold text-surface"
              >
                {site.waitlist.topicLabel}
              </label>

              <textarea
                id={topicId}
                name="topic"
                value={topic}
                onChange={(event) => {
                  setTopic(event.currentTarget.value);

                  if (topicStatus === "error") {
                    setTopicStatus("idle");
                  }
                }}
                placeholder={site.waitlist.topicPlaceholder}
                maxLength={200}
                rows={3}
                aria-describedby={topicFeedbackId}
                disabled={topicStatus === "loading"}
                className="min-h-28 w-full resize-y rounded-2xl border border-white/20 bg-surface px-4 py-3 font-copy text-sm leading-6 text-ink placeholder:text-muted focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-violet disabled:cursor-not-allowed disabled:opacity-70"
              />

              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="font-mono text-xs text-surface/65">
                  {topic.length}/200
                </span>

                <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={() => setTopicStatus("skipped")}
                    disabled={topicStatus === "loading"}
                    className="min-h-11 rounded-pill px-4 font-copy text-sm font-semibold text-surface/80 underline underline-offset-4 transition-colors hover:text-surface focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-violet"
                  >
                    Skip for now
                  </button>

                  <Button
                    type="submit"
                    size="md"
                    disabled={
                      topicStatus === "loading" || topic.trim().length === 0
                    }
                  >
                    {topicStatus === "loading" ? "Sending..." : "Send answer"}
                  </Button>
                </div>
              </div>

              <p
                id={topicFeedbackId}
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className={[
                  "mt-3 min-h-6 font-copy text-sm leading-6",
                  topicStatus === "error" ? "text-coral" : "text-surface/80",
                ].join(" ")}
              >
                {topicFeedback}
              </p>
            </form>
          ) : (
            <p
              role="status"
              aria-live="polite"
              className="mt-5 font-copy text-sm leading-6 text-surface/80"
            >
              {topicFeedback}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
