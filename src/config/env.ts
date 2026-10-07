/**
 * Internal flag indicating whether the application should operate in mock mode.
 * Parsed from the `NEXT_PUBLIC_USE_MOCK` environment variable.
 */
const useMock = process.env.NEXT_PUBLIC_USE_MOCK === "true";

/**
 * Internal backend API base URL string.
 * Parsed from the `NEXT_PUBLIC_API_URL` environment variable.
 */
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

if (!useMock) {
    if (!apiUrl) {
        throw new Error(
            "NEXT_PUBLIC_API_URL is required when NEXT_PUBLIC_USE_MOCK is false.",
        );
    }

    try {
        const url = new URL(apiUrl);

        if (url.protocol !== "http:" && url.protocol !== "https:") {
            throw new Error();
        }
    } catch {
        throw new Error(
            "NEXT_PUBLIC_API_URL must be a valid HTTP or HTTPS URL.",
        );
    }
}

/**
 * Validated application environment configuration object.
 *
 * Exposes runtime configuration derived from `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_USE_MOCK`
 * environment variables.
 */
export const env = {
    /**
     * The validated backend API base URL.
     * Evaluates to an empty string when `useMock` is true and no API URL is provided.
     */
    apiUrl: apiUrl ?? "",

    /**
     * Indicates whether the application is configured to run using mock services.
     */
    useMock,
};