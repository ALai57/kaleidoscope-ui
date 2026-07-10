import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SurfaceCard } from '../common/SurfaceCard';
import { SectionHeading } from '../common/SectionHeading';
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

const PortfolioCardItem: React.FC<{ card: PortfolioCard }> = ({ card }) => {
  // The shared card surface (token radius/border/hover). SurfaceCard is a plain
  // FC, so the link wraps it rather than being rendered `as` the card.
  const inner = (
    <SurfaceCard
      interactive
      sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
    >
      {card.imageSrc && (
        <Box
          component="img"
          src={card.imageSrc}
          alt={card.title}
          sx={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }}
        />
      )}
      <Box sx={{ p: 2, flexGrow: 1 }}>
        {card.date && (
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
            {new Date(card.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </Typography>
        )}
        <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>
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
      </Box>
    </SurfaceCard>
  );

  return card.href ? (
    <RouterLink to={card.href} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      {inner}
    </RouterLink>
  ) : (
    inner
  );
};

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
      <SectionHeading
        title="Recent Writing"
        action={
          <Link component={RouterLink} to="/archive" variant="body2">
            View all →
          </Link>
        }
      />
      <Grid container spacing={2}>
        {cards.map((card) => (
          <Grid key={card.id} item xs={12} sm={6} md={4}>
            <PortfolioCardItem card={card} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
