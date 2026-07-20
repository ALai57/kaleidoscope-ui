import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import CardActionArea from '@mui/material/CardActionArea';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useTheme, alpha } from '@mui/material/styles';
import { useQuery } from '@tanstack/react-query';
import { AdminLayout } from '../components/layout/AdminLayout';
import { SurfaceCard } from '../components/common/SurfaceCard';
import { StatTile } from '../components/common/StatTile';
import { useAuth } from '../auth/useAuth';
import { getBranches } from '../api/articles';
import { getImageMetadata } from '../api/images';
import { getProjects } from '../api/projects';

// ── Manager capabilities ───────────────────────────────────────────────────

interface Capability {
  name: string;
  description: string;
  src: string;
  alt: string;
  to: string;
}

const CAPABILITIES: Capability[] = [
  {
    name: 'Articles',
    description: 'Create and manage Articles',
    src: '/static/images/writing.svg',
    alt: 'Manage articles',
    to: '/articles',
  },
  {
    name: 'Recipes',
    description: 'Scrape, edit, search, and share Recipes',
    src: '/static/images/writing.svg',
    alt: 'Manage recipes',
    to: '/recipes',
  },
  {
    name: 'Images',
    description: 'Create and manage Images',
    src: '/static/images/images.svg',
    alt: 'Manage images',
    to: '/images',
  },
  {
    name: 'Audiences',
    description: 'Control who has access to your content by defining an Audience',
    src: '/static/images/audiences.svg',
    alt: 'Manage audiences',
    to: '/groups',
  },
  {
    name: 'UI Customization',
    description: 'Customize the look and feel of the site',
    src: '/static/images/audiences.svg',
    alt: 'Manage UI Customization',
    to: '/ui',
  },
  {
    name: 'Projects',
    description: 'Create and manage Projects',
    src: '/static/images/project-management-logo.svg',
    alt: 'Manage projects',
    to: '/projects',
  },
];

// ── Capability card ─────────────────────────────────────────────────────────

const ManagerCard: React.FC<{ capability: Capability }> = ({ capability }) => {
  const theme = useTheme();
  const mono = theme.tokens?.typography.mono ?? 'monospace';
  const dur = theme.tokens?.motion.duration.base ?? 250;
  const ease = theme.tokens?.motion.easing.springSettle ?? 'ease';

  return (
    <SurfaceCard
      interactive
      sx={{
        height: '100%',
        transition: `box-shadow 0.2s ${ease}, transform ${dur}ms ${ease}`,
        // Only translate when the user hasn't asked to reduce motion, so
        // reduced-motion users get no movement at all (not just no easing).
        '@media (prefers-reduced-motion: no-preference)': {
          '&:hover': { transform: 'translateY(-2px)' },
        },
      }}
    >
      <CardActionArea
        component={Link}
        to={capability.to}
        aria-label={capability.name}
        sx={{
          height: '100%',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <Box
          sx={{
            width: 44,
            height: 44,
            mb: 1.5,
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: (t) => alpha(t.palette.primary.main, 0.12),
            border: 1,
            borderColor: (t) => alpha(t.palette.primary.main, 0.3),
          }}
        >
          <Box
            component="img"
            src={capability.src}
            alt={capability.alt}
            sx={{ width: 24, height: 24, objectFit: 'contain' }}
          />
        </Box>
        <Typography
          component="div"
          sx={{ fontFamily: mono, fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.02em' }}
        >
          {capability.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            mt: 0.5,
          }}
        >
          {capability.description}
        </Typography>
      </CardActionArea>
    </SurfaceCard>
  );
};

// ── Live stats strip ────────────────────────────────────────────────────────

const HubStats: React.FC<{ token: string | undefined }> = ({ token }) => {
  const articles = useQuery({ queryKey: ['branches'], queryFn: () => getBranches(token) });
  const images = useQuery({ queryKey: ['images'], queryFn: () => getImageMetadata(token) });
  const projects = useQuery({ queryKey: ['projects'], queryFn: () => getProjects(token) });

  // While a count is loading, show an em-dash rather than a premature 0.
  const tiles = [
    { label: 'Articles', query: articles },
    { label: 'Images', query: images },
    { label: 'Projects', query: projects },
  ];

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
      {tiles.map(({ label, query }) => (
        <StatTile
          key={label}
          label={label}
          value={query.isLoading ? '—' : String((query.data ?? []).length)}
        />
      ))}
    </Box>
  );
};

// ── Page ───────────────────────────────────────────────────────────────────

const ManagerPage: React.FC = () => {
  const { token } = useAuth();

  return (
    <AdminLayout title="Manager">
      <Box id="primary-content">
        <Container>
          <HubStats token={token} />
          <Box
            sx={{
              display: 'grid',
              gap: 2,
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            }}
          >
            {CAPABILITIES.map((capability) => (
              <ManagerCard key={capability.name} capability={capability} />
            ))}
          </Box>
        </Container>
      </Box>
    </AdminLayout>
  );
};

export default ManagerPage;
