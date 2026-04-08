import { create } from 'zustand';
import type { ReactNode } from 'react';

export interface ModalState {
  show: boolean;
  title?: string;
  content?: ReactNode;
}

interface UiStore {
  modal: ModalState | null;
  notificationType: 'modal' | 'snackbar';
  openModal: (modal: ModalState) => void;
  closeModal: () => void;
  setNotificationType: (type: 'modal' | 'snackbar') => void;
}

export const useUiStore = create<UiStore>((set) => ({
  modal: null,
  notificationType: 'modal',
  openModal: (modal) => set({ modal }),
  closeModal: () => set({ modal: null }),
  setNotificationType: (notificationType) => set({ notificationType }),
}));
