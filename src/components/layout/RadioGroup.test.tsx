import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RadioGroup } from './RadioGroup';

const elements = [
  { value: 'option-a', label: 'Option A' },
  { value: 'option-b', label: 'Option B' },
  { value: 'option-c', label: 'Option C' },
];

describe('RadioGroup', () => {
  it('renders without errors', () => {
    const { container } = render(<RadioGroup elements={elements} />);
    expect(container).toBeDefined();
  });

  it('renders all options', () => {
    render(<RadioGroup elements={elements} />);
    expect(screen.getByLabelText('Option A')).toBeTruthy();
    expect(screen.getByLabelText('Option B')).toBeTruthy();
    expect(screen.getByLabelText('Option C')).toBeTruthy();
  });

  it('renders the group name as label', () => {
    render(<RadioGroup groupName="Notification Type" elements={elements} />);
    expect(screen.getByText('Notification Type')).toBeTruthy();
  });

  it('calls onChange when a radio is selected', () => {
    const handleChange = vi.fn();
    render(<RadioGroup elements={elements} onChange={handleChange} />);

    fireEvent.click(screen.getByLabelText('Option B'));
    expect(handleChange).toHaveBeenCalledWith('option-b');
  });

  it('reflects the selected value', () => {
    render(<RadioGroup elements={elements} value="option-a" />);
    const radioA = screen.getByLabelText('Option A') as HTMLInputElement;
    expect(radioA.checked).toBe(true);
  });
});
