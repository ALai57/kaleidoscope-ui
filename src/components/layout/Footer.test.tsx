import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Footer } from './Footer';
import { makeTheme, BASE_THEME } from '../../theme';

const theme = makeTheme(BASE_THEME, 'prism');
const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MemoryRouter>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </MemoryRouter>
);

describe('Footer', () => {
  it('renders the nav links', () => {
    render(<Footer />, { wrapper: Wrapper });
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Experience' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Writing' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About this site' })).toBeInTheDocument();
  });

  it('renders the current-year copyright', () => {
    render(<Footer />, { wrapper: Wrapper });
    expect(screen.getByText(`© ${new Date().getFullYear()} Andrew Lai`)).toBeInTheDocument();
  });
});
