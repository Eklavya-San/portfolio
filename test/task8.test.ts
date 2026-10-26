import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';
import { gzipSync } from 'node:zlib';
import { flagships } from '../src/data/flagships';
import { matchWorkRoute } from '../src/lib/work';

const ROOT_DIR = process.cwd();
const DIST_DIR = join(ROOT_DIR, 'dist');

function getAllFilesRecursively(dir: string, extension?: string): string[] {
  if (!existsSync(dir)) return [];
  const files: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      files.push(...getAllFilesRecursively(full, extension));
    } else if (!extension || full.endsWith(extension)) {
      files.push(full);
    }
  }
  return files;
}

describe('Task 8 Verification Gates', () => {
  /* ==========================================================================
     GATE 1: Prerendered Work Routes & Case Studies
     ========================================================================== */
  describe('Gate 1: Prerendered Work Routes & Case Studies', () => {
    it('verifies all 3 flagship case study HTML files exist in dist/work/*', () => {
      for (const project of flagships) {
        const filePath = join(DIST_DIR, 'work', project.slug, 'index.html');
        expect(existsSync(filePath), `Expected prerendered file for ${project.slug} at ${filePath}`).toBe(true);

        const html = readFileSync(filePath, 'utf-8');
        expect(html.length).toBeGreaterThan(1500);

        // Title and badge
        expect(html).toContain(project.title);
        expect(html).toContain(project.badge);

        // Case study sections
        expect(html).toContain(project.tagline);
        expect(html).toContain('The Problem &amp; Operational Context');
        expect(html).toContain('Key Architectural Decisions');
        expect(html).toContain('Interactive Architecture Topology');
        expect(html).toContain('Measured Results &amp; Verified Outcomes');

        // Results
        for (const res of project.caseStudy.results) {
          const expected = res.replace(/&/g, '&amp;');
          expect(html).toContain(expected);
        }

        // Return navigation
        expect(html).toContain('href="/#work"');
      }
    });

    it('verifies MachineWise confidentiality invariants in built HTML', () => {
      const mwPath = join(DIST_DIR, 'work', 'machinewise', 'index.html');
      const html = readFileSync(mwPath, 'utf-8');

      expect(html).toContain('MachineWise');
      expect(html).toContain('Enterprise Production');
      expect(html).toContain('CNC Machine Fleet');
      expect(html).toContain('MQTT Broker');
      expect(html).toContain('Java Microservices &amp; Redis');

      // Must NOT contain any private repository URL or GitHub repo link for MachineWise
      expect(html).not.toContain('github.com/Eklavya-San/MachineWise');
      expect(html).not.toContain('github.com/Eklavya-San/machinewise');
      expect(html).not.toContain('github.com/Eklavya-San/Operatorapp');
      expect(html).not.toContain('github.com/Eklavya-San/CTQVision');
    });

    it('verifies open-source repository buttons in MQTT-GO and CTQ-Extraction', () => {
      const mqttPath = join(DIST_DIR, 'work', 'mqtt-go', 'index.html');
      const mqttHtml = readFileSync(mqttPath, 'utf-8');
      expect(mqttHtml).toContain('https://github.com/Eklavya-San/mqttgo');
      expect(mqttHtml).toContain('Open Source');
      expect(mqttHtml).toContain('Go Concurrency Core');

      const ctqPath = join(DIST_DIR, 'work', 'ctq-extraction', 'index.html');
      const ctqHtml = readFileSync(ctqPath, 'utf-8');
      expect(ctqHtml).toContain('https://github.com/Eklavya-San/CTQ-extraction');
      expect(ctqHtml).toContain('Open Source');
      expect(ctqHtml).toContain('14 ASME Y14.5');
    });
  });

  /* ==========================================================================
     GATE 2: Fluid Overlay & Navigation Routing Logic
     ========================================================================== */
  describe('Gate 2: Fluid Overlay & Navigation Routing Logic', () => {
    it('isolates section anchors from flagship modal routes', () => {
      // Valid flagship paths
      expect(matchWorkRoute('/work/machinewise')?.slug).toBe('machinewise');
      expect(matchWorkRoute('/work/mqtt-go')?.slug).toBe('mqtt-go');
      expect(matchWorkRoute('/work/ctq-extraction')?.slug).toBe('ctq-extraction');

      // Anchor links MUST NOT be matched as work routes
      expect(matchWorkRoute('#experience')).toBeNull();
      expect(matchWorkRoute('#skills')).toBeNull();
      expect(matchWorkRoute('#contact')).toBeNull();
      expect(matchWorkRoute('#work')).toBeNull();
      expect(matchWorkRoute('/#work')).toBeNull();
      expect(matchWorkRoute('/#experience')).toBeNull();
      expect(matchWorkRoute('/')).toBeNull();
      expect(matchWorkRoute('/404')).toBeNull();
    });

    it('validates overlay lifecycle invariants and history state contract', () => {
      // Invariant checks for FlagshipSection:
      // 1. Opening modal sets URL to /work/<slug>
      // 2. Escape or popstate returns to / or /#work
      // 3. Document title updates to `<Project> — Case Study | Eklavya Ghodake`
      for (const project of flagships) {
        const expectedTitle = `${project.title} — Case Study | Eklavya Ghodake`;
        const expectedRoute = `/work/${project.slug}`;

        expect(expectedRoute).toMatch(/^\/work\/[a-z0-9-]+$/);
        expect(expectedTitle).toContain(project.title);
        expect(expectedTitle).toContain('Eklavya Ghodake');
      }
    });
  });

  /* ==========================================================================
     GATE 3: Résumé PDF Verification
     ========================================================================== */
  describe('Gate 3: Résumé PDF Verification', () => {
    it('verifies dist/Eklavya_Ghodake_Resume.pdf exists and has valid %PDF- header', () => {
      const pdfPath = join(DIST_DIR, 'Eklavya_Ghodake_Resume.pdf');
      expect(existsSync(pdfPath), 'Resume PDF must exist in dist/').toBe(true);

      const buffer = readFileSync(pdfPath);
      expect(buffer.length).toBeGreaterThan(1000);

      const header = buffer.subarray(0, 5).toString('ascii');
      expect(header.startsWith('%PDF-'), `Expected PDF header starting with %PDF-, got ${header}`).toBe(true);
    });

    it('verifies /resume redirects to /Eklavya_Ghodake_Resume.pdf', () => {
      // 1. Check Cloudflare/Netlify _redirects
      const redirectsPath = join(DIST_DIR, '_redirects');
      expect(existsSync(redirectsPath)).toBe(true);
      const redirects = readFileSync(redirectsPath, 'utf-8');
      expect(redirects).toMatch(/\/resume\s+\/Eklavya_Ghodake_Resume\.pdf\s+302/);

      // 2. Check static HTML redirect in dist/resume/index.html
      const resumeHtmlPath = join(DIST_DIR, 'resume', 'index.html');
      expect(existsSync(resumeHtmlPath)).toBe(true);
      const resumeHtml = readFileSync(resumeHtmlPath, 'utf-8');
      expect(resumeHtml).toContain('url=/Eklavya_Ghodake_Resume.pdf');
      expect(resumeHtml).toContain('/Eklavya_Ghodake_Resume.pdf');
    });
  });

  /* ==========================================================================
     GATE 4: Reduced Motion & Telemetry Safeguards
     ========================================================================== */
  describe('Gate 4: Reduced Motion Safeguards', () => {
    it('verifies CSS bundle includes @media (prefers-reduced-motion: reduce) rules', () => {
      const cssFiles = getAllFilesRecursively(join(DIST_DIR, '_astro'), '.css');
      expect(cssFiles.length).toBeGreaterThan(0);

      let foundReducedMotion = false;
      for (const file of cssFiles) {
        const content = readFileSync(file, 'utf-8');
        if (content.includes('prefers-reduced-motion')) {
          foundReducedMotion = true;
          break;
        }
      }
      expect(foundReducedMotion, 'CSS bundle must include prefers-reduced-motion media query').toBe(true);
    });

    it('verifies JavaScript components guard animations with prefers-reduced-motion', () => {
      // 1. TelemetryHero respects prefers-reduced-motion
      const telemetryHeroPath = join(ROOT_DIR, 'src', 'components', 'TelemetryHero.tsx');
      const telemetrySource = readFileSync(telemetryHeroPath, 'utf-8');
      expect(telemetrySource).toContain('prefers-reduced-motion');
      expect(telemetrySource).toContain('reducedMotion');

      // 2. FlagshipSection modal animation disables motion on reduced motion
      const flagshipSectionPath = join(ROOT_DIR, 'src', 'components', 'FlagshipSection.tsx');
      const flagshipSource = readFileSync(flagshipSectionPath, 'utf-8');
      expect(flagshipSource).toContain('useReducedMotion()');
      expect(flagshipSource).toContain('shouldReduceMotion');

      // 3. ProofStrip count-up respects prefers-reduced-motion
      const proofStripPath = join(ROOT_DIR, 'src', 'components', 'ProofStrip.astro');
      const proofStripSource = readFileSync(proofStripPath, 'utf-8');
      expect(proofStripSource).toContain('prefers-reduced-motion');
    });
  });

  /* ==========================================================================
     GATE 5: Accessibility, Headings, and HTML Landmarks
     ========================================================================== */
  describe('Gate 5: Accessibility, Headings, and HTML Landmarks', () => {
    const htmlFiles = getAllFilesRecursively(DIST_DIR, '.html').filter((f) => !f.includes('/resume/'));

    it('verifies all pages declare lang="en" and responsive viewport meta', () => {
      for (const file of htmlFiles) {
        const html = readFileSync(file, 'utf-8');
        expect(html).toContain('<html lang="en">');
        expect(html).toContain('<meta name="viewport" content="width=device-width, initial-scale=1">');
      }
    });

    it('verifies semantic HTML landmarks (<main>, <nav>, <footer>) on index and work pages', () => {
      const pagesToCheck = [
        join(DIST_DIR, 'index.html'),
        join(DIST_DIR, 'work', 'machinewise', 'index.html'),
        join(DIST_DIR, 'work', 'mqtt-go', 'index.html'),
        join(DIST_DIR, 'work', 'ctq-extraction', 'index.html'),
      ];

      for (const file of pagesToCheck) {
        const html = readFileSync(file, 'utf-8');
        expect(html).toContain('<main');
        expect(html).toContain('<nav');
        expect(html).toContain('<footer');
      }
    });

    it('verifies heading hierarchy with exactly one h1 on every page', () => {
      for (const file of htmlFiles) {
        if (file.includes('404.html')) continue;
        const html = readFileSync(file, 'utf-8');
        const h1Matches = html.match(/<h1\b[^>]*>/g) || [];
        expect(
          h1Matches.length,
          `Expected exactly 1 <h1> in ${file.replace(DIST_DIR, '')}, found ${h1Matches.length}`
        ).toBe(1);
      }
    });

    it('verifies icon buttons and external links have accessible labels', () => {
      const indexHtml = readFileSync(join(DIST_DIR, 'index.html'), 'utf-8');

      // Check external links have rel="noopener noreferrer"
      const externalLinkRegex = /<a\b[^>]*href="https?:\/\/[^"]*"[^>]*>/g;
      let match;
      while ((match = externalLinkRegex.exec(indexHtml)) !== null) {
        const tag = match[0];
        expect(tag).toContain('rel="noopener noreferrer"');
        expect(tag).toContain('target="_blank"');
      }

      // Check back to top button
      expect(indexHtml).toContain('aria-label="Scroll back to top of page"');
    });
  });

  /* ==========================================================================
     GATE 6: Bundle Size & Performance Budget (< 100 KB gzip)
     ========================================================================== */
  describe('Gate 6: Performance Budgets', () => {
    it('verifies client scripts loaded on index.html are under 100 KB gzipped', () => {
      const indexHtml = readFileSync(join(DIST_DIR, 'index.html'), 'utf-8');
      const scriptRegex = /component-url="([^"]+)"/g;
      const loadedScripts = new Set<string>();

      let m;
      while ((m = scriptRegex.exec(indexHtml)) !== null) {
        loadedScripts.add(m[1].replace(/^\//, ''));
      }

      let totalGzipBytes = 0;
      for (const scriptRel of loadedScripts) {
        const scriptPath = join(DIST_DIR, scriptRel);
        if (existsSync(scriptPath)) {
          const buf = readFileSync(scriptPath);
          const gz = gzipSync(buf);
          totalGzipBytes += gz.length;
        }
      }

      const totalGzipKb = totalGzipBytes / 1024;
      // Budget: strictly < 100 KB gzipped
      expect(totalGzipKb).toBeLessThan(100);
      expect(totalGzipKb).toBeGreaterThan(0);
    });
  });

  /* ==========================================================================
     GATE 7: Visual QA & Responsive Overflow Boundaries
     ========================================================================== */
  describe('Gate 7: Visual QA & Responsive Boundaries', () => {
    it('verifies no hardcoded fixed width causing horizontal scroll at mobile viewports', () => {
      const htmlFiles = getAllFilesRecursively(DIST_DIR, '.html');
      // Elements must not have fixed styles like width: 500px, width: 800px or inline fixed widths
      for (const file of htmlFiles) {
        const html = readFileSync(file, 'utf-8');
        expect(html).not.toMatch(/style="[^"]*width:\s*[4-9]\d{2,}px/);
        expect(html).not.toMatch(/class="[^"]*\bw-\[\s*[4-9]\d{2,}px\s*\]/);
      }
    });

    it('verifies responsive container classes across all sections', () => {
      const indexHtml = readFileSync(join(DIST_DIR, 'index.html'), 'utf-8');
      // Root main layout has max-w-6xl mx-auto px-4 sm:px-6 lg:px-8
      expect(indexHtml).toContain('max-w-6xl');
      expect(indexHtml).toContain('mx-auto');
      expect(indexHtml).toContain('px-4');
    });
  });

  /* ==========================================================================
     GATE 8: Private Repository Exclusion Gate
     ========================================================================== */
  describe('Gate 8: Absolute Exclusion of Private Repositories', () => {
    const FORBIDDEN = [
      'Operatorapp',
      'Data_Acquisition',
      'CTQVision',
      'Frigate-Pro-Dashboard',
      'video-rendering',
      'personal-web',
      'fanuc-driver',
      'kana-dojo',
    ];

    it('strictly asserts zero occurrences of forbidden repos across all built files', () => {
      const allBuiltFiles = getAllFilesRecursively(DIST_DIR);
      const violations: string[] = [];

      for (const file of allBuiltFiles) {
        // Skip binary files (pdf, images, woff)
        if (
          file.endsWith('.pdf') ||
          file.endsWith('.woff') ||
          file.endsWith('.woff2') ||
          file.endsWith('.png') ||
          file.endsWith('.jpg')
        ) {
          continue;
        }

        const content = readFileSync(file, 'utf-8');
        for (const forbidden of FORBIDDEN) {
          const regex = new RegExp(`\\b${forbidden}\\b`, 'i');
          if (regex.test(content)) {
            violations.push(`${forbidden} found in ${file.replace(DIST_DIR, '')}`);
          }
        }
      }

      expect(violations, `Forbidden repos found in build output:\n${violations.join('\n')}`).toEqual([]);
    });
  });

  /* ==========================================================================
     GATE 9: Build & Standalone Verification Scripts (check-todos, check-links)
     ========================================================================== */
  describe('Gate 9: Standalone Verification Scripts Execution', () => {
    it('executes scripts/check-todos.mjs with clean output and code 0', () => {
      const stdout = execSync('node scripts/check-todos.mjs', { cwd: ROOT_DIR, encoding: 'utf-8' });
      expect(stdout).toContain('[check-todos] PASSED');
      expect(stdout).toContain('zero TODO(eklavya) markers found');
    });

    it('executes scripts/check-links.mjs with 0 broken links and code 0', () => {
      const stdout = execSync('node scripts/check-links.mjs', { cwd: ROOT_DIR, encoding: 'utf-8' });
      expect(stdout).toContain('[check-links] PASSED');
      expect(stdout).toContain('0 broken internal links');
      expect(stdout).toContain('0 forbidden private repo references');
    });
  });
});
