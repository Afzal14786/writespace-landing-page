import { NextResponse } from "next/server";

import { saveWaitlistEmail } from "@/lib/waitlist";
import { waitlistSubmissionSchema } from "@/lib/waitlist-schema";

/** Safely narrow untrusted JSON to an object before reading its fields. */
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
   * Check the honeypot before validating the email.
   * Bots receive the same response as a successful signup, but their
   * submitted email and topic never reach the waitlist adapter.
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
    await saveWaitlistEmail(result.data.email, result.data.topic);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[waitlist] Failed to process signup", error);

    return NextResponse.json({ success: false }, { status: 500 });
  }
}
