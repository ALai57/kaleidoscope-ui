import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { NavBar } from '../components/layout/NavBar';
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
];

// ── Manager card ───────────────────────────────────────────────────────────

const ManagerCard: React.FC<{ capability: Capability }> = ({ capability }) => (
  <Box
    sx={{
      display: 'flex',
      '& > :not(style)': { m: 1, width: 256, height: 256 },
    }}
  >
    <Card elevation={10}>
      <CardActionArea
        component={Link}
        to={capability.to}
        aria-label={capability.name}
      >
        <CardMedia
          component="img"
          src={capability.src}
          alt={capability.alt}
          sx={{ width: '100%', height: '142px', objectFit: 'contain', bgcolor: 'primary.main', p: 2 }}
        />
        <CardContent>
          <Typography variant="h5">{capability.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {capability.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
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
    <Box id="primary-content" sx={{ minHeight: '100vh' }}>
      <NavBar user={user} isAuthenticated={isAuthenticated} login={login} logout={logout} />
      <br />
      <br />

      <Container>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          {CAPABILITIES.map((capability) => (
            <ManagerCard key={capability.name} capability={capability} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default ManagerPage;
