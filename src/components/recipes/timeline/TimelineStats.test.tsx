import { it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../../../test/testUtils';
import { PrismThemeProvider } from '../../prism';
import { TimelineStats } from './TimelineStats';
import { salmonTimeline } from '../../../test/fixtures/salmonTimeline';

it('shows total, hands-on, and free minutes', () => {
  render(
    <PrismThemeProvider>
      <TimelineStats timeline={salmonTimeline} />
    </PrismThemeProvider>
  );
  expect(screen.getByText('Total elapsed')).toBeInTheDocument();
  expect(screen.getByText('50')).toBeInTheDocument(); // total
  expect(screen.getByText('Hands-on')).toBeInTheDocument();
  expect(screen.getByText('36')).toBeInTheDocument(); // hands-on
  expect(screen.getByText("You're free")).toBeInTheDocument();
  expect(screen.getByText('14')).toBeInTheDocument(); // you're free
});

it('back-plans a start clock from the serve time and updates on change', async () => {
  render(
    <PrismThemeProvider>
      <TimelineStats timeline={salmonTimeline} />
    </PrismThemeProvider>
  );
  expect(screen.getByTestId('start-clock')).toHaveTextContent('5:40 PM'); // 18:30 - 50
  const input = screen.getByLabelText(/serving at/i);
  await userEvent.clear(input);
  await userEvent.type(input, '19:00');
  expect(screen.getByTestId('start-clock')).toHaveTextContent('6:10 PM'); // 19:00 - 50
});
