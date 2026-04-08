import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EditorToolbar } from './EditorToolbar';
import type { Editor } from '@tiptap/react';

function createChainEditor(runMock: ReturnType<typeof vi.fn>): Editor {
  const proxy: Record<string, unknown> = { run: runMock };
  const chain = new Proxy(proxy, {
    get(target, prop) {
      if (prop === 'run') return target.run;
      return () => chain;
    },
  });
  return {
    isActive: vi.fn().mockReturnValue(false),
    chain: vi.fn().mockReturnValue(chain),
    can: vi.fn().mockReturnValue({ chain: () => chain }),
    getAttributes: vi.fn().mockReturnValue({}),
    isEditable: true,
    isInitialized: true,
  } as unknown as Editor;
}

describe('EditorToolbar — toolbar button clicks', () => {
  let runMock: ReturnType<typeof vi.fn>;
  let editor: Editor;

  beforeEach(() => {
    runMock = vi.fn();
    editor = createChainEditor(runMock);
  });

  it('calls toggleItalic when italic button clicked', () => {
    render(<EditorToolbar editor={editor} />);
    fireEvent.click(screen.getByTestId('toolbar-italic'));
    expect(runMock).toHaveBeenCalled();
  });

  it('calls toggleUnderline when underline button clicked', () => {
    render(<EditorToolbar editor={editor} />);
    fireEvent.click(screen.getByTestId('toolbar-underline'));
    expect(runMock).toHaveBeenCalled();
  });

  it('calls toggleStrike when strikethrough button clicked', () => {
    render(<EditorToolbar editor={editor} />);
    fireEvent.click(screen.getByTestId('toolbar-strike'));
    expect(runMock).toHaveBeenCalled();
  });

  it('calls toggleHeading h1 when H1 clicked', () => {
    render(<EditorToolbar editor={editor} />);
    fireEvent.click(screen.getByTestId('toolbar-h1'));
    expect(runMock).toHaveBeenCalled();
  });

  it('calls toggleHeading h2 when H2 clicked', () => {
    render(<EditorToolbar editor={editor} />);
    fireEvent.click(screen.getByTestId('toolbar-h2'));
    expect(runMock).toHaveBeenCalled();
  });

  it('calls toggleHeading h3 when H3 clicked', () => {
    render(<EditorToolbar editor={editor} />);
    fireEvent.click(screen.getByTestId('toolbar-h3'));
    expect(runMock).toHaveBeenCalled();
  });

  it('calls toggleBlockquote when blockquote clicked', () => {
    render(<EditorToolbar editor={editor} />);
    fireEvent.click(screen.getByTestId('toolbar-blockquote'));
    expect(runMock).toHaveBeenCalled();
  });

  it('calls toggleCodeBlock when code block clicked', () => {
    render(<EditorToolbar editor={editor} />);
    fireEvent.click(screen.getByTestId('toolbar-code-block'));
    expect(runMock).toHaveBeenCalled();
  });

  it('calls toggleOrderedList when ordered list clicked', () => {
    render(<EditorToolbar editor={editor} />);
    fireEvent.click(screen.getByTestId('toolbar-ordered-list'));
    expect(runMock).toHaveBeenCalled();
  });

  it('calls toggleBulletList when bullet list clicked', () => {
    render(<EditorToolbar editor={editor} />);
    fireEvent.click(screen.getByTestId('toolbar-bullet-list'));
    expect(runMock).toHaveBeenCalled();
  });

  it('calls setTextAlign left when align-left clicked', () => {
    render(<EditorToolbar editor={editor} />);
    fireEvent.click(screen.getByTestId('toolbar-align-left'));
    expect(runMock).toHaveBeenCalled();
  });

  it('calls setTextAlign center when align-center clicked', () => {
    render(<EditorToolbar editor={editor} />);
    fireEvent.click(screen.getByTestId('toolbar-align-center'));
    expect(runMock).toHaveBeenCalled();
  });

  it('calls setTextAlign right when align-right clicked', () => {
    render(<EditorToolbar editor={editor} />);
    fireEvent.click(screen.getByTestId('toolbar-align-right'));
    expect(runMock).toHaveBeenCalled();
  });

  it('calls setTextAlign justify when align-justify clicked', () => {
    render(<EditorToolbar editor={editor} />);
    fireEvent.click(screen.getByTestId('toolbar-align-justify'));
    expect(runMock).toHaveBeenCalled();
  });

  it('indent button renders and is clickable', () => {
    render(<EditorToolbar editor={editor} />);
    const indent = screen.getByTestId('toolbar-indent');
    fireEvent.click(indent);
    // No error thrown means success
    expect(indent).toBeTruthy();
  });

  it('outdent button renders and is clickable', () => {
    render(<EditorToolbar editor={editor} />);
    const outdent = screen.getByTestId('toolbar-outdent');
    fireEvent.click(outdent);
    expect(outdent).toBeTruthy();
  });
});

describe('EditorToolbar — link handling', () => {
  it('calls window.prompt and sets link when URL entered', () => {
    const runMock = vi.fn();
    const editor = createChainEditor(runMock);
    // prompt returns a URL
    vi.spyOn(window, 'prompt').mockReturnValue('https://example.com');

    render(<EditorToolbar editor={editor} />);
    fireEvent.click(screen.getByTestId('toolbar-link'));

    expect(window.prompt).toHaveBeenCalled();
    expect(runMock).toHaveBeenCalled();

    vi.restoreAllMocks();
  });

  it('does nothing when prompt is cancelled (null)', () => {
    const runMock = vi.fn();
    const editor = createChainEditor(runMock);
    vi.spyOn(window, 'prompt').mockReturnValue(null);

    render(<EditorToolbar editor={editor} />);
    fireEvent.click(screen.getByTestId('toolbar-link'));

    expect(window.prompt).toHaveBeenCalled();
    // run should NOT have been called since we cancelled
    expect(runMock).not.toHaveBeenCalled();

    vi.restoreAllMocks();
  });

  it('unsets link when prompt returns empty string', () => {
    const runMock = vi.fn();
    const editor = createChainEditor(runMock);
    vi.spyOn(window, 'prompt').mockReturnValue('');

    render(<EditorToolbar editor={editor} />);
    fireEvent.click(screen.getByTestId('toolbar-link'));

    expect(window.prompt).toHaveBeenCalled();
    expect(runMock).toHaveBeenCalled();

    vi.restoreAllMocks();
  });
});
