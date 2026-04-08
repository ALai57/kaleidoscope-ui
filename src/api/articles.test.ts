import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import {
  getArticles,
  getArticle,
  getBranches,
  getBranchVersions,
  saveArticleVersion,
  publishBranch,
  togglePublicVisibility,
} from './articles';
import { ApiError } from './client';
import type { Article, ArticleBranch, ArticleVersion } from '../types/article';

const mockArticle: Article = {
  article_id: 'a1',
  article_url: 'my-article',
  article_title: 'My Article',
  article_tags: 'thoughts',
  public_visibility: false,
  created_at: '2024-01-01T00:00:00Z',
};

const mockBranch: ArticleBranch = {
  branch_id: 'b1',
  branch_name: 'main',
  article_id: 'a1',
  article_url: 'my-article',
};

const mockVersion: ArticleVersion = {
  version_id: 'v1',
  branch_id: 'b1',
  content: '<p>Hello</p>',
  title: 'My Article',
  created_at: '2024-01-01T00:00:00Z',
};

const server = setupServer(
  http.get('/compositions', ({ request: req }) => {
    const auth = req.headers.get('Authorization');
    return HttpResponse.json([{ ...mockArticle, _auth: auth }]);
  }),
  http.get('/compositions/my-article', () => HttpResponse.json(mockArticle)),
  http.get('/compositions/not-found', () => new HttpResponse(null, { status: 404 })),
  http.get('/branches', () => HttpResponse.json([mockBranch])),
  http.get('/branches/b1/versions', () => HttpResponse.json([mockVersion])),
  http.post('/articles/my-article/branches/main/versions', () =>
    HttpResponse.json(mockVersion, { status: 201 })
  ),
  http.put('/articles/my-article/branches/main/publish', () =>
    new HttpResponse(null, { status: 204 })
  ),
  http.put('/articles/my-article', () => new HttpResponse(null, { status: 204 }))
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('getArticles', () => {
  it('returns list of articles', async () => {
    const articles = await getArticles();
    expect(articles).toHaveLength(1);
    expect(articles[0]?.article_url).toBe('my-article');
  });

  it('attaches auth header when token provided', async () => {
    const articles = await getArticles('tok123');
    expect((articles[0] as unknown as Record<string, unknown>)['_auth']).toBe('Bearer tok123');
  });
});

describe('getArticle', () => {
  it('returns single article', async () => {
    const article = await getArticle('my-article');
    expect(article.article_id).toBe('a1');
  });

  it('throws ApiError on 404', async () => {
    await expect(getArticle('not-found')).rejects.toBeInstanceOf(ApiError);
    await expect(getArticle('not-found')).rejects.toHaveProperty('status', 404);
  });
});

describe('getBranches', () => {
  it('returns list of branches', async () => {
    const branches = await getBranches();
    expect(branches).toHaveLength(1);
    expect(branches[0]?.branch_name).toBe('main');
  });
});

describe('getBranchVersions', () => {
  it('returns list of versions', async () => {
    const versions = await getBranchVersions('b1');
    expect(versions).toHaveLength(1);
    expect(versions[0]?.version_id).toBe('v1');
  });
});

describe('saveArticleVersion', () => {
  it('posts to the correct URL', async () => {
    const version = await saveArticleVersion({
      article_title: 'My Article',
      article_url: 'my-article',
      branch_name: 'main',
    });
    expect(version.version_id).toBe('v1');
  });
});

describe('publishBranch', () => {
  it('sends PUT request', async () => {
    await expect(publishBranch('my-article', 'main')).resolves.toBeUndefined();
  });
});

describe('togglePublicVisibility', () => {
  it('sends PUT request', async () => {
    await expect(togglePublicVisibility('my-article', true)).resolves.toBeUndefined();
  });
});
