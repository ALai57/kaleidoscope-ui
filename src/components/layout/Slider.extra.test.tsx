import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Slider } from './Slider';

describe('Slider — additional branch coverage', () => {
  it('calls onChange when the numeric input changes', () => {
    const handleChange = vi.fn();
    render(<Slider onChange={handleChange} initialValue={10} />);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '75' } });
    expect(handleChange).toHaveBeenCalledWith(75);
  });

  it('does not render title when title prop is omitted', () => {
    const { container } = render(<Slider />);
    // No Typography text other than the numeric input value
    expect(container.querySelector('p')).toBeNull();
  });

  it('renders without title when title is empty string', () => {
    const { container } = render(<Slider title="" />);
    expect(container.querySelector('p')).toBeNull();
  });

  it('respects min and max props', () => {
    render(<Slider min={10} max={50} initialValue={25} />);
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveAttribute('min', '10');
    expect(input).toHaveAttribute('max', '50');
  });

  it('calls onChange when MUI slider value changes', () => {
    const handleChange = vi.fn();
    render(<Slider onChange={handleChange} initialValue={20} />);
    // Fire a change event on the slider input (role=slider)
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '60' } });
    // onChange should have been called
    expect(handleChange).toHaveBeenCalled();
  });
});
