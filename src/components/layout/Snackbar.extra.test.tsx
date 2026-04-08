import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Snackbar } from './Snackbar';

describe('Snackbar — additional branch coverage', () => {
  it('renders the message', () => {
    render(<Snackbar message="Hello world" open={true} />);
    expect(screen.getByText('Hello world')).toBeTruthy();
  });

  it('renders with error level', () => {
    render(<Snackbar message="Something failed" level="error" open={true} />);
    expect(screen.getByText('Something failed')).toBeTruthy();
  });

  it('renders with success level', () => {
    render(<Snackbar message="Done!" level="success" open={true} />);
    expect(screen.getByText('Done!')).toBeTruthy();
  });

  it('renders with warning level', () => {
    render(<Snackbar message="Watch out" level="warning" open={true} />);
    expect(screen.getByText('Watch out')).toBeTruthy();
  });

  it('calls onClose when alert close button is clicked', () => {
    const handleClose = vi.fn();
    render(<Snackbar message="Test" open={true} onClose={handleClose} />);
    const closeButton = screen.getByTitle('Close');
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not render when open is false', () => {
    render(<Snackbar message="Hidden" open={false} />);
    // The snackbar should not be visible (open=false on initial state)
    const alerts = screen.queryAllByRole('alert');
    expect(alerts.length).toBe(0);
  });
});
