export interface Article {
  article_id: string;
  article_url: string;
  article_title: string;
  article_tags: string;
  public_visibility: boolean;
  created_at: string;
  content?: string;
  author?: string;
  summary?: string;
}

export interface ArticleBranch {
  branch_id: string;
  branch_name: string;
  article_id: string;
  article_url: string;
  article_title?: string;
  published_at?: string | null;
  public_visibility?: boolean;
}

export interface ArticleVersion {
  version_id: string;
  branch_id: string;
  content: string;
  title: string;
  article_tags?: string;
  created_at: string;
}
