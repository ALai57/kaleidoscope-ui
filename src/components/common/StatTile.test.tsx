import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { StatTile } from './StatTile';
import { makeTheme, BASE_THEME } from '../../theme';

// Render under the Prism theme so the tile reads the mono voice from tokens.
const theme = makeTheme(BASE_THEME, 'prism');

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('StatTile', () => {
  it('renders the label, value, and unit', () => {
    render(<StatTile label="Avg latency" value="342" unit="ms" />, { wrapper: Wrapper });
    expect(screen.getByText('Avg latency')).toBeInTheDocument();
    expect(screen.getByText('342')).toBeInTheDocument();
    expect(screen.getByText('ms')).toBeInTheDocument();
  });

  it('shows the trend delta when both trend and delta are given', () => {
    render(<StatTile label="Runs" value="128" trend="up" delta="+12 today" />, { wrapper: Wrapper });
    expect(screen.getByText('+12 today')).toBeInTheDocument();
  });

  it('omits the delta line when trend is missing', () => {
    render(<StatTile label="Runs" value="128" delta="+12 today" />, { wrapper: Wrapper });
    expect(screen.queryByText('+12 today')).toBeNull();
  });

  it('renders a status chip when status is provided', () => {
    render(<StatTile label="Runs" value="128" status="running" />, { wrapper: Wrapper });
    expect(screen.getByText('In progress')).toBeInTheDocument();
  });
});
