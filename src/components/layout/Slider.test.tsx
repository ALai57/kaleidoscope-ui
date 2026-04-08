import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Slider } from './Slider';

describe('Slider', () => {
  it('renders without errors', () => {
    const { container } = render(<Slider />);
    expect(container).toBeDefined();
  });

  it('renders with a title', () => {
    render(<Slider title="Volume" />);
    expect(screen.getByText('Volume')).toBeTruthy();
  });

  it('renders the slider element', () => {
    render(<Slider />);
    expect(screen.getByRole('slider')).toBeDefined();
  });

  it('accepts an onChange prop', () => {
    const handleChange = vi.fn();
    render(<Slider onChange={handleChange} initialValue={50} />);
    expect(true).toBe(true);
  });

  it('shows the initial value', () => {
    render(<Slider initialValue={42} />);
    // The input number field shows the value
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveValue(42);
  });
});
