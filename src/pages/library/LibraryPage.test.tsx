import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render as rtlRender, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { makeTheme, BASE_THEME } from '@/theme';
import LibraryPage from './LibraryPage';

const mockAuth = { isAuthenticated: false, isLoading: false, token: undefined,
  userProfile: null as unknown, login: vi.fn(), logout: vi.fn() };
vi.mock('@/auth/useAuth', () => ({ useAuth: () => mockAuth }));

// Stub the heavy shelf so the test targets gating, not data. It also exposes the
// ambient color mode so we can assert the page follows the app theme (rather than
// being pinned dark by a PrismThemeProvider).
vi.mock('@/components/library/ShelfView', () => ({
  ShelfView: () => {
    const { palette } = useTheme();
    return <div data-testid="shelf" data-mode={palette.mode}>shelf</div>;
  },
}));
vi.mock('@/components/library/AcquisitionsPipeline', () => ({
  AcquisitionsPipeline: () => <div data-testid="acquisitions">acquisitions</div>,
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
          <Route path="/library/:interestId/acquisitions" element={<LibraryPage view="acquisitions" />} />
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

  it('forces a non-writer onto the shelf on the /acquisitions route (no writer panel)', () => {
    renderAt('/library/reading/acquisitions');
    expect(screen.getByTestId('shelf')).toBeTruthy();
    expect(screen.queryByTestId('acquisitions')).toBeNull();
  });

  it('renders under the ambient app theme (obeys light/dark), not a pinned dark theme', () => {
    // The wrapper theme is the light default; the shelf must see 'light'. Before
    // the PrismThemeProvider was removed this read 'dark' (forced).
    renderAt('/library/reading');
    expect(screen.getByTestId('shelf').getAttribute('data-mode')).toBe('light');
  });
});
