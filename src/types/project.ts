export type ProjectStatus = 'idea' | 'developing' | 'executing';
export type SkillStatus = 'identified' | 'learning' | 'mastered';
export type AgentType = 'coach' | 'pm' | 'engineering_lead';
export type ScorerType = 'pm' | 'engineering_lead' | 'general';
export type NoteSource = 'text' | 'voice';

export interface ScoreDimensionDefinition {
  id: string;
  score_definition_id: string;
  name: string;
  criteria: string;
  position: number;
}

export interface ScoreDefinition {
  id: string;
  user_id: string;
  name: string;
  description: string;
  scorer_type: ScorerType;
  is_default: boolean;
  created_at: string;
  updated_at: string;
  dimensions?: ScoreDimensionDefinition[];
}

export interface ScoreDimension {
  dimension_name: string;
  value: number;
  rationale: string;
}

export interface ScoreRun {
  id: string;
  version: number;
  scored_at: string;
  definition: {
    id: string;
    name: string;
    scorer_type: ScorerType;
  };
  overall: number;
  dimensions: ScoreDimension[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
  scores?: ScoreRun[];
  /** Explicit codebase paths pinned to this project; overrides auto-detection when non-empty */
  local_paths?: string[];
}

export interface ProjectNote {
  id: string;
  project_id: string;
  content: string;
  source: NoteSource;
  created_at: string;
}

export interface ProjectConversationMessage {
  id: string;
  project_id: string;
  agent_type: AgentType;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export interface ProjectSkill {
  id: string;
  project_id: string;
  parent_id: string | null;
  name: string;
  description: string | null;
  status: SkillStatus;
  position: number;
  created_at: string;
  children?: ProjectSkill[];
}
