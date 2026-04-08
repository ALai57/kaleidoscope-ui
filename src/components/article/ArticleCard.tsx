import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import { useTheme } from '@mui/material/styles';

const ICON_MAP: Record<string, string> = {
  research: '/static/images/nav-bar/neuron-icon.svg',
  archive: '/static/images/nav-bar/archive-icon.svg',
  about: '/static/images/nav-bar/andrew-silhouette-icon.svg',
  thoughts: '/static/images/nav-bar/andrew-head-icon.svg',
};

function tagToIcon(tag?: string): string {
  return ICON_MAP[tag ?? ''] ?? '/images/nav-bar/unknown-user.svg';
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export interface ArticleCardProps {
  articleTags?: string | undefined;
  articleTitle?: string | undefined;
  articleUrl?: string | undefined;
  articleId?: string | undefined;
  createdAt?: string | undefined;
  summary?: string | undefined;
  publishedAt?: string | undefined;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  articleTags,
  articleTitle,
  articleUrl,
  createdAt,
  summary,
}) => {
  const theme = useTheme();
  const primaryMain = (theme.palette as unknown as Record<string, Record<string, string>>)
    ?.primary?.main;
  const accentMain = (theme.palette as unknown as Record<string, Record<string, string>>)
    ?.accent?.main;

  const gradientBg =
    primaryMain && accentMain
      ? `linear-gradient(30deg, ${primaryMain} 6%, ${accentMain} 100%)`
      : undefined;

  return (
    <Card className="text-white bg-light mb-3 article-card">
      <div className="container-fluid">
        <div className="row">
          <div
            className="text-xs-center card-icon"
            style={{ background: gradientBg }}
          >
            <div className="p-y-2">
              <h1 className="p-y-2">
                <img
                  className="fa fa-2x"
                  src={tagToIcon(articleTags)}
                  alt={articleTags}
                  style={{ width: '100%' }}
                />
              </h1>
            </div>
          </div>
          <div className="col-sm-9 text-dark card-description">
            <h5 className="card-title">
              <a href={`#/content/${articleUrl}`}>{articleTitle}</a>
            </h5>
            <p className="card-text">{formatDate(createdAt)}</p>
            {summary && <p className="card-text">{summary}</p>}
          </div>
        </div>
      </div>
    </Card>
  );
};

export interface ThinArticleCardBranch {
  branchName: string;
  branchId: string;
  createdAt?: string | undefined;
  publishedAt?: string | undefined;
}

export interface ThinArticleCardProps {
  articleTags?: string | undefined;
  articleTitle?: string | undefined;
  articleUrl?: string | undefined;
  articleId?: string | undefined;
  branches?: ThinArticleCardBranch[] | undefined;
  onBranchClick?: ((branch: ThinArticleCardBranch & { articleId?: string }) => void) | undefined;
}

export const ThinArticleCard: React.FC<ThinArticleCardProps> = ({
  articleTags,
  articleTitle,
  articleUrl: _articleUrl,
  articleId,
  branches = [],
  onBranchClick,
}) => {
  const latestPublished = branches
    .map((b) => b.publishedAt)
    .filter(Boolean)
    .sort()
    .pop();
  const latestCreated = branches
    .map((b) => b.createdAt)
    .filter(Boolean)
    .sort()
    .pop();

  const dateLabel = latestPublished
    ? `PUB: ${formatDate(latestPublished)}`
    : latestCreated
    ? `NEW: ${formatDate(latestCreated)}`
    : '';

  const truncate = (str = '', chars: number): string => {
    if (str.length <= chars) return str + '\n';
    return str.slice(0, chars - 3) + '...';
  };

  return (
    <Card className="text-white bg-light thin-article-card zoom-card-icon">
      <CardActionArea>
        <div
          className="container-fluid"
          style={{ padding: '0px', height: '50px' }}
        >
          <div className="row flex-items-xs-middle" style={{ margin: '0px' }}>
            <div
              className="col-sm-1 bg-primary text-xs-center thin-card-icon"
              style={{ padding: '0px' }}
            >
              <img
                className="fa fa-2x"
                src={tagToIcon(articleTags)}
                alt={articleTags}
                style={{
                  width: '100%',
                  maxHeight: '50px',
                  padding: '3px',
                  height: '100%',
                }}
              />
            </div>
            <div className="col bg-light text-dark thin-card-description">
              <h6 style={{ margin: '0px' }}>{truncate(articleTitle, 66)}</h6>
              <p className="card-text" style={{ color: 'darkgray' }}>
                {dateLabel}
              </p>
            </div>
          </div>
        </div>
      </CardActionArea>
      {branches.map((branch) => (
        <div key={branch.branchName}>
          <button
            style={{ borderRadius: '35px', margin: '4px' }}
            onClick={() => {
              if (articleId !== undefined) {
                onBranchClick?.({ ...branch, articleId });
              } else {
                onBranchClick?.(branch);
              }
            }}
          >
            {branch.branchName}
          </button>
        </div>
      ))}
    </Card>
  );
};
