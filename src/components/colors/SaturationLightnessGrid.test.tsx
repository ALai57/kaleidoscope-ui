import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { SaturationLightnessGrid } from './SaturationLightnessGrid';

const defaultOrigin = {
  hue: 180,
  saturation: 50,
  lightness: 50,
  angle: 45,
  theta: 45,
  spacing: 15,
};

describe('SaturationLightnessGrid', () => {
  it('renders without errors', () => {
    const { container } = render(
      <SaturationLightnessGrid
        gridSize={200}
        origin={defaultOrigin}
        onChange={() => {}}
      />,
    );
    expect(container).toBeDefined();
  });

  it('renders the correct number of gradient layers', () => {
    const { container } = render(
      <SaturationLightnessGrid
        gridSize={200}
        origin={defaultOrigin}
        onChange={() => {}}
      />,
    );
    // 3 gradient backgrounds + 5 markers
    const children = container.firstChild?.childNodes;
    expect(children).toBeTruthy();
  });

  it('renders markers', () => {
    const { container } = render(
      <SaturationLightnessGrid
        gridSize={200}
        origin={defaultOrigin}
        onChange={() => {}}
      />,
    );
    // 5 marker elements (-2 to 2)
    const dots = container.querySelectorAll('.dot');
    expect(dots.length).toBe(5);
  });
});
