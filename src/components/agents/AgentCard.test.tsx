import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import AgentCard from './AgentCard';
import type { Agent } from '../../types/agent';
import { makeTheme, BASE_THEME } from '../../theme';

const theme = makeTheme(BASE_THEME, 'prism');
const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const base: Agent = {
  id: 'a-1',
  agent_type: 'coach',
  name: 'Coach',
  short_name: 'Coach',
  avatar: '🧭',
  color: '#6750A4',
  system_prompt: 'You are a supportive coach.',
  is_default: false,
};

describe('AgentCard', () => {
  it('renders name, type, avatar, and prompt', () => {
    render(<AgentCard agent={base} onEdit={() => {}} />, { wrapper: Wrapper });
    expect(screen.getByText('Coach')).toBeInTheDocument();
    expect(screen.getByText('coach')).toBeInTheDocument();
    expect(screen.getByText('🧭')).toBeInTheDocument();
    expect(screen.getByText('You are a supportive coach.')).toBeInTheDocument();
  });

  it('shows a Default chip only when the agent is default', () => {
    const { rerender } = render(<AgentCard agent={base} onEdit={() => {}} />, { wrapper: Wrapper });
    expect(screen.queryByText('Default')).toBeNull();
    rerender(<AgentCard agent={{ ...base, is_default: true }} onEdit={() => {}} />);
    expect(screen.getByText('Default')).toBeInTheDocument();
  });

  it('calls onEdit with the agent', () => {
    const onEdit = vi.fn();
    render(<AgentCard agent={base} onEdit={onEdit} />, { wrapper: Wrapper });
    fireEvent.click(screen.getByRole('button', { name: /edit/i }));
    expect(onEdit).toHaveBeenCalledWith(base);
  });
});
