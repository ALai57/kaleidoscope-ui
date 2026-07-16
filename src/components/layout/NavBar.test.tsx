import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { NavBar } from './NavBar';
import { makeTheme, BASE_THEME } from '../../theme';
import { getWriterRole } from '../../auth/authHelpers';

// Render under the real design-system theme so components read `theme.tokens`
// (radius/motion/typography voice), the way they do in the app.
const theme = makeTheme(BASE_THEME, 'prism');

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

  it('shows user avatar when authenticated', () => {
    render(
      <NavBar isAuthenticated user={{ firstName: 'Alice' }} />,
      { wrapper: Wrapper },
    );
    expect(screen.getByRole('link', { name: /admin/i })).toBeTruthy();
    expect(screen.queryByRole('button', { name: /login/i })).toBeNull();
  });

  it('calls login when login button is clicked', () => {
    const handleLogin = vi.fn();
    render(<NavBar isAuthenticated={false} login={handleLogin} />, {
      wrapper: Wrapper,
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(handleLogin).toHaveBeenCalled();
  });

  it('shows the Library link for writers', () => {
    render(
      <NavBar isAuthenticated user={{ firstName: 'Alice', realm_access: { roles: [getWriterRole()] } }} />,
      { wrapper: Wrapper },
    );
    expect(screen.getByRole('link', { name: /library/i })).toHaveAttribute('href', '/library');
  });

  it('hides the Library link from authenticated non-writers', () => {
    render(
      <NavBar isAuthenticated user={{ firstName: 'Bob', realm_access: { roles: [] } }} />,
      { wrapper: Wrapper },
    );
    expect(screen.queryByRole('link', { name: /library/i })).toBeNull();
  });

  // The dark-mode toggle is a global element (DarkModeToggle in main.tsx),
  // not part of NavBar, so it's not asserted here.
});
