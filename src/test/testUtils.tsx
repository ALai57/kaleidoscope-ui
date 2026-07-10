import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { makeTheme, BASE_THEME } from '../theme';

const theme = makeTheme(BASE_THEME);

/** Wraps components in the providers most of them need to render in tests:
 *  the real design-system theme and a router (for `Link`/`useNavigate`). */
const AllProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <MemoryRouter>{children}</MemoryRouter>
  </ThemeProvider>
);

/** Drop-in replacement for RTL's `render` that includes the app providers. */
export function render(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
): ReturnType<typeof rtlRender> {
  return rtlRender(ui, { wrapper: AllProviders, ...options });
}
