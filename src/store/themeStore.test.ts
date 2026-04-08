import { describe, it, expect, beforeEach } from 'vitest';
import { useThemeStore } from './themeStore';
import { BASE_THEME } from '../theme';

describe('themeStore', () => {
  beforeEach(() => {
    useThemeStore.setState({ themeParams: BASE_THEME });
  });

  it('has BASE_THEME as initial state', () => {
    const { themeParams } = useThemeStore.getState();
    expect(themeParams).toEqual(BASE_THEME);
  });

  it('setThemeParams updates theme params', () => {
    const newParams = { ...BASE_THEME, hue: 100 };
    useThemeStore.getState().setThemeParams(newParams);
    expect(useThemeStore.getState().themeParams.hue).toBe(100);
  });
});
