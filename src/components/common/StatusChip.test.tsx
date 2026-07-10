import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatusChip, statusToTone, isLiveTone } from './StatusChip';

describe('statusToTone', () => {
  it('maps domain statuses to canonical tones', () => {
    expect(statusToTone('completed')).toBe('success');
    expect(statusToTone('failed')).toBe('error');
    expect(statusToTone('in_progress')).toBe('info');
    expect(statusToTone('awaiting_input')).toBe('warning');
    expect(statusToTone('pending')).toBe('pending');
  });

  it('is case- and whitespace-insensitive', () => {
    expect(statusToTone('  Completed ')).toBe('success');
  });

  it('falls back to neutral for unknown statuses', () => {
    expect(statusToTone('banana')).toBe('neutral');
  });
});

describe('StatusChip', () => {
  it('renders the default label for a tone', () => {
    render(<StatusChip status="in_progress" />);
    expect(screen.getByText('In progress')).toBeInTheDocument();
  });

  it('lets an explicit label override the default', () => {
    render(<StatusChip status="success" label="Approved" />);
    expect(screen.getByText('Approved')).toBeInTheDocument();
  });

  it('falls back to the raw status text when neutral and no label', () => {
    render(<StatusChip status="banana" />);
    expect(screen.getByText('banana')).toBeInTheDocument();
  });

  it('still renders the label text when a dot is shown', () => {
    render(<StatusChip status="running" dot />);
    expect(screen.getByText('In progress')).toBeInTheDocument();
  });
});

describe('isLiveTone', () => {
  it('treats in-flight (info) work as live', () => {
    expect(isLiveTone('info')).toBe(true);
  });

  it('treats settled tones as not live', () => {
    expect(isLiveTone('success')).toBe(false);
    expect(isLiveTone('error')).toBe(false);
    expect(isLiveTone('pending')).toBe(false);
    expect(isLiveTone('neutral')).toBe(false);
  });
});
