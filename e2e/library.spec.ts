import { test, expect } from '@playwright/test';

/**
 * Full-loop happy path for the writer-gated `/library` feature.
 *
 * SKIPPED pending an Auth0 e2e sign-in harness. `LibraryPage` renders its shell
 * only when `useAuth().isAuthenticated` is true; in the e2e sandbox the Auth0 SPA
 * SDK's silent-auth call to the dev tenant never resolves, so the app sits on the
 * loading screen and the route is unreachable without a real session. This repo
 * has no Auth0 test-login mechanism (the `**\/realms\/**` mocks in the other specs
 * are dead Keycloak-era code covering pages that are not hard-gated), and the plan
 * forbids disabling the gate in production code for a test.
 *
 * The full loop below (rail → shelf → acquisition summary, with the trusted/novel
 * split) is meanwhile covered deterministically at the integration layer by
 * `src/pages/library/LibraryPage.test.tsx` and the per-component tests under
 * `src/components/library/*.test.tsx`, which render the real components with
 * `useAuth` mocked to an authenticated writer. Un-skip this once an Auth0 e2e
 * auth harness lands.
 */
test.describe.skip('library full loop (needs Auth0 e2e sign-in harness)', () => {
  // Stub the interests API so the loop is deterministic and backend-independent.
  test.beforeEach(async ({ page }) => {
    const interest = {
      id: 'i1', 'user-id': 'u', intent: 'Modern jazz history',
      'taste-profile': { 'novelty-ratio': 0.5, 'trusted-sources': ['Blue Note'] },
      'created-at': 'x', 'updated-at': 'x',
    };
    const shelf = [
      { id: 'r1', 'interest-id': 'i1', kind: 'article', title: 'Kind of Blue at 60', source: 'Blue Note', url: 'https://x', 'est-time': '12 min', why: 'Matches jazz-history intent', origin: 'trusted', status: 'shelved', 'added-at': 'x' },
    ];
    await page.route('**/interests', (r) => r.fulfill({ json: [interest] }));
    await page.route('**/interests/i1', (r) => r.fulfill({ json: interest }));
    await page.route('**/interests/i1/recommendations**', (r) => r.fulfill({ json: shelf }));
    await page.route('**/interests/i1/curate', (r) =>
      r.fulfill({ json: { status: 'completed', 'run-id': 'run1', summary: { total: 6, trusted: 3, novel: 3 }, shelved: shelf } }));
  });

  test('a reader sees their shelf and runs an acquisition', async ({ page }) => {
    await page.goto('/library/i1');
    await expect(page.getByRole('link', { name: /Modern jazz history/ })).toBeVisible();
    await expect(page.getByText('Kind of Blue at 60')).toBeVisible();

    await page.getByRole('link', { name: /Acquisitions/i }).click();
    await page.getByRole('button', { name: /run acquisition/i }).click();
    await expect(page.getByText(/6 shelved/i)).toBeVisible();
    await expect(page.getByText(/3 trusted/i)).toBeVisible();
    await expect(page.getByText(/3 novel/i)).toBeVisible();
  });
});
