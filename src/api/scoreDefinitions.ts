import { request } from './client';
import type { ScoreDefinition } from '../types/project';

export function getScoreDefinitions(token?: string): Promise<ScoreDefinition[]> {
  return request<ScoreDefinition[]>('/score-definitions', { token });
}

export function getScoreDefinition(id: string, token?: string): Promise<ScoreDefinition> {
  return request<ScoreDefinition>(`/score-definitions/${id}`, { token });
}

export function createScoreDefinition(
  body: {
    name: string;
    description: string;
    scorer_type: string;
    dimensions: { name: string; criteria: string }[];
  },
  token?: string
): Promise<ScoreDefinition> {
  return request<ScoreDefinition>('/score-definitions', { method: 'POST', body, token });
}

export function updateScoreDefinition(
  id: string,
  body: {
    name?: string;
    description?: string;
    scorer_type?: string;
    dimensions?: { name: string; criteria: string }[];
  },
  token?: string
): Promise<ScoreDefinition> {
  return request<ScoreDefinition>(`/score-definitions/${id}`, { method: 'PUT', body, token });
}

export function deleteScoreDefinition(id: string, token?: string): Promise<void> {
  return request<void>(`/score-definitions/${id}`, { method: 'DELETE', token });
}
