import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render as rtlRender, screen } from '@testing-library/react';
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
});
