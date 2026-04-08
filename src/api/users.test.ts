import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { getUserProfile } from './users';
import type { UserProfile } from '../types/user';

const mockProfile: UserProfile = {
  sub: 'user-123',
  email: 'andrew@example.com',
  name: 'Andrew Lai',
  given_name: 'Andrew',
  family_name: 'Lai',
};

const server = setupServer(
  http.get('/v1/users/me', ({ request: req }) => {
    const auth = req.headers.get('Authorization');
    if (!auth) return new HttpResponse(null, { status: 401 });
    return HttpResponse.json(mockProfile);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('getUserProfile', () => {
  it('returns user profile when authenticated', async () => {
    const profile = await getUserProfile('my-token');
    expect(profile.sub).toBe('user-123');
    expect(profile.email).toBe('andrew@example.com');
  });

  it('throws on missing token (401)', async () => {
    await expect(getUserProfile('')).rejects.toHaveProperty('status', 401);
  });
});
