import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { AdminLayout } from '../components/layout/AdminLayout';
import { Button } from '../components/layout/Button';
import { SurfaceCard } from '../components/common/SurfaceCard';
import { useAuth } from '../auth/useAuth';

// ── Panel heading ────────────────────────────────────────────────────────────

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
    <AdminLayout title="Admin" user={user} isAuthenticated={isAuthenticated} login={login}>
      <Box id="primary-content">
        <Container>
          {!isLoading &&
            (isAuthenticated ? (
              <AdminPanel firstName={user?.firstName} lastName={user?.lastName} onLogout={logout} />
            ) : (
              <LoginPanel onLogin={login} />
            ))}
        </Container>
      </Box>
    </AdminLayout>
  );
};

export default AdminPage;
