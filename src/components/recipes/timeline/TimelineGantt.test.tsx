import { it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../../../test/testUtils';
import { PrismThemeProvider } from '../../prism';
import { TimelineGantt } from './TimelineGantt';
import { salmonTimeline } from '../../../test/fixtures/salmonTimeline';

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
