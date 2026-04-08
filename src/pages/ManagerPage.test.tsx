import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ManagerPage from './ManagerPage';

vi.mock('../auth/useKeycloak', () => ({
  useKeycloak: () => ({
    isAuthenticated: true,
    token: 'test-token',
    userProfile: { firstName: 'Admin' },
    login: vi.fn(),
    logout: vi.fn(),
  }),
}));

const theme = createTheme();

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MemoryRouter>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </MemoryRouter>
);

describe('ManagerPage', () => {
  it('renders all navigation links', () => {
    render(<ManagerPage />, { wrapper: Wrapper });
    expect(screen.getByText('Articles')).toBeTruthy();
    expect(screen.getByText('Images')).toBeTruthy();
    expect(screen.getByText('Audiences')).toBeTruthy();
    expect(screen.getByText('UI Customization')).toBeTruthy();
  });

  it('renders article link pointing to /articles', () => {
    render(<ManagerPage />, { wrapper: Wrapper });
    const links = screen.getAllByRole('link');
    const articleLink = links.find((el) => el.getAttribute('href') === '/articles');
    expect(articleLink).toBeTruthy();
  });

  it('renders images link pointing to /images', () => {
    render(<ManagerPage />, { wrapper: Wrapper });
    const links = screen.getAllByRole('link');
    const imagesLink = links.find((el) => el.getAttribute('href') === '/images');
    expect(imagesLink).toBeTruthy();
  });

  it('renders groups link pointing to /groups', () => {
    render(<ManagerPage />, { wrapper: Wrapper });
    const links = screen.getAllByRole('link');
    const groupsLink = links.find((el) => el.getAttribute('href') === '/groups');
    expect(groupsLink).toBeTruthy();
  });
});
