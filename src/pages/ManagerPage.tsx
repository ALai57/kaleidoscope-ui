import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import CardActionArea from '@mui/material/CardActionArea';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useTheme, alpha } from '@mui/material/styles';
import { NavBar } from '../components/layout/NavBar';
import { SurfaceCard } from '../components/common/SurfaceCard';
import { PrismThemeProvider } from '../components/prism';
import { useAuth } from '../auth/useAuth';

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
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {capability.description}
        </Typography>
      </CardActionArea>
    </SurfaceCard>
  );
};

// ── Eyebrow header ──────────────────────────────────────────────────────────

const HubHeader: React.FC = () => (
  <Box sx={{ mb: 3 }}>
    <Box
      component="p"
      sx={(t) => ({
        m: 0,
        fontFamily: t.tokens?.typography.mono ?? 'monospace',
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'primary.main',
      })}
    >
      CONTROL
    </Box>
    <Typography
      component="h1"
      sx={(t) => ({
        m: 0,
        mt: 0.5,
        fontFamily: t.tokens?.typography.mono ?? 'monospace',
        fontWeight: 700,
        fontSize: '1.6rem',
        letterSpacing: '-0.01em',
      })}
    >
      Manager
    </Typography>
  </Box>
);

// ── Page ───────────────────────────────────────────────────────────────────

const ManagerPage: React.FC = () => {
  const { isAuthenticated, userProfile, login, logout } = useAuth();

  const user = userProfile
    ? {
        firstName: userProfile.firstName ?? undefined,
        lastName: userProfile.lastName ?? undefined,
        realm_access: userProfile.realm_access,
      }
    : undefined;

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavBar user={user} isAuthenticated={isAuthenticated} login={login} logout={logout} />
      <PrismThemeProvider>
        <Box id="primary-content" sx={{ flex: 1, bgcolor: 'background.default', py: 4 }}>
          <Container>
            <HubHeader />
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
      </PrismThemeProvider>
    </Box>
  );
};

export default ManagerPage;
