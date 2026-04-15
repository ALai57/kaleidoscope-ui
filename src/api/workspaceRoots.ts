import { request } from './client';
import type { WorkspaceRoot } from '../types/workspaceRoot';

export function getWorkspaceRoots(token?: string): Promise<WorkspaceRoot[]> {
  return request<WorkspaceRoot[]>('/workspace-roots', { token });
}

export function addWorkspaceRoot(
  body: { path: string; label?: string },
  token?: string
): Promise<WorkspaceRoot> {
  return request<WorkspaceRoot>('/workspace-roots', { method: 'POST', body, token });
}

export function deleteWorkspaceRoot(id: string, token?: string): Promise<void> {
  return request<void>(`/workspace-roots/${id}`, { method: 'DELETE', token });
}
