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

// The one shared recipe-content shape: the current recipe and the scraped
// original are both this.
export interface RecipeContent {
  title: string;
  ingredients: string[]; // one freeform line per ingredient ("2 cups flour")
  instructions_html?: string; // HTML (TipTap)
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
}

export interface ScrapeResult {
  recipe: RecipeContent;
  suggested_labels: string[];
  extraction_method: 'json-ld' | 'llm';
  warnings: string[];
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
}

export interface UpdateRecipePayload {
  content?: RecipeContent;
  source_url?: string | null;
  label_ids?: string[];
  public_visibility?: boolean;
}
