import { defineConfig } from "@playwright/test";

/**
 * Configuration file for Playwright End-to-End (E2E) testing framework.
 *
 * Defines test execution settings, browser context defaults, and local web server setup
 * for running E2E tests against the Next.js application.
 */
export default defineConfig({
    /**
     * Directory where test files are located.
     */
    testDir: "./e2e",

    /**
     * Whether to run all tests in all files fully in parallel.
     */
    fullyParallel: true,

    /**
     * Prevents accidental execution of focused tests (`test.only`) in CI environments.
     */
    forbidOnly: !!process.env.CI,

    /**
     * Number of times to retry failed tests. Set to 2 in CI environments and 0 locally.
     */
    retries: process.env.CI ? 2 : 0,

    /**
     * Maximum number of concurrent worker processes. Restricted to 1 worker in CI to avoid resource contention.
     */
    workers: process.env.CI ? 1 : undefined,

    /**
     * Reporter to use for test execution output. Generates a self-contained HTML report.
     */
    reporter: "html",

    /**
     * Shared configuration properties for all test projects and browser instances.
     */
    use: {
        /**
         * Base URL used for relative navigation calls like `page.goto('/')`.
         */
        baseURL: "http://localhost:3000",

        /**
         * Tracing strategy. Captures traces automatically on the first retry of a failed test.
         */
        trace: "on-first-retry",
    },

    /**
     * Configuration for starting a local development web server before executing tests.
     */
    webServer: {
        command: "npm run dev",
        url: "http://localhost:3000",
        reuseExistingServer: false,
        timeout: 120_000,
        env: {
            NEXT_PUBLIC_API_URL: "http://127.0.0.1:8001",
            NEXT_PUBLIC_USE_MOCK: "false",
        },
    },
});