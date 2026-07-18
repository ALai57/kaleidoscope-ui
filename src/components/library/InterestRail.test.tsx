import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InterestRail } from './InterestRail';
import { renderWithProviders } from './testHelpers';
import type { Interest } from '../../types/interest';
import { useIsMobile } from '@/hooks/useIsMobile';

vi.mock('@/hooks/useIsMobile', () => ({ useIsMobile: vi.fn(() => false) }));
const mockUseIsMobile = vi.mocked(useIsMobile);
beforeEach(() => mockUseIsMobile.mockReturnValue(false));

const interests: Interest[] = [
  { id: 'i1', user_id: 'u', intent: 'Modern jazz history', taste_profile: {}, created_at: 'x', updated_at: 'x' },
  { id: 'i2', user_id: 'u', intent: 'Investigative tech journalism', taste_profile: {}, created_at: 'x', updated_at: 'x' },
];

describe('InterestRail', () => {
  it('renders a link per interest pointing at its shelf', () => {
    renderWithProviders(<InterestRail interests={interests} activeId="i1" onAdd={vi.fn()} />);
    expect(screen.getByRole('link', { name: /Modern jazz history/ })).toHaveAttribute('href', '/library/i1');
    expect(screen.getByRole('link', { name: /Investigative tech journalism/ })).toHaveAttribute('href', '/library/i2');
  });

  it('fires onAdd when the add button is clicked', async () => {
    const onAdd = vi.fn();
    renderWithProviders(<InterestRail interests={interests} activeId="i1" onAdd={onAdd} />);
    await userEvent.click(screen.getByRole('button', { name: /add interest/i }));
    expect(onAdd).toHaveBeenCalled();
  });

  it('hides the add button when onAdd is omitted (read-only, non-writer)', () => {
    renderWithProviders(<InterestRail interests={interests} activeId="i1" />);
    expect(screen.queryByRole('button', { name: /add interest/i })).toBeNull();
  });

  it('reserves a fixed 220px rail on desktop', () => {
    mockUseIsMobile.mockReturnValue(false);
    renderWithProviders(<InterestRail interests={interests} activeId="i1" />);
    expect(screen.getByRole('navigation').style.minWidth).toBe('220px');
  });

  it('drops the fixed width and fills the column on mobile', () => {
    mockUseIsMobile.mockReturnValue(true);
    renderWithProviders(<InterestRail interests={interests} activeId="i1" />);
    const nav = screen.getByRole('navigation');
    expect(nav.style.minWidth).toBe('0px');
    expect(nav.style.width).toBe('100%');
  });
});
