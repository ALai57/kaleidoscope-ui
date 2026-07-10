import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
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
});
