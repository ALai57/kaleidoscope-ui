import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import WorkflowCard from './WorkflowCard';
import type { Workflow } from '../../types/workflow';
import { makeTheme, BASE_THEME } from '../../theme';

const theme = makeTheme(BASE_THEME, 'prism');
const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const base: Workflow = {
  id: 'wf-1',
  name: 'Autonomous PR review',
  description: 'Runs advisors over an incoming change.',
  status: 'live',
  is_default: false,
  steps: [],
};

const noop = () => {};

describe('WorkflowCard', () => {
  it('renders name, description, status, and step count', () => {
    render(
      <WorkflowCard workflow={{ ...base, steps: [{}, {}] as never }} onEdit={noop} onArchive={noop} archiving={false} />,
      { wrapper: Wrapper }
    );
    expect(screen.getByText('Autonomous PR review')).toBeInTheDocument();
    expect(screen.getByText('Runs advisors over an incoming change.')).toBeInTheDocument();
    expect(screen.getByText('live')).toBeInTheDocument();
    expect(screen.getByText('2 steps')).toBeInTheDocument();
  });

  it('calls onEdit with the workflow id', () => {
    const onEdit = vi.fn();
    render(<WorkflowCard workflow={base} onEdit={onEdit} onArchive={noop} archiving={false} />, {
      wrapper: Wrapper,
    });
    fireEvent.click(screen.getByRole('button', { name: /edit/i }));
    expect(onEdit).toHaveBeenCalledWith('wf-1');
  });

  it('hides Archive for default workflows and archived ones', () => {
    const { rerender } = render(
      <WorkflowCard workflow={{ ...base, is_default: true }} onEdit={noop} onArchive={noop} archiving={false} />,
      { wrapper: Wrapper }
    );
    expect(screen.queryByRole('button', { name: /archive/i })).toBeNull();

    rerender(
      <WorkflowCard workflow={{ ...base, status: 'archived' }} onEdit={noop} onArchive={noop} archiving={false} />
    );
    expect(screen.queryByRole('button', { name: /archive/i })).toBeNull();
  });

  it('archives via onArchive when actionable', () => {
    const onArchive = vi.fn();
    render(<WorkflowCard workflow={base} onEdit={noop} onArchive={onArchive} archiving={false} />, {
      wrapper: Wrapper,
    });
    fireEvent.click(screen.getByRole('button', { name: /archive/i }));
    expect(onArchive).toHaveBeenCalledWith('wf-1');
  });
});
