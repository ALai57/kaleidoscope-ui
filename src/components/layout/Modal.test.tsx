import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BasicModal, ModalTemplate } from './Modal';

describe('ModalTemplate', () => {
  it('renders without errors', () => {
    const { container } = render(<ModalTemplate title="Test Title" />);
    expect(container).toBeDefined();
  });

  it('renders the title', () => {
    render(<ModalTemplate title="My Modal" />);
    expect(screen.getByText('My Modal')).toBeTruthy();
  });

  it('renders the body when provided', () => {
    render(<ModalTemplate title="Test" body={<div>Modal body</div>} />);
    expect(screen.getByText('Modal body')).toBeTruthy();
  });

  it('renders the footer when provided', () => {
    render(<ModalTemplate title="Test" footer={<div>Footer content</div>} />);
    expect(screen.getByText('Footer content')).toBeTruthy();
  });
});

describe('BasicModal', () => {
  it('renders when open is true', () => {
    render(
      <BasicModal open title="Open Modal" body={<div>Modal content</div>} />,
    );
    expect(screen.getByText('Open Modal')).toBeTruthy();
    expect(screen.getByText('Modal content')).toBeTruthy();
  });

  it('does not render when open is false', () => {
    render(
      <BasicModal open={false} title="Hidden Modal" body={<div>Hidden content</div>} />,
    );
    expect(screen.queryByText('Hidden Modal')).toBeNull();
  });

  it('calls onClose when backdrop is clicked', () => {
    const handleClose = vi.fn();
    render(
      <BasicModal open title="Test" body={<div>Content</div>} onClose={handleClose} />,
    );
    // Click the backdrop
    const backdrop = document.querySelector('.MuiBackdrop-root');
    if (backdrop) {
      fireEvent.click(backdrop);
      expect(handleClose).toHaveBeenCalled();
    }
  });
});
