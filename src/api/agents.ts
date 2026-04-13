import { request } from './client';
import type { Agent, CreateAgentBody, UpdateAgentBody } from '../types/agent';

export function getAgents(token?: string): Promise<Agent[]> {
  return request<Agent[]>('/agents', { token });
}

export function getAgent(id: string, token?: string): Promise<Agent> {
  return request<Agent>(`/agents/${id}`, { token });
}

export function createAgent(body: CreateAgentBody, token?: string): Promise<Agent> {
  return request<Agent>('/agents', { method: 'POST', body, token });
}

export function updateAgent(id: string, body: UpdateAgentBody, token?: string): Promise<Agent> {
  return request<Agent>(`/agents/${id}`, { method: 'PUT', body, token });
}

export function deleteAgent(id: string, token?: string): Promise<void> {
  return request<void>(`/agents/${id}`, { method: 'DELETE', token });
}
