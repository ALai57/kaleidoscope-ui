import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render as rtlRender, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { makeTheme, BASE_THEME } from '@/theme';
import { SideRail } from './SideRail';
import { getWriterRole, getAdminRole } from '@/auth/authHelpers';

const theme = makeTheme(BASE_THEME);
function renderAt(path: string, props = {}) {
  return rtlRender(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={[path]}>
        <SideRail {...props} />
      </MemoryRouter>
    </ThemeProvider>
  );
}
function renderSideRail(props = {}) {
  return renderAt('/archive', props);
}

describe('SideRail', () => {
  it('renders the three garden sections plus About as a Primary nav', () => {
    renderAt('/archive');
    const nav = screen.getByRole('navigation', { name: /primary/i });
    expect(nav).toBeTruthy();
    expect(screen.getByRole('link', { name: /Writing/ }).getAttribute('href')).toBe('/archive');
    expect(screen.getByRole('link', { name: /Reading/ }).getAttribute('href')).toBe('/library');
    expect(screen.getByRole('link', { name: /Recipes/ }).getAttribute('href')).toBe('/recipes');
    expect(screen.getByRole('link', { name: /About/ }).getAttribute('href')).toBe('/about');
  });

  it('tags the home logo glyph with the klogo hook for the prism-wheel hover spin', () => {
    renderAt('/archive');
    const home = screen.getByRole('link', { name: /home/i });
    expect(home.querySelector('svg.klogo')).toBeTruthy();
  });

  it('marks the active section with aria-current', () => {
    renderAt('/recipes/pho');
    expect(screen.getByRole('link', { name: /Recipes/ }).getAttribute('aria-current')).toBe('page');
    expect(screen.getByRole('link', { name: /Writing/ }).getAttribute('aria-current')).toBe('false');
  });

  it('shows a Login button when unauthenticated', () => {
    const login = vi.fn();
    renderAt('/archive', { isAuthenticated: false, login });
    expect(screen.getByRole('button', { name: /login/i })).toBeTruthy();
  });

  it('hides writer/admin tools from the public', () => {
    renderAt('/archive');
    expect(screen.queryByRole('link', { name: /Projects/ })).toBeNull();
    expect(screen.queryByRole('link', { name: /Manager/ })).toBeNull();
  });

  it('shows admin tools to a site admin', () => {
    const user = { realm_access: { roles: [getAdminRole()] } };
    renderAt('/archive', { user, isAuthenticated: true });
    expect(screen.getByRole('link', { name: /Projects/ })).toBeTruthy();
  });

  it('shows Experience to a writer', () => {
    const user = { realm_access: { roles: [getWriterRole()] } };
    renderAt('/archive', { user, isAuthenticated: true });
    expect(screen.getByRole('link', { name: /Experience/ })).toBeTruthy();
  });

  it('shows no Studio section when logged out', () => {
    renderSideRail({ isAuthenticated: false });
    expect(screen.queryByRole('button', { name: /studio/i })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('shows the Studio disclosure with admin items when an admin is logged in', () => {
    renderSideRail({ isAuthenticated: true, user: { realm_access: { roles: ['localhost:admin'] } } });
    const toggle = screen.getByRole('button', { name: /studio/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('link', { name: 'Agents' })).toBeInTheDocument();
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('exposes Logout in the account menu and calls logout', () => {
    const logout = vi.fn();
    renderSideRail({ isAuthenticated: true, user: { firstName: 'Andrew', realm_access: { roles: ['localhost:admin'] } }, logout });
    fireEvent.click(screen.getByRole('button', { name: /account/i }));
    fireEvent.click(screen.getByRole('menuitem', { name: /logout/i }));
    expect(logout).toHaveBeenCalledTimes(1);
  });
});
