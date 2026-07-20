import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { AdminLayout } from './AdminLayout';
import { makeTheme, BASE_THEME } from '../../theme';
import { render as testRender } from '../../test/testUtils';

const theme = makeTheme(BASE_THEME, 'prism');
const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MemoryRouter initialEntries={['/projects']}>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </MemoryRouter>
);

// Reads the *ambient* theme mode at its position in the tree.
const ModeProbe = () => {
  const theme = useTheme();
  return <span data-testid="admin-mode">{theme.palette.mode}</span>;
};

describe('AdminLayout', () => {
  it('renders title + actions and no nav rail/drawer', () => {
    render(
      <AdminLayout title="Manager" actions={<button>Act</button>}>
        <div>page content</div>
      </AdminLayout>,
      { wrapper: Wrapper }
    );
    expect(screen.getByRole('heading', { name: 'Manager' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Act' })).toBeInTheDocument();
    expect(screen.getByText('page content')).toBeInTheDocument();
    // the rail lives in AppShell now — AdminLayout must not render one
    expect(screen.queryByRole('navigation', { name: /admin sections/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /open menu/i })).not.toBeInTheDocument();
  });

  it('renders its subtree under the Prism (dark) theme, overriding the ambient light app theme', () => {
    // testUtils.render provides the light app theme + a Router.
    testRender(
      <AdminLayout title="Workflows">
        <ModeProbe />
      </AdminLayout>,
    );
    expect(screen.getByTestId('admin-mode')).toHaveTextContent('dark');
  });

  it('renders under the live app theme when disablePrismTheme is set (theme workbench)', () => {
    // With the opt-out, the subtree inherits the ambient (light) app theme
    // instead of the fixed Prism dark one — so the UI Manager previews edits.
    testRender(
      <AdminLayout title="UI Manager" disablePrismTheme>
        <ModeProbe />
      </AdminLayout>,
    );
    expect(screen.getByTestId('admin-mode')).toHaveTextContent('light');
  });
});
