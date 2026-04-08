import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { NavBar } from './NavBar';

// Create a theme with CssVarsProvider support or use createTheme
const theme = createTheme();

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MemoryRouter>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </MemoryRouter>
);

describe('NavBar', () => {
  it('renders without errors', () => {
    const { container } = render(<NavBar />, { wrapper: Wrapper });
    expect(container).toBeDefined();
  });

  it('shows login button when unauthenticated', () => {
    render(<NavBar isAuthenticated={false} />, { wrapper: Wrapper });
    expect(screen.getByRole('button', { name: /login/i })).toBeTruthy();
  });

  it('shows logout button when authenticated', () => {
    render(
      <NavBar
        isAuthenticated
        user={{ firstName: 'Alice' }}
      />,
      { wrapper: Wrapper },
    );
    expect(screen.getByRole('button', { name: /logout/i })).toBeTruthy();
  });

  it('calls login when login button is clicked', () => {
    const handleLogin = vi.fn();
    render(<NavBar isAuthenticated={false} login={handleLogin} />, {
      wrapper: Wrapper,
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(handleLogin).toHaveBeenCalled();
  });

  it('calls logout when logout button is clicked', () => {
    const handleLogout = vi.fn();
    render(
      <NavBar
        isAuthenticated
        user={{ firstName: 'Alice' }}
        logout={handleLogout}
      />,
      { wrapper: Wrapper },
    );
    fireEvent.click(screen.getByRole('button', { name: /logout/i }));
    expect(handleLogout).toHaveBeenCalled();
  });

  it('shows dark mode toggle button', () => {
    render(<NavBar />, { wrapper: Wrapper });
    expect(screen.getByRole('button', { name: /toggle dark mode/i })).toBeTruthy();
  });
});
