#!/usr/bin/env node
/**
 * scripts/check-todos.mjs
 * Gate 1: Scans dist/ for forbidden TODO(eklavya) markers in built HTML and JS.
 * If ALLOW_TODO=1 is set, emits warnings and exits 0.
 * Otherwise, exits 1 if any TODO(eklavya) is detected.
 */

import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST_DIR = join(process.cwd(), 'dist');

if (!existsSync(DIST_DIR)) {
  console.error('[check-todos] ERROR: dist/ directory not found. Run npm run build first.');
  process.exit(1);
}

function getFilesRecursively(dir) {
  const files = [];
  const entries = readdirSync(dir);
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      files.push(...getFilesRecursively(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

const allFiles = getFilesRecursively(DIST_DIR);
const targetFiles = allFiles.filter((f) => f.endsWith('.html') || f.endsWith('.js'));

const todoRegex = /TODO\(eklavya\)/i;
const findings = [];

for (const file of targetFiles) {
  const content = readFileSync(file, 'utf-8');
  if (todoRegex.test(content)) {
    const lines = content.split('\n');
    lines.forEach((line, idx) => {
      if (todoRegex.test(line)) {
        findings.push({
          file: file.replace(process.cwd() + '/', ''),
          line: idx + 1,
          preview: line.slice(0, 100).trim(),
        });
      }
    });
  }
}

const allowTodo = process.env.ALLOW_TODO === '1';

if (findings.length > 0) {
  if (allowTodo) {
    console.warn(`\n⚠️  [check-todos] WARNING: Found ${findings.length} TODO(eklavya) marker(s) in dist/ (ALLOW_TODO=1 override enabled):`);
    findings.forEach((f) => console.warn(`   - ${f.file}:${f.line} -> ${f.preview}`));
    console.warn('   Proceeding because ALLOW_TODO=1 is set.\n');
    process.exit(0);
  } else {
    console.error(`\n❌ [check-todos] FAILED: Found ${findings.length} forbidden TODO(eklavya) marker(s) in production build:`);
    findings.forEach((f) => console.error(`   - ${f.file}:${f.line} -> ${f.preview}`));
    console.error('\n   Every claim and project must be verified. Resolve TODOs or pass ALLOW_TODO=1 for draft builds.\n');
    process.exit(1);
  }
} else {
  console.log(`✅ [check-todos] PASSED: Clean output. Checked ${targetFiles.length} built files in dist/; zero TODO(eklavya) markers found.`);
  process.exit(0);
}
