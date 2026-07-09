import { request } from './client';
import type { ThemeConfig } from '../types/theme';

export interface ThemeRecord {
  id: string;
  display_name: string;
  /** Stored as JSON. May be a legacy raw-ThemeParams object for old records;
   *  callers should run it through normalizeThemeConfig. */
  config: ThemeConfig;
}

export function getThemes(token?: string): Promise<ThemeRecord[]> {
  return request<ThemeRecord[]>('/themes', { token });
}

export function updateTheme(theme: ThemeRecord, token?: string): Promise<ThemeRecord> {
  return request<ThemeRecord>(`/themes/${theme.id}`, {
    method: 'PUT',
    body: theme,
    token,
  });
}
