import { describe, it, expect, beforeEach } from 'vitest';
import { useEditorStore } from './editorStore';
import type { ArticleVersion } from '../types/article';

const mockVersion: ArticleVersion = {
  version_id: 'v1',
  branch_id: 'b1',
  content: '<p>Hello</p>',
  title: 'Test',
  created_at: '2024-01-01T00:00:00Z',
};

describe('editorStore', () => {
  beforeEach(() => {
    useEditorStore.setState({ editorBranchId: null, initialEditorData: null });
  });

  it('has correct initial state', () => {
    const state = useEditorStore.getState();
    expect(state.editorBranchId).toBeNull();
    expect(state.initialEditorData).toBeNull();
  });

  it('setEditorBranchId updates branch id', () => {
    useEditorStore.getState().setEditorBranchId('b1');
    expect(useEditorStore.getState().editorBranchId).toBe('b1');
  });

  it('setInitialEditorData updates editor data', () => {
    useEditorStore.getState().setInitialEditorData(mockVersion);
    expect(useEditorStore.getState().initialEditorData).toEqual(mockVersion);
  });

  it('can clear branch id and editor data', () => {
    useEditorStore.setState({ editorBranchId: 'b1', initialEditorData: mockVersion });
    useEditorStore.getState().setEditorBranchId(null);
    useEditorStore.getState().setInitialEditorData(null);
    expect(useEditorStore.getState().editorBranchId).toBeNull();
    expect(useEditorStore.getState().initialEditorData).toBeNull();
  });
});
