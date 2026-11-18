import { NextResponse } from "next/server";

import { waitlistSubmissionSchema } from "@/lib/waitlist-schema";
import { saveWaitlistEmail } from "@/lib/waitlist";

/** Safely narrow an untrusted JSON value to an object. */
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
   * Honeypot check must happen before email validation.
   *
   * Bots that fill the hidden website field receive the same
   * successful response as a normal submission, but their email
   * is never passed to the storage adapter.
   */
  if (
    isRecord(body) &&
    typeof body.website === "string" &&
    body.website.trim().length > 0
  ) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  // Validate the remaining submission on the server.
  const result = waitlistSubmissionSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  try {
    await saveWaitlistEmail(result.data.email);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[waitlist] Failed to process signup", error);

    return NextResponse.json({ success: false }, { status: 500 });
  }
}
