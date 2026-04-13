export type WorkflowStatus = 'draft' | 'live' | 'archived';
export type RunStatus = 'pending' | 'in_progress' | 'awaiting_input' | 'completed' | 'failed';
export type StepRunStatus = 'pending' | 'running' | 'completed' | 'skipped' | 'failed';
export type RunMode = 'manual' | 'autonomous';

export interface WorkflowStep {
  id: string;
  workflow_id: string;
  position: number;
  name: string;
  description: string;
}

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  status: WorkflowStatus;
  is_default: boolean;
  steps: WorkflowStep[];
}

export interface StepRun {
  id: string;
  step_id: string | null; // null = custom step
  position: number;
  name: string;
  description: string;
  agent_type: string;
  is_custom: boolean;
  status: StepRunStatus;
  output?: string;
  started_at?: string;
  completed_at?: string;
}

export interface WorkflowRun {
  id: string;
  project_id: string;
  workflow_id: string | null;
  workflow_name: string | null;
  status: RunStatus;
  mode: RunMode;
  current_step: number;
  steps: StepRun[];
  started_at?: string;
  completed_at?: string;
  created_at: string;
}

export interface WorkflowRecommendation {
  workflow_id: string;
  name: string;
  confidence: number;
  rationale: string;
}
