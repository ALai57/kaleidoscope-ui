import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { getThemes, updateTheme } from './themes';
import type { ThemeRecord } from './themes';

const mockTheme: ThemeRecord = {
  id: 't1',
  display_name: 'Default',
  config: { hue: 217, saturation: 65, lightness: 40, angle: 103, theta: 45 },
};

const server = setupServer(
  http.get('/themes', () => HttpResponse.json([mockTheme])),
  http.put('/themes/t1', () => HttpResponse.json(mockTheme))
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('getThemes', () => {
  it('returns themes', async () => {
    const themes = await getThemes();
    expect(themes[0]?.id).toBe('t1');
  });
});

describe('updateTheme', () => {
  it('updates a theme', async () => {
    const theme = await updateTheme(mockTheme);
    expect(theme.id).toBe('t1');
  });
});
