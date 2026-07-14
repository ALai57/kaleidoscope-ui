/// <reference types="node" />
import { readFileSync } from 'node:fs';
// Aliased (not `URL`): Vite statically rewrites literal `new URL(..., import.meta.url)`
// call sites into a dev-server asset URL, which breaks a Node `fs` read in tests.
import { URL as NodeURL } from 'node:url';
import { render, screen } from '@testing-library/react';
import { PrismThemeProvider } from '../prism';
import { ScoreRunCard } from './ScoreRunCard';
import type { ScoreRun } from '../../types/project';

const scoreRun: ScoreRun = {
  id: 'test-score-run',
  version: 2,
  overall: 7.4,
  scored_at: '2026-07-01T00:00:00Z',
  definition: { id: 'test-definition', name: 'Clarity', scorer_type: 'pm' },
  dimensions: [],
} as ScoreRun;

it('does not hardcode a pixel radius (reads it from the theme)', () => {
  const source = readFileSync(new NodeURL('./ScoreRunCard.tsx', import.meta.url), 'utf8');
  expect(source).not.toMatch(/borderRadius:\s*'8px/);
});

it('renders its score under the Prism theme', () => {
  render(
    <PrismThemeProvider>
      <ScoreRunCard scoreRun={scoreRun} />
    </PrismThemeProvider>,
  );
  expect(screen.getByText('Clarity')).toBeInTheDocument();
  expect(screen.getByText('7.4')).toBeInTheDocument();
});
