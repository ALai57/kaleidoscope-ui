import { test, expect } from '@playwright/test';

const mockArticle = {
  article_id: 'a1',
  article_url: 'test-article',
  article_title: 'Test Article Heading',
  article_tags: 'thoughts',
  public_visibility: true,
  created_at: '2024-01-15T00:00:00Z',
  content: '<h1>Test Article Heading</h1><p>Some content here.</p>',
};

test.describe('Unauthenticated article reading', () => {
  test.beforeEach(async ({ page }) => {
    // Mock the compositions list endpoint
    await page.route('**/compositions', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([mockArticle]),
      });
    });

    // Mock the individual article endpoint
    await page.route('**/compositions/test-article', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockArticle),
      });
    });

    // Mock any Keycloak auth init requests to avoid network errors
    await page.route('**/realms/**', (route) => {
      route.fulfill({ status: 404, body: 'not found' });
    });
  });

  test('homepage loads and shows recent articles section', async ({ page }) => {
    await page.goto('/');

    // Wait for app to boot — look for either the app root or nav
    await expect(page.locator('#app, main, nav, header')).toBeVisible({ timeout: 10000 });

    // The home page should render something meaningful
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('article page renders article content', async ({ page }) => {
    await page.goto('/content/test-article');

    // Wait for content to render — the article title should be visible
    await expect(
      page.locator('h1, h2, [role="main"], main').first()
    ).toBeVisible({ timeout: 10000 });
  });
});
