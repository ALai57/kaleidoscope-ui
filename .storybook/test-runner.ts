import type { TestRunnerConfig } from '@storybook/test-runner';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

/**
 * Visual-regression config for the Storybook Playwright test-runner.
 *
 * For every story, after it renders, we screenshot the preview and compare it
 * against a committed baseline. This catches unintended visual changes to the
 * design-system components and Foundations.
 *
 * Baselines live in `__image_snapshots__/` and are environment-sensitive (font
 * rendering differs across OSes). Generate/refresh them in a consistent
 * environment: `npm run test-storybook -- -u`. A small threshold absorbs
 * sub-pixel anti-aliasing noise.
 */
const config: TestRunnerConfig = {
  setup() {
    expect.extend({ toMatchImageSnapshot });
  },
  async postVisit(page, context) {
    // Let fonts/layout/transitions settle before capturing.
    await page.waitForTimeout(250);
    const image = await page.screenshot({ animations: 'disabled' });
    (expect(image) as unknown as { toMatchImageSnapshot: (o: object) => void }).toMatchImageSnapshot({
      customSnapshotsDir: `${process.cwd()}/__image_snapshots__`,
      customSnapshotIdentifier: context.id,
      failureThreshold: 0.02,
      failureThresholdType: 'percent',
    });
  },
};

export default config;
