import { it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../../../test/testUtils';
import { PrismThemeProvider } from '../../prism';
import { TimelineGantt } from './TimelineGantt';
import { salmonTimeline, redundantLabelTimeline } from '../../../test/fixtures/salmonTimeline';
import type { Timeline } from '../../../types/recipe';

const colors = ['#26A0BC', '#9085E9', '#C98500', '#2E9E5B'];

it('renders a bar button per phase and calls onSelect on click', async () => {
  const onSelect = vi.fn();
  render(
    <PrismThemeProvider>
      <TimelineGantt timeline={salmonTimeline} laneColors={colors} selectedId={null} onSelect={onSelect} />
    </PrismThemeProvider>
  );
  // 2 + 3 + 3 + 1 = 9 phases
  expect(screen.getAllByRole('button')).toHaveLength(9);
  await userEvent.click(screen.getByRole('button', { name: /Salmon · Marinate/ }));
  expect(onSelect).toHaveBeenCalledWith('Salmon/Marinate');
});

it('does not repeat the component name in the bar when the phase label matches it', () => {
  render(
    <PrismThemeProvider>
      <TimelineGantt timeline={redundantLabelTimeline} laneColors={colors} selectedId={null} onSelect={() => {}} />
    </PrismThemeProvider>
  );
  // The lane is named "Prep broth" and its only phase is also "Prep broth";
  // the bar shows it once, not "Prep broth · Prep broth".
  const bar = screen.getByRole('button', { name: 'Prep broth' });
  expect(bar).toBeInTheDocument();
  expect(screen.queryByText('Prep broth · Prep broth')).not.toBeInTheDocument();
});

it('draws a dependency link path for each resolvable dep', () => {
  const { container } = render(
    <PrismThemeProvider>
      <TimelineGantt timeline={salmonTimeline} laneColors={colors} selectedId={null} onSelect={() => {}} />
    </PrismThemeProvider>
  );
  // deps: Sear←Marinate, Simmer←Start rice, Rest←Simmer, Sauté←Prep,
  //       Plate←(Sear, Rest, Sauté) = 3 -> 7 links total
  expect(container.querySelectorAll('svg path')).toHaveLength(7);
});

it('marks active and passive bars with a data-kind attribute for visual-kind distinction', () => {
  render(
    <PrismThemeProvider>
      <TimelineGantt timeline={salmonTimeline} laneColors={colors} selectedId={null} onSelect={() => {}} />
    </PrismThemeProvider>
  );
  expect(screen.getByRole('button', { name: /Salmon · Marinate/ })).toHaveAttribute('data-kind', 'passive');
  expect(screen.getByRole('button', { name: /Salmon · Sear & glaze/ })).toHaveAttribute('data-kind', 'active');
});

it('skips deps that do not resolve to a phase in the timeline, without throwing', () => {
  const timeline: Timeline = {
    version: 1,
    generator_version: 1,
    generated_at: '2026-07-14T00:00:00Z',
    total_minutes: 20,
    overrides: [],
    components: [
      { name: 'Solo', steps_hash: 'sha256:solo', phases: [
        { id: 'Solo/First', label: 'First', kind: 'active', steps: [0], estimate: 5, deps: [], start: 0 },
        {
          id: 'Solo/Second',
          label: 'Second',
          kind: 'active',
          steps: [1],
          estimate: 5,
          deps: ['Solo/First', 'Solo/Nonexistent'],
          start: 10,
        },
      ] },
    ],
  };
  const renderIt = () =>
    render(
      <PrismThemeProvider>
        <TimelineGantt timeline={timeline} laneColors={colors} selectedId={null} onSelect={() => {}} />
      </PrismThemeProvider>
    );
  expect(renderIt).not.toThrow();
  const { container } = renderIt();
  // Only the resolvable dep (Solo/First -> Solo/Second) draws a link;
  // the dangling 'Solo/Nonexistent' dep is filtered out.
  expect(container.querySelectorAll('svg path')).toHaveLength(1);
});
