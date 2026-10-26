# Engineering Design Document: Personal Portfolio (`claudya.in`)

**Owner:** Eklavya Shivaji Ghodake  
**Domain:** `claudya.in`  
**GitHub:** `https://github.com/Eklavya-San`  
**Date:** 2026-10-26  
**Status:** Approved for Implementation Planning  

---

## 1. Executive Summary & Goals

The objective is to design and build an ultra-fast, visually striking, and technically authoritative developer portfolio for **Eklavya Ghodake** hosted at **`claudya.in`**. 

The portfolio embodies a **Hybrid "Systems & Applied AI" Builder** narrative, establishing credibility as both a **Senior Full-Stack & Distributed Systems Engineer / Software R&D Lead** (proven in production industrial IoT, database optimization, and high-throughput streaming) and an **Applied AI & Agentic Systems Engineer** (building autonomous dual-agent coding harnesses, MCP servers, and local LLM RAG pipelines).

### Key Success Criteria:
1. **Zero-Friction Discovery**: Single-page application with in-place architecture deep-dive modals synced to URL hashes (e.g. `claudya.in/#machinewise`).
2. **Clear Ownership Boundaries**: Enterprise production work (**MachineWise** at Yantramedhavi) clearly distinguished from open-source tools (**MQTTGo**, **Pi-Agent-MCP**, **Document RAG**).
3. **Hard Quantified Metrics**: Prominently featuring verified production numbers (70% database storage reduction, <100MB RAM Go client, zero-loss DR recovery, 14 ASME/ISO GD&T symbols).
4. **Obsidian Dark & Capsule Ergonomics**: Consistent with the `use-shadcn` design system (deep dark `#030712`, pill-shaped elements, crisp monospace telemetry badges).
5. **Static Performance**: Instant load time (<1s), zero SSR overhead, hostable anywhere as static assets.

---

## 2. Technology Stack & Tooling

* **Framework**: Vite 5+ with React 18/19 & TypeScript
* **Styling**: Tailwind CSS 3.4+
* **UI Components & Icons**: Radix UI primitives (Accessible Dialog / Modal), Lucide React
* **Assets**: Verified Resume PDF (`Eklavya_Ghodake_Resume.pdf`) embedded directly into `public/`
* **Build Target**: Static SPA deployment (GitHub Pages / Vercel / Cloudflare Pages)

---

## 3. Visual Styling & Design System ("Obsidian Capsule")

### Color Palette & Surface Tokens
* **Base Canvas**: Deepest Obsidian (`#030712` / `zinc-950`) with subtle radial gradients for depth.
* **Surface Containers**: Dark Slate (`#0B0F17` / `#0F172A`) with subtle border rings (`border-zinc-800/80`).
* **Hover State**: Border brightness ramp (`hover:border-zinc-700/80`) with soft telemetry glow.
* **Accent Indicators**:
  * `emerald-400` / `emerald-500`: Telemetry, online availability, database optimization metrics.
  * `sky-400` / `cyan-400`: Distributed systems, Go, networking protocols.
  * `violet-400` / `indigo-400`: Applied AI, local LLMs, MCP agents.
  * `zinc-400` / `zinc-500`: Technical specs, metadata, and timestamps.

### Typography & Capsule Ergonomics
* **Sans Font**: Inter / system geometric sans for high-readability headings and body copy.
* **Monospace Font**: JetBrains Mono / ui-monospace for technical specs, terminal prompts, and metric tickers.
* **Pill-Shaped Ergonomics**: Fully rounded buttons (`rounded-full`), filter tabs, and status pills.

---

## 4. Information Architecture & Page Hierarchy

```
[ Sticky Glassmorphic Navbar: > claudya.in | #projects | #experience | #skills | [Resume CTA] ]
                                      │
[ Hero: Dual Authority Headline | Impact Subheadline | Action Buttons | Social Icons ]
                                      │
[ Impact Telemetry Ticker: -70% DB Storage | <100MB RAM | 0 Loss DR | 14 GD&T Symbols ]
                                      │
[ Spotlight Case Studies (4 Flagship Cards) ] ──[ Clicking 'Inspect' ]──> [ Architecture Modal ]
  1. MachineWise (Enterprise Production)
  2. Pi-Agent-MCP (Open Source Dual-Agent Engine)
  3. MQTTGo (Ultralight Concurrent Go Client)
  4. Document RAG (On-Premises Local LLM Engine)
                                      │
[ The Engineering Workshop (Filterable Project Grid) ]
  Filters: [ All | Systems & IoT | AI Agents & LLMs | Developer Tools ]
  Items: CTQ-Extraction, AI Vision Annotator, Redmine MCP, use-shadcn, Docker Registry UI, Simulators
                                      │
[ Engineering Leadership & Journey Timeline ]
  - Yantramedhavi: Software R&D Lead / Manager (Sep 2026 - Present)
  - Yantramedhavi: SDE II (Jan 2025 - Aug 2026)
  - Yantramedhavi: SDE I (Aug 2023 - Dec 2024)
  - Speaking: IMTEX Bangalore (2026) & MSME Defence Expo (2024)
  - Foundation: CDAC IACSD Pune (P.G. Diploma in Advanced Computing, Grade A)
                                      │
[ Technical Capabilities Matrix (Categorized Skills & Protocols) ]
                                      │
[ Community & Footer: YouTube @developer_by_choice | GitHub | LinkedIn | Email ]
```

---

## 5. Detailed Project Specifications

### 5.1 The 4 Spotlight Flagship Case Studies

#### 1. MachineWise (Industrial IoT Platform & Streaming Architecture)
* **Type**: `Enterprise Production Case Study (Yantramedhavi)`
* **Stack**: `React`, `Vite`, `Node.js`, `WebSockets`, `MongoDB`, `MQTT`, `Docker`, `Linux`
* **Key Achievements**:
  * Slashed continuous time-series database storage costs by **70%** via an event-driven on-change compression and aggregation model.
  * Architected daily archive-based backup and automated restoration pipelines across MongoDB replica sets, successfully recovering production clusters with **0 data loss**.
  * Built responsive real-time streaming web applications utilizing React and WebSockets for live CNC machine telemetry and OEE metrics with **99.9%+ platform uptime**.
* **Modal Deep-Dive Details**:
  * *Architecture Flow*: Industrial CNC Machines (Fanuc/Siemens) → Edge Linux Gateway (MQTT) → High-Throughput Node.js Ingestion Service → Redis Pub/Sub Stream → MongoDB Replica Set → React WebSocket Dashboard.
  * *Technical Challenge*: Ingesting uncompressed 100ms machine sensor ticks caused storage bloat and slow aggregation queries.
  * *Engineered Solution*: Implemented delta-compression on edge/ingestion layer with tiered time-bucket rollups.

#### 2. Pi-Agent-MCP (Autonomous Dual-Agent Coding Engine)
* **Type**: `Open Source Developer Tooling`
* **Repository**: `https://github.com/Eklavya-San/dsh-agent-mcp`
* **Stack**: `TypeScript`, `Python`, `MCP (Model Context Protocol)`, `Local LLMs (Qwen 35B / Ollama)`, `Docker`
* **Key Achievements**:
  * Engineered a zero-cost autonomous dual-agent coding engine running against local and free LLM backends with **$0 token cost**.
  * Designed an isolated two-agent architecture: Agent 1 (`pi-worker`) performs surgical file edits in an isolated context window, and Agent 2 (`reviewer-worker`) audits git diffs, executes test suites, and enforces QA approval.
  * Guaranteed **zero token leakage** across long task sessions through ephemeral agent lifecycles.

#### 3. MQTTGo (Ultralight Concurrent MQTT Client & Debugging Suite)
* **Type**: `Open Source IoT Networking Suite`
* **Repository**: `https://github.com/Eklavya-San/mqttgo`
* **Stack**: `Go (Golang)`, `React`, `WebSockets`, `MQTT Protocol`, `Concurrency`
* **Key Achievements**:
  * Engineered an ultra-efficient industrial MQTT client in Go with an active runtime memory footprint **under 100MB** (an 85% memory reduction compared to Electron-based tools like MQTTX).
  * Implemented concurrent Go channel multiplexing for sub-millisecond topic subscription, packet filtering, payload inspection, and broker load simulation.
  * Built resilient network reconnect handling with backoff jitter for unstable edge factory network environments.

#### 4. Document RAG (Enterprise On-Premises Knowledge Assistant)
* **Type**: `Applied AI Architecture`
* **Repository**: `https://github.com/Eklavya-San/RAG` (or `document_rag`)
* **Stack**: `Python`, `FastAPI`, `Vector DB`, `Ollama`, `Local LLMs`, `LangChain`
* **Key Achievements**:
  * Built an air-gapped on-premises Retrieval-Augmented Generation (RAG) platform ensuring **100% data privacy** and zero external API egress.
  * Engineered semantic chunking, embedding generation, and vector index retrieval across complex technical manuals, engineering schematics, and enterprise PDFs.
  * Sub-second retrieval latency with verifiable source citation and hallucination guards.

---

### 5.2 The Secondary Filterable Workshop Projects

1. **CTQ-Extraction (AI Skill for Engineering Drawings)**
   * *Category*: `AI Agents` | *Stack*: `Python, Multimodal LLMs, JSON Schema`
   * *Details*: Open-source AI skill extracting Critical-To-Quality (CTQ) parameters, tolerances, and 14 ASME Y14.5 / ISO 1101 GD&T symbols from technical engineering blueprints into validated JSON.

2. **AI Vision Annotator**
   * *Category*: `AI Agents` | *Stack*: `React, TypeScript, FastAPI, OpenCV`
   * *Details*: Interactive web suite for computer vision engineers enabling rapid dataset annotation with AI-assisted bounding-box segmentation.

3. **Redmine+Redcase MCP Server & AI Agent**
   * *Category*: `AI Agents` | *Stack*: `Python, MCP, REST APIs`
   * *Details*: Model Context Protocol server connecting AI assistants directly with enterprise Redmine/Redcase test suites, bug tracking, and automated defect creation.

4. **use-shadcn (AI Agent Design Skill)**
   * *Category*: `Developer Tools` | *Stack*: `TypeScript, Tailwind CSS, shadcn/ui`
   * *Details*: Cross-platform AI coding skill enforcing Obsidian theme tokens, capsule ergonomics, and automated legacy UI refactoring.

5. **Docker Registry UI Pro**
   * *Category*: `Developer Tools` | *Stack*: `React, Docker Registry API, Tailwind CSS`
   * *Details*: Web-based management console for private Docker container registries, image vulnerability inspection, and automated tag curation.

6. **Vehicle & Flight Simulators**
   * *Category*: `Systems & IoT` | *Stack*: `Go, Node.js, WebSockets`
   * *Details*: High-concurrency spatial telemetry simulation backends modeling real-time aircraft trajectories and vehicle diagnostics.

---

## 6. Component Architecture & Data Flow

### 6.1 Component Hierarchy
* `src/App.tsx`: Root wrapper containing the modal portal and URL hash observer.
* `src/components/Navbar.tsx`: Sticky glass bar with brand `claudya.in`, navigation anchor links, availability status, and resume download.
* `src/components/Hero.tsx`: Dual-narrative headline, terminal prompt display, quick action capsule buttons, and social links.
* `src/components/ImpactTicker.tsx`: 4 high-contrast KPI cards.
* `src/components/SpotlightSection.tsx`: 4 flagship project cards with interactive deep-dive triggers.
* `src/components/ProjectDetailModal.tsx`: In-place modal dialog displaying technical challenges, architectural diagrams, stack pills, and metrics.
* `src/components/WorkshopGrid.tsx`: Filter tabs (`All`, `Systems & IoT`, `AI Agents`, `Developer Tools`) and project grid.
* `src/components/ExperienceTimeline.tsx`: Visual career journey across Yantramedhavi promotions and key conference presentations.
* `src/components/SkillsMatrix.tsx`: Grouped technical capabilities matrix.
* `src/components/CommunitySection.tsx`: Spotlight for YouTube channel `@developer_by_choice` and contact links.
* `src/components/Footer.tsx`: Copyright, domain attribution (`claudya.in`), and back-to-top button.
* `src/data/projectsData.ts`: Central typed repository containing all project metadata, deep-dive content, and metrics.

### 6.2 Deep-Link URL State
* Clicking *"Inspect Architecture"* sets `activeProject` and changes `window.location.hash` to `#<project-slug>` (e.g. `#machinewise`).
* On initial page load or `hashchange` event, the app reads the URL hash:
  * If a matching project slug exists, the modal is automatically opened.
  * If the modal is closed via the `X` button, `Escape` key, or backdrop click, the hash is reset to `""` without page reload.

---

## 7. Verification & Quality Acceptance Criteria

1. **Build Verification**: `npm run build` passes with zero TypeScript errors and zero warnings.
2. **Deep-Link State**: Opening `claudya.in/#machinewise` opens the modal directly; pressing Back or closing modal clears the hash.
3. **Responsive Design**: Flawless layout on desktop (1440px), tablet (768px), and mobile (375px).
4. **Theme Consistency**: Pitch-dark `#030712` canvas with Obsidian palette, capsule buttons, and emerald/cyan/violet telemetry accents.
5. **Asset Integrity**: Resume download link delivers `Eklavya_Ghodake_Resume.pdf` correctly.
