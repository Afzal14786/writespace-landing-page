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
 * Temporary waitlist storage adapter.
 *
 * Currently this only logs the submitted email and returns success.
 * Replace this implementation with persistent storage before launch.
 */
export async function saveWaitlistEmail(
  email: string,
): Promise<{ success: true }> {
  const integrationEnvironment = readIntegrationEnvironment();

  // Log whether future integration settings are present, without
  // logging any credentials. Their presence does not activate an integration.
  const optionalEnvironmentValuesPresent = Object.values(
    integrationEnvironment,
  ).some(Boolean);

  // TODO: Connect your own Writespace API.
  // Use WRITESPACE_API_URL and WRITESPACE_API_KEY to securely
  // send the waitlist email to your backend.

  // TODO: Connect an email service.
  // Use WAITLIST_EMAIL_SERVICE_API_KEY from the server environment
  // when you decide which email provider to use.

  // TODO: Connect persistent database storage.
  // Use WAITLIST_DATABASE_URL when implementing the database adapter.
  // Add duplicate-email handling and an appropriate retention policy.

  console.info("[waitlist] New signup received", {
    email,
    optionalEnvironmentValuesPresent,
    adapter: "temporary-log-only",
  });

  return {
    success: true,
  };
}
