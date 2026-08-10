import type { NextConfig } from "next";

/**
 * Next.js application configuration options.
 * Configured for standalone output mode for optimized Docker containerization.
 */
const nextConfig: NextConfig = {
  output: "standalone",
};

export default nextConfig;