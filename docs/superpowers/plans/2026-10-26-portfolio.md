# Portfolio (`claudya.in`) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an ultra-fast, visually striking developer portfolio for Eklavya Ghodake at `claudya.in` showcasing high-throughput distributed systems and autonomous AI agent workflows.

**Architecture:** Single-page application built with Vite, React, TypeScript, and Tailwind CSS. Employs Obsidian dark styling (`#030712`) and capsule ergonomics, featuring in-place architecture deep-dive modals synchronized to URL hashes (`#machinewise`, `#pi-agent`).

**Tech Stack:** React 18/19, TypeScript, Vite, Tailwind CSS, Lucide React, Radix UI Dialog / Accessible Modal primitives.

## Global Constraints

- Domain and brand identity must use `claudya.in` and Eklavya Ghodake.
- Canvas background must strictly follow Obsidian Dark theme (`#030712` / `bg-zinc-950`).
- Interactive elements must use capsule/pill-shaped ergonomics (`rounded-full`).
- MachineWise must be badged as `Enterprise Production Case Study (Yantramedhavi)` with no broken/fake public repository link.
- In-place modal deep dives must sync with `window.location.hash` and handle Back/Forward browser navigation gracefully.
- All code must build cleanly with `npm run build` with zero TypeScript errors.

---

### Task 1: Project Scaffolding & Configuration

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `index.html`
- Create: `src/index.css`
- Copy: `public/Eklavya_Ghodake_Resume.pdf` (from `/Users/eklavya/git-personal/resume/Eklavya_Ghodake_Resume.pdf`)

**Interfaces:**
- Produces: Working Vite + React + Tailwind TypeScript build environment and configured assets.

- [ ] **Step 1: Write `package.json` with dependencies**

```json
{
  "name": "portfolio-claudya",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "clsx": "^2.1.1",
    "lucide-react": "^0.453.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwind-merge": "^2.5.4"
  },
  "devDependencies": {
    "@types/react": "^18.3.11",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.3",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.14",
    "typescript": "^5.6.3",
    "vite": "^5.4.9"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run: `npm install`
Expected: `added ... packages in ...s`

- [ ] **Step 3: Write configuration files (`vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `tailwind.config.js`, `postcss.config.js`)**

`vite.config.ts`:
```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

`tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

`tailwind.config.js`:
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#030712',
          900: '#070C18',
          850: '#0B1120',
          800: '#0F172A',
          700: '#1E293B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      }
    },
  },
  plugins: [],
}
```

`postcss.config.js`:
```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 4: Create `index.html`, `src/index.css`, and copy `Eklavya_Ghodake_Resume.pdf`**

`index.html`:
```html
<!doctype html>
<html lang="en" class="dark scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Eklavya Ghodake | Systems & Applied AI Builder | claudya.in</title>
    <meta name="description" content="Portfolio of Eklavya Ghodake — Senior Software Engineer & Software R&D Lead specializing in distributed systems, real-time telemetry, and autonomous AI agents." />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  </head>
  <body class="bg-[#030712] text-zinc-100 font-sans antialiased selection:bg-emerald-500/20 selection:text-emerald-300 min-h-screen">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

`src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    background-color: #030712;
    color: #f4f4f5;
  }
}

/* Subtle custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #030712;
}
::-webkit-scrollbar-thumb {
  background: #1e293b;
  border-radius: 9999px;
}
::-webkit-scrollbar-thumb:hover {
  background: #334155;
}
```

Copy verified resume to `public/`:
`cp /Users/eklavya/git-personal/resume/Eklavya_Ghodake_Resume.pdf public/Eklavya_Ghodake_Resume.pdf`

- [ ] **Step 5: Verify build works with initial entry point**

Run: `npm run build`
Expected: Clean build output in `dist/`.

- [ ] **Step 6: Commit**

```bash
git add package.json vite.config.ts tsconfig.json tailwind.config.js postcss.config.js index.html src/index.css public/
git commit -m "chore: scaffold vite react tailwind project for claudya.in"
```

---

### Task 2: Data Models & Portfolio Content Repository

**Files:**
- Create: `src/types/portfolio.ts`
- Create: `src/data/portfolioData.ts`

**Interfaces:**
- Produces: Strongly typed data definitions and data records for metrics, spotlight projects (including deep dives), workshop projects, experience milestones, skills matrix, and social links.

- [ ] **Step 1: Define TypeScript interfaces in `src/types/portfolio.ts`**

```ts
export type ProjectCategory = 'all' | 'systems-iot' | 'ai-agents' | 'dev-tools';

export interface SpotlightProject {
  id: string;
  slug: string;
  title: string;
  badge: string;
  badgeType: 'enterprise' | 'opensource';
  tagline: string;
  description: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  deepDive: {
    challenge: string;
    solution: string;
    architectureDiagram: string[];
    outcomes: string[];
  };
  githubUrl?: string;
  liveUrl?: string;
}

export interface WorkshopProject {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'all'>;
  badge: string;
  description: string;
  stack: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface MetricItem {
  value: string;
  label: string;
  subtext: string;
  accent: 'emerald' | 'cyan' | 'violet' | 'amber';
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  type: 'role' | 'presentation';
  summary: string;
  bullets: string[];
  tags: string[];
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: { name: string; highlight?: boolean }[];
}
```

- [ ] **Step 2: Implement structured data repository in `src/data/portfolioData.ts`**

Populate with verified information:
- 4 Impact Metrics (-70% DB storage, <100MB RAM Go footprint, 0 Data Loss DR recovery, 14 ASME/ISO GD&T symbols).
- 4 Spotlight Projects with deep dives (MachineWise, Pi-Agent-MCP, MQTTGo, Document RAG).
- 6 Workshop Projects (CTQ-Extraction, AI Vision Annotator, Redmine MCP Agent, use-shadcn, Docker Registry UI Pro, Flight & Vehicle Simulators).
- Career Timeline (R&D Lead/Manager, SDE II, SDE I at Yantramedhavi, IMTEX Bangalore, Defence Expo, CDAC DAC).
- Categorized Skills Matrix.
- Social Links (GitHub, LinkedIn, YouTube, X, Email).

- [ ] **Step 3: Verify TypeScript compilation**

Run: `npx tsc --noEmit`
Expected: Zero errors.

- [ ] **Step 4: Commit**

```bash
git add src/types/portfolio.ts src/data/portfolioData.ts
git commit -m "feat: add typed data models and portfolio content repository"
```

---

### Task 3: Navigation, Hero & Impact Telemetry Components

**Files:**
- Create: `src/components/Navbar.tsx`
- Create: `src/components/Hero.tsx`
- Create: `src/components/ImpactTicker.tsx`
- Test: Verify visual rendering and links in `src/App.tsx`.

**Interfaces:**
- Consumes: `MetricItem` from `src/types/portfolio.ts`, `metricsData` from `src/data/portfolioData.ts`.
- Produces: Sticky glassmorphic navbar with `claudya.in` branding, hero section with dual narrative and prompt, and live impact KPI cards.

- [ ] **Step 1: Create `src/components/Navbar.tsx`**
  - Sticky frosted header with `backdrop-blur-md bg-[#030712]/80 border-b border-zinc-800/60`.
  - Left: Terminal-styled brand `> claudya.in` with glowing emerald cursor.
  - Center: Anchor links `#projects`, `#experience`, `#skills`, `#contact`.
  - Right: Live status indicator (`🟢 Available for High-Impact Roles`) and capsule download button linking to `/Eklavya_Ghodake_Resume.pdf`.
  - Responsive mobile drawer toggle.

- [ ] **Step 2: Create `src/components/Hero.tsx`**
  - High-authority badge: `ENGINEERING LEADERSHIP • DISTRIBUTED SYSTEMS • APPLIED AI`.
  - Headline: *"Building Resilient Distributed Systems & Autonomous AI Workflows"*.
  - Bio introducing Eklavya Ghodake, Software R&D Lead & Full-Stack Engineer.
  - Interactive terminal simulation prompt:
    `$ claudya --focus "industrial-telemetry" --agents "autonomous" --scale "production"`
  - Capsule CTA buttons: Primary *"Explore Spotlight Work"* (`#spotlight`) & Secondary *"Career Journey & Talks"* (`#experience`).
  - Social icons row: GitHub, LinkedIn, YouTube (`@developer_by_choice`), X, and Email.

- [ ] **Step 3: Create `src/components/ImpactTicker.tsx`**
  - Grid of 4 telemetry metric cards:
    - `-70%`: Database storage compressed via event-driven time-series aggregation.
    - `< 100 MB`: Go MQTT client memory footprint with sub-ms packet serialization.
    - `0 Data Loss`: High-availability DR recovery across MongoDB replica sets.
    - `14 ASME/ISO`: GD&T symbols & tolerances extracted from blueprints via AI skills.
  - Capsule border styling with subtle colored glow on hover.

- [ ] **Step 4: Wire into `src/App.tsx` and run build**

Run: `npm run build`
Expected: Build succeeds with 0 errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/Navbar.tsx src/components/Hero.tsx src/components/ImpactTicker.tsx src/App.tsx
git commit -m "feat: add navbar, hero, and impact telemetry ticker components"
```

---

### Task 4: Spotlight Projects & Interactive Architecture Deep-Dive Modal

**Files:**
- Create: `src/components/SpotlightSection.tsx`
- Create: `src/components/ProjectDetailModal.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `SpotlightProject` from `src/types/portfolio.ts`, `spotlightProjects` from `src/data/portfolioData.ts`.
- Produces: 4 rich featured cards with "Inspect Architecture" triggers; in-place architecture modal with URL hash synchronization (`#machinewise`, `#pi-agent-mcp`, `#mqttgo`, `#document-rag`).

- [ ] **Step 1: Create `src/components/ProjectDetailModal.tsx`**
  - Accessible modal dialog overlay with dark backdrop and Escape-key handling.
  - Header: Project title, badge (`Enterprise Production` or `Open Source`), stack pills, close button (`X`).
  - Body:
    - Problem / Challenge breakdown.
    - Engineered Solution and key technical decisions.
    - Visual ASCII/SVG architecture topology diagram.
    - Quantified outcomes and metrics.
  - Footer: Direct link to GitHub repository (if open source) or enterprise badge note, plus Close button.

- [ ] **Step 2: Create `src/components/SpotlightSection.tsx`**
  - 4 flagship cards arranged in a high-density 2x2 grid or featured row.
  - Each card highlights:
    - Badge: `🏢 Enterprise Case Study` (MachineWise) or `⚡ Open Source Engine` (Pi-Agent, MQTTGo, RAG).
    - Title, tagline, and high-impact metrics.
    - Tech stack capsule pills.
    - Capsule action: *"Inspect Architecture →"* opening the modal and setting `window.location.hash`.

- [ ] **Step 3: Implement URL hash synchronization in `src/App.tsx`**
  - Listen for `window.location.hash` changes on mount and hashchange event.
  - Automatically open modal if hash matches a project slug (`#machinewise`, etc.).
  - Clear hash when modal is closed.

- [ ] **Step 4: Verify modal interaction and build**

Run: `npm run build`
Expected: Build succeeds with 0 errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/SpotlightSection.tsx src/components/ProjectDetailModal.tsx src/App.tsx
git commit -m "feat: add spotlight project cards and deep-dive architecture modal with hash sync"
```

---

### Task 5: The Workshop (Filterable Project Grid)

**Files:**
- Create: `src/components/WorkshopGrid.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `WorkshopProject` and `ProjectCategory` from `src/types/portfolio.ts`, `workshopProjects` from `src/data/portfolioData.ts`.
- Produces: Filterable grid section with tabs (`All`, `Systems & IoT`, `AI Agents`, `Developer Tools`).

- [ ] **Step 1: Create `src/components/WorkshopGrid.tsx`**
  - Header with section title *"The Engineering Workshop"* and subtitle.
  - Filter pill bar: `All`, `Systems & IoT`, `AI Agents`, `Developer Tools` with active highlight.
  - Responsive 3-column card grid for the 6 secondary projects:
    - CTQ-Extraction (AI Blueprint Skill)
    - AI Vision Annotator (CV Studio)
    - Redmine MCP Agent (Enterprise QA & Defects)
    - use-shadcn (Obsidian UI AI Skill)
    - Docker Registry UI Pro
    - Flight & Vehicle Simulators
  - External GitHub links and live badges on cards.

- [ ] **Step 2: Wire `WorkshopGrid` into `src/App.tsx`**

- [ ] **Step 3: Run build verification**

Run: `npm run build`
Expected: Build succeeds with 0 errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/WorkshopGrid.tsx src/App.tsx
git commit -m "feat: add filterable workshop project grid component"
```

---

### Task 6: Experience Timeline, Skills Matrix, Community & Footer

**Files:**
- Create: `src/components/ExperienceTimeline.tsx`
- Create: `src/components/SkillsMatrix.tsx`
- Create: `src/components/CommunitySection.tsx`
- Create: `src/components/Footer.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `experienceTimeline`, `skillCategories`, `socialLinks` from `src/data/portfolioData.ts`.
- Produces: Career progression timeline (SDE 1 → SDE 2 → R&D Lead + IMTEX / Defence Expo talks), technical skills matrix, YouTube spotlight card, and footer.

- [ ] **Step 1: Create `src/components/ExperienceTimeline.tsx`**
  - Visual timeline representing rapid progression at **Yantramedhavi**:
    - *Software R&D Lead / Manager* (Sep 2026 - Present): System architecture, engineering leadership, client alignment.
    - *SDE II* (Jan 2025 - Aug 2026): 70% DB reduction, zero data loss DR, real-time dashboards.
    - *SDE I* (Aug 2023 - Dec 2024): High-concurrency MQTT streaming, edge daemons, low-latency APIs.
  - Public Presentations callout:
    - *IMTEX Bangalore (2026)*: Platform demonstration of real-time streaming architectures to C-suite leaders.
    - *Maharashtra MSME Defence Expo (2024)*: Real-time edge streaming & low-latency computing.
  - Education: CDAC IACSD Pune (P.G. Diploma in Advanced Computing, Grade A).

- [ ] **Step 2: Create `src/components/SkillsMatrix.tsx`**
  - Grid of skill cards:
    - *Backend & Distributed Systems* (Spring Boot, Node.js, Microservices, Redis, WebSockets, MQTT).
    - *Applied AI & Developer Agents* (RAG, Ollama, Local LLMs, MCP, Claude Code, Vector DBs).
    - *Frontend & Real-Time Dashboards* (React, Vite, TypeScript, Tailwind, shadcn/ui).
    - *Data & DevOps* (MongoDB, Docker, Linux, Private Registry, AWS, CI/CD).
    - *Languages* (Java, Go, TypeScript, Python, C#, SQL).

- [ ] **Step 3: Create `src/components/CommunitySection.tsx` & `src/components/Footer.tsx`**
  - Featured YouTube channel card (`@developer_by_choice`): technical tutorials on Docker, AI agents, and full-stack architecture.
  - Direct contact CTA: email button, LinkedIn, GitHub, X.
  - Footer with domain attribution `claudya.in` and back-to-top navigation.

- [ ] **Step 4: Assemble complete `src/App.tsx` and run build**

Run: `npm run build`
Expected: Clean production build.

- [ ] **Step 5: Commit**

```bash
git add src/components/ExperienceTimeline.tsx src/components/SkillsMatrix.tsx src/components/CommunitySection.tsx src/components/Footer.tsx src/App.tsx
git commit -m "feat: complete experience timeline, skills matrix, community section, and footer"
```

---

### Task 7: End-to-End Verification & Polish

**Files:**
- Audit: All `src/**/*.{ts,tsx,css}`, `index.html`, `public/`

**Interfaces:**
- Produces: Verified, production-ready static bundle ready for deployment to `claudya.in`.

- [ ] **Step 1: Verify TypeScript & Build**

Run: `npm run build`
Expected: `dist/` generated with zero errors.

- [ ] **Step 2: Verify Deep-Linking and URL Hash behavior**

Test with headless/local preview server:
- Loading `#machinewise` triggers the MachineWise modal.
- Closing the modal resets the hash.
- PDF download link points to valid `/Eklavya_Ghodake_Resume.pdf`.

- [ ] **Step 3: Final Commit & Tag**

```bash
git add -A
git commit -m "chore: final production polish and verification for claudya.in portfolio"
```
