#!/usr/bin/env node
// Gate 2: Crawls all anchor links in built HTML files, validates internal and external
// targets, enforces absence of private repos, and validates the verified resume link.

import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST_DIR = join(process.cwd(), 'dist');

if (!existsSync(DIST_DIR)) {
  console.error('[check-links] ERROR: dist/ directory not found. Run npm run build first.');
  process.exit(1);
}

function getHtmlFiles(dir) {
  const files = [];
  const entries = readdirSync(dir);
  for (const entry of entries) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      files.push(...getHtmlFiles(full));
    } else if (full.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

// 1. Forbidden private repo keywords (must NEVER appear anywhere in public links or markup)
const FORBIDDEN_PRIVATE_REPOS = [
  'Operatorapp',
  'Data_Acquisition',
  'CTQVision',
  'Frigate-Pro-Dashboard',
  'video-rendering',
  'personal-web',
  'fanuc-driver',
  'kana-dojo',
];

// Load redirects for internal routing validation
const redirectsPath = join(DIST_DIR, '_redirects');
const redirects = new Set();
if (existsSync(redirectsPath)) {
  const lines = readFileSync(redirectsPath, 'utf-8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const parts = trimmed.split(/\s+/);
      if (parts[0]) redirects.add(parts[0]);
    }
  }
}

const htmlFiles = getHtmlFiles(DIST_DIR);
let totalLinksChecked = 0;
const errors = [];
let foundResumeLink = false;

const hrefRegex = /<a\b[^>]*\bhref="([^"]+)"[^>]*>/gi;

for (const htmlFile of htmlFiles) {
  const relativeFile = htmlFile.replace(DIST_DIR + '/', '');
  const htmlContent = readFileSync(htmlFile, 'utf-8');

  // Check forbidden terms in the entire file
  for (const forbidden of FORBIDDEN_PRIVATE_REPOS) {
    const forbiddenRegex = new RegExp(`\\b${forbidden}\\b`, 'i');
    if (forbiddenRegex.test(htmlContent)) {
      errors.push(`[FORBIDDEN REPO] Found reference to private repo "${forbidden}" in ${relativeFile}`);
    }
  }

  let match;
  while ((match = hrefRegex.exec(htmlContent)) !== null) {
    totalLinksChecked++;
    const href = match[1].trim();

    // Check for forbidden repos in href
    for (const forbidden of FORBIDDEN_PRIVATE_REPOS) {
      if (href.toLowerCase().includes(forbidden.toLowerCase())) {
        errors.push(`[FORBIDDEN LINK] Link references private repo "${forbidden}": ${href} in ${relativeFile}`);
      }
    }

    // Resume link check
    if (href === '/Eklavya_Ghodake_Resume.pdf' || href === '/resume' || href.includes('Resume.pdf')) {
      foundResumeLink = true;
    }

    // Anchor on same page
    if (href === '#' || href.startsWith('#')) {
      if (href !== '#') {
        const anchorId = href.slice(1);
        const idRegex = new RegExp(`id=["']${anchorId}["']`, 'i');
        if (!idRegex.test(htmlContent)) {
          errors.push(`[BROKEN ANCHOR] Anchor "${href}" target id not found in ${relativeFile}`);
        }
      }
      continue;
    }

    // External URLs
    if (href.startsWith('http://') || href.startsWith('https://')) {
      try {
        new URL(href);
      } catch (e) {
        errors.push(`[MALFORMED URL] Invalid URL "${href}" in ${relativeFile}`);
      }
      continue;
    }

    // Mailto links
    if (href.startsWith('mailto:')) {
      if (!href.includes('@')) {
        errors.push(`[INVALID MAILTO] Mailto link lacks @: "${href}" in ${relativeFile}`);
      }
      continue;
    }

    // Internal path resolution
    const [pathname, hash] = href.split('#');

    // 1. Direct path check
    const normalizedPath = pathname.replace(/^\//, '');
    const directFile = join(DIST_DIR, normalizedPath);
    const indexFile = join(DIST_DIR, normalizedPath, 'index.html');
    const htmlSibling = join(DIST_DIR, `${normalizedPath}.html`);

    const pathExists =
      pathname === '/' ||
      existsSync(directFile) ||
      existsSync(indexFile) ||
      existsSync(htmlSibling) ||
      redirects.has(pathname);

    if (!pathExists) {
      errors.push(`[DEAD INTERNAL LINK] Internal link "${href}" does not resolve to file or redirect in ${relativeFile}`);
    }

    // If anchor is attached to an internal target, check target page
    if (hash && (existsSync(indexFile) || pathname === '/')) {
      const targetHtmlPath = pathname === '/' ? join(DIST_DIR, 'index.html') : indexFile;
      if (existsSync(targetHtmlPath)) {
        const targetContent = readFileSync(targetHtmlPath, 'utf-8');
        const idRegex = new RegExp(`id=["']${hash}["']`, 'i');
        if (!idRegex.test(targetContent)) {
          errors.push(`[BROKEN CROSS-ANCHOR] Anchor "#${hash}" not found in target ${pathname}`);
        }
      }
    }
  }
}

// Verify resume PDF asset exists on disk and is a valid PDF
const resumePdfPath = join(DIST_DIR, 'Eklavya_Ghodake_Resume.pdf');
if (!existsSync(resumePdfPath)) {
  errors.push('[MISSING RESUME] dist/Eklavya_Ghodake_Resume.pdf not found on disk.');
} else {
  const pdfHeader = readFileSync(resumePdfPath, { encoding: 'utf-8', flag: 'r' }).slice(0, 5);
  if (!pdfHeader.startsWith('%PDF')) {
    errors.push('[CORRUPTED RESUME] dist/Eklavya_Ghodake_Resume.pdf is not a valid PDF file (missing %PDF header).');
  }
}

if (!foundResumeLink) {
  errors.push('[MISSING RESUME LINK] No link pointing to /Eklavya_Ghodake_Resume.pdf or /resume was found in HTML.');
}

if (errors.length > 0) {
  console.error(`\n❌ [check-links] FAILED: Encountered ${errors.length} link or forbidden reference errors:`);
  errors.forEach((err) => console.error(`   - ${err}`));
  process.exit(1);
} else {
  console.log(`✅ [check-links] PASSED: Verified ${totalLinksChecked} links across ${htmlFiles.length} pages.`);
  console.log(`   - 0 broken internal links`);
  console.log(`   - 0 forbidden private repo references`);
  console.log(`   - Verified valid PDF resume: dist/Eklavya_Ghodake_Resume.pdf`);
  process.exit(0);
}
