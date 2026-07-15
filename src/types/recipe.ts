export interface RecipeLabelGroup {
  id: string; // UUID
  name: string;
}

export interface RecipeLabel {
  id: string; // UUID
  name: string; // "indian"
  group_id?: string | null;
  group_name?: string | null; // "ethnicity" — render as `${group_name}/${name}` when grouped
}

// One section = one paired component (e.g. Cake, Frosting): its own
// ingredients AND its own steps. A simple recipe is a single unnamed section.
export interface RecipeSection {
  name?: string | null; // absent/null ⇒ unnamed section
  ingredients: string[]; // one freeform line per ingredient ("2 cups flour")
  steps: string[]; // plain text, one per instruction step (no HTML)
}

// The one shared recipe-content shape: the current recipe and the scraped
// original are both this. Always has at least one section.
export interface RecipeContent {
  title: string;
  sections: RecipeSection[];
  servings?: string | null;
  prep_time_minutes?: number | null;
  cook_time_minutes?: number | null;
}

export interface Recipe {
  id: string; // UUID — identity
  recipe_url: string; // slug — address, not identity
  hostname: string;
  content: RecipeContent;
  original_content?: RecipeContent | null; // immutable scrape — same shape as content
  labels?: RecipeLabel[];
  source_url?: string | null;
  author?: string | null;
  public_visibility: boolean;
  created_at: string;
  modified_at: string;
  // Present when the recipe was created from a scrape; gates the import-lineage
  // strip. Absent/null on a manually-created recipe.
  scrape_processing_run_id?: string | null;
  // Derived cook timeline (nullable until generated). See cook-timeline plan.
  timeline?: Timeline | null;
}

export interface RecipeDraft {
  recipe: RecipeContent;
  suggested_labels: string[];
  // Provenance from the backend, carried as data — the UI renders none of it,
  // and never flattens it back into a single label.
  techniques: { acquire: string; parse: string; normalize: string };
  warnings: string[];
  // The processing run that produced this draft. Carried through to create so
  // the recipe links back to its scrape (recipe → processing_run → raw_scrape).
  scrape_processing_run_id: string;
}

// What a recipe source hands the editor page. `sourceUrl` is url-only knowledge
// (the client's analog of RawSource's nullable url columns): the URL source
// fills it; the photo source passes null.
export interface AcquiredDraft {
  draft: RecipeDraft;
  sourceUrl: string | null;
}

export interface RecipeAudience {
  id: string;
  recipe_id: string;
  group_id: string;
}

export interface CreateRecipePayload {
  content: RecipeContent;
  original_content?: RecipeContent | null;
  recipe_url?: string;
  source_url?: string | null;
  label_ids?: string[];
  public_visibility?: boolean;
  // Lineage link set once at create; the backend's UpdateRecipeRequest has no
  // counterpart, so it is intentionally absent from UpdateRecipePayload.
  scrape_processing_run_id?: string | null;
}

export interface UpdateRecipePayload {
  content?: RecipeContent;
  recipe_url?: string; // rename the address (slug); identity (id) is unchanged
  source_url?: string | null;
  label_ids?: string[];
  public_visibility?: boolean;
}

export type TimelineKind = 'active' | 'passive';

export interface TimelinePhase {
  id: string; // "{component-id}/{label}"
  label: string; // unique within its component
  kind: TimelineKind;
  steps: number[]; // indices into THIS component's section steps
  estimate: number; // LLM minutes
  deps: string[]; // phase ids this phase waits on
  start?: number | null; // packer output — minutes from t0
}

export interface TimelineComponent {
  name: string; // component-id / lane label
  steps_hash: string;
  phases: TimelinePhase[];
}

export interface TimelineOverride {
  phase: string; // a TimelinePhase.id
  minutes: number;
}

export interface Timeline {
  version: number;
  generator_version: number;
  generated_at: string;
  total_minutes: number;
  overrides: TimelineOverride[];
  components: TimelineComponent[];
}
