/**
 * Application environment configuration object.
 * Provides immutable access to client-side and public environment variables.
 */
export const env = {
    apiUrl: process.env.NEXT_PUBLIC_API_URL!,
    useMock: process.env.NEXT_PUBLIC_USE_MOCK === "true",
};