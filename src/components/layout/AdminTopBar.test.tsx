import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { AdminTopBar } from './AdminTopBar';
import { makeTheme, BASE_THEME } from '../../theme';

const theme = makeTheme(BASE_THEME, 'prism');
const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('AdminTopBar', () => {
  it('renders the title as a heading', () => {
    render(<AdminTopBar title="Projects" />, { wrapper: Wrapper });
    expect(screen.getByRole('heading', { name: 'Projects' })).toBeInTheDocument();
  });

  it('renders action content', () => {
    render(<AdminTopBar title="Projects" actions={<button>New</button>} />, { wrapper: Wrapper });
    expect(screen.getByRole('button', { name: 'New' })).toBeInTheDocument();
  });

  it('renders a menu button that fires onMenuClick when provided', () => {
    const onMenuClick = vi.fn();
    render(<AdminTopBar title="Manager" onMenuClick={onMenuClick} />, { wrapper: Wrapper });
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
    expect(onMenuClick).toHaveBeenCalledTimes(1);
  });

  it('renders no menu button when onMenuClick is omitted', () => {
    render(<AdminTopBar title="Manager" />, { wrapper: Wrapper });
    expect(screen.queryByRole('button', { name: /open menu/i })).toBeNull();
  });
});
