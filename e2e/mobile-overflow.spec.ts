import { test, expect } from '@playwright/test';

// iPhone-12-class portrait width — the viewport where the audit found the breakage.
test.use({ viewport: { width: 390, height: 844 } });

const routes = ['/', '/about', '/recipes'];

for (const route of routes) {
  test(`no horizontal overflow at 390px: ${route}`, async ({ page }) => {
    await page.goto(route);
    // Let the SPA render its shell (API may be unavailable locally; the layout still lays out).
    await page.waitForTimeout(800);
    const overflows = await page.evaluate(() => {
      const de = document.documentElement;
      return de.scrollWidth > de.clientWidth + 1;
    });
    expect(overflows).toBe(false);
  });
}
