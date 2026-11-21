import { z } from "zod";

/**
 * Shared validation for waitlist submissions.
 *
 * The website field is a honeypot. It is intentionally permitted
 * by the schema because the server handles filled honeypots silently
 * instead of forwarding them to the backend.
 */
export const waitlistSubmissionSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .max(254, "Email address is too long")
    .email("Please provide a valid email address")
    .transform((email) => email.toLowerCase()),

  website: z.string().optional().default(""),
});

export type WaitlistSubmission = z.infer<typeof waitlistSubmissionSchema>;
