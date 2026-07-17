import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { makeTheme, BASE_THEME } from '@/theme';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useIsMobile } from './useIsMobile';

vi.mock('@mui/material/useMediaQuery', () => ({ default: vi.fn() }));
const mockUseMediaQuery = vi.mocked(useMediaQuery);

const theme = makeTheme(BASE_THEME);
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('useIsMobile', () => {
  it('is true when the viewport is below md', () => {
    mockUseMediaQuery.mockReturnValue(true);
    const { result } = renderHook(() => useIsMobile(), { wrapper });
    expect(result.current).toBe(true);
  });

  it('is false at or above md', () => {
    mockUseMediaQuery.mockReturnValue(false);
    const { result } = renderHook(() => useIsMobile(), { wrapper });
    expect(result.current).toBe(false);
  });

  it('queries the md breakpoint', () => {
    mockUseMediaQuery.mockReturnValue(false);
    renderHook(() => useIsMobile(), { wrapper });
    expect(mockUseMediaQuery).toHaveBeenCalledWith(theme.breakpoints.down('md'));
  });
});
