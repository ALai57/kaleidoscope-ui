import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { ColorFamily } from './ColorFamily';

describe('ColorFamily', () => {
  it('renders without errors', () => {
    const { container } = render(
      <ColorFamily
        familyName="primary"
        baseColor="#1139c9"
        backgroundColors={[]}
      />,
    );
    expect(container).toBeDefined();
  });

  it('renders the color swatch with base color', () => {
    const { container } = render(
      <ColorFamily
        familyName="primary"
        baseColor="#ff0000"
        backgroundColors={[]}
      />,
    );
    const swatch = container.querySelector('[style*="background-color"]');
    expect(swatch).toBeTruthy();
  });

  it('calls onChange when swatch is clicked', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <ColorFamily
        familyName="primary"
        baseColor="#1139c9"
        backgroundColors={[]}
        onChange={handleChange}
      />,
    );
    const swatch = container.querySelector('[style*="background-color"]');
    if (swatch) {
      (swatch as HTMLElement).click();
      expect(handleChange).toHaveBeenCalledWith('#1139c9');
    }
  });
});
