import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SideMenu } from './SideMenu';

const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

describe('SideMenu', () => {
  it('renders without errors', () => {
    const { container } = render(<SideMenu items={menuItems} />);
    expect(container).toBeDefined();
  });

  it('opens drawer when expand button is clicked', () => {
    const ExpandButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
      <button onClick={onClick} aria-label="open menu">
        Menu
      </button>
    );
    render(<SideMenu items={menuItems} expandButton={<ExpandButton />} />);

    expect(screen.queryByText('Home')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
    expect(screen.getByText('Home')).toBeTruthy();
  });

  it('calls onNavigate when a menu item is clicked', () => {
    const handleNavigate = vi.fn();
    const ExpandButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
      <button onClick={onClick} aria-label="open menu">
        Menu
      </button>
    );

    render(
      <SideMenu
        items={menuItems}
        expandButton={<ExpandButton />}
        onNavigate={handleNavigate}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
    fireEvent.click(screen.getByText('About'));
    expect(handleNavigate).toHaveBeenCalledWith(menuItems[1]);
  });

  it('renders with empty items', () => {
    const { container } = render(<SideMenu items={[]} />);
    expect(container).toBeDefined();
  });
});
