import { it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { render } from '../../test/testUtils';
import { WakeLockOverlay, WakeLockOverlayView } from './WakeLockOverlay';
import * as hook from '../../hooks/useWakeLock';

it('renders nothing when the wake lock API is unsupported', () => {
  vi.spyOn(hook, 'useWakeLock').mockReturnValue({
    isSupported: false,
    isActive: false,
    toggle: vi.fn(),
  });
  const { container } = render(<WakeLockOverlay />);
  expect(container).toBeEmptyDOMElement();
});

it('shows the off affordance and toggles on click', () => {
  const toggle = vi.fn();
  vi.spyOn(hook, 'useWakeLock').mockReturnValue({
    isSupported: true,
    isActive: false,
    toggle,
  });
  render(<WakeLockOverlay />);
  const button = screen.getByRole('button', { name: /keep screen on/i });
  expect(button).toHaveAttribute('aria-pressed', 'false');
  fireEvent.click(button);
  expect(toggle).toHaveBeenCalledOnce();
});

it('exposes the active label and pressed state when the lock is held', () => {
  vi.spyOn(hook, 'useWakeLock').mockReturnValue({
    isSupported: true,
    isActive: true,
    toggle: vi.fn(),
  });
  render(<WakeLockOverlay />);
  const button = screen.getByRole('button', { name: /screen stays on/i });
  expect(button).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByTestId('stirrer-icon')).toHaveAttribute('data-active', 'true');
});

it('view invokes onToggle when clicked', () => {
  const onToggle = vi.fn();
  render(<WakeLockOverlayView active={false} onToggle={onToggle} />);
  fireEvent.click(screen.getByRole('button', { name: /keep screen on/i }));
  expect(onToggle).toHaveBeenCalledOnce();
});
