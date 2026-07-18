import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render as rtlRender, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { makeTheme, BASE_THEME } from '@/theme';
import { useIsMobile } from '@/hooks/useIsMobile';
import { AppShell } from './AppShell';

vi.mock('@/auth/useAuth', () => ({
  useAuth: () => ({ isAuthenticated: false, isLoading: false, token: undefined, userProfile: null, login: vi.fn(), logout: vi.fn() }),
}));
vi.mock('@/hooks/useIsMobile', () => ({ useIsMobile: vi.fn(() => false) }));
const mockUseIsMobile = vi.mocked(useIsMobile);

const theme = makeTheme(BASE_THEME);

const renderShell = () =>
  rtlRender(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={['/recipes']}>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/recipes" element={<div>recipes content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </ThemeProvider>
  );

describe('AppShell', () => {
  it('renders the SideRail alongside content at/above md', () => {
    mockUseIsMobile.mockReturnValue(false);
    renderShell();
    // SideRail renders the "andrewlai" wordmark label; MobileNav does not.
    expect(screen.getByText('andrewlai')).toBeTruthy();
    expect(screen.getByText('recipes content')).toBeTruthy();
  });

  it('renders the MobileNav below md', () => {
    mockUseIsMobile.mockReturnValue(true);
    renderShell();
    const nav = screen.getByRole('navigation', { name: /primary/i });
    expect(nav.querySelectorAll('a').length).toBe(4); // four bottom tabs
    expect(screen.getByRole('button', { name: /open menu/i })).toBeTruthy();
    expect(screen.getByText('recipes content')).toBeTruthy();
  });
});
