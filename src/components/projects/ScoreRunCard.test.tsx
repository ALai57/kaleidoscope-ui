import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { render, screen } from '@testing-library/react';
import { PrismThemeProvider } from '../prism';
import { ScoreRunCard } from './ScoreRunCard';
import type { ScoreRun } from '../../types/project';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const scoreRun: ScoreRun = {
  id: 'test-score-run',
  version: 2,
  overall: 7.4,
  scored_at: '2026-07-01T00:00:00Z',
  definition: { id: 'test-definition', name: 'Clarity', scorer_type: 'pm' },
  dimensions: [],
} as ScoreRun;

it('does not hardcode a pixel radius (reads it from the theme)', () => {
  const source = readFileSync(`${__dirname}/ScoreRunCard.tsx`, 'utf8');
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
