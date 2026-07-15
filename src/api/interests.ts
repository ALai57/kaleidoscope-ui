import { request } from './client';
import type {
  Interest, TasteProfile, Recommendation, CurationResult,
  RecommendationStatus, ShelfFilters,
} from '../types/interest';

export function getInterests(token?: string): Promise<Interest[]> {
  return request<Interest[]>('/interests', { token });
}

export function getInterest(id: string, token?: string): Promise<Interest> {
  return request<Interest>(`/interests/${id}`, { token });
}

export function createInterest(
  body: { intent: string; taste_profile?: TasteProfile },
  token?: string
): Promise<Interest> {
  return request<Interest>('/interests', { method: 'POST', body, token });
}

export function updateInterest(
  id: string,
  body: { intent?: string; taste_profile?: TasteProfile },
  token?: string
): Promise<Interest> {
  return request<Interest>(`/interests/${id}`, { method: 'PUT', body, token });
}

export function deleteInterest(id: string, token?: string): Promise<void> {
  return request<void>(`/interests/${id}`, { method: 'DELETE', token });
}

export function getShelf(
  id: string,
  filters: ShelfFilters = {},
  token?: string
): Promise<Recommendation[]> {
  const params = new URLSearchParams();
  if (filters.status) params.set('status', filters.status);
  if (filters.kind) params.set('kind', filters.kind);
  const qs = params.toString();
  return request<Recommendation[]>(
    `/interests/${id}/recommendations${qs ? `?${qs}` : ''}`,
    { token }
  );
}

export function updateRecommendationStatus(
  interestId: string,
  recId: string,
  status: RecommendationStatus,
  token?: string
): Promise<Recommendation> {
  return request<Recommendation>(
    `/interests/${interestId}/recommendations/${recId}`,
    { method: 'PUT', body: { status }, token }
  );
}

export function curate(
  id: string,
  body: { scrutiny?: 'quick' | 'standard' | 'rigorous'; shelf_size?: number } = {},
  token?: string
): Promise<CurationResult> {
  return request<CurationResult>(`/interests/${id}/curate`, {
    method: 'POST',
    body,
    token,
  });
}

export function respondToCurationStep(
  interestId: string,
  runId: string,
  stepRunId: string,
  answers: string[],
  token?: string
): Promise<CurationResult> {
  return request<CurationResult>(
    `/interests/${interestId}/curation-runs/${runId}/steps/${stepRunId}/respond`,
    { method: 'POST', body: { answers }, token }
  );
}
