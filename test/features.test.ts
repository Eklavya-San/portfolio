import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

describe('Cyber-Industrial Visual Enhancements', () => {
  it('implements TextScramble component with reduced motion support', () => {
    const filePath = resolve(process.cwd(), 'src/components/TextScramble.tsx');
    expect(existsSync(filePath)).toBe(true);

    const content = readFileSync(filePath, 'utf-8');
    expect(content).toContain('prefers-reduced-motion');
    expect(content).toContain('DEFAULT_GLYPHS');
    expect(content).toContain('hoverTrigger');
  });

  it('implements OperatorSchematic vector blueprint with ASME GD&T and title block', () => {
    const filePath = resolve(process.cwd(), 'src/components/OperatorSchematic.tsx');
    expect(existsSync(filePath)).toBe(true);

    const content = readFileSync(filePath, 'utf-8');
    expect(content).toContain('FIG.01 — OPERATOR SCHEMATIC');
    expect(content).toContain('DWG NO: EGH-2026-DISTRIBUTED');
    expect(content).toContain('Ø ~3 YRS EXP');
    expect(content).toContain('± ZERO DATA LOSS');
    // ASME Y14.5 / ISO 1101 GD&T datum symbol ⌖
    expect(content).toContain('⌖');
  });

  it('implements ContactTerminal interactive CLI with copy actions and syntax highlighting', () => {
    const filePath = resolve(process.cwd(), 'src/components/ContactTerminal.tsx');
    expect(existsSync(filePath)).toBe(true);

    const content = readFileSync(filePath, 'utf-8');
    expect(content).toContain('whoami');
    expect(content).toContain('cat contact.json');
    expect(content).toContain('./open_to --roles --collabs');
    expect(content).toContain('terminal-cursor');
    expect(content).toContain('TCP THREE-WAY READY');
  });

  it('provides HUD corner brackets (.brk) and rotating technical stamp (.stamp) in tokens.css', () => {
    const cssPath = resolve(process.cwd(), 'src/styles/tokens.css');
    const css = readFileSync(cssPath, 'utf-8');

    expect(css).toContain('.brk');
    expect(css).toContain('.stamp');
    expect(css).toContain('.terminal-cursor');
    expect(css).toContain('cursorBlink');
  });

  it('embeds OperatorProfile on index page with verified domain fieldnotes', () => {
    const profilePath = resolve(process.cwd(), 'src/components/OperatorProfile.astro');
    expect(existsSync(profilePath)).toBe(true);

    const content = readFileSync(profilePath, 'utf-8');
    expect(content).toContain('FN-01');
    expect(content).toContain('FN-02');
    expect(content).toContain('FN-03');
    expect(content).toContain('FN-04');
    expect(content).toContain('OperatorSchematic');
  });

  it('integrates rotating technical stamps in Experience talks', () => {
    const expPath = resolve(process.cwd(), 'src/components/Experience.tsx');
    const content = readFileSync(expPath, 'utf-8');

    expect(content).toContain('stamp');
    expect(content).toContain('LIVE');
    expect(content).toContain('DEFENCE');
  });
});
