import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Stores the initial value of `process.env.NEXT_PUBLIC_API_URL` before test execution.
 * Used to restore the environment variable in `afterAll`.
 */
const originalApiUrl = process.env.NEXT_PUBLIC_API_URL;

/**
 * Stores the initial value of `process.env.NEXT_PUBLIC_USE_MOCK` before test execution.
 * Used to restore the environment variable in `afterAll`.
 */
const originalUseMock = process.env.NEXT_PUBLIC_USE_MOCK;

/**
 * Helper function to dynamic import and re-evaluate the environment configuration module
 * under modified `process.env` values.
 *
 * Resets module registry caches via `vi.resetModules()` prior to setting environment variables
 * to ensure fresh evaluation of validation logic on each import.
 *
 * @param options - Configuration options for overriding environment variables.
 * @param options.apiUrl - Optional URL string to set for `NEXT_PUBLIC_API_URL`. If undefined, the variable is deleted.
 * @param options.useMock - Boolean flag indicating whether mock mode is enabled for `NEXT_PUBLIC_USE_MOCK`.
 * @returns Promise resolving to the dynamically imported `./env` module exports.
 */
const loadEnv = async ({
    apiUrl,
    useMock,
}: {
    apiUrl?: string;
    useMock: boolean;
}) => {
    vi.resetModules();

    if (apiUrl === undefined) {
        delete process.env.NEXT_PUBLIC_API_URL;
    } else {
        process.env.NEXT_PUBLIC_API_URL = apiUrl;
    }

    process.env.NEXT_PUBLIC_USE_MOCK = String(useMock);

    return import("./env");
};

/**
 * Test suite for validating environment variable parsing and validation logic in `./env`.
 */
describe("env", () => {
    beforeEach(() => {
        vi.resetModules();
        delete process.env.NEXT_PUBLIC_API_URL;
        delete process.env.NEXT_PUBLIC_USE_MOCK;
    });

    afterAll(() => {
        if (originalApiUrl === undefined) {
            delete process.env.NEXT_PUBLIC_API_URL;
        } else {
            process.env.NEXT_PUBLIC_API_URL = originalApiUrl;
        }

        if (originalUseMock === undefined) {
            delete process.env.NEXT_PUBLIC_USE_MOCK;
        } else {
            process.env.NEXT_PUBLIC_USE_MOCK = originalUseMock;
        }
    });

    it("accepts a valid HTTP API URL", async () => {
        const { env } = await loadEnv({
            apiUrl: "http://localhost:8000",
            useMock: false,
        });

        expect(env.apiUrl).toBe("http://localhost:8000");
        expect(env.useMock).toBe(false);
    });

    it("accepts a valid HTTPS API URL", async () => {
        const { env } = await loadEnv({
            apiUrl: "https://api.example.com",
            useMock: false,
        });

        expect(env.apiUrl).toBe("https://api.example.com");
        expect(env.useMock).toBe(false);
    });

    it("allows a missing API URL in mock mode", async () => {
        const { env } = await loadEnv({
            useMock: true,
        });

        expect(env.apiUrl).toBe("");
        expect(env.useMock).toBe(true);
    });

    it("rejects a missing API URL when mock mode is disabled", async () => {
        await expect(
            loadEnv({
                useMock: false,
            }),
        ).rejects.toThrow(
            "NEXT_PUBLIC_API_URL is required when NEXT_PUBLIC_USE_MOCK is false.",
        );
    });

    it("rejects an invalid API URL", async () => {
        await expect(
            loadEnv({
                apiUrl: "not-a-url",
                useMock: false,
            }),
        ).rejects.toThrow(
            "NEXT_PUBLIC_API_URL must be a valid HTTP or HTTPS URL.",
        );
    });

    it("rejects a non-HTTP(S) API URL", async () => {
        await expect(
            loadEnv({
                apiUrl: "ftp://example.com",
                useMock: false,
            }),
        ).rejects.toThrow(
            "NEXT_PUBLIC_API_URL must be a valid HTTP or HTTPS URL.",
        );
    });
});