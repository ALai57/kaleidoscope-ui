import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { makeTheme, BASE_THEME } from '@/theme';
import { AdminMobileDrawer } from './AdminMobileDrawer';

const theme = makeTheme(BASE_THEME);
const renderDrawer = (props: Record<string, unknown> = {}, path = '/manager') =>
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={[path]}>
        <AdminMobileDrawer open onClose={vi.fn()} {...props} />
      </MemoryRouter>
    </ThemeProvider>
  );

describe('AdminMobileDrawer', () => {
  it('renders a labeled link for every admin section', () => {
    renderDrawer();
    const dialog = screen.getByRole('dialog', { name: /admin menu/i });
    for (const label of ['Manager', 'Articles', 'Images', 'Projects', 'Workflows', 'Agents', 'Groups', 'UI Manager']) {
      expect(within(dialog).getByRole('link', { name: label })).toBeTruthy();
    }
  });

  it('marks the active section with aria-current', () => {
    renderDrawer({}, '/projects');
    const dialog = screen.getByRole('dialog', { name: /admin menu/i });
    expect(within(dialog).getByRole('link', { name: 'Projects' }).getAttribute('aria-current')).toBe('page');
    expect(within(dialog).getByRole('link', { name: 'Manager' }).getAttribute('aria-current')).toBeNull();
  });

  it('closes on Escape', () => {
    const onClose = vi.fn();
    renderDrawer({ onClose });
    fireEvent.keyDown(screen.getByRole('dialog', { name: /admin menu/i }), { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('closes on the close button', () => {
    const onClose = vi.fn();
    renderDrawer({ onClose });
    fireEvent.click(screen.getByRole('button', { name: /close menu/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it('closes on scrim click', () => {
    const onClose = vi.fn();
    renderDrawer({ onClose });
    const scrim = screen.getByRole('dialog', { name: /admin menu/i }).parentElement as HTMLElement;
    fireEvent.click(scrim);
    expect(onClose).toHaveBeenCalled();
  });

  it('closes when a nav link is clicked', () => {
    const onClose = vi.fn();
    renderDrawer({ onClose });
    fireEvent.click(screen.getByRole('link', { name: 'Manager' }));
    expect(onClose).toHaveBeenCalled();
  });

  it('renders nothing when closed', () => {
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter><AdminMobileDrawer open={false} onClose={vi.fn()} /></MemoryRouter>
      </ThemeProvider>
    );
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
