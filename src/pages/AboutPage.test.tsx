import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import AboutPage from './AboutPage';
import { makeTheme, BASE_THEME } from '../theme';

vi.mock('../auth/useAuth', () => ({
  useAuth: () => ({
    isAuthenticated: false,
    token: undefined,
    userProfile: null,
    login: vi.fn(),
    logout: vi.fn(),
  }),
}));

const theme = makeTheme(BASE_THEME, 'prism');
const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MemoryRouter>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </MemoryRouter>
);

describe('AboutPage', () => {
  it('renders the section heading', () => {
    render(<AboutPage />, { wrapper: Wrapper });
    expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument();
  });

  it('renders the interest chips', () => {
    render(<AboutPage />, { wrapper: Wrapper });
    expect(screen.getByText('Tango')).toBeInTheDocument();
    expect(screen.getByText('Board games')).toBeInTheDocument();
  });
});
