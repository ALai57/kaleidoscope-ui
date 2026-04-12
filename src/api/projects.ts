import { request } from './client';
import type {
  Project,
  ProjectNote,
  ProjectConversationMessage,
  ProjectSkill,
  ScoreRun,
} from '../types/project';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '';

export function getProjects(token?: string): Promise<Project[]> {
  return request<Project[]>('/projects', { token });
}

export function getProject(id: string, token?: string): Promise<Project> {
  return request<Project>(`/projects/${id}`, { token });
}

export function createProject(
  body: { title: string; description?: string },
  token?: string
): Promise<Project> {
  return request<Project>('/projects', { method: 'POST', body, token });
}

export function updateProject(
  id: string,
  body: { title?: string; description?: string; status?: string },
  token?: string
): Promise<Project> {
  return request<Project>(`/projects/${id}`, { method: 'PUT', body, token });
}

export function deleteProject(id: string, token?: string): Promise<void> {
  return request<void>(`/projects/${id}`, { method: 'DELETE', token });
}

export function getNotes(projectId: string, token?: string): Promise<ProjectNote[]> {
  return request<ProjectNote[]>(`/projects/${projectId}/notes`, { token });
}

export function addTextNote(
  projectId: string,
  content: string,
  token?: string
): Promise<ProjectNote> {
  return request<ProjectNote>(`/projects/${projectId}/notes`, {
    method: 'POST',
    body: { content, source: 'text' },
    token,
  });
}

export async function addVoiceNote(
  projectId: string,
  audioBlob: Blob,
  token?: string
): Promise<ProjectNote> {
  const headers: Record<string, string> = {
    'Content-Type': audioBlob.type || 'audio/webm',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}/projects/${projectId}/notes?source=voice`, {
    method: 'POST',
    headers,
    body: audioBlob,
  });

  if (!response.ok) {
    const text = await response.text().catch(() => response.statusText);
    throw new Error(text);
  }

  return response.json() as Promise<ProjectNote>;
}

export function triggerScore(
  projectId: string,
  body?: { definition_ids?: string[] },
  token?: string
): Promise<Project> {
  return request<Project>(`/projects/${projectId}/scores`, {
    method: 'POST',
    body: body ?? {},
    token,
  });
}

export function getLatestScores(projectId: string, token?: string): Promise<ScoreRun[]> {
  return request<ScoreRun[]>(`/projects/${projectId}/scores`, { token });
}

export function getScoreHistory(projectId: string, token?: string): Promise<ScoreRun[]> {
  return request<ScoreRun[]>(`/projects/${projectId}/scores/history`, { token });
}

export function getConversation(
  projectId: string,
  agent: string,
  token?: string
): Promise<ProjectConversationMessage[]> {
  return request<ProjectConversationMessage[]>(
    `/projects/${projectId}/conversations/${agent}`,
    { token }
  );
}

export async function* streamMessage(
  projectId: string,
  agent: string,
  message: string,
  token?: string
): AsyncGenerator<string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'text/event-stream',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}/projects/${projectId}/conversations/${agent}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ message }),
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
          const data = line.slice(6).trim();
          if (data === '[DONE]') return;
          yield data;
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}

export function generateSkills(projectId: string, token?: string): Promise<ProjectSkill[]> {
  return request<ProjectSkill[]>(`/projects/${projectId}/skills/generate`, {
    method: 'POST',
    token,
  });
}

export function getSkillTree(projectId: string, token?: string): Promise<ProjectSkill[]> {
  return request<ProjectSkill[]>(`/projects/${projectId}/skills`, { token });
}

export function updateSkill(
  projectId: string,
  skillId: string,
  body: { status: string },
  token?: string
): Promise<ProjectSkill> {
  return request<ProjectSkill>(`/projects/${projectId}/skills/${skillId}`, {
    method: 'PUT',
    body,
    token,
  });
}
