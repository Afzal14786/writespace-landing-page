import { NextResponse } from "next/server";

import { saveWaitlistEmail, WaitlistConfigurationError } from "@/lib/waitlist";
import { waitlistSubmissionSchema } from "@/lib/waitlist-schema";

/** Safely narrow untrusted JSON before reading its fields. */
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function POST(request: Request) {
  let body: unknown;

  // Invalid JSON is a malformed request, not a server error.
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  /*
   * Check the honeypot before validating or forwarding the email.
   * Bots receive a neutral response, and their data never reaches
   * the Writespace backend.
   */
  if (
    isRecord(body) &&
    typeof body.website === "string" &&
    body.website.trim().length > 0
  ) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  const result = waitlistSubmissionSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  try {
    await saveWaitlistEmail(result.data.email);

    // The backend's 200 and 201 responses are both successful here.
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    // Log the server-side failure without logging the submitted email.
    console.error("[waitlist] Failed to submit signup", error);

    const status = error instanceof WaitlistConfigurationError ? 503 : 502;

    return NextResponse.json({ success: false }, { status });
  }
}
