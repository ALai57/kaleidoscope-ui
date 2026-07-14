import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DropTile } from './DropTile';

describe('DropTile', () => {
  it('renders the add-photo affordance', () => {
    render(<DropTile onAdd={() => {}} />);
    expect(screen.getByText('Add photo')).toBeTruthy();
  });

  it('fires onAdd when files are chosen', () => {
    const onAdd = vi.fn();
    const { container } = render(<DropTile onAdd={onAdd} />);
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, {
      target: { files: [new File(['x'], 'a.png', { type: 'image/png' })] },
    });
    expect(onAdd).toHaveBeenCalledTimes(1);
  });

  it('shows the uploading state and disables the input', () => {
    const { container } = render(<DropTile onAdd={() => {}} isUploading />);
    expect(screen.getByText('Uploading…')).toBeTruthy();
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it('is keyboard operable — Enter triggers the file input', () => {
    const { getByTestId, container } = render(<DropTile onAdd={() => {}} />);
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    const clickSpy = vi.spyOn(input, 'click').mockImplementation(() => {});
    const tile = getByTestId('drop-tile');
    expect(tile.getAttribute('tabindex')).toBe('0');
    fireEvent.keyDown(tile, { key: 'Enter' });
    expect(clickSpy).toHaveBeenCalled();
  });

  it('is not keyboard-activatable while uploading', () => {
    const { getByTestId, container } = render(<DropTile onAdd={() => {}} isUploading />);
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    const clickSpy = vi.spyOn(input, 'click').mockImplementation(() => {});
    const tile = getByTestId('drop-tile');
    expect(tile.getAttribute('tabindex')).toBe('-1');
    fireEvent.keyDown(tile, { key: 'Enter' });
    expect(clickSpy).not.toHaveBeenCalled();
  });
});
