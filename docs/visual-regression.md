# Visual Regression Testing

Every Storybook story is screenshotted and compared against a committed baseline
via the [Storybook Playwright test-runner](https://storybook.js.org/docs/writing-tests/test-runner).
This catches unintended visual changes to the design-system components and the
Foundations catalog.

## How it works

- `.storybook/test-runner.ts` — after each story renders, captures a screenshot
  and asserts `toMatchImageSnapshot` (via `jest-image-snapshot`).
- Baselines live in `__image_snapshots__/` (committed). A 2% per-pixel threshold
  absorbs sub-pixel anti-aliasing noise.
- The test-runner drives the **dev server** (`storybook dev`), not the static
  build — the static build has a module-load-order issue with the current
  Vite/Storybook versions.

## Running it

```bash
npm run test-storybook:ci     # boots storybook + runs the test-runner, one shot
# or, against an already-running `npm run storybook`:
npm run test-storybook
```

Requires Playwright's Chromium: `npx playwright install chromium` (once).

## Baselines are environment-sensitive

Screenshot rendering (fonts, anti-aliasing) differs across OSes, so **baselines
must be generated in the same environment that runs them in CI** — ideally a
pinned Docker image. Do not commit baselines from an ad-hoc dev machine and
expect them to pass elsewhere.

First-time setup / intentional visual changes — regenerate and commit:

```bash
npm run test-storybook -- -u          # updates baselines in __image_snapshots__/
git add __image_snapshots__ && git commit -m "Update visual baselines"
```

## Excluded stories

A story can opt out of the test-runner with `tags: ['!test']` in its meta.
Currently excluded (pre-existing issues, unrelated to the design system):

- `Editor/EditorToolbar` — play/interaction setup trips a jest-expect version
  mismatch (`customEqualityTesters`).
- `Article/ArticleCard` — renders against external CSS (bootstrap/app
  stylesheets) not present in the test environment.
