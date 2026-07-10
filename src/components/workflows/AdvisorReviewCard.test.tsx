import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { AdvisorReviewCard } from './AdvisorReviewCard';
import type { AdvisorScoreOutput } from '../../types/workflow';
import { makeTheme, BASE_THEME } from '../../theme';

const theme = makeTheme(BASE_THEME, 'prism');
const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const score: AdvisorScoreOutput = {
  overall: 8.2,
  dimensions: [
    { name: 'Clarity', value: 8, rationale: 'Reads well.' },
    { name: 'Feasibility', value: 5, rationale: 'Some risk in the timeline.' },
  ],
  context_path: 'src/core',
};

describe('AdvisorReviewCard', () => {
  it('shows the reviewing indicator while running', () => {
    render(
      <AdvisorReviewCard stepName="Security" agentType="coach" stepStatus="running" isStreaming />,
      { wrapper: Wrapper }
    );
    expect(screen.getByText('Reviewing…')).toBeInTheDocument();
  });

  it('renders the step name, overall score, and dimensions when complete', () => {
    render(
      <AdvisorReviewCard
        stepName="Security review"
        agentType="coach"
        stepStatus="completed"
        scoreOutput={score}
      />,
      { wrapper: Wrapper }
    );
    expect(screen.getByText('Security review')).toBeInTheDocument();
    expect(screen.getByText('8.2 / 10')).toBeInTheDocument();
    expect(screen.getByText('Clarity')).toBeInTheDocument();
    expect(screen.getByText('Reviewed with src/core')).toBeInTheDocument();
  });

  it('surfaces a failure reason', () => {
    render(
      <AdvisorReviewCard
        stepName="Security"
        agentType="coach"
        stepStatus="failed"
        scoreOutput={{ dimensions: [], failed: true, reason: 'timeout' }}
      />,
      { wrapper: Wrapper }
    );
    expect(screen.getByText('Could not complete review')).toBeInTheDocument();
    expect(screen.getByText('Reason: timeout')).toBeInTheDocument();
  });
});
