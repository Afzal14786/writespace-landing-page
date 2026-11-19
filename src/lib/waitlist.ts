type WaitlistIntegrationEnvironment = {
  writespaceApiUrl: string | undefined;
  writespaceApiKey: string | undefined;
  emailServiceApiKey: string | undefined;
  databaseUrl: string | undefined;
};

/**
 * Keep optional integration credentials in environment variables.
 * Never hard-code API keys or expose them to client components.
 */
function readIntegrationEnvironment(): WaitlistIntegrationEnvironment {
  return {
    writespaceApiUrl: process.env.WRITESPACE_API_URL,
    writespaceApiKey: process.env.WRITESPACE_API_KEY,
    emailServiceApiKey: process.env.WAITLIST_EMAIL_SERVICE_API_KEY,
    databaseUrl: process.env.WAITLIST_DATABASE_URL,
  };
}

/**
 * Temporary waitlist adapter.
 *
 * This implementation only logs submissions on the server.
 * Replace it with persistent storage before accepting real signups.
 */
export async function saveWaitlistEmail(
  email: string,
  topic?: string,
): Promise<{ success: true }> {
  const integrationEnvironment = readIntegrationEnvironment();

  // Log whether future integration settings are present, never their values.
  const optionalEnvironmentValuesPresent = Object.values(
    integrationEnvironment,
  ).some(Boolean);

  // TODO: Connect your own Writespace API using the server-side
  // WRITESPACE_API_URL and WRITESPACE_API_KEY environment variables.

  // TODO: Connect an email service using
  // WAITLIST_EMAIL_SERVICE_API_KEY when a provider is selected.

  // TODO: Persist signups and optional topics in a database using
  // WAITLIST_DATABASE_URL. Add duplicate-email handling and a
  // retention policy before enabling public waitlist submissions.

  console.info("[waitlist] Submission received", {
    email,
    topic: topic || undefined,
    optionalEnvironmentValuesPresent,
    adapter: "temporary-log-only",
  });

  return {
    success: true,
  };
}
