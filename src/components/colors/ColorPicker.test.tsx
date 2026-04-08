import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ColorPicker, BasicColorPicker } from './ColorPicker';

describe('BasicColorPicker', () => {
  it('renders without errors', () => {
    const { container } = render(<BasicColorPicker color="#1139c9" />);
    expect(container).toBeDefined();
  });

  it('shows the current color value in the input', () => {
    render(<BasicColorPicker color="#FF5733" />);
    const input = screen.getByRole('textbox');
    expect((input as HTMLInputElement).value).toBe('#FF5733');
  });

  it('calls onChange when input changes', () => {
    const handleChange = vi.fn();
    render(<BasicColorPicker color="#000000" onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '#FFFFFF' } });
    expect(handleChange).toHaveBeenCalledWith('#FFFFFF');
  });
});

describe('ColorPicker', () => {
  it('renders without errors', () => {
    const { container } = render(<ColorPicker initialColor="#1139c9" />);
    expect(container).toBeDefined();
  });

  it('shows the picker by default when not collapsable', () => {
    render(<ColorPicker initialColor="#1139c9" collapsable={false} />);
    expect(screen.getByRole('textbox')).toBeTruthy();
  });

  it('hides the picker by default when collapsable', () => {
    render(<ColorPicker initialColor="#1139c9" collapsable />);
    expect(screen.queryByRole('textbox')).toBeNull();
  });

  it('toggles picker visibility when swatch is clicked (collapsable)', () => {
    const { container } = render(<ColorPicker initialColor="#1139c9" collapsable />);
    const swatch = container.querySelector('[style*="cursor: pointer"]');
    if (swatch) {
      fireEvent.click(swatch);
      expect(screen.getByRole('textbox')).toBeTruthy();
      fireEvent.click(swatch);
      expect(screen.queryByRole('textbox')).toBeNull();
    }
  });

  it('calls onChange when color changes', () => {
    const handleChange = vi.fn();
    render(<ColorPicker initialColor="#000000" onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '#FF0000' } });
    expect(handleChange).toHaveBeenCalledWith('#FF0000');
  });
});
