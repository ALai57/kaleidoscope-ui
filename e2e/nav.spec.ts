import { test, expect } from '@playwright/test';

/**
 * Structural coverage for the unified persistent rail (`SideRail`, the desktop
 * counterpart of `MobileNav`) introduced by the nav-unification work. Logged
 * out, the rail shows the garden facets + a Login control and no Studio
 * disclosure; it stays mounted across garden navigation because `AppShell`
 * renders it once, outside the routed `Outlet`.
 *
 * Logged-in coverage (Studio visibility, Logout) is intentionally NOT
 * exercised here — this repo has no Auth0 e2e sign-in harness (see
 * `library.spec.ts`), so the authenticated rail is covered at the component
 * layer by `SideRail.test.tsx` / `MobileNav.test.tsx` instead.
 */
test.describe('unified nav rail (logged out)', () => {
  // The rail only renders at/above the `md` breakpoint; below it AppShell
  // swaps in MobileNav. Force a desktop viewport regardless of project defaults.
  test.use({ viewport: { width: 1280, height: 800 } });

  test('one persistent rail with garden facets, no Studio when logged out', async ({ page }) => {
    await page.goto('/archive');
    const rail = page.getByRole('navigation', { name: 'Primary' });
    await expect(rail).toBeVisible();
    await expect(rail.getByRole('link', { name: 'Recipes' })).toBeVisible();
    await expect(rail.getByRole('button', { name: /studio/i })).toHaveCount(0);
    await expect(rail.getByRole('button', { name: /login/i })).toBeVisible();

    // rail persists across garden navigation
    await rail.getByRole('link', { name: 'Recipes' }).click();
    await expect(page).toHaveURL(/\/recipes/);
    await expect(rail).toBeVisible();
  });
});
