import { create } from 'zustand';
import type { ArticleVersion } from '../types/article';

interface EditorStore {
  editorBranchId: string | null;
  initialEditorData: ArticleVersion | null;
  setEditorBranchId: (id: string | null) => void;
  setInitialEditorData: (data: ArticleVersion | null) => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
  editorBranchId: null,
  initialEditorData: null,
  setEditorBranchId: (editorBranchId) => set({ editorBranchId }),
  setInitialEditorData: (initialEditorData) => set({ initialEditorData }),
}));
