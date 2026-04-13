import { request } from './client';
import type { ProjectTask } from '../types/tasks';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '';

// ── Task CRUD ──────────────────────────────────────────────────────────────

export function getTasks(projectId: string, token?: string): Promise<ProjectTask[]> {
  return request<ProjectTask[]>(`/projects/${projectId}/tasks`, { token });
}

export function createTask(
  projectId: string,
  body: { title: string; description?: string; task_type: string; estimated_minutes?: number },
  token?: string
): Promise<ProjectTask> {
  return request<ProjectTask>(`/projects/${projectId}/tasks`, { method: 'POST', body, token });
}

export function updateTask(
  projectId: string,
  taskId: string,
  body: {
    title?: string;
    description?: string;
    status?: string;
    task_type?: string;
    estimated_minutes?: number;
  },
  token?: string
): Promise<ProjectTask> {
  return request<ProjectTask>(`/projects/${projectId}/tasks/${taskId}`, {
    method: 'PUT',
    body,
    token,
  });
}

export function deleteTask(projectId: string, taskId: string, token?: string): Promise<void> {
  return request<void>(`/projects/${projectId}/tasks/${taskId}`, { method: 'DELETE', token });
}

// positions is the full new sequence; server replaces all positions in a transaction
export function reorderTasks(
  projectId: string,
  positions: { id: string; position: number }[],
  token?: string
): Promise<void> {
  return request<void>(`/projects/${projectId}/tasks/reorder`, {
    method: 'PUT',
    body: positions,
    token,
  });
}

// ── Status / nudge ─────────────────────────────────────────────────────────

// Raw facts only; client decides whether to show nudge (currently: pending_count <= 3)
export function getTaskStatus(
  projectId: string,
  token?: string
): Promise<{ pending_count: number; total_count: number }> {
  return request<{ pending_count: number; total_count: number }>(
    `/projects/${projectId}/tasks/status`,
    { token }
  );
}

// ── Task generation (SSE) ──────────────────────────────────────────────────

export type TaskStreamEvent =
  | { event: 'token'; data: string }
  | { event: 'tasks_generated'; data: ProjectTask[] }
  | { event: 'done' };

// Calls POST /tasks/generate (always appends; no replace mode).
// Named for what it does from the user's perspective, not how it works.
export async function* planNextSteps(
  projectId: string,
  token?: string
): AsyncGenerator<TaskStreamEvent> {
  const headers: Record<string, string> = {
    Accept: 'text/event-stream',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}/projects/${projectId}/tasks/generate`, {
    method: 'POST',
    headers,
  });

  if (!response.ok || !response.body) {
    const text = await response.text().catch(() => response.statusText);
    throw new Error(text);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const raw = line.slice(6).trim();
          if (!raw) continue;
          try {
            const parsed = JSON.parse(raw) as TaskStreamEvent;
            yield parsed;
            if (parsed.event === 'done') return;
          } catch {
            // malformed line, skip
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}
