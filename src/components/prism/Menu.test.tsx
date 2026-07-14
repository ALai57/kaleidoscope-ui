import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { render } from '../../test/testUtils';
import { Menu, MenuItem } from './Menu';

describe('Menu', () => {
  it('renders items when open and fires onSelect', () => {
    const onSelect = vi.fn();
    render(
      <Menu open onClose={() => {}}>
        <MenuItem onSelect={onSelect}>Delete</MenuItem>
      </Menu>
    );
    fireEvent.click(screen.getByRole('menuitem', { name: 'Delete' }));
    expect(onSelect).toHaveBeenCalledOnce();
  });
  it('renders nothing when closed', () => {
    render(
      <Menu open={false} onClose={() => {}}>
        <MenuItem onSelect={() => {}}>Delete</MenuItem>
      </Menu>
    );
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
  it('calls onClose on Escape', () => {
    const onClose = vi.fn();
    render(
      <Menu open onClose={onClose}>
        <MenuItem onSelect={() => {}}>X</MenuItem>
      </Menu>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledOnce();
  });
});
