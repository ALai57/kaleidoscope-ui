import { test, expect } from '@playwright/test';

const mockImages = [
  {
    name: 'photo-1.jpg',
    title: 'My Photo',
    description: 'A test photo',
    creator: 'Andrew',
    created_at: '2024-01-01T00:00:00Z',
    versions: {
      thumbnail: { src: '/static/thumb.jpg', width: 100, height: 100 },
    },
  },
];

test.describe('Image upload flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/realms/**', (route) =>
      route.fulfill({ status: 404 })
    );

    await page.route('**/v2/photos', (route) => {
      if (route.request().method() === 'GET') {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(mockImages),
        });
      } else {
        route.continue();
      }
    });
  });

  test('ImageBrowser renders on /images page', async ({ page }) => {
    let uploadCalled = false;

    await page.route('**/v2/photos', (route) => {
      if (route.request().method() === 'POST') {
        uploadCalled = true;
        route.fulfill({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify({ name: 'uploaded.jpg' }),
        });
      } else if (route.request().method() === 'GET') {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(mockImages),
        });
      } else {
        route.continue();
      }
    });

    await page.goto('/images');

    // Wait for the Image Manager heading
    await expect(page.locator('h4, h1').first()).toBeVisible({ timeout: 10000 });

    // Verify the page body rendered
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('file upload input exists on image manager page', async ({ page }) => {
    await page.goto('/images');

    // Wait for page load
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});

    // Check that the add-photo input (file input) is present in the DOM
    // It may be hidden but should exist after images load
    const fileInput = page.locator('input[type="file"]');
    // The input exists (may be hidden — that's OK for this test)
    await expect(fileInput).toHaveCount(1, { timeout: 10000 });
  });
});

test.describe('Theme change flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/realms/**', (route) =>
      route.fulfill({ status: 404 })
    );

    await page.route('**/themes', (route) => {
      if (route.request().method() === 'GET') {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([
            {
              id: 'theme-1',
              display_name: 'Default',
              config: { hue: 217, saturation: 65, lightness: 40, angle: 103, theta: 45 },
            },
          ]),
        });
      } else {
        route.continue();
      }
    });
  });

  test('UI Manager renders color picker and save theme button', async ({ page }) => {
    let putCalled = false;

    await page.route('**/themes/**', (route) => {
      if (route.request().method() === 'PUT') {
        putCalled = true;
        route.fulfill({ status: 204 });
      } else {
        route.continue();
      }
    });

    await page.goto('/ui');

    // Wait for Save theme button
    const saveButton = page.getByText('Save theme');
    await expect(saveButton).toBeVisible({ timeout: 10000 });

    // Click save
    await saveButton.click();

    // Wait for mutation
    await page.waitForTimeout(500);
    expect(putCalled).toBe(true);
  });

  test('dark mode toggle is present', async ({ page }) => {
    await page.goto('/ui');

    const toggle = page.getByText('Dark mode');
    await expect(toggle).toBeVisible({ timeout: 10000 });
  });
});
