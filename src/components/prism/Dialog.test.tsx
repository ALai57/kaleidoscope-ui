import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { render } from '../../test/testUtils';
import { Dialog } from './Dialog';
import { Button } from './Button';

describe('Dialog', () => {
  it('shows when open, labels itself by title, closes on Escape', () => {
    const onClose = vi.fn();
    render(
      <Dialog open onClose={onClose} title="Rename URL" actions={<Button>Save</Button>}>
        <p>body</p>
      </Dialog>
    );
    expect(screen.getByRole('dialog', { name: 'Rename URL' })).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('renders nothing when closed', () => {
    render(
      <Dialog open={false} onClose={() => {}} title="X" actions={null}>
        y
      </Dialog>
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
