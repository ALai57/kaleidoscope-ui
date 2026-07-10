import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { AdminLayout } from './AdminLayout';
import { makeTheme, BASE_THEME } from '../../theme';

const theme = makeTheme(BASE_THEME, 'prism');
const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MemoryRouter initialEntries={['/projects']}>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </MemoryRouter>
);

describe('AdminLayout', () => {
  it('renders the top-bar title, the rail nav, and the content', () => {
    render(
      <AdminLayout title="Projects" actions={<button>New Project</button>}>
        <div>page content</div>
      </AdminLayout>,
      { wrapper: Wrapper }
    );
    expect(screen.getByRole('heading', { name: 'Projects' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Workflows' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'New Project' })).toBeInTheDocument();
    expect(screen.getByText('page content')).toBeInTheDocument();
  });
});
