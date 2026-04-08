import { describe, it, expect, beforeEach } from 'vitest';
import { useUiStore } from './uiStore';

describe('uiStore', () => {
  beforeEach(() => {
    useUiStore.setState({ modal: null, notificationType: 'modal' });
  });

  it('has correct initial state', () => {
    const state = useUiStore.getState();
    expect(state.modal).toBeNull();
    expect(state.notificationType).toBe('modal');
  });

  it('openModal sets modal state', () => {
    const { openModal } = useUiStore.getState();
    openModal({ show: true, title: 'Test Modal' });
    expect(useUiStore.getState().modal).toEqual({ show: true, title: 'Test Modal' });
  });

  it('closeModal clears modal state', () => {
    useUiStore.setState({ modal: { show: true, title: 'Test' } });
    const { closeModal } = useUiStore.getState();
    closeModal();
    expect(useUiStore.getState().modal).toBeNull();
  });

  it('setNotificationType updates notification type', () => {
    const { setNotificationType } = useUiStore.getState();
    setNotificationType('snackbar');
    expect(useUiStore.getState().notificationType).toBe('snackbar');
  });
});
