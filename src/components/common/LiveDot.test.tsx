import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { makeTheme, BASE_THEME } from '../../theme';
import { LiveDot } from './LiveDot';

describe('LiveDot', () => {
  it('renders the dot', () => {
    render(<LiveDot />);
    expect(screen.getByTestId('live-dot')).toBeTruthy();
  });

  it('renders an optional mono label', () => {
    render(<LiveDot label="Analyzing" />);
    expect(screen.getByText('Analyzing')).toBeTruthy();
    expect(screen.getByTestId('live-dot')).toBeTruthy();
  });

  it('renders under a token theme without error', () => {
    render(
      <ThemeProvider theme={makeTheme(BASE_THEME)}>
        <LiveDot label="Running" color="success.main" />
      </ThemeProvider>,
    );
    expect(screen.getByText('Running')).toBeTruthy();
  });
});
