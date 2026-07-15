import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { NavBar } from '../components/layout/NavBar';
import { Button } from '../components/layout/Button';
import { SurfaceCard } from '../components/common/SurfaceCard';
import { PrismThemeProvider } from '../components/prism';
import { useAuth } from '../auth/useAuth';

// ── Eyebrow header ──────────────────────────────────────────────────────────

const eyebrowSx = (t: import('@mui/material/styles').Theme) => ({
  m: 0,
  fontFamily: t.tokens?.typography.mono ?? 'monospace',
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.22em',
  textTransform: 'uppercase' as const,
  color: 'primary.main',
});

const PanelHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Typography
    variant="h4"
    sx={(t) => ({ fontFamily: t.tokens?.typography.mono ?? 'monospace', fontWeight: 700 })}
  >
    {children}
  </Typography>
);

// ── Admin panel (authenticated view) ──────────────────────────────────────

const AdminPanel: React.FC<{
  firstName: string | undefined;
  lastName: string | undefined;
  onLogout: () => void;
}> = ({ firstName, lastName, onLogout }) => (
  <SurfaceCard sx={{ p: 3, maxWidth: 500, mx: 'auto' }} data-testid="admin-panel">
    <Stack spacing={2}>
      <PanelHeading>
        {firstName || lastName ? `Welcome ${firstName ?? ''} ${lastName ?? ''}!` : 'Welcome!'}
      </PanelHeading>
      <Button text="Logout" color="secondary" onClick={onLogout} />
    </Stack>
  </SurfaceCard>
);

// ── Login panel (unauthenticated view) ─────────────────────────────────────

const LoginPanel: React.FC<{ onLogin: () => void }> = ({ onLogin }) => (
  <SurfaceCard sx={{ p: 3, maxWidth: 500, mx: 'auto' }} data-testid="login-panel">
    <Stack spacing={2}>
      <PanelHeading>Welcome!</PanelHeading>
      <Button text="Login" onClick={onLogin} />
    </Stack>
  </SurfaceCard>
);

// ── Page ───────────────────────────────────────────────────────────────────

const AdminPage: React.FC = () => {
  const { isAuthenticated, isLoading, userProfile, login, logout } = useAuth();

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
            <Box component="p" sx={eyebrowSx}>
              SESSION
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
              Admin
            </Typography>
            <Box sx={{ mt: 3 }}>
              {!isLoading &&
                (isAuthenticated ? (
                  <AdminPanel
                    firstName={user?.firstName}
                    lastName={user?.lastName}
                    onLogout={logout}
                  />
                ) : (
                  <LoginPanel onLogin={login} />
                ))}
            </Box>
          </Container>
        </Box>
      </PrismThemeProvider>
    </Box>
  );
};

export default AdminPage;
