const REQUEST_TIMEOUT_MS = 10_000;

/**
 * Raised when the backend URL is missing or incorrectly configured.
 * This is kept separate from request failures so the route can return
 * an appropriate service-unavailable response.
 */
export class WaitlistConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WaitlistConfigurationError";
  }
}

/**
 * Resolve the public waitlist endpoint from a server-only environment
 * variable. The configured value should end at /api/v1, not /waitlist.
 */
function getWaitlistEndpoint(): string {
  const configuredBaseUrl = process.env.WRITESPACE_API_BASE_URL?.trim();

  if (!configuredBaseUrl) {
    throw new WaitlistConfigurationError(
      "WRITESPACE_API_BASE_URL is not configured.",
    );
  }

  let baseUrl: URL;

  try {
    baseUrl = new URL(configuredBaseUrl);
  } catch {
    throw new WaitlistConfigurationError(
      "WRITESPACE_API_BASE_URL is not a valid URL.",
    );
  }

  if (
    !["http:", "https:"].includes(baseUrl.protocol) ||
    baseUrl.username ||
    baseUrl.password ||
    baseUrl.search ||
    baseUrl.hash
  ) {
    throw new WaitlistConfigurationError(
      "WRITESPACE_API_BASE_URL must be a valid HTTP(S) base URL.",
    );
  }

  // Normalize a trailing slash before adding the confirmed route path.
  baseUrl.pathname = `${baseUrl.pathname.replace(/\/+$/, "")}/waitlist`;

  return baseUrl.toString();
}

/**
 * Sends a validated email to the Writespace backend.
 *
 * The backend owns persistence and duplicate handling. Both HTTP 200
 * (already registered) and HTTP 201 (new subscriber) are successful.
 */
export async function saveWaitlistEmail(email: string): Promise<void> {
  const endpoint = getWaitlistEndpoint();

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
    cache: "no-store",
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  if (!response.ok) {
    // Do not forward backend error details or subscriber information
    // to the browser. The route handler returns a generic failure.
    throw new Error(
      `Writespace waitlist API responded with status ${response.status}.`,
    );
  }
}
