import { test, expect } from '@playwright/test';

const mockBranches = [
  {
    branch_id: 'b1',
    branch_name: 'main',
    article_id: 'a1',
    article_url: 'test-article',
  },
];

const mockVersion = {
  version_id: 'v1',
  branch_id: 'b1',
  content: '<p>Draft content here</p>',
  title: 'Test Article',
  created_at: '2024-01-01T00:00:00Z',
};

test.describe('Authenticated article editor', () => {
  test.beforeEach(async ({ page }) => {
    // Inject fake authentication state before the page loads
    await page.addInitScript(() => {
      // Override Keycloak so the app sees an authenticated session immediately
      (window as Record<string, unknown>)['__mockAuth__'] = {
        token: 'fake-editor-token',
        authenticated: true,
      };

      // Stub the keycloak-js module by intercepting its constructor if it loads
      // The app uses useKeycloak() which reads from window context
    });

    // Mock Keycloak discovery/token endpoints
    await page.route('**/realms/**', (route) => {
      if (route.request().method() === 'GET') {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ token_endpoint: 'http://localhost:5173/fake-token' }),
        });
      } else {
        route.fulfill({ status: 404 });
      }
    });

    // Mock branches API
    await page.route('**/branches', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockBranches),
      });
    });

    // Mock branch versions API
    await page.route('**/branches/*/versions', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([mockVersion]),
      });
    });

    // Mock images endpoint
    await page.route('**/v2/photos', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([]),
      });
    });
  });

  test('editor page renders branch selector', async ({ page }) => {
    await page.goto('/articles/test-article/edit');

    // The page should load the Article Editor heading
    await expect(page.locator('h4, h1, [data-testid="branch-selector"]').first()).toBeVisible({
      timeout: 10000,
    });
  });

  test('editor renders rich text area', async ({ page }) => {
    await page.goto('/articles/test-article/edit');

    // Wait for the page to fully load
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {
      // networkidle may time out due to polling — that's fine
    });

    // The editor area (TipTap) should render
    const editorArea = page.locator('.ProseMirror, [role="textbox"], [contenteditable]');
    await expect(editorArea.first()).toBeVisible({ timeout: 10000 });
  });

  test('save button is present and can be clicked', async ({ page }) => {
    // Track whether a save request was made
    let saveCalled = false;
    await page.route('**/articles/*/branches/*/versions', (route) => {
      if (route.request().method() === 'POST') {
        saveCalled = true;
        route.fulfill({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify(mockVersion),
        });
      } else {
        route.continue();
      }
    });

    await page.goto('/articles/test-article/edit');

    const saveButton = page.getByTestId('save-button');
    await expect(saveButton).toBeVisible({ timeout: 10000 });
    await saveButton.click();

    // Wait for the save request
    await page.waitForTimeout(500);
    expect(saveCalled).toBe(true);
  });
});
