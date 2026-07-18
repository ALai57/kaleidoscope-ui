import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../../../test/testUtils';
import { PrismThemeProvider } from '../../prism';
import { MobileCookTimeline } from './MobileCookTimeline';
import { salmonTimeline, salmonContent } from '../../../test/fixtures/salmonTimeline';

const setup = () =>
  render(
    <PrismThemeProvider>
      <MobileCookTimeline
        timeline={salmonTimeline}
        sections={salmonContent.sections}
        checked={new Set()}
        onToggleIngredient={vi.fn()}
      />
    </PrismThemeProvider>,
  );

describe('MobileCookTimeline', () => {
  it('filters the schedule to the selected section', async () => {
    setup();
    expect(screen.getByText('Marinate')).toBeInTheDocument(); // Salmon phase visible under Whole timeline
    await userEvent.click(screen.getByRole('button', { name: 'Rice' })); // section chip (exact name)
    expect(screen.queryByText('Marinate')).not.toBeInTheDocument();
    expect(screen.getByText('Start rice')).toBeInTheDocument();
  });

  it('reveals a phase’s instructions on tap', async () => {
    setup();
    await userEvent.click(screen.getByRole('button', { name: /Start rice/ }));
    expect(screen.getByText('Rinse rice until the water runs clear')).toBeInTheDocument();
  });

  it('shows the selected section’s ingredients in the shared panel', async () => {
    setup();
    await userEvent.click(screen.getByRole('button', { name: 'Rice' }));
    await userEvent.click(screen.getByRole('button', { name: /ingredients/i }));
    expect(screen.getByText('1 cup rice')).toBeInTheDocument();
  });
});
