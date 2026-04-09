import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Article } from '../../types/article';

// ── Types ──────────────────────────────────────────────────────────────────

export interface PortfolioCard {
  id: string;
  title: string;
  description?: string | undefined;
  tags?: string[] | undefined;
  imageSrc?: string | undefined;
  href?: string | undefined;
  date?: string | undefined;
}

export interface PortfolioSectionProps {
  /** Cards to display. Falls back to recent articles if not provided. */
  portfolioCards?: PortfolioCard[] | undefined;
  /** Recent articles shown as portfolio cards when portfolioCards is absent. */
  recentArticles?: Article[] | undefined;
  /** Maximum number of cards to show. Defaults to 6. */
  limit?: number | undefined;
}

// ── Helper ─────────────────────────────────────────────────────────────────

function articleToCard(article: Article): PortfolioCard {
  return {
    id: article.article_id,
    title: article.article_title,
    tags: article.article_tags ? [article.article_tags] : [],
    href: `/content/${article.article_url}`,
    date: article.created_at,
  };
}

// ── Sub-component ──────────────────────────────────────────────────────────

const PortfolioCardItem: React.FC<{ card: PortfolioCard }> = ({ card }) => (
  <Card
    elevation={3}
    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    component={card.href ? 'a' : 'div'}
    href={card.href}
    style={{ textDecoration: 'none' }}
  >
    {card.imageSrc && (
      <CardMedia
        component="img"
        height="140"
        image={card.imageSrc}
        alt={card.title}
      />
    )}
    <CardContent sx={{ flexGrow: 1 }}>
      {card.date && (
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
          {new Date(card.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </Typography>
      )}
      <Typography variant="h6" gutterBottom>
        {card.title}
      </Typography>
      {card.description && (
        <Typography variant="body2" color="text.secondary">
          {card.description}
        </Typography>
      )}
      {card.tags && card.tags.length > 0 && (
        <Stack direction="row" spacing={0.5} flexWrap="wrap" sx={{ mt: 1 }}>
          {card.tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" />
          ))}
        </Stack>
      )}
    </CardContent>
  </Card>
);

// ── Component ──────────────────────────────────────────────────────────────

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  portfolioCards,
  recentArticles = [],
  limit = 6,
}) => {
  const cards = (portfolioCards ?? recentArticles.map(articleToCard)).slice(0, limit);

  if (cards.length === 0) {
    return null;
  }

  return (
    <Box sx={{ width: '100%', py: 2 }}>
      <Typography variant="h4" gutterBottom>
        Recent Writing
      </Typography>
      <Grid container spacing={2}>
        {cards.map((card) => (
          <Grid key={card.id} item xs={12} sm={6} md={4}>
            <PortfolioCardItem card={card} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Link href="/archive" variant="body2">
          View all articles →
        </Link>
      </Box>
    </Box>
  );
};
