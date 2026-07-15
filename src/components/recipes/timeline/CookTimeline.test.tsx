import { it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../../../test/testUtils';
import { PrismThemeProvider } from '../../prism';
import { CookTimeline } from './CookTimeline';
import { salmonTimeline, salmonContent } from '../../../test/fixtures/salmonTimeline';

function setup() {
  return render(
    <PrismThemeProvider>
      <CookTimeline timeline={salmonTimeline} sections={salmonContent.sections} />
    </PrismThemeProvider>
  );
}

it('preselects the first phase so the detail panel is not empty', () => {
  setup();
  expect(screen.getByRole('heading', { name: /Salmon · Marinate/ })).toBeInTheDocument();
  // first phase steps resolved from the content
  expect(screen.getByText('Coat the fillets, flesh-side down')).toBeInTheDocument();
});

it('shows a clicked phase’s resolved steps in the detail panel', async () => {
  setup();
  await userEvent.click(screen.getByRole('button', { name: /Rice · Start rice/ }));
  expect(screen.getByRole('heading', { name: /Rice · Start rice/ })).toBeInTheDocument();
  expect(screen.getByText('Rinse rice until the water runs clear')).toBeInTheDocument();
});

it('renders the legend', () => {
  setup();
  // Scoped to the legend's own copy — TimelineStats also renders a
  // "Hands-on" tile label, so a bare /hands-on/i match is ambiguous.
  expect(screen.getByText(/Active — hands-on/i)).toBeInTheDocument();
  expect(screen.getByText(/Passive — hands-off/i)).toBeInTheDocument();
});
