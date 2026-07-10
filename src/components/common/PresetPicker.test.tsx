import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { PresetPicker } from './PresetPicker';
import { makeTheme, BASE_THEME } from '../../theme';
import { useThemeStore } from '../../store/themeStore';

// Render under the real design-system theme so the picker reads `theme.tokens`
// (radius/motion) and MUI's color-scheme system resolves for useSelectPreset.
const theme = makeTheme(BASE_THEME, 'default');

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('PresetPicker', () => {
  beforeEach(() => {
    // Reset the global store so tests don't leak preset state into each other.
    useThemeStore.setState({ preset: 'default', themeParams: BASE_THEME });
  });

  it('renders a radio for each preset', () => {
    render(<PresetPicker />, { wrapper: Wrapper });
    expect(screen.getByRole('radio', { name: /classic/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /prism/i })).toBeInTheDocument();
  });

  it('marks the active preset as checked', () => {
    render(<PresetPicker />, { wrapper: Wrapper });
    expect(screen.getByRole('radio', { name: /classic/i })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('radio', { name: /prism/i })).toHaveAttribute('aria-checked', 'false');
  });

  it('selects a preset on click and updates the store', () => {
    render(<PresetPicker />, { wrapper: Wrapper });
    fireEvent.click(screen.getByRole('radio', { name: /prism/i }));
    expect(useThemeStore.getState().preset).toBe('prism');
    expect(screen.getByRole('radio', { name: /prism/i })).toHaveAttribute('aria-checked', 'true');
  });
});
