import { vi } from 'vitest';
import type { Editor } from '@tiptap/react';

/**
 * Creates a minimal mock of the TipTap Editor for unit tests.
 * Only the methods used by EditorToolbar are mocked.
 */
export function createMockEditor(overrides?: {
  isActive?: (name: string, attrs?: Record<string, unknown>) => boolean;
}): Editor {
  const runMock = vi.fn();

  // Chain builder — every method returns the same proxy so calls can be chained freely
  const makeChain = (): Record<string, unknown> => {
    const chain: Record<string, unknown> = new Proxy(
      { run: runMock },
      {
        get(target, prop) {
          if (prop === 'run') return target.run;
          // Any other method returns a function that returns the same chain
          return (..._args: unknown[]) => chain;
        },
      },
    );
    return chain;
  };

  const canChain = makeChain();
  const canProxy = new Proxy(
    { chain: () => canChain },
    {
      get(target, prop) {
        if (prop === 'chain') return target.chain;
        // Every can().X() returns true
        return (..._args: unknown[]) => true;
      },
    },
  );

  const mockEditor = {
    isActive: overrides?.isActive ?? vi.fn().mockReturnValue(false),
    chain: vi.fn().mockReturnValue(makeChain()),
    can: vi.fn().mockReturnValue(canProxy),
    isEditable: true,
    isInitialized: true,
  } as unknown as Editor;

  return mockEditor;
}
