import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders without errors', () => {
    const { container } = render(<Button text="Click me" />);
    expect(container).toBeDefined();
  });

  it('renders the button text', () => {
    render(<Button text="Submit" />);
    expect(screen.getByText('Submit')).toBeTruthy();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button text="Click me" onClick={handleClick} />);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('renders as disabled when disabled prop is true', () => {
    render(<Button text="Disabled" disabled />);
    expect(screen.getByRole('button')).toHaveAttribute('disabled');
  });
});
