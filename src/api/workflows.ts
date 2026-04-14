import { request } from './client';
import type {
  Workflow,
  WorkflowRun,
  WorkflowRecommendation,
  StepRun,
  RunMode,
  WorkflowStatus,
  ScrutinyLevel,
  ProjectBrief,
} from '../types/workflow';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '';

// ── Workflow CRUD ──────────────────────────────────────────────────────────

export function getWorkflows(token?: string): Promise<Workflow[]> {
  return request<Workflow[]>('/workflows', { token });
}

export function getWorkflow(id: string, token?: string): Promise<Workflow> {
  return request<Workflow>(`/workflows/${id}`, { token });
}

export interface WorkflowStepInput {
  name: string;
  description: string;
  position: number;
  agent_type?: string;
}

export function createWorkflow(
  body: { name: string; description?: string; steps?: WorkflowStepInput[] },
  token?: string
): Promise<Workflow> {
  return request<Workflow>('/workflows', { method: 'POST', body, token });
}

export function updateWorkflow(
  id: string,
  body: {
    name?: string;
    description?: string;
    status?: WorkflowStatus;
    steps?: WorkflowStepInput[];
  },
  token?: string
): Promise<Workflow> {
  return request<Workflow>(`/workflows/${id}`, { method: 'PUT', body, token });
}

export function deleteWorkflow(id: string, token?: string): Promise<void> {
  return request<void>(`/workflows/${id}`, { method: 'DELETE', token });
}

// ── Classification ─────────────────────────────────────────────────────────

export function getWorkflowRecommendation(
  projectId: string,
  token?: string
): Promise<WorkflowRecommendation[]> {
  return request<WorkflowRecommendation[]>(`/projects/${projectId}/workflow-recommendation`, {
    method: 'POST',
    body: {},
    token,
  });
}

// ── Runs ───────────────────────────────────────────────────────────────────

export function getWorkflowRuns(projectId: string, token?: string): Promise<WorkflowRun[]> {
  return request<WorkflowRun[]>(`/projects/${projectId}/workflow-runs`, { token });
}

export function startWorkflowRun(
  projectId: string,
  body: { workflow_id?: string | null; mode: RunMode; scrutiny?: ScrutinyLevel },
  token?: string
): Promise<WorkflowRun> {
  return request<WorkflowRun>(`/projects/${projectId}/workflow-runs`, {
    method: 'POST',
    body,
    token,
  });
}

// ── Project briefs ─────────────────────────────────────────────────────────

export function getProjectBriefs(projectId: string, token?: string): Promise<ProjectBrief[]> {
  return request<ProjectBrief[]>(`/projects/${projectId}/briefs`, { token });
}

export function getWorkflowRun(
  projectId: string,
  runId: string,
  token?: string
): Promise<WorkflowRun> {
  return request<WorkflowRun>(`/projects/${projectId}/workflow-runs/${runId}`, { token });
}

export function updateRunMode(
  projectId: string,
  runId: string,
  body: { mode: RunMode },
  token?: string
): Promise<WorkflowRun> {
  return request<WorkflowRun>(`/projects/${projectId}/workflow-runs/${runId}`, {
    method: 'PUT',
    body,
    token,
  });
}

// ── Step actions ───────────────────────────────────────────────────────────

export function advanceRun(
  projectId: string,
  runId: string,
  token?: string
): Promise<void> {
  return request<void>(`/projects/${projectId}/workflow-runs/${runId}/advance`, {
    method: 'POST',
    body: {},
    token,
  });
}

export function skipStep(
  projectId: string,
  runId: string,
  stepRunId: string,
  token?: string
): Promise<WorkflowRun> {
  return request<WorkflowRun>(
    `/projects/${projectId}/workflow-runs/${runId}/steps/${stepRunId}/skip`,
    { method: 'POST', body: {}, token }
  );
}

export function runCustomStep(
  projectId: string,
  runId: string,
  body: { name: string; description: string; agent_type: string },
  token?: string
): Promise<{ step_run: StepRun; recommendation: WorkflowRecommendation[] }> {
  return request<{ step_run: StepRun; recommendation: WorkflowRecommendation[] }>(
    `/projects/${projectId}/workflow-runs/${runId}/custom-step`,
    { method: 'POST', body, token }
  );
}

export function respondToStep(
  projectId: string,
  runId: string,
  stepRunId: string,
  answers: string[],
  token?: string
): Promise<WorkflowRun> {
  return request<WorkflowRun>(
    `/projects/${projectId}/workflow-runs/${runId}/steps/${stepRunId}/respond`,
    { method: 'POST', body: { answers }, token }
  );
}

// ── SSE stream ─────────────────────────────────────────────────────────────

export type WorkflowStreamEvent =
  | { event: 'token'; data: string }
  | { event: 'step_complete'; data: StepRun }
  | { event: 'done' };

export async function* streamWorkflowRun(
  projectId: string,
  runId: string,
  token?: string
): AsyncGenerator<WorkflowStreamEvent> {
  const headers: Record<string, string> = {
    Accept: 'text/event-stream',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(
    `${API_BASE}/projects/${projectId}/workflow-runs/${runId}/stream`,
    { headers }
  );

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
            const parsed = JSON.parse(raw) as WorkflowStreamEvent;
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
