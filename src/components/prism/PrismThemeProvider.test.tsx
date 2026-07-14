import * as React from 'react';
import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useTheme } from '@mui/material/styles';
import { PrismThemeProvider } from './PrismThemeProvider';

const Probe: React.FC = () => <span>{useTheme().tokens.color.surface.base}</span>;

it('provides the Prism dark surface tokens to its subtree', () => {
  render(
    <PrismThemeProvider>
      <Probe />
    </PrismThemeProvider>
  );
  expect(screen.getByText('#0A0E15')).toBeInTheDocument();
});
