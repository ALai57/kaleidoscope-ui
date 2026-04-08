import { request } from './client';
import type { ThemeParams } from '../types/theme';

export interface ThemeRecord {
  id: string;
  display_name: string;
  config: ThemeParams;
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
