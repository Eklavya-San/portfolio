import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const SCREENSHOTS_DIR = join(process.cwd(), 'artifacts', 'screenshots');
if (!existsSync(SCREENSHOTS_DIR)) {
  mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

test.describe('Claudya Portfolio E2E & Accessibility Suite', () => {
  /* ==========================================================================
     Test A: Direct case study navigation
     ========================================================================== */
  test('A: Direct case study navigation: visiting /work/mqtt-go renders full case study', async ({
    page,
  }) => {
    await page.goto('/work/mqtt-go');
    await expect(page).toHaveTitle(/MQTT-GO/);

    const h1 = page.getByRole('heading', { level: 1, name: 'MQTT-GO' });
    await expect(h1).toBeVisible();

    await expect(page.locator('text=Open Source').first()).toBeVisible();
    await expect(page.locator('text=The Problem & Operational Context').first()).toBeVisible();
    await expect(page.locator('text=Key Architectural Decisions').first()).toBeVisible();
    await expect(page.locator('text=Interactive Architecture Topology').first()).toBeVisible();
    await expect(page.locator('text=Key Architecture & Capabilities').first()).toBeVisible();

    const returnLink = page.getByRole('link', { name: /Return to portfolio home|Back to All Projects/ }).first();
    await expect(returnLink).toBeVisible();
  });

  /* ==========================================================================
     Test B: Overlay routing & history
     ========================================================================== */
  test('B: Overlay routing & history: clicking flagship card opens overlay and history works', async ({
    page,
  }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const cardLink = page.locator('a[href="/work/mqtt-go"]').first();
    await cardLink.scrollIntoViewIfNeeded();
    await cardLink.click();

    // Verify overlay opens and URL changes to /work/mqtt-go
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible();
    expect(page.url()).toContain('/work/mqtt-go');
    await expect(dialog).toContainText('MQTT-GO');

    // Browser Back should close overlay and return to /
    await page.goBack();
    await expect(dialog).toBeHidden();
    expect(new URL(page.url()).pathname).toBe('/');

    // Browser Forward should re-open overlay and return to /work/mqtt-go
    await page.goForward();
    await expect(dialog).toBeVisible();
    expect(page.url()).toContain('/work/mqtt-go');
  });

  /* ==========================================================================
     Test C: Escape & Focus restoration
     ========================================================================== */
  test('C: Escape & Focus restoration: pressing Escape closes overlay and restores focus', async ({
    page,
  }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const cardLink = page.locator('a[href="/work/mqtt-go"]').first();
    await cardLink.scrollIntoViewIfNeeded();
    await cardLink.click();

    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible();

    // Press Escape
    await page.keyboard.press('Escape');

    // Overlay closes
    await expect(dialog).toBeHidden();

    // Focus is restored to originating card trigger
    await expect(cardLink).toBeFocused();
  });

  /* ==========================================================================
     Test D: Anchor navigation
     ========================================================================== */
  test('D: Anchor navigation: clicking #experience scrolls smoothly without opening modal', async ({
    page,
  }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Click desktop nav experience link
    const expLink = page.locator('header nav a[href="/#experience"]');
    await expLink.click();

    // Modal overlay must NOT be open
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeHidden();

    // Target section #experience must be in viewport or visible
    const expSection = page.locator('section#experience');
    await expect(expSection).toBeVisible();

    // Verify URL contains hash
    expect(page.url()).toContain('#experience');
  });

  /* ==========================================================================
     Test E: Resume link HTTP status and PDF header
     ========================================================================== */
  test('E: Resume link: fetching /Eklavya_Ghodake_Resume.pdf returns HTTP 200 with PDF content', async ({
    page,
  }) => {
    const response = await page.request.get('/Eklavya_Ghodake_Resume.pdf');
    expect(response.status()).toBe(200);

    const contentType = response.headers()['content-type'] || '';
    const body = await response.body();
    const pdfMagic = body.subarray(0, 5).toString('ascii');

    expect(
      contentType.includes('application/pdf') || pdfMagic.startsWith('%PDF-'),
      `Expected PDF header or content type, got content-type: ${contentType}, magic: ${pdfMagic}`
    ).toBe(true);
    expect(pdfMagic.startsWith('%PDF-')).toBe(true);
  });

  /* ==========================================================================
     Test F: Reduced motion emulation
     ========================================================================== */
  test('F: Reduced motion: emulating reduced motion disables telemetry animation and transitions', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Telemetry widget should show static state
    const staticBadge = page.locator('text=STATIC (REDUCED MOTION)');
    await expect(staticBadge).toBeVisible();

    // Pulsing dot circle (animate-ping) must not exist
    const pulsingDot = page.locator('circle.animate-ping');
    await expect(pulsingDot).toHaveCount(0);
  });

  /* ==========================================================================
     Test G: Axe accessibility audit
     ========================================================================== */
  test('G: Axe accessibility audit: 0 critical or serious violations on / and /work/mqtt-go', async ({
    page,
  }) => {
    // 1. Audit Homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const homeScan = await new AxeBuilder({ page }).analyze();
    const homeViolations = homeScan.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );
    expect(
      homeViolations,
      `Homepage accessibility violations: ${JSON.stringify(homeViolations, null, 2)}`
    ).toEqual([]);

    // 2. Audit Work Case Study
    await page.goto('/work/mqtt-go');
    await page.waitForLoadState('networkidle');
    const workScan = await new AxeBuilder({ page }).analyze();
    const workViolations = workScan.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );
    expect(
      workViolations,
      `Work case study accessibility violations: ${JSON.stringify(workViolations, null, 2)}`
    ).toEqual([]);
  });

  /* ==========================================================================
     Test H: Visual QA Screenshots across viewports
     ========================================================================== */
  test('H: Visual QA Screenshots: captures viewports and asserts zero horizontal scroll', async ({
    page,
  }) => {
    const viewports = [
      { width: 360, height: 800, name: '360px' },
      { width: 768, height: 1024, name: '768px' },
      { width: 1280, height: 900, name: '1280px' },
      { width: 1920, height: 1080, name: '1920px' },
    ];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });

      // Check Homepage
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const homeHasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(
        homeHasOverflow,
        `Horizontal overflow detected on homepage at ${vp.name} (scrollWidth > clientWidth)`
      ).toBe(false);

      await page.screenshot({
        path: join(SCREENSHOTS_DIR, `home-${vp.name}.png`),
        fullPage: true,
      });

      // Check Standalone Case Study
      await page.goto('/work/mqtt-go');
      await page.waitForLoadState('networkidle');

      const workHasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(
        workHasOverflow,
        `Horizontal overflow detected on case study at ${vp.name} (scrollWidth > clientWidth)`
      ).toBe(false);

      await page.screenshot({
        path: join(SCREENSHOTS_DIR, `work-mqtt-go-${vp.name}.png`),
        fullPage: true,
      });
    }
  });
});
