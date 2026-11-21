"use client";

import { useId, useState, type FormEvent } from "react";
import { Check } from "lucide-react";

import { Button } from "@/components/ui";
import { site } from "@/content/site";
import { waitlistSubmissionSchema } from "@/lib/waitlist-schema";

type FormStatus = "idle" | "loading" | "success" | "error";

type ApiResponse = {
  success?: boolean;
};

/**
 * Submit through the same-origin Next.js route.
 * The Next.js server forwards only the email to the Writespace backend.
 * The website field is retained for the Next.js honeypot check.
 */
async function submitWaitlist(data: {
  email: string;
  website?: string;
}): Promise<void> {
  const response = await fetch("/api/waitlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const payload: unknown = await response.json().catch(() => null);

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

  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

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
      await submitWaitlist({
        email: result.data.email,
        website: result.data.website,
      });

      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const emailFeedback =
    status === "loading"
      ? "Joining the waitlist..."
      : status === "error"
        ? site.waitlist.errorMessage
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

      {/* Successful signup confirmation */}
      {status === "success" && (
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="flex flex-col items-center py-3 text-center"
        >
          <div
            aria-hidden="true"
            className="mb-4 flex size-12 items-center justify-center rounded-full border border-violet/30 bg-violet/15 text-violet"
          >
            <Check className="size-6" strokeWidth={2.5} />
          </div>

          <h3 className="font-display text-2xl font-semibold tracking-tight text-surface">
            You&apos;re on the list.
          </h3>

          <p className="mt-2 max-w-sm font-copy text-sm leading-7 text-[#D8D4E4]">
            We&apos;ll email you when the doors open.
          </p>
        </div>
      )}
    </div>
  );
}
