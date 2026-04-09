import { request, ApiError } from './client';
import type { Article, ArticleBranch, ArticleVersion } from '../types/article';
import { titleToSlug } from '../utils/url';

export interface SaveVersionPayload {
  article_title: string;
  branch_name?: string;
  article_url?: string;
  content?: string;
  article_tags?: string;
  author?: string;
}

export function getArticles(token?: string): Promise<Article[]> {
  return request<Article[]>('/compositions', { token });
}

export function getArticle(slug: string, token?: string): Promise<Article> {
  return request<Article>(`/compositions/${slug}`, { token });
}

export function getBranches(token?: string): Promise<ArticleBranch[]> {
  return request<ArticleBranch[]>('/branches', { token });
}

export function getBranchVersions(branchId: string, token?: string): Promise<ArticleVersion[]> {
  return request<ArticleVersion[]>(`/branches/${branchId}/versions`, { token });
}

export async function saveArticleVersion(
  data: SaveVersionPayload,
  token?: string
): Promise<ArticleVersion> {
  const sanitizedTitle = titleToSlug(data.article_title);
  const articleUrl = data.article_url ?? sanitizedTitle;
  const branchName = data.branch_name ?? 'main';
  const payload = { ...data, article_tags: data.article_tags ?? 'thoughts' };

  try {
    return await request<ArticleVersion>(`/articles/${articleUrl}/branches/${branchName}/versions`, {
      method: 'POST',
      body: payload,
      token,
    });
  } catch (error) {
    // Backend response-coercion bug: article is saved but the response fails schema
    // validation (e.g. author: null). The created data is embedded in the error body.
    if (error instanceof ApiError && error.status === 500) {
      try {
        const body = JSON.parse(error.message) as { type?: string; value?: unknown[] };
        if (body.type === 'reitit.coercion/response-coercion' && Array.isArray(body.value) && body.value.length > 0) {
          const raw = body.value[0] as Record<string, unknown>;
          return Object.fromEntries(
            Object.entries(raw).map(([k, v]) => [k.replace(/-/g, '_'), v])
          ) as unknown as ArticleVersion;
        }
      } catch {
        // unparseable — fall through to re-throw
      }
    }
    throw error;
  }
}

export function publishBranch(
  articleUrl: string,
  branchName: string,
  token?: string
): Promise<void> {
  return request<void>(`/articles/${articleUrl}/branches/${branchName}/publish`, {
    method: 'PUT',
    token,
  });
}

export function togglePublicVisibility(
  articleUrl: string,
  publicVisibility: boolean,
  token?: string
): Promise<void> {
  return request<void>(`/articles/${articleUrl}`, {
    method: 'PUT',
    body: { public_visibility: String(publicVisibility) },
    token,
  });
}
