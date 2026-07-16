import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render as rtlRender, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { makeTheme, BASE_THEME } from '@/theme';
import { AppShell } from './AppShell';

vi.mock('@/auth/useAuth', () => ({
  useAuth: () => ({ isAuthenticated: false, isLoading: false, token: undefined, userProfile: null, login: vi.fn(), logout: vi.fn() }),
}));

const theme = makeTheme(BASE_THEME);

describe('AppShell', () => {
  it('renders the primary rail alongside routed content', () => {
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
    expect(screen.getByRole('navigation', { name: /primary/i })).toBeTruthy();
    expect(screen.getByText('recipes content')).toBeTruthy();
  });
});
