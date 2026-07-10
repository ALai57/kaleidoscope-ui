import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { AdminNavRail } from './AdminNavRail';
import { makeTheme, BASE_THEME } from '../../theme';

const theme = makeTheme(BASE_THEME, 'prism');

function renderAt(path: string, props: React.ComponentProps<typeof AdminNavRail> = {}) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <ThemeProvider theme={theme}>
        <AdminNavRail {...props} />
      </ThemeProvider>
    </MemoryRouter>
  );
}

describe('AdminNavRail', () => {
  it('renders the section links', () => {
    renderAt('/projects');
    expect(screen.getByRole('link', { name: 'Projects' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Workflows' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Agents' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Workspace Roots' })).toBeInTheDocument();
  });

  it('marks the active section from the current route', () => {
    renderAt('/workflows');
    expect(screen.getByRole('link', { name: 'Workflows' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Projects' })).not.toHaveAttribute('aria-current');
  });

  it('treats a nested route as active for its section', () => {
    renderAt('/projects/123/develop');
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('aria-current', 'page');
  });

  it('shows a login button when unauthenticated', () => {
    const login = vi.fn();
    renderAt('/projects', { isAuthenticated: false, login });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(login).toHaveBeenCalledOnce();
  });

  it('shows the admin avatar link when authenticated', () => {
    renderAt('/projects', { isAuthenticated: true, user: { firstName: 'Alice' } });
    expect(screen.getByRole('link', { name: /admin/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /login/i })).toBeNull();
  });
});
