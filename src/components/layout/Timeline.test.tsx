import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Timeline } from './Timeline';
import { TimelineEntry } from './TimelineEntry';
import type { TimelineEntry as TimelineEntryData } from '../../data/timeline';

const theme = createTheme();

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const mockEntry: TimelineEntryData = {
  year: 2024,
  since: 'Jan, 2023',
  until: 'Dec, 2024',
  iconSrc: '/static/images/freshpaint.svg',
  iconAlt: 'Freshpaint',
  heading: 'Senior Engineer @ Acme Corp',
  orgUrl: 'https://example.com',
  body: ['Worked on cool stuff.'],
  bullets: ['Built a thing', 'Fixed a bug'],
};

describe('TimelineEntry', () => {
  it('renders the heading', () => {
    render(<TimelineEntry entry={mockEntry} />, { wrapper: Wrapper });
    expect(screen.getByText('Senior Engineer @ Acme Corp')).toBeTruthy();
  });

  it('renders the body paragraph', () => {
    render(<TimelineEntry entry={mockEntry} />, { wrapper: Wrapper });
    expect(screen.getByText('Worked on cool stuff.')).toBeTruthy();
  });

  it('renders bullets', () => {
    render(<TimelineEntry entry={mockEntry} />, { wrapper: Wrapper });
    expect(screen.getByText('Built a thing')).toBeTruthy();
    expect(screen.getByText('Fixed a bug')).toBeTruthy();
  });

  it('shows the date as a chip inside the card on mobile', () => {
    render(<TimelineEntry entry={mockEntry} mobile />, { wrapper: Wrapper });
    const chip = screen.getByTestId('timeline-date-mobile');
    expect(chip).toBeTruthy();
    expect(chip.textContent).toContain('Dec, 2024');
    expect(screen.getByText('Senior Engineer @ Acme Corp')).toBeTruthy();
  });

  it('renders no mobile date chip on desktop (date stays in the opposite column)', () => {
    render(<TimelineEntry entry={mockEntry} mobile={false} />, { wrapper: Wrapper });
    expect(screen.queryByTestId('timeline-date-mobile')).toBeNull();
    expect(screen.getByText('Dec, 2024')).toBeTruthy();
  });
});

describe('Timeline', () => {
  it('renders with default entries', () => {
    const { container } = render(<Timeline />, { wrapper: Wrapper });
    expect(container).toBeDefined();
    // Should render multiple list items
    const items = container.querySelectorAll('li');
    expect(items.length).toBeGreaterThan(5);
  });

  it('renders with custom entries', () => {
    render(<Timeline entries={[mockEntry]} />, { wrapper: Wrapper });
    expect(screen.getByText('Senior Engineer @ Acme Corp')).toBeTruthy();
  });
});
