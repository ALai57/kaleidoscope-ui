import { request } from './client';
import type { UserProfile } from '../types/user';

export function getUserProfile(token: string): Promise<UserProfile> {
  return request<UserProfile>('/v1/users/me', { token });
}
