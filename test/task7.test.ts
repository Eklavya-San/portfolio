import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { execSync } from 'node:child_process';

const rootDir = resolve(__dirname, '..');

describe('Task 7: SEO, Assets, and Hosting', () => {
  describe('SEO & Metadata in Base.astro', () => {
    const basePath = resolve(rootDir, 'src/layouts/Base.astro');

    it('defines canonical URL defaulting to claudya.in', () => {
      const content = readFileSync(basePath, 'utf-8');
      expect(content).toContain('canonicalURL');
      expect(content).toContain('https://claudya.in');
      expect(content).toMatch(/<link\s+rel="canonical"\s+href=\{canonicalURL\}\s*\/>/);
    });

    it('configures complete OpenGraph metadata', () => {
      const content = readFileSync(basePath, 'utf-8');
      expect(content).toContain('property="og:title"');
      expect(content).toContain('property="og:description"');
      expect(content).toContain('property="og:image"');
      expect(content).toContain('property="og:url"');
      expect(content).toContain('property="og:type"');
      expect(content).toContain('property="og:site_name"');
      expect(content).toContain('content="claudya.in"');
    });

    it('configures Twitter summary_large_image card with @eghodake handles', () => {
      const content = readFileSync(basePath, 'utf-8');
      expect(content).toContain('name="twitter:card" content="summary_large_image"');
      expect(content).toContain('name="twitter:site" content="@eghodake"');
      expect(content).toContain('name="twitter:creator" content="@eghodake"');
      expect(content).toContain('name="twitter:image"');
    });

    it('includes JSON-LD schema.org/Person structured data', () => {
      const content = readFileSync(basePath, 'utf-8');
      expect(content).toContain('application/ld+json');
      expect(content).toContain('schema.org');
      expect(content).toContain('Person');
      expect(content).toContain('Eklavya Ghodake');
      expect(content).toContain('Manager – Software R&D');
      expect(content).toContain('https://github.com/Eklavya-San');
      expect(content).toContain('https://x.com/eghodake');
    });
  });

  describe('Assets & Ergonomics', () => {
    it('provides Obsidian emerald favicon.svg', () => {
      const faviconPath = resolve(rootDir, 'public/favicon.svg');
      expect(existsSync(faviconPath)).toBe(true);
      const content = readFileSync(faviconPath, 'utf-8');
      expect(content).toContain('<svg');
      expect(content).toContain('#030712'); // Obsidian dark
      expect(content).toMatch(/#10b981|emerald/i); // Emerald accent
    });

    it('defines theme-color and html lang=en in Base.astro', () => {
      const content = readFileSync(resolve(rootDir, 'src/layouts/Base.astro'), 'utf-8');
      expect(content).toContain('<html lang="en">');
      expect(content).toContain('<meta name="theme-color" content="#030712" />');
    });

    it('provides high-resolution 1200x630 OpenGraph cards in public/og/', () => {
      const requiredImages = [
        'default.png',
        'document-rag.png',
        'mqtt-go.png',
        'ctq-extraction.png',
      ];

      for (const img of requiredImages) {
        const imgPath = resolve(rootDir, 'public/og', img);
        expect(existsSync(imgPath), `Missing OG image: ${img}`).toBe(true);

        // Verify dimensions via sips on macOS
        const sipsOutput = execSync(`sips -g pixelWidth -g pixelHeight "${imgPath}"`, {
          encoding: 'utf-8',
        });
        expect(sipsOutput).toContain('pixelWidth: 1200');
        expect(sipsOutput).toContain('pixelHeight: 630');
      }
    });

    it('provides vector SVG sources for all OG cards', () => {
      const svgs = ['default.svg', 'document-rag.svg', 'mqtt-go.svg', 'ctq-extraction.svg'];
      for (const svg of svgs) {
        const svgPath = resolve(rootDir, 'public/og', svg);
        expect(existsSync(svgPath)).toBe(true);
        const content = readFileSync(svgPath, 'utf-8');
        expect(content).toContain('#030712');
        expect(content).toContain('claudya.in');
      }
    });
  });

  describe('Sitemap & Robots', () => {
    it('configures public/robots.txt allowing crawlers and linking sitemap', () => {
      const robotsPath = resolve(rootDir, 'public/robots.txt');
      expect(existsSync(robotsPath)).toBe(true);
      const content = readFileSync(robotsPath, 'utf-8');
      expect(content).toContain('User-agent: *');
      expect(content).toContain('Allow: /');
      expect(content).toContain('Sitemap: https://claudya.in/sitemap.xml');
    });

    it('defines src/pages/sitemap.xml.ts indexing core pages and flagships', () => {
      const sitemapSrc = resolve(rootDir, 'src/pages/sitemap.xml.ts');
      expect(existsSync(sitemapSrc)).toBe(true);
      const content = readFileSync(sitemapSrc, 'utf-8');
      expect(content).toContain('work/document-rag');
      expect(content).toContain('work/mqtt-go');
      expect(content).toContain('work/ctq-extraction');
      expect(content).toContain('resume');
      expect(content).toContain('application/xml');
    });
  });

  describe('Resume Shortlink & Redirect', () => {
    it('creates src/pages/resume.astro with static redirect to PDF', () => {
      const resumePath = resolve(rootDir, 'src/pages/resume.astro');
      expect(existsSync(resumePath)).toBe(true);
      const content = readFileSync(resumePath, 'utf-8');
      expect(content).toContain('/Eklavya_Ghodake_Resume.pdf');
      expect(content).toContain('http-equiv="refresh"');
      expect(content).toContain('window.location.replace');
    });

    it('includes /resume 302 rule in public/_redirects', () => {
      const redirectsPath = resolve(rootDir, 'public/_redirects');
      expect(existsSync(redirectsPath)).toBe(true);
      const content = readFileSync(redirectsPath, 'utf-8');
      expect(content).toMatch(/\/resume\s+\/Eklavya_Ghodake_Resume\.pdf\s+302/);
    });
  });

  describe('Custom 404 & Hosting Configurations', () => {
    it('implements custom Obsidian 404 page in src/pages/404.astro', () => {
      const page404 = resolve(rootDir, 'src/pages/404.astro');
      expect(existsSync(page404)).toBe(true);
      const content = readFileSync(page404, 'utf-8');
      expect(content).toContain('404');
      expect(content).toContain('SIGNAL LOST');
      expect(content).toContain('Return Home');
      expect(content).toContain('href="/"');
    });

    it('provides public/_headers with security and immutable caching headers', () => {
      const headersPath = resolve(rootDir, 'public/_headers');
      expect(existsSync(headersPath)).toBe(true);
      const content = readFileSync(headersPath, 'utf-8');
      expect(content).toContain('X-Content-Type-Options: nosniff');
      expect(content).toContain('X-Frame-Options: DENY');
      expect(content).toContain('/_astro/*');
      expect(content).toContain('Cache-Control: public, max-age=31536000, immutable');
    });

    it('provides comprehensive docs/deployment.md for Cloudflare Pages and DNS', () => {
      const deployDoc = resolve(rootDir, 'docs/deployment.md');
      expect(existsSync(deployDoc)).toBe(true);
      const content = readFileSync(deployDoc, 'utf-8');
      expect(content).toContain('claudya.in');
      expect(content).toContain('Cloudflare Pages');
      expect(content).toContain('npm run build');
      expect(content).toContain('dist');
      expect(content).toContain('CNAME');
      expect(content).toContain('Full (strict)');
    });
  });
});
