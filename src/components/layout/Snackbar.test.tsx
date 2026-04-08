import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Snackbar } from './Snackbar';

describe('Snackbar', () => {
  it('renders without errors', () => {
    const { container } = render(<Snackbar message="Hello" />);
    expect(container).toBeDefined();
  });

  it('renders with the given message when open', () => {
    render(<Snackbar message="Operation successful" open />);
    expect(screen.getByText('Operation successful')).toBeTruthy();
  });

  it('does not show message when open is false', () => {
    render(<Snackbar message="Hidden message" open={false} />);
    expect(screen.queryByText('Hidden message')).toBeNull();
  });

  it('renders with different levels', () => {
    const { rerender } = render(<Snackbar message="Info message" level="info" open />);
    expect(screen.getByRole('alert')).toBeTruthy();

    rerender(<Snackbar message="Error message" level="error" open />);
    expect(screen.getByRole('alert')).toBeTruthy();
  });
});
