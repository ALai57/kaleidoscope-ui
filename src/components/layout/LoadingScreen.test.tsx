import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingScreen } from './LoadingScreen';

describe('LoadingScreen', () => {
  it('renders without errors', () => {
    const { container } = render(<LoadingScreen />);
    expect(container).toBeDefined();
  });

  it('renders a progress indicator', () => {
    render(<LoadingScreen />);
    expect(screen.getByRole('progressbar')).toBeDefined();
  });
});
