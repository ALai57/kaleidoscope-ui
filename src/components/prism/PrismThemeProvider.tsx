import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { makePrismTheme } from '../../theme';

// Static — the Prism theme never changes, build it once.
const prismTheme = makePrismTheme();

/** Scopes the Prism (dark) look to its subtree via a local MUI ThemeProvider,
 *  leaving the app-global theme/preset untouched. */
export const PrismThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={prismTheme}>{children}</ThemeProvider>
);
