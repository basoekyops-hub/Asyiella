# Multi-stage Dockerfile for Railway / Production
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests and configuration
COPY .npmrc package*.json ./
RUN npm ci

# Copy source code and build production assets (both client and server)
COPY . .
RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Install production dependencies only
COPY .npmrc package*.json ./
RUN npm ci --omit=dev

# Copy compiled bundles and persistent resources
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/data ./data
COPY --from=builder /app/public ./public

# Ensure uploads directory is present and writable
RUN mkdir -p /app/public/uploads

EXPOSE 3000

# Start compiled production server
CMD ["node", "dist/server.js"]
