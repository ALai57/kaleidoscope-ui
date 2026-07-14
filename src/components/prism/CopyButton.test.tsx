import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { act, fireEvent, waitFor } from '@testing-library/react';
import { render } from '../../test/testUtils';
import { CopyButton } from './CopyButton';

describe('CopyButton', () => {
  beforeEach(() => {
    Object.assign(navigator, { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } });
  });

  it('copies the text and shows a copied state', async () => {
    const { getByRole } = render(<CopyButton text="hello world" />);
    const btn = getByRole('button', { name: /copy/i });
    fireEvent.click(btn);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hello world');
    await waitFor(() => expect(getByRole('button')).toHaveTextContent(/copied/i));
  });

  it('copies AND calls a consumer-supplied onClick', async () => {
    const spy = vi.fn();
    const { getByRole } = render(<CopyButton text="x" onClick={spy} />);
    fireEvent.click(getByRole('button'));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('x');
    await waitFor(() => expect(spy).toHaveBeenCalledTimes(1));
  });

  describe('with fake timers', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });
    afterEach(() => {
      vi.useRealTimers();
    });

    it('reverts from Copied back to Copy after 1400ms', async () => {
      const { getByRole } = render(<CopyButton text="hello" />);
      const btn = getByRole('button');
      fireEvent.click(btn);
      // Flush the awaited clipboard microtasks so setDone(true) + timer are scheduled.
      await act(async () => {
        await Promise.resolve();
      });
      expect(btn).toHaveTextContent(/copied/i);
      act(() => {
        vi.advanceTimersByTime(1400);
      });
      expect(btn).toHaveTextContent(/^copy$/i);
    });
  });
});
