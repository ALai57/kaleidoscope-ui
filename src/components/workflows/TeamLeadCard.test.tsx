import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import TeamLeadCard from './TeamLeadCard';
import type { JudgeDecisionOutput } from '../../types/workflow';
import { makeTheme, BASE_THEME } from '../../theme';

const theme = makeTheme(BASE_THEME, 'prism');
const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const clarify: JudgeDecisionOutput = {
  action: 'clarify',
  questions: ['What is the deadline?'],
  summary: 'Need a bit more detail.',
  rationale: 'The scope is ambiguous.',
};

describe('TeamLeadCard', () => {
  it('always shows the Team Lead header', () => {
    render(<TeamLeadCard stepStatus="running" stepRunId="s1" isStreaming />, { wrapper: Wrapper });
    expect(screen.getByText('Team Lead')).toBeInTheDocument();
    expect(screen.getByText('Reviewing…')).toBeInTheDocument();
  });

  it('renders a clarify decision with its questions and status label', () => {
    render(
      <TeamLeadCard stepStatus="awaiting_input" stepRunId="s1" decisionOutput={clarify} />,
      { wrapper: Wrapper }
    );
    expect(screen.getByText('Waiting for your input')).toBeInTheDocument();
    expect(screen.getByText('What is the deadline?')).toBeInTheDocument();
  });

  it('submits clarify answers via onRespond', () => {
    const onRespond = vi.fn();
    render(
      <TeamLeadCard
        stepStatus="awaiting_input"
        stepRunId="s1"
        decisionOutput={clarify}
        onRespond={onRespond}
      />,
      { wrapper: Wrapper }
    );
    fireEvent.change(screen.getByPlaceholderText('Your answer…'), {
      target: { value: 'Next Friday' },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(onRespond).toHaveBeenCalledWith('s1', ['Next Friday']);
  });
});
