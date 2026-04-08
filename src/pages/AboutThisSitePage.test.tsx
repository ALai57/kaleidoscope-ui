import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AboutThisSitePage from './AboutThisSitePage';

vi.mock('../auth/useKeycloak', () => ({
  useKeycloak: () => ({
    isAuthenticated: false,
    token: undefined,
    userProfile: null,
    login: vi.fn(),
    logout: vi.fn(),
  }),
}));

const theme = createTheme();

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MemoryRouter>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </MemoryRouter>
);

describe('AboutThisSitePage', () => {
  it('renders without errors', () => {
    const { container } = render(<AboutThisSitePage />, { wrapper: Wrapper });
    expect(container).toBeDefined();
  });

  it('shows Built With section', () => {
    render(<AboutThisSitePage />, { wrapper: Wrapper });
    expect(screen.getByText('Built With')).toBeTruthy();
  });

  it('shows Deployed with section', () => {
    render(<AboutThisSitePage />, { wrapper: Wrapper });
    expect(screen.getByText('Deployed with')).toBeTruthy();
  });

  it('shows kaleidoscope.pub link', () => {
    render(<AboutThisSitePage />, { wrapper: Wrapper });
    expect(screen.getByText('kaleidoscope.pub')).toBeTruthy();
  });
});
