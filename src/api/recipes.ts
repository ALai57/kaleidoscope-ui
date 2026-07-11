import { request } from './client';
import { titleToSlug } from '../utils/url';
import type {
  Recipe,
  RecipeLabel,
  RecipeLabelGroup,
  RecipeAudience,
  ScrapeResult,
  CreateRecipePayload,
  UpdateRecipePayload,
} from '../types/recipe';

export interface RecipeFilters {
  ingredient?: string;
  labelId?: string;
}

function filterQuery({ ingredient, labelId }: RecipeFilters = {}): string {
  const params = new URLSearchParams();
  if (ingredient) params.set('ingredient', ingredient);
  if (labelId) params.set('label-id', labelId);
  const qs = params.toString();
  return qs ? `?${qs}` : '';
}

// --- Recipes ---
export function getRecipes(filters: RecipeFilters = {}, token?: string): Promise<Recipe[]> {
  return request<Recipe[]>(`/recipes${filterQuery(filters)}`, { token });
}

export function getRecipe(slug: string, token?: string): Promise<Recipe> {
  return request<Recipe>(`/recipes/${slug}`, { token });
}

export function createRecipe(payload: CreateRecipePayload, token?: string): Promise<Recipe> {
  const recipe_url = payload.recipe_url ?? titleToSlug(payload.content.title);
  return request<Recipe>('/recipes', {
    method: 'POST',
    body: { ...payload, recipe_url },
    token,
  });
}

export function updateRecipe(
  slug: string,
  patch: UpdateRecipePayload,
  token?: string
): Promise<Recipe> {
  return request<Recipe>(`/recipes/${slug}`, { method: 'PUT', body: patch, token });
}

export function deleteRecipe(slug: string, token?: string): Promise<void> {
  return request<void>(`/recipes/${slug}`, { method: 'DELETE', token });
}

export function scrapeRecipe(url: string, token?: string): Promise<ScrapeResult> {
  return request<ScrapeResult>('/recipes/scrape', {
    method: 'POST',
    body: { url },
    token,
  });
}

// --- Labels ---
export function getLabels(token?: string): Promise<RecipeLabel[]> {
  return request<RecipeLabel[]>('/recipe-labels', { token });
}

export function createLabel(
  name: string,
  groupId: string | null | undefined,
  token?: string
): Promise<RecipeLabel> {
  return request<RecipeLabel>('/recipe-labels', {
    method: 'POST',
    body: { name, group_id: groupId ?? null },
    token,
  });
}

export function renameLabel(id: string, name: string, token?: string): Promise<RecipeLabel> {
  return request<RecipeLabel>(`/recipe-labels/${id}`, { method: 'PUT', body: { name }, token });
}

export function deleteLabel(id: string, token?: string): Promise<void> {
  return request<void>(`/recipe-labels/${id}`, { method: 'DELETE', token });
}

// --- Label groups ---
export function getLabelGroups(token?: string): Promise<RecipeLabelGroup[]> {
  return request<RecipeLabelGroup[]>('/recipe-label-groups', { token });
}

export function createLabelGroup(name: string, token?: string): Promise<RecipeLabelGroup> {
  return request<RecipeLabelGroup>('/recipe-label-groups', {
    method: 'POST',
    body: { name },
    token,
  });
}

export function renameLabelGroup(
  id: string,
  name: string,
  token?: string
): Promise<RecipeLabelGroup> {
  return request<RecipeLabelGroup>(`/recipe-label-groups/${id}`, {
    method: 'PUT',
    body: { name },
    token,
  });
}

export function deleteLabelGroup(id: string, token?: string): Promise<void> {
  return request<void>(`/recipe-label-groups/${id}`, { method: 'DELETE', token });
}

// --- Audiences (sharing) ---
export function addRecipeAudience(
  recipeId: string,
  groupId: string,
  token?: string
): Promise<RecipeAudience> {
  return request<RecipeAudience>('/recipe-audiences', {
    method: 'PUT',
    body: { recipe_id: recipeId, group_id: groupId },
    token,
  });
}

export function getAudiencesForRecipe(recipeId: string, token?: string): Promise<RecipeAudience[]> {
  return request<RecipeAudience[]>(
    `/recipe-audiences?recipe-id=${encodeURIComponent(recipeId)}`,
    { token }
  );
}

export function deleteRecipeAudience(audienceId: string, token?: string): Promise<void> {
  return request<void>(`/recipe-audiences/${audienceId}`, { method: 'DELETE', token });
}

// Qualified display name: "ethnicity/indian" for grouped labels, "baking" otherwise.
export function qualifiedLabelName(label: RecipeLabel): string {
  return label.group_name ? `${label.group_name}/${label.name}` : label.name;
}
