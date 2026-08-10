# ==========================================
# Base Stage
# ==========================================
FROM node:20-alpine AS base

# ==========================================
# Dependencies Stage
# ==========================================
FROM base AS deps
LABEL stage="deps"

# Install compatibility libraries required for certain native Node packages
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy dependency manifests to leverage Docker layer caching
COPY package.json package-lock.json ./
RUN npm ci

# ==========================================
# Builder Stage
# ==========================================
FROM base AS builder
LABEL stage="builder"

WORKDIR /app

# Copy installed dependencies and application source code
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable Next.js telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

# Inject build-time environment variables
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Build application bundle
RUN npm run build

# Ensure public directory exists to prevent copy errors in runner stage
RUN mkdir -p /app/public

# ==========================================
# Runner Stage
# ==========================================
FROM base AS runner
LABEL maintainer="seu-email@exemplo.com"
LABEL version="1.0"
LABEL description="Next.js production application image"

WORKDIR /app

# Configure runtime environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root system user and group for security hardening
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built assets and standalone server output with proper permissions
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-privileged user
USER nextjs

# Expose network ports
EXPOSE 3000

# Runtime server configurations
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start application server
CMD ["node", "server.js"]