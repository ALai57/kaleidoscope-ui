// task_type is an open label. Well-known values are listed here for UI treatment
// (icons, colours) but the type is not a closed union — unknown values render as generic tasks.
export type WellKnownTaskType =
  | 'action'
  | 'research'
  | 'purchase'
  | 'review'
  | 'development'
  | 'investigate';

// No 'skipped' — tasks the user won't do should be deleted, not archived.
export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface ProjectTask {
  id: string;
  project_id: string;
  user_id: string;
  title: string;
  description?: string;
  task_type: string;              // open label; use WellKnownTaskType for UI lookup with fallback
  status: TaskStatus;
  position: number;               // authoritative ordering; drag-reorder updates this via /reorder
  estimated_minutes?: number;
  generation_run_id?: string;     // present when task was agent-generated; null for user-created tasks
  workflow_step_run_id?: string;
  created_at: string;
  updated_at: string;
}
