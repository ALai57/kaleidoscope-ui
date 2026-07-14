import type { RecipeContent } from './recipe';

/** One stored Anthropic call — the prompt-tuning surface. request/response are
 *  stored verbatim by the pipeline; we type the fields the UI reads and leave the
 *  rest open. Anthropic-native keys (max_tokens, input_tokens) stay snake_case. */
export interface LlmCallRequest {
  model: string;
  max_tokens?: number;
  system?: string;
  messages: { role: string; content: string }[];
  [k: string]: unknown;
}

export interface LlmCallUsage {
  input_tokens: number;
  output_tokens: number;
}

export interface LlmCallResponse {
  content?: { type: string; text: string }[];
  usage?: LlmCallUsage | null;
  model?: string;
  [k: string]: unknown;
}

export interface LlmCall {
  /** stage-ish purpose from JSONB, e.g. "parse" | "normalize" | "transcribe". */
  purpose: string;
  model: string;
  request: LlmCallRequest;
  response: LlmCallResponse;
}

/** Mirrors backend ExtractedFacts (the PARSE → NORMALIZE artifact). */
export interface LineageExtractedFacts {
  title?: string | null;
  ingredients: string[];
  steps: string[];
  section_signals: string[];
  grouping?: { name?: string | null; ingredients: number[]; steps: number[] }[] | null;
  servings?: string | null;
  prep_time_minutes?: number | null;
  cook_time_minutes?: number | null;
  labels: string[];
}

export interface RunTechniques {
  acquire?: string | null;
  parse?: string | null;
  normalize?: string | null;
}

export interface LineageErrorDetail {
  message?: string;
  reason?: string;
  [k: string]: unknown;
}

export interface LineageRun {
  id: string;
  pipeline_version: string;
  outcome: string; // "success" or a failure reason
  error_detail?: LineageErrorDetail | null;
  techniques: RunTechniques;
  facts?: LineageExtractedFacts | null;
  content?: RecipeContent | null;
  llm_calls: LlmCall[];
  warnings: string[];
  created_at: string;
}

export interface LineageRaw {
  source_kind: string; // "url" | "photo"
  request_url?: string | null;
  final_url?: string | null;
  http_status?: number | null;
  fetch_tier?: string | null;
  content_bytes: number;
  raw_content?: string | null; // present only when fetched with include-raw
  created_at: string;
}

export interface RecipeLineage {
  recipe_url: string;
  recipe_id: string;
  run: LineageRun;
  raw: LineageRaw;
}
