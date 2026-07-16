import { it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { render } from '../../test/testUtils';
import { WakeLockButton } from './WakeLockButton';
import * as hook from '../../hooks/useWakeLock';

it('renders nothing when the wake lock API is unsupported', () => {
  vi.spyOn(hook, 'useWakeLock').mockReturnValue({
    isSupported: false,
    isActive: false,
    toggle: vi.fn(),
  });
  const { container } = render(<WakeLockButton />);
  expect(container).toBeEmptyDOMElement();
});

it('shows the off label and toggles on click', () => {
  const toggle = vi.fn();
  vi.spyOn(hook, 'useWakeLock').mockReturnValue({
    isSupported: true,
    isActive: false,
    toggle,
  });
  render(<WakeLockButton />);
  const button = screen.getByRole('button', { name: /keep screen on/i });
  fireEvent.click(button);
  expect(toggle).toHaveBeenCalledOnce();
});

it('shows the active label when the lock is held', () => {
  vi.spyOn(hook, 'useWakeLock').mockReturnValue({
    isSupported: true,
    isActive: true,
    toggle: vi.fn(),
  });
  render(<WakeLockButton />);
  expect(screen.getByRole('button', { name: /screen stays on/i })).toBeInTheDocument();
});
