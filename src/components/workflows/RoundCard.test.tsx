import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { RoundCard } from './RoundCard';
import type { WorkflowRoundDetail } from '../../types/workflow';
import { makeTheme, BASE_THEME } from '../../theme';

const theme = makeTheme(BASE_THEME, 'prism');
const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const decidedRound: WorkflowRoundDetail = {
  round_number: 2,
  status: 'completed',
  started_at: '2026-01-01T00:00:00Z',
  judge: {
    decision: { action: 'proceed', summary: 'Looks good, moving on.', rationale: 'All clear.' },
    summary: 'Looks good, moving on.',
    rationale: 'All clear.',
    policy: { max_rounds: 3, current_round: 2 },
  },
};

describe('RoundCard', () => {
  it('renders the round label with the max-rounds policy', () => {
    render(<RoundCard round={decidedRound} />, { wrapper: Wrapper });
    expect(screen.getByText('Round 2 of 3')).toBeInTheDocument();
  });

  it('shows the judge decision chip and summary', () => {
    render(<RoundCard round={decidedRound} />, { wrapper: Wrapper });
    expect(screen.getByText('Approved')).toBeInTheDocument();
    expect(screen.getByText('Looks good, moving on.')).toBeInTheDocument();
  });

  it('shows the analyzing state before a judge exists', () => {
    render(
      <RoundCard round={{ round_number: 1, status: 'in_progress', started_at: 'now' }} />,
      { wrapper: Wrapper }
    );
    expect(screen.getByText('Analyzing…')).toBeInTheDocument();
  });

  it('shows the paused-for-input indicator', () => {
    render(
      <RoundCard round={{ round_number: 1, status: 'in_progress', started_at: 'now' }} awaitingInput />,
      { wrapper: Wrapper }
    );
    expect(screen.getByText('Waiting for your input')).toBeInTheDocument();
  });
});
