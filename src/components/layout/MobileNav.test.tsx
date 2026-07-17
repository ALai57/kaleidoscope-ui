import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { makeTheme, BASE_THEME } from '@/theme';
import { getAdminRole, getWriterRole } from '@/auth/authHelpers';
import { MobileNav } from './MobileNav';

const theme = makeTheme(BASE_THEME);

const renderNav = (props: Record<string, unknown> = {}, path = '/recipes') =>
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={[path]}>
        <MobileNav {...props} />
      </MemoryRouter>
    </ThemeProvider>
  );

describe('MobileNav', () => {
  it('renders four labeled primary tabs', () => {
    renderNav();
    const nav = screen.getByRole('navigation', { name: /primary/i });
    for (const label of ['Writing', 'Reading', 'Recipes', 'About']) {
      expect(within(nav).getByRole('link', { name: label })).toBeTruthy();
    }
  });

  it('marks the active destination with aria-current', () => {
    renderNav({}, '/recipes');
    const nav = screen.getByRole('navigation', { name: /primary/i });
    expect(within(nav).getByRole('link', { name: 'Recipes' }).getAttribute('aria-current')).toBe('page');
    expect(within(nav).getByRole('link', { name: 'Writing' }).getAttribute('aria-current')).toBeNull();
  });

  it('opens the drawer from the menu button and closes it', () => {
    renderNav();
    expect(screen.queryByRole('dialog', { name: /menu/i })).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
    expect(screen.getByRole('dialog', { name: /menu/i })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /close menu/i }));
    expect(screen.queryByRole('dialog', { name: /menu/i })).toBeNull();
  });

  it('surfaces writer + admin links in the drawer for a site admin', () => {
    renderNav({ user: { realm_access: { roles: [getAdminRole()] } } });
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
    const dialog = screen.getByRole('dialog', { name: /menu/i });
    expect(within(dialog).getByRole('link', { name: 'Experience' })).toBeTruthy();
    expect(within(dialog).getByRole('link', { name: 'Projects' })).toBeTruthy();
    expect(within(dialog).getByRole('link', { name: 'Manager' })).toBeTruthy();
  });

  it('shows only Experience for a writer (no admin links)', () => {
    renderNav({ user: { realm_access: { roles: [getWriterRole()] } } });
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
    const dialog = screen.getByRole('dialog', { name: /menu/i });
    expect(within(dialog).getByRole('link', { name: 'Experience' })).toBeTruthy();
    expect(within(dialog).queryByRole('link', { name: 'Manager' })).toBeNull();
  });

  it('makes the background nav inert while the drawer is open', () => {
    renderNav();
    const nav = screen.getByRole('navigation', { name: /primary/i });
    expect(nav).not.toHaveAttribute('inert');
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
    expect(nav).toHaveAttribute('inert');
  });

  it('closes the drawer on Escape', () => {
    renderNav();
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
    const dialog = screen.getByRole('dialog', { name: /menu/i });
    fireEvent.keyDown(dialog, { key: 'Escape' });
    expect(screen.queryByRole('dialog', { name: /menu/i })).toBeNull();
  });

  it('calls login from the drawer when unauthenticated', () => {
    const login = vi.fn();
    renderNav({ isAuthenticated: false, login });
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(login).toHaveBeenCalledTimes(1);
  });
});
