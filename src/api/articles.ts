import { request } from './client';
import type { Article, ArticleBranch, ArticleVersion } from '../types/article';
import { titleToSlug } from '../utils/url';

export interface SaveVersionPayload {
  article_title: string;
  branch_name?: string;
  article_url?: string;
  content?: string;
  article_tags?: string;
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

export function saveArticleVersion(
  data: SaveVersionPayload,
  token?: string
): Promise<ArticleVersion> {
  const sanitizedTitle = titleToSlug(data.article_title);
  const articleUrl = data.article_url ?? sanitizedTitle;
  const branchName = data.branch_name ?? 'main';
  const payload = { ...data, article_tags: data.article_tags ?? 'thoughts' };

  return request<ArticleVersion>(`/articles/${articleUrl}/branches/${branchName}/versions`, {
    method: 'POST',
    body: payload,
    token,
  });
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
