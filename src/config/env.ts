/**
 * Application environment configuration object.
 * Provides immutable access to client-side and public environment variables.
 */
export const env = {
    /**
     * The base URL for API requests, resolved from the NEXT_PUBLIC_API_URL environment variable.
     * Defaults to an empty string if undefined.
     */
    apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
} as const;