import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorScreen } from './ErrorScreen';

describe('ErrorScreen', () => {
  it('shows a message and calls clearError when the retry button is clicked', async () => {
    const clearError = vi.fn();
    render(
      <ErrorScreen
        error={new Error('boom')}
        info={{ componentStack: '' }}
        clearError={clearError}
      />
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /try again/i }));
    expect(clearError).toHaveBeenCalledTimes(1);
  });
});
