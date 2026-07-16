import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render as rtlRender, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { makeTheme, BASE_THEME } from '@/theme';
import LibraryPage from './LibraryPage';

const mockAuth = { isAuthenticated: false, isLoading: false, token: undefined,
  userProfile: null as unknown, login: vi.fn(), logout: vi.fn() };
vi.mock('@/auth/useAuth', () => ({ useAuth: () => mockAuth }));

// Stub the heavy shelf so the test targets gating, not data.
vi.mock('@/components/library/ShelfView', () => ({
  ShelfView: () => <div data-testid="shelf">shelf</div>,
}));
vi.mock('@/components/library/hooks', () => ({
  useInterests: () => ({ data: [] }),
  useInterest: () => ({ data: undefined }),
}));

const theme = makeTheme(BASE_THEME);
function renderAt(path: string) {
  return rtlRender(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/library" element={<LibraryPage view="shelf" />} />
          <Route path="/library/:interestId" element={<LibraryPage view="shelf" />} />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>
  );
}

beforeEach(() => { mockAuth.userProfile = null; });

describe('LibraryPage gating', () => {
  it('shows the shelf to anonymous visitors when an interest is selected (public read-only)', () => {
    renderAt('/library/reading');
    expect(screen.getByTestId('shelf')).toBeTruthy();
  });

  it('shows a browse prompt (not the shelf) at bare /library', () => {
    renderAt('/library');
    expect(screen.queryByTestId('shelf')).toBeNull();
    expect(screen.getByText(/select a shelf to browse/i)).toBeTruthy();
  });

  it('hides the Acquisitions and Taste tabs from non-writers', () => {
    renderAt('/library/reading');
    expect(screen.queryByText('Acquisitions')).toBeNull();
    expect(screen.queryByText('Taste profile')).toBeNull();
  });
});
