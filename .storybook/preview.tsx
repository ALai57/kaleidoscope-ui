import React from 'react';
import type { Preview } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { makeTheme, BASE_THEME } from '../src/theme';

// Render every story inside the real design-system theme (tokens, adaptive
// contrastText, typography) so Storybook is a faithful catalog rather than a
// default-MUI approximation.
const theme = makeTheme(BASE_THEME);

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
