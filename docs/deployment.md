# Deployment and DNS Guide for claudya.in

This guide documents the production deployment workflow, hosting configuration, and DNS setup for **claudya.in**, the personal portfolio and engineering platform of **Eklavya Ghodake**.

---

## 1. Architecture Overview

- **Framework**: [Astro 5+](https://astro.build) with Static Output (`output: 'static'`)
- **UI Stack**: Tailwind CSS v4, React 19, Motion, Radix UI primitives
- **Hosting Target**: **Cloudflare Pages** (primary) / Netlify (drop-in fallback)
- **Domain**: `claudya.in` (Apex) and `www.claudya.in`
- **Output Directory**: `dist/`

---

## 2. Cloudflare Pages Setup

### 2.1 Connecting the Repository
1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Compute (Workers) > Pages**.
2. Select **Create application > Pages > Connect to Git**.
3. Choose the GitHub repository: `portfolio` (or your personal repo fork).
4. Configure branch deployments:
   - **Production branch**: `main`
   - **Automatic deployments**: Enabled (triggers on every push to `main`)

### 2.2 Build Configuration
Set the following build parameters in the Cloudflare Pages settings:

| Setting | Value |
|---|---|
| **Framework preset** | `Astro` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | `/` |

### 2.3 Environment Variables
Under **Settings > Environment variables**, configure:

| Variable | Production Value | Note |
|---|---|---|
| `NODE_VERSION` | `24.16.0` (or `>= 20.0.0`) | Matches development engine |
| `ASTRO_TELEMETRY_DISABLED` | `1` | Opts out of build analytics |

---

## 3. Custom Domain & DNS Records (`claudya.in`)

### 3.1 Adding Custom Domain in Cloudflare Pages
1. Go to your Pages project > **Custom domains**.
2. Click **Set up a custom domain**.
3. Enter `claudya.in` and follow the automated validation.
4. Add `www.claudya.in` as an additional domain (or set up redirect).

### 3.2 DNS Records (When using Cloudflare as DNS Provider)

Cloudflare DNS natively supports **CNAME Flattening** at the apex zone:

| Type | Name | Content / Target | Proxy status | TTL |
|---|---|---|---|---|
| `CNAME` | `@` (apex `claudya.in`) | `<project-name>.pages.dev` | Proxied (Orange cloud) | Auto |
| `CNAME` | `www` | `<project-name>.pages.dev` | Proxied (Orange cloud) | Auto |

> **Note**: If your domain registrar manages DNS externally (e.g., Namecheap, Google Domains / Squarespace) without CNAME flattening, point the apex `@` to Cloudflare Pages A records or use an `ALIAS` / `ANAME` record pointing to `<project-name>.pages.dev`.

### 3.3 WWW to Apex Canonical Redirect
To ensure single-canonical indexing on `https://claudya.in`:
1. In Cloudflare Dashboard, go to **Rules > Redirect Rules**.
2. Create a rule named `Redirect WWW to Apex`:
   - **When incoming requests match**: `Hostname eq "www.claudya.in"`
   - **Then redirect to**: `concat("https://claudya.in", http.request.uri.path)`
   - **Status code**: `301 Moved Permanently`

---

## 4. SSL/TLS and Security Settings

1. **Encryption Mode**: Go to **SSL/TLS > Overview** and select **Full (strict)**.
2. **Always Use HTTPS**: Enable in **SSL/TLS > Edge Certificates**.
3. **HTTP Strict Transport Security (HSTS)**:
   - Enable HSTS
   - Max-Age: `6 months` or `1 year` (31536000 seconds)
   - Include subdomains: Yes
   - Preload: Optional
4. **Minimum TLS Version**: Set to `TLS 1.2` or `TLS 1.3`.

---

## 5. Edge Headers and Redirect Verification

The repository includes static hosting manifests in `public/`:

### 5.1 `public/_headers`
Provides HTTP security headers and immutable caching for Vite/Astro hashed assets:
- `/_astro/*`: `Cache-Control: public, max-age=31536000, immutable`
- `/og/*`: `Cache-Control: public, max-age=86400, stale-while-revalidate=604800`
- `/*`: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`

### 5.2 `public/_redirects`
Configures immediate server-side redirects for shortlinks:
```
/resume  /Eklavya_Ghodake_Resume.pdf  302
```

### 5.3 Custom 404 Routing
Astro compiles `src/pages/404.astro` to `dist/404.html`. Cloudflare Pages and Netlify automatically serve `404.html` with an HTTP 404 status code when any unmapped route is requested.

---

## 6. Pre-flight Verification Checklist

Before pushing commits to trigger production deployment, execute local verification:

```bash
# 1. Typecheck and Astro component validation
npm run check

# 2. Automated test suite (Task 1-7 tests)
npm test

# 3. Production static compilation
npm run build

# 4. Preview compiled production artifacts
npm run preview
```

Inspect the generated `dist/` bundle:
- `dist/index.html` (contains JSON-LD, OpenGraph tags, canonical link)
- `dist/404.html` (Obsidian-styled 404 page)
- `dist/sitemap.xml` (sitemap indexing all flagship pages and resume)
- `dist/robots.txt` (points to `https://claudya.in/sitemap.xml`)
- `dist/og/*.png` (1200x630 cards)
- `dist/_redirects` & `dist/_headers`
