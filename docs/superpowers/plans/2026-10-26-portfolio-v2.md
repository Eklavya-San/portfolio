# Portfolio (`claudya.in`) Implementation Plan — v2

> **For agentic workers:** Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax. **Do not invent content.** Every project, metric and claim must come from the Content Source of Truth below. If something is missing, leave a `TODO(eklavya)` marker and list it in the final report instead of making it up.

**Goal:** A fast, fluid developer portfolio for Eklavya Ghodake at `claudya.in`, positioned around one idea: *software for the factory floor — real-time telemetry, and AI that reads engineering drawings.*

**Stack:** Astro (static output) + React islands, TypeScript, Tailwind CSS, Motion (framer-motion successor) for layout animation, Radix Dialog (or native `<dialog>`), Lucide icons. Fonts self-hosted via Fontsource. Check and pin the current stable major versions at scaffold time (do not copy versions from older plans).
*Fallback if Astro is rejected:* Vite + React + `vite-react-ssg`; every other section of this plan still applies.

---

## Global Constraints

- Brand: `claudya.in`, but the **name "Eklavya Ghodake" is the primary heading**; the domain is secondary.
- Theme: Obsidian dark (`#030712`). One primary accent (emerald) and one secondary (cyan). No more accent colors. Interactive elements are capsule/pill shaped (`rounded-full`).
- All colors/spacing/radii are CSS variables (design tokens) defined once.
- **Performance budget:** LCP < 1.2s on throttled 4G, initial JS < 100 KB gzipped, Lighthouse ≥ 95 in all four categories.
- **Accessibility:** WCAG AA contrast, visible focus rings, focus trap in overlays, Escape closes, full keyboard use, `prefers-reduced-motion` disables all non-essential motion.
- **No broken links.** Every `href` is validated in CI. Private repos are never linked.
- **Confidential by default:** MachineWise / Yantramedhavi content uses generic diagrams, no client names, no internal URLs, no code link.
- No browser-only secrets; no analytics that need a cookie banner.
- `npm run build` has zero TypeScript errors and zero Astro check errors.

---

## Content Source of Truth

### Identity
- Name: Eklavya Ghodake (resume legal name: Eklavya Shivaji Ghodake)
- Title: **TODO(eklavya): choose one** — "Software R&D Lead" (current) or "Senior Software Engineer". Use the same title on the site, resume and LinkedIn.
- Location: Pune / Maharashtra, India
- Links: GitHub `Eklavya-San`, X `@eghodake`, LinkedIn (from resume), email `eklavyaghodake@gmail.com`, YouTube `@developer_by_choice` (**TODO(eklavya): confirm channel is live; otherwise drop the section**)
- Positioning line: *"I build software for the factory floor: real-time telemetry, and AI that reads engineering drawings."*

### Proof metrics (resume-backed only)
| Value | Label | Source |
|---|---|---|
| 70% | less database storage after moving to event-driven + aggregated time-series | Resume, SDE II |
| 0 | data loss recovering corrupted production MongoDB clusters | Resume, SDE II |
| < 100 MB | RAM footprint of MQTT-GO (vs Electron-based tools) | Resume + `mqttgo` repo |
| 99.9%+ | platform uptime across enterprise deployments | Resume, R&D Lead (**TODO(eklavya): confirm you are comfortable publishing this**) |

Do **not** use: "sub-ms packet serialization", "14 symbols" as a headline metric (it may appear inside the CTQ case study), or any number not in this table.

### Flagship projects (3)
1. **MachineWise / Yantramedhavi** — *Enterprise Production Case Study.* No repo link. Content from resume: event-driven on-change + aggregated time-series storage (−70%); archive-based backup/restore across MongoDB replica sets (zero loss); React + Vite + WebSocket real-time dashboards; ERP REST/webhook integrations; private Docker registry and automated deployments; high-throughput MQTT + Redis pub/sub microservices; Python/.NET device-communication daemons; edge services on Linux nodes. Diagram must be generic.
2. **MQTT-GO** — repo `Eklavya-San/mqttgo` (Apache-2.0, Go + React + SQLite). Repo description: high-performance MQTT monitoring with Time-Travel debugging, global multi-broker streams, industrial TLS/SSL security, ultralight < 100 MB RAM. Positioned as a lightweight alternative to Electron-based tools like MQTTX.
3. **CTQ-Extraction** — repo `Eklavya-San/CTQ-extraction` (Python, 4★). AI agent skill extracting Critical-To-Quality parameters, GD&T feature control frames and verbatim tolerances from engineering drawings/CAD into validated JSON. Cross-platform: Claude Code, Antigravity, Cursor. Backstory: extracted from a larger private platform (`CTQVision` — **never link, never name internals**).

### Workshop projects (6, public repos only)
| Card | Repo | Verified description | Notes |
|---|---|---|---|
| use-shadcn | `use-shadcn` | AI agent skill for refactoring legacy UI and building enterprise interfaces with shadcn/ui, Obsidian Dark & High-Contrast Light, capsule geometry | Cross-platform skill |
| dsh-agent-mcp | `dsh-agent-mcp` (MIT) | MCP server connecting Antigravity, Claude and Cursor to DeepSeek Harness for $0-cost autonomous coding and dual-agent verification | |
| Document RAG | `document_rag` (+ `RAG`) | On-prem RAG: Python, Ollama, local LLMs, zero external data egress | **TODO(eklavya): consolidate the two repos or pick one; add README** |
| AI Vision Annotator | `ai-vision-annotator` | TypeScript | **TODO: needs description + screenshot before listing** |
| AI Procurement Auditor | `ai-procurement-auditor` | TypeScript | **TODO: needs description + screenshot before listing** |
| mqtt-queue | `mqtt-queue` (MIT) | Queuing & logging MQTT topic messages | JavaScript |

If a card's repo still has no description/screenshot at build time, **omit that card** rather than shipping an empty one.

### Explicitly excluded
Private repos (`Operatorapp`, `Data_Acquisition`, `Frigate-Pro-Dashboard`, `video-rendering`, `CTQVision`, `resume`, `personal-web`, etc.), tutorial/practice repos, and forks (`kana-dojo`, `fanuc-driver`). Optional: one line "Open-source contributions" if merged PRs exist (**TODO(eklavya): provide PR links**).
**Removed from v1 (do not exist):** Pi-Agent-MCP, Redmine MCP Agent, Docker Registry UI Pro, Flight & Vehicle Simulators.

### Experience (from resume)
- **Software R&D Lead / Manager**, Yantramedhavi India Pvt Ltd (formerly Wathare Infotech Solutions / MachineWise) — Sep 2026–Present
- **SDE II** — Jan 2025–Aug 2026
- **SDE I** — Aug 2023–Dec 2024
- Talks: IMTEX Bangalore (2026); Maharashtra MSME Defence Expo (2024)
- Education: PG Diploma in Advanced Computing, IACSD CDAC Pune (Grade A, 77.88%); B.E. Mechanical Engineering, RMD Sinhgad (2016–2021); Diploma Mechanical Engineering, Walchand College of Engineering (2013–2016)

---

## Information Architecture

```
/                         Home (all sections)
/work/machinewise         Case study (prerendered)
/work/mqtt-go             Case study (prerendered)
/work/ctq-extraction      Case study (prerendered)
/resume                   Redirect/link to /Eklavya_Ghodake_Resume.pdf
/404
```

Home section order: Hero → Proof strip → Flagships → Workshop → Experience & Talks → Community (only if YouTube confirmed) → Contact → Footer.

---

## Fluid UX Spec

1. **Shared-element transition:** a flagship card morphs into its case-study view (View Transitions API with Astro `<ClientRouter />`, or Motion `layoutId` inside an island). Direct visits to `/work/*` render a normal full page. From home they open as an overlay.
2. **Overlay routing:** opening uses `history.pushState('/work/<slug>')`; closing uses `history.back()` when the overlay was opened from home, otherwise navigate to `/`. Back/Forward/Escape/refresh/share all work. **Section anchors (`#projects` etc.) remain plain hash anchors and never open overlays.**
3. **Morphing capsule nav:** floating pill; shrinks on scroll; animated active-section indicator (IntersectionObserver scrollspy); bottom capsule bar on mobile (respect `env(safe-area-inset-bottom)`).
4. **Command palette (`Cmd/Ctrl+K`):** jump to section/project, open résumé, copy email, open GitHub. Accessible combobox pattern.
5. **Telemetry hero:** a lightweight canvas/SVG visual of simulated MQTT machine topics (e.g. `plant/cnc-04/spindle_load`, `cycle_count`, `downtime_event`) flowing into a small live-dashboard tile. Pauses when off-screen (IntersectionObserver) and under reduced motion; static fallback image. Replaces the fake `claudya --focus` terminal. Mark clearly as a simulation.
6. **Animated architecture diagrams:** inline SVG with packets travelling along paths; hover/focus tooltips on nodes. No ASCII diagrams.
7. **Scroll-linked polish:** count-up proof metrics on enter; timeline progress line fills on scroll (CSS scroll-driven animations with a no-animation fallback).
8. **Pointer-follow glow** on cards via `--mx/--my` CSS variables (no JS re-render).
9. **Fluid sizing:** `clamp()` for type and spacing; container queries for cards; avoid hard breakpoints for typography.
10. **Workshop:** auto-fit grid, domain tags (no filter tabs while ≤ 8 cards). Add animated filtering only when ≥ 10 projects.

---

## Task 0: Human prerequisites (Eklavya, before/while agent builds)

- [ ] Decide the site's goal (job search / consulting / credibility) and the primary CTA.
- [ ] Choose the single title (see Identity).
- [ ] Add descriptions + topics to `portfolio`, `ai-vision-annotator`, `ai-procurement-auditor`, `document_rag`.
- [ ] Add a screenshot or GIF to each public repo README listed above.
- [ ] Pin on GitHub: `mqttgo`, `CTQ-extraction`, `use-shadcn`, `dsh-agent-mcp`, `document_rag`, `ai-vision-annotator`.
- [ ] Confirm with employer that MachineWise content and metrics may be published.
- [ ] Draft 3 short case studies (problem → key decision → result) — the agent will format them, not write them from scratch.
- [ ] Confirm LinkedIn URL, YouTube status, and OG image preference.

---

## Task 1: Scaffold (build must pass with a stub page)

**Files:** `package.json`, `astro.config.mjs`, `tsconfig.json`, `tailwind` config, `src/layouts/Base.astro`, `src/pages/index.astro` (stub), `src/styles/tokens.css`, `public/Eklavya_Ghodake_Resume.pdf`, `public/favicon.svg`

- [ ] **Step 1:** Scaffold Astro + React + Tailwind + TypeScript (strict). Add `@astrojs/react`, `motion`, `lucide-react`, `clsx`, `tailwind-merge`, `@radix-ui/react-dialog`, Fontsource Inter + JetBrains Mono (latin subset). Pin versions after checking latest stable.
- [ ] **Step 2:** Create the stub `index.astro` first so the build has an entry point.
- [ ] **Step 3:** Define design tokens (`--bg`, `--surface`, `--border`, `--text`, `--muted`, `--accent`, `--accent-2`, radii, spacing scale, fluid type scale) in `tokens.css`.
- [ ] **Step 4:** Copy the résumé PDF into `public/` **from the user's provided file, not an absolute local path** (ask the user for the file if absent). Do not commit local machine paths anywhere.
- [ ] **Step 5:** Run `npm run build` and `astro check`. Expected: clean.
- [ ] **Step 6:** Commit `chore: scaffold astro + react + tailwind for claudya.in`.

## Task 2: Typed content layer (single source of truth)

**Files:** `src/types/portfolio.ts`, `src/data/profile.ts`, `src/data/metrics.ts`, `src/data/flagships.ts`, `src/data/workshop.overrides.ts`, `src/data/experience.ts`, `src/data/skills.ts`

- [ ] **Step 1:** Define types: `Flagship` (slug, title, badge, tagline, stack, metrics, `caseStudy: {problem, decision, architecture (SVG component key), results}`, `repoUrl?`), `WorkshopCard` (repo, title, tagline, tags, stack, `demoUrl?`), `Metric`, `ExperienceItem`, `SkillGroup`.
- [ ] **Step 2:** Populate **only** from Content Source of Truth. Use `TODO(eklavya)` strings for gaps; a build-time check fails CI if any `TODO(eklavya)` reaches production unless `ALLOW_TODO=1`.
- [ ] **Step 3:** Skills groups (resume-backed): Languages; Backend & Distributed Systems; Real-time Frontend; Data & DevOps; Applied AI & Agents; Industrial / IoT protocols (MQTT, Fanuc FOCAS **only if** the user confirms — it is currently only a fork).
- [ ] **Step 4:** `npx astro check` → zero errors. Commit.

## Task 3: Build-time GitHub sync for the Workshop

**Files:** `src/lib/github.ts`, `src/data/workshop.ts`

- [ ] **Step 1:** At build, fetch `GET https://api.github.com/users/Eklavya-San/repos?per_page=100` (use `GITHUB_TOKEN` if present to avoid rate limits).
- [ ] **Step 2:** Keep only repos that are public, not forks, and whose name appears in `workshop.overrides.ts`. Merge: overrides win for title/tagline/tags/order; GitHub supplies description fallback, language, topics, `pushed_at`.
- [ ] **Step 3:** If the API fails, fall back entirely to overrides (build must never fail because of GitHub).
- [ ] **Step 4:** Drop any card with no tagline after merge and log a warning.
- [ ] **Step 5:** Unit test the merge function (Vitest): override precedence, fork exclusion, private exclusion, fallback path.
- [ ] **Step 6:** Commit.

## Task 4: Nav, Hero, Proof strip

**Files:** `src/components/Nav.tsx`, `src/components/CommandPalette.tsx`, `src/components/Hero.astro`, `src/components/TelemetryHero.tsx`, `src/components/ProofStrip.astro`

- [ ] **Step 1:** Floating capsule nav (see Fluid UX #3) with scrollspy, résumé download button, and a **single** CTA matching the goal chosen in Task 0.
- [ ] **Step 2:** Command palette (UX #4).
- [ ] **Step 3:** Hero: name as `<h1>`, positioning line, 2-sentence bio, primary CTA "See the work" → `#work`, secondary "Résumé". Socials: GitHub, LinkedIn, X (`@eghodake`), Email, (YouTube if confirmed).
- [ ] **Step 4:** `TelemetryHero` (UX #5) with off-screen pause, reduced-motion static fallback, and a small "simulated data" caption.
- [ ] **Step 5:** `ProofStrip`: 4 metrics from `metrics.ts`, count-up on enter, one accent color, capsule borders.
- [ ] **Step 6:** Build + commit.

## Task 5: Flagships, case-study routes, shared-element transition

**Files:** `src/components/FlagshipCard.tsx`, `src/components/CaseStudyView.tsx`, `src/components/diagrams/*.tsx`, `src/pages/work/[slug].astro`, overlay island

- [ ] **Step 1:** 3 flagship cards (badge: "Enterprise Case Study" for MachineWise; "Open Source" for the other two). Each shows tagline, 2 metrics, stack pills, capsule action "Read case study →".
- [ ] **Step 2:** `getStaticPaths` generates `/work/<slug>` pages (prerendered, with unique `<title>`, description and OG image).
- [ ] **Step 3:** Case-study layout: Problem → Key decision(s) → Architecture (animated SVG) → Results → (repo link only for open-source ones).
- [ ] **Step 4:** Implement overlay + shared-element transition + `pushState/back` routing per Fluid UX #1–2. Focus trap, Escape, scroll lock, focus returns to the originating card on close.
- [ ] **Step 5:** Architecture SVGs: MachineWise (generic: devices → MQTT broker → Java microservices + Redis → MongoDB replica set → WebSocket → React dashboard; ERP webhook branch; archive/backup branch). MQTT-GO (broker(s) → Go core → SQLite time-travel store → React UI). CTQ (drawing/CAD → multimodal LLM → schema validation → JSON).
- [ ] **Step 6:** Build + commit.

## Task 6: Workshop, Experience & Talks, Community, Contact, Footer

**Files:** `src/components/Workshop.astro`, `WorkshopCard.astro`, `Experience.tsx`, `Talks.astro`, `Community.astro` (conditional), `Contact.astro`, `Footer.astro`

- [ ] **Step 1:** Workshop grid from Task 3 data, domain tags, outbound GitHub links (`rel="noopener"`), pointer-glow hover.
- [ ] **Step 2:** Experience timeline with scroll-linked progress (UX #7): R&D Lead → SDE II → SDE I, each with 2–3 resume-backed bullets. Talks (IMTEX 2026, Defence Expo 2024). Education.
- [ ] **Step 3:** Community section only if YouTube is confirmed.
- [ ] **Step 4:** Contact: one primary action (email), plus LinkedIn/GitHub/X. Footer with `claudya.in`, back-to-top.
- [ ] **Step 5:** Build + commit.

## Task 7: SEO, assets, and hosting

- [ ] **Step 1:** `<title>`/description per page, canonical URLs, OG + Twitter cards, generated OG image per case study, `sitemap.xml`, `robots.txt`, JSON-LD `Person`.
- [ ] **Step 2:** Favicon + theme-color. `lang="en"`.
- [ ] **Step 3:** Hosting config for Cloudflare Pages or Netlify (static output, custom 404, cache headers for hashed assets), and DNS notes for `claudya.in`.
- [ ] **Step 4:** Commit.

## Task 8: Verification gates (must all pass)

- [ ] **Build:** `npm run build` and `astro check` clean; no `TODO(eklavya)` in output unless `ALLOW_TODO=1`.
- [ ] **Links:** link checker passes for all internal and external URLs (no private repo links).
- [ ] **E2E (Playwright):**
  - Visiting `/work/machinewise` directly renders the full case study.
  - Clicking a flagship from home opens the overlay, URL becomes `/work/<slug>`, Back returns to `/` and closes it, Forward reopens it.
  - Escape closes; focus returns to the originating card.
  - `#experience` anchor scrolls without opening any overlay.
  - Résumé link returns 200 with `application/pdf`.
  - Reduced-motion mode: no telemetry animation, no transitions.
- [ ] **Accessibility:** axe has zero serious/critical issues on `/` and each `/work/*` page; keyboard-only walkthrough passes.
- [ ] **Performance:** Lighthouse CI meets the budget on mobile settings.
- [ ] **Visual QA:** screenshots at 360, 768, 1280 and 1920 px; no horizontal scroll at any width.
- [ ] **Final report to user:** list every remaining `TODO(eklavya)`, every card omitted for missing content, and every claim that needed confirmation. Then commit and tag `v1.0.0`:

```bash
git add -A
git commit -m "chore: final verification and polish for claudya.in"
git tag v1.0.0
```
