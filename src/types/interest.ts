export type MediaFormat =
  | 'podcast' | 'article' | 'show' | 'video'
  | 'book' | 'paper' | 'newsletter' | 'course';

export interface TasteProfile {
  keywords?: string[];
  formats?: MediaFormat[];
  lengths?: string[];
  trusted_sources?: string[];
  /** Explore/exploit dial, 0.0–1.0. Share of each shelf drawn from outside trusted_sources. */
  novelty_ratio?: number;
  cadence?: string;
  refinements?: string[];
}

export interface Interest {
  id: string;
  user_id: string;
  intent: string;
  taste_profile: TasteProfile;
  /** Backing Project id (interests are backed by a Project on the server). */
  project_id?: string;
  created_at: string;
  updated_at: string;
}

export type RecommendationKind = MediaFormat;
export type Origin = 'trusted' | 'novel';
export type RecommendationStatus = 'shelved' | 'queued' | 'archived';

export interface Recommendation {
  id: string;
  interest_id: string;
  kind: string;
  title: string;
  source: string;
  url: string;
  est_time: string;
  why: string;
  origin: Origin;
  status: RecommendationStatus;
  added_at: string;
}

export interface CurationCompleted {
  status: 'completed';
  run_id: string;
  summary: { total: number; trusted: number; novel: number };
  shelved: Recommendation[];
}

export interface CurationAwaitingInput {
  status: 'awaiting_input';
  run_id: string;
  /** REQUIRED to call the respond route. See "Backend dependency" in the plan header. */
  step_run_id: string;
  questions: string[];
}

export type CurationResult = CurationCompleted | CurationAwaitingInput;

export interface ShelfFilters {
  status?: RecommendationStatus;
  kind?: string;
}
