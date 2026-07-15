import { it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '../../../test/testUtils';
import { PrismThemeProvider } from '../../prism';
import { TimelineDetailPanel } from './TimelineDetailPanel';
import type { TimelinePhase } from '../../../types/recipe';

const phase: TimelinePhase = {
  id: 'Salmon/Marinate', label: 'Marinate', kind: 'passive',
  steps: [0, 1, 2], estimate: 24, deps: [], start: 0,
};

it('shows an empty-state prompt when nothing is selected', () => {
  render(
    <PrismThemeProvider>
      <TimelineDetailPanel phase={null} componentName="" laneColor="#45D6E8" steps={[]} />
    </PrismThemeProvider>
  );
  expect(screen.getByText(/pick a block/i)).toBeInTheDocument();
});

it('renders the selected phase heading, kind, window, and steps', () => {
  render(
    <PrismThemeProvider>
      <TimelineDetailPanel
        phase={phase}
        componentName="Salmon"
        laneColor="#26A0BC"
        steps={['Whisk miso', 'Coat the fillets', 'Leave at room temp']}
      />
    </PrismThemeProvider>
  );
  expect(screen.getByRole('heading', { name: /Salmon · Marinate/ })).toBeInTheDocument();
  expect(screen.getByText('passive')).toBeInTheDocument();
  expect(screen.getByText(/\+0–24 min/)).toBeInTheDocument();
  expect(screen.getByText('Coat the fillets')).toBeInTheDocument();
  expect(screen.getAllByRole('listitem')).toHaveLength(3);
});
