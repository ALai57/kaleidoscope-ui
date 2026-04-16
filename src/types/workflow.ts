export type WorkflowStatus = 'draft' | 'live' | 'archived';
export type RunStatus = 'pending' | 'in_progress' | 'awaiting_input' | 'completed' | 'failed';
export type StepRunStatus = 'pending' | 'running' | 'completed' | 'skipped' | 'failed' | 'awaiting_input';
export type RunMode = 'manual' | 'autonomous';
export type OutputKind = 'text' | 'clarify' | 'tasks' | 'score' | 'decision';
export type ExecutionMode = 'sequential' | 'parallel' | 'fan_in';
export type ScrutinyLevel = 'quick' | 'standard' | 'rigorous';
export type AdvisorStatus = 'clear' | 'needs_work' | 'blocked';
export type JudgeAction = 'refine' | 'clarify' | 'proceed';

export interface WorkflowStep {
  id: string;
  workflow_id: string;
  position: number;
  name: string;
  description: string;
  agent_type?: string;
  output_kind?: OutputKind;
  execution_mode?: ExecutionMode;
  loop_until?: string;
}

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  status: WorkflowStatus;
  is_default: boolean;
  steps: WorkflowStep[]; // may be absent on list responses; treat as [] when missing
}

// ── Score step output (output_kind: 'score') ──────────────────────────────

export interface AdvisorDimension {
  name: string;
  /** Numeric score 0-10 (returned by the backend LLM scorer) */
  value?: number;
  /** Status label, derived from value when not explicitly set */
  status?: AdvisorStatus;
  rationale: string;
}

export interface AdvisorScoreOutput {
  agent_type?: string;
  /** Numeric overall score 0-10 (returned by the backend LLM scorer) */
  overall?: number;
  overall_status?: AdvisorStatus;
  dimensions: AdvisorDimension[];
  /** Set when the score step failed or timed out */
  failed?: boolean;
  reason?: string;
  /** Path of the codebase that was read during this review, if any */
  context_path?: string;
}

// ── Decision step output (output_kind: 'decision') ────────────────────────

export interface TradeOff {
  name: string;
  description: string;
  resolution: string;
  resolved_autonomously: boolean;
}

export interface Recommendation {
  action: string;
  rationale: string;
  who: 'system' | 'user';
  priority: 'high' | 'medium' | 'low';
}

export interface JudgeDecisionRefine {
  action: 'refine';
  agent_to_refine: string;
  refinement_prompt: string;
  summary: string;
  rationale: string;
  trade_offs?: TradeOff[];
  recommendations?: Recommendation[];
}

export interface JudgeDecisionClarify {
  action: 'clarify';
  questions: string[];
  summary: string;
  rationale: string;
  trade_offs?: TradeOff[];
  recommendations?: Recommendation[];
}

export interface JudgeDecisionProceed {
  action: 'proceed';
  unresolved?: string[];
  summary: string;
  rationale: string;
  trade_offs?: TradeOff[];
  recommendations?: Recommendation[];
}

export type JudgeDecisionOutput =
  | JudgeDecisionRefine
  | JudgeDecisionClarify
  | JudgeDecisionProceed;

// ── Workflow run config ───────────────────────────────────────────────────

export interface WorkflowRunConfig {
  scrutiny: ScrutinyLevel;
  max_rounds: number;
  thresholds: Record<string, number>;
  deadband: number;
  target_score?: number;
  timeouts?: {
    score_step_seconds: number;
    refine_step_seconds: number;
    fan_in_seconds: number;
  };
}

// ── Pending inputs (step paused awaiting user response) ───────────────────

export interface CodeContextPathCandidate {
  path: string;
  score: number;
  reason: string;
}

export interface PendingInputsCodeContextPath {
  kind: 'code_context_path';
  question: string;
  candidates: CodeContextPathCandidate[];
}

export type PendingInputs = PendingInputsCodeContextPath;

// ── Step run ──────────────────────────────────────────────────────────────

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
  output_kind?: OutputKind;
  round_id?: string;
  started_at?: string;
  completed_at?: string;
  /** Present when status = 'awaiting_input'; describes what the step is waiting for */
  pending_inputs?: PendingInputs;
}

// ── Workflow run ──────────────────────────────────────────────────────────

export interface WorkflowRun {
  id: string;
  project_id: string;
  workflow_id: string | null;
  workflow_name: string | null;
  status: RunStatus;
  mode: RunMode;
  current_step: number;
  steps: StepRun[];
  config?: WorkflowRunConfig;
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

// ── Workflow round ────────────────────────────────────────────────────────

export interface WorkflowRound {
  id: string;
  workflow_run_id: string;
  round_number: number;
  status: 'in_progress' | 'completed';
  started_at: string;
  completed_at?: string;
}

// ── Workflow round detail (returned by /rounds endpoint) ──────────────────

export interface ScoreSnapshotEntry {
  overall: number;
  dimensions: AdvisorDimension[];
}

export interface WorkflowRoundJudge {
  /** Full decision object from the judge (action + action-specific fields) */
  decision: JudgeDecisionOutput;
  summary: string;
  rationale: string;
  /** Per-dimension delta from previous round. Key = "agent_type / dimension_name" */
  delta_table?: Record<string, { delta: number; regressed: boolean }>;
  /** Full score trajectory per dimension across all rounds so far */
  trajectory?: Record<string, number[]>;
  /** Per-scorer overall score and dimension breakdown captured at judge time */
  score_snapshot?: Record<string, ScoreSnapshotEntry>;
  /** Round policy context: how many rounds are allowed and which round this is */
  policy?: {
    max_rounds: number;
    current_round: number;
  };
  /** Version of the brief that was used/produced in this round */
  brief_version?: number;
}

export interface WorkflowRoundDetail {
  round_number: number;
  status: 'in_progress' | 'completed';
  started_at: string;
  completed_at?: string;
  brief?: {
    version: number;
    content: string;
  };
  judge?: WorkflowRoundJudge;
  /** Per-scorer overall scores before and after this round's refinement */
  scores?: {
    before: Record<string, number>;
    after: Record<string, number>;
  };
}

// ── Project brief ─────────────────────────────────────────────────────────

export type BriefSource = 'initial' | 'advisor_refinement' | 'user_clarification';

export interface ProjectBrief {
  id: string;
  project_id: string;
  version: number;
  content: string;
  source: BriefSource;
  agent_type?: string;
  workflow_round_id?: string;
  created_at: string;
}
