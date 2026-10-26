# Stage 1: Build the static Astro site
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package.json package-lock.json ./

# Install dependencies cleanly
RUN npm ci

# Copy project source
COPY . .

# Build static production artifacts into /app/dist
RUN npm run build

# Stage 2: Serve with lightweight Nginx
FROM nginx:1.27-alpine AS runner

# Remove default nginx welcome page
RUN rm -rf /usr/share/nginx/html/*

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose standard HTTP port
EXPOSE 80

# Healthcheck to ensure container is responding
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -qO- http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
