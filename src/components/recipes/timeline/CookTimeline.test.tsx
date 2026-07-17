import { it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../../../test/testUtils';
import { PrismThemeProvider } from '../../prism';
import { CookTimeline } from './CookTimeline';
import { salmonTimeline, salmonContent } from '../../../test/fixtures/salmonTimeline';

function setup() {
  return render(
    <PrismThemeProvider>
      <CookTimeline
        timeline={salmonTimeline}
        sections={salmonContent.sections}
        checked={new Set()}
        onToggleIngredient={vi.fn()}
      />
    </PrismThemeProvider>
  );
}

it('preselects the first phase and shows that section’s ingredients', () => {
  setup();
  expect(document.querySelector('[data-group="Salmon/Marinate"]')).toHaveClass('sel');
  expect(screen.getByText('2 salmon fillets')).toBeInTheDocument();
  expect(screen.queryByText('1 cup rice')).not.toBeInTheDocument();
});

it('renders the full method — every phase’s steps present regardless of selection', () => {
  setup();
  expect(screen.getByText('Coat the fillets, flesh-side down')).toBeInTheDocument();
  expect(screen.getByText('Rinse rice until the water runs clear')).toBeInTheDocument();
});

it('switches the focused section when a bar is clicked', async () => {
  setup();
  await userEvent.click(screen.getByRole('button', { name: /Rice · Start rice/ }));
  expect(document.querySelector('[data-group="Rice/Start rice"]')).toHaveClass('sel');
  expect(screen.getByText('1 cup rice')).toBeInTheDocument();
});

it('no longer renders the stat cards', () => {
  setup();
  expect(screen.queryByText(/total elapsed/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/you.?re free/i)).not.toBeInTheDocument();
});

it('renders every phase as a labeled group in the method', () => {
  setup();
  salmonTimeline.components
    .flatMap((c) => c.phases)
    .forEach((p) => {
      expect(screen.getByText(p.label)).toBeInTheDocument();
    });
});

it('renders the legend', () => {
  setup();
  // Scoped to the legend's own copy, since a bare /hands-on/i match is ambiguous.
  expect(screen.getByText(/Active — hands-on/i)).toBeInTheDocument();
  expect(screen.getByText(/Passive — hands-off/i)).toBeInTheDocument();
});
