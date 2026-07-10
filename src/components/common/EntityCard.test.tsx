import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { EntityCard } from './EntityCard';
import { makeTheme, BASE_THEME } from '../../theme';

const theme = makeTheme(BASE_THEME, 'prism');

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('EntityCard', () => {
  it('renders title, subtitle, and body', () => {
    render(
      <EntityCard title="Research Agent" subtitle="gpt-4o">
        <span>body content</span>
      </EntityCard>,
      { wrapper: Wrapper }
    );
    expect(screen.getByText('Research Agent')).toBeInTheDocument();
    expect(screen.getByText('gpt-4o')).toBeInTheDocument();
    expect(screen.getByText('body content')).toBeInTheDocument();
  });

  it('renders a StatusChip from the status prop', () => {
    render(<EntityCard title="Agent" status="running" />, { wrapper: Wrapper });
    expect(screen.getByText('In progress')).toBeInTheDocument();
  });

  it('lets headerAction override the status chip', () => {
    render(
      <EntityCard title="Agent" status="running" headerAction={<span>custom action</span>} />,
      { wrapper: Wrapper }
    );
    expect(screen.getByText('custom action')).toBeInTheDocument();
    expect(screen.queryByText('In progress')).toBeNull();
  });

  it('renders footer actions', () => {
    render(<EntityCard title="Agent" actions={<button>Run</button>} />, { wrapper: Wrapper });
    expect(screen.getByRole('button', { name: 'Run' })).toBeInTheDocument();
  });

  it('forwards clicks when interactive', () => {
    const onClick = vi.fn();
    render(<EntityCard title="Agent" interactive onClick={onClick} />, { wrapper: Wrapper });
    fireEvent.click(screen.getByText('Agent'));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
