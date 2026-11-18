"use client";

import { useId, useState, type FormEvent } from "react";

import { Button } from "@/components/ui";
import { waitlistSubmissionSchema } from "@/lib/waitlist-schema";

type FormStatus = "idle" | "loading" | "success" | "error";

const SUCCESS_MESSAGE =
  "You’re on the list. We’ll email you when the doors open.";

const ERROR_MESSAGE = "That email doesn’t look right. Check it and try again.";

export function WaitlistForm() {
  const emailId = useId();
  const websiteId = useId();
  const feedbackId = useId();

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Prevent accidental duplicate submissions.
    if (status === "loading" || status === "success") {
      return;
    }

    const formData = new FormData(event.currentTarget);

    const websiteValue = formData.get("website");

    const website = typeof websiteValue === "string" ? websiteValue : "";

    /*
     * Validate in the browser before making the request.
     * The server still performs the same validation independently.
     */
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
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result.data),
      });

      const payload: unknown = await response.json();

      const succeeded =
        typeof payload === "object" &&
        payload !== null &&
        "success" in payload &&
        payload.success === true;

      if (!response.ok || !succeeded) {
        throw new Error("Waitlist submission failed.");
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const feedbackMessage =
    status === "loading"
      ? "Joining the waitlist..."
      : status === "success"
        ? SUCCESS_MESSAGE
        : status === "error"
          ? ERROR_MESSAGE
          : "";

  return (
    <form
      onSubmit={handleSubmit}
      aria-busy={status === "loading"}
      className="relative mt-8 w-full"
    >
      {/* Visible email label */}
      <label
        htmlFor={emailId}
        className="mb-2 block text-left font-copy text-sm font-semibold text-surface"
      >
        Email address
      </label>

      <div className="flex flex-col gap-3 sm:flex-row">
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
          placeholder="you@example.com"
          autoComplete="email"
          inputMode="email"
          maxLength={254}
          required
          disabled={status === "loading" || status === "success"}
          aria-invalid={status === "error"}
          aria-describedby={feedbackId}
          className="min-h-14 min-w-0 flex-1 rounded-pill border border-line bg-surface px-5 font-copy text-base text-ink placeholder:text-muted focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-violet disabled:cursor-not-allowed disabled:opacity-70"
        />

        <Button
          type="submit"
          size="lg"
          disabled={status === "loading" || status === "success"}
          className="w-full shrink-0 sm:w-auto"
        >
          {status === "loading" ? "Joining..." : "Join the waitlist"}
        </Button>
      </div>

      {/*
       * Honeypot field.
       *
       * This is visually outside the viewport, excluded from the
       * accessibility tree, and removed from keyboard navigation.
       * Automated bots that fill all form inputs may still populate it.
       */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-10000px] top-auto h-px w-px overflow-hidden"
      >
        <label htmlFor={websiteId}>Leave this field empty</label>

        <input
          id={websiteId}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Screen-reader announcement and visible feedback */}
      <p
        id={feedbackId}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={`mt-4 min-h-6 text-left font-copy text-sm leading-6 ${
          status === "error" ? "text-coral" : "text-surface"
        }`}
      >
        {feedbackMessage}
      </p>
    </form>
  );
}
