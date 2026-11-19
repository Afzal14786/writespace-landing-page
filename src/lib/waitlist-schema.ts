import { z } from "zod";

/**
 * Shared validation for waitlist submissions.
 *
 * The website field is a honeypot. It is intentionally permitted
 * by the schema because the server handles filled honeypots silently
 * instead of exposing the anti-spam check to bots.
 */
export const waitlistSubmissionSchema = z.object({
  email: z.string().trim().min(1).max(254).email(),

  // The optional follow-up answer is limited to 200 characters.
  topic: z.string().trim().max(200).optional(),

  website: z.string().optional().default(""),
});

export type WaitlistSubmission = z.infer<typeof waitlistSubmissionSchema>;
