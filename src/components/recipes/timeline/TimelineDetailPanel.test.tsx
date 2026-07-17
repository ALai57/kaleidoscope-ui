import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@/test/testUtils';
import { PrismThemeProvider } from '@/components/prism';
import { TimelineDetailPanel } from './TimelineDetailPanel';

const groups = [
  {
    id: 'a/mix',
    label: 'Mix',
    componentName: 'A',
    laneColor: '#26A0BC',
    kind: 'active' as const,
    start: 0,
    dur: 5,
    steps: ['Combine'],
  },
  {
    id: 'a/bake',
    label: 'Bake',
    componentName: 'A',
    laneColor: '#26A0BC',
    kind: 'passive' as const,
    start: 5,
    dur: 20,
    steps: ['Bake it'],
  },
];

const renderPanel = (props: Partial<React.ComponentProps<typeof TimelineDetailPanel>> = {}) =>
  render(
    <PrismThemeProvider>
      <TimelineDetailPanel
        selectedId="a/bake"
        groups={groups}
        ingredients={['flour', 'sugar']}
        sectionIndex={0}
        checked={new Set()}
        onToggleIngredient={vi.fn()}
        {...props}
      />
    </PrismThemeProvider>
  );

describe('TimelineDetailPanel', () => {
  it('shows the focused section ingredients and every phase step', () => {
    renderPanel();
    expect(screen.getByText('flour')).toBeInTheDocument();
    expect(screen.getByText('Combine')).toBeInTheDocument(); // non-selected phase step still present
    expect(screen.getByText('Bake it')).toBeInTheDocument();
  });

  it('marks the selected phase group', () => {
    renderPanel({ ingredients: [] });
    expect(document.querySelector('[data-group="a/bake"]')).toHaveClass('sel');
  });

  it('toggles an ingredient via its checkbox', async () => {
    const onToggle = vi.fn();
    renderPanel({ onToggleIngredient: onToggle });
    await userEvent.click(screen.getByLabelText('flour'));
    expect(onToggle).toHaveBeenCalledWith('0:0'); // ingredientKey(0, 0)
  });
});
