import { it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../../../test/testUtils';
import { PrismThemeProvider } from '../../prism';
import { makePrismTheme } from '../../../theme';
import { CookTimeline } from './CookTimeline';
import { salmonTimeline, salmonContent } from '../../../test/fixtures/salmonTimeline';
import { pickLaneColors } from '../../../utils/cookTimeline';
import type { RecipeSection, Timeline } from '../../../types/recipe';

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

it('drops the standalone legend — active/passive reads from the per-step method pills instead', () => {
  setup();
  // The old three-item legend row was removed in the timeline-first redesign;
  // the encoding now lives on each method group's kind pill.
  expect(screen.queryByText(/Active — hands-on/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/Passive — hands-off/i)).not.toBeInTheDocument();
  // salmonTimeline has passive phases (Marinate/Simmer/Rest) and active ones —
  // both kinds surface as pills in the Full method column.
  expect(screen.getAllByText('passive').length).toBeGreaterThan(0);
  expect(screen.getAllByText('active').length).toBeGreaterThan(0);
});

it('colors a section by its SECTION index, matching Raw/Shopping — even when the timeline component order differs from the section order', () => {
  // sections: Alpha (index 0), Bravo (index 1) — but the timeline lists the
  // Bravo component before Alpha, so component order != section order.
  const sections: RecipeSection[] = [
    { name: 'Alpha', ingredients: ['alpha ingredient'], steps: ['alpha step'] },
    { name: 'Bravo', ingredients: ['bravo ingredient'], steps: ['bravo step'] },
  ];
  const timeline: Timeline = {
    version: 1,
    generator_version: 1,
    generated_at: '2026-07-17T00:00:00Z',
    total_minutes: 10,
    overrides: [],
    components: [
      {
        name: 'Bravo',
        steps_hash: 'sha256:bravo',
        phases: [
          { id: 'Bravo/Only', label: 'Only', kind: 'active', steps: [0], estimate: 5, deps: [], start: 0 },
        ],
      },
      {
        name: 'Alpha',
        steps_hash: 'sha256:alpha',
        phases: [
          { id: 'Alpha/Only', label: 'Only', kind: 'active', steps: [0], estimate: 5, deps: [], start: 5 },
        ],
      },
    ],
  };

  render(
    <PrismThemeProvider>
      <CookTimeline
        timeline={timeline}
        sections={sections}
        checked={new Set()}
        onToggleIngredient={vi.fn()}
      />
    </PrismThemeProvider>
  );

  const theme = makePrismTheme();
  const sectionColors = pickLaneColors(sections.length, theme.tokens.color.categorical);
  // Bravo is sections[1] — RawRecipe/ShoppingList would color it sectionColors[1].
  const bravoGroup = document.querySelector('[data-group="Bravo/Only"]');
  expect(bravoGroup).not.toBeNull();
  const bravoDot = bravoGroup!.querySelector('span');
  expect(bravoDot).toHaveStyle({ backgroundColor: sectionColors[1] });
});
