import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EditorToolbar } from './EditorToolbar';
import { createMockEditor } from '@/test/mockEditor';
import type { Editor } from '@tiptap/react';

describe('EditorToolbar', () => {
  it('renders null when editor is null', () => {
    const { container } = render(<EditorToolbar editor={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders toolbar with role="toolbar" when editor is provided', () => {
    const editor = createMockEditor();
    render(<EditorToolbar editor={editor} />);
    expect(screen.getByRole('toolbar')).toBeDefined();
  });

  it('renders bold button', () => {
    const editor = createMockEditor();
    render(<EditorToolbar editor={editor} />);
    expect(screen.getByTestId('toolbar-bold')).toBeDefined();
  });

  it('calls toggleBold when Bold button is clicked', () => {
    const runMock = vi.fn();
    const chain = new Proxy(
      { run: runMock },
      {
        get(target, prop) {
          if (prop === 'run') return target.run;
          return () => chain;
        },
      },
    );
    const chainFn = vi.fn().mockReturnValue(chain);
    const editor = {
      isActive: vi.fn().mockReturnValue(false),
      chain: chainFn,
      can: vi.fn().mockReturnValue({ chain: () => chain }),
      isEditable: true,
      isInitialized: true,
    } as unknown as Editor;

    render(<EditorToolbar editor={editor} />);

    const boldButton = screen.getByTestId('toolbar-bold');
    fireEvent.click(boldButton);

    expect(chainFn).toHaveBeenCalled();
    expect(runMock).toHaveBeenCalled();
  });

  it('shows insert image button when onInsertImage is provided', () => {
    const editor = createMockEditor();
    const onInsertImage = vi.fn();
    render(<EditorToolbar editor={editor} onInsertImage={onInsertImage} />);
    expect(screen.getByTestId('toolbar-image')).toBeDefined();
  });

  it('does not show insert image button when onInsertImage is not provided', () => {
    const editor = createMockEditor();
    render(<EditorToolbar editor={editor} />);
    expect(screen.queryByTestId('toolbar-image')).toBeNull();
  });

  it('calls onInsertImage when image button is clicked', () => {
    const editor = createMockEditor();
    const onInsertImage = vi.fn();
    render(<EditorToolbar editor={editor} onInsertImage={onInsertImage} />);
    const imageButton = screen.getByTestId('toolbar-image');
    fireEvent.click(imageButton);
    expect(onInsertImage).toHaveBeenCalledTimes(1);
  });

  it('reflects active state on Bold button with aria-pressed', () => {
    const editor = createMockEditor({
      isActive: (name: string) => name === 'bold',
    });
    render(<EditorToolbar editor={editor} />);
    const boldButton = screen.getByTestId('toolbar-bold');
    expect(boldButton.getAttribute('aria-pressed')).toBe('true');
  });

  describe('heading buttons', () => {
    let editor: Editor;

    beforeEach(() => {
      editor = createMockEditor();
    });

    it('renders H1 button', () => {
      render(<EditorToolbar editor={editor} />);
      expect(screen.getByTestId('toolbar-h1')).toBeDefined();
    });

    it('renders H2 button', () => {
      render(<EditorToolbar editor={editor} />);
      expect(screen.getByTestId('toolbar-h2')).toBeDefined();
    });

    it('renders H3 button', () => {
      render(<EditorToolbar editor={editor} />);
      expect(screen.getByTestId('toolbar-h3')).toBeDefined();
    });
  });

  it('renders all alignment buttons', () => {
    const editor = createMockEditor();
    render(<EditorToolbar editor={editor} />);
    expect(screen.getByTestId('toolbar-align-left')).toBeDefined();
    expect(screen.getByTestId('toolbar-align-center')).toBeDefined();
    expect(screen.getByTestId('toolbar-align-right')).toBeDefined();
    expect(screen.getByTestId('toolbar-align-justify')).toBeDefined();
  });
});
