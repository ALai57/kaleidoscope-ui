import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '@/test/testUtils';
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

beforeEach(() => { mockAuth.userProfile = null; });

describe('LibraryPage gating', () => {
  it('shows the shelf to anonymous visitors (public read-only)', () => {
    render(<LibraryPage view="shelf" />);
    expect(screen.getByTestId('shelf')).toBeTruthy();
  });

  it('hides the Acquisitions and Taste tabs from non-writers', () => {
    render(<LibraryPage view="shelf" />);
    expect(screen.queryByText('Acquisitions')).toBeNull();
    expect(screen.queryByText('Taste profile')).toBeNull();
  });
});
