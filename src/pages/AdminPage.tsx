import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { NavBar } from '../components/layout/NavBar';
import { Button } from '../components/layout/Button';
import { useAuth } from '../auth/useAuth';

// ── Admin panel (authenticated view) ──────────────────────────────────────

const AdminPanel: React.FC<{
  firstName: string | undefined;
  lastName: string | undefined;
  onLogout: () => void;
}> = ({ firstName, lastName, onLogout }) => (
  <Box
    sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}
    data-testid="admin-panel"
  >
    <Paper elevation={3} sx={{ padding: '15px', display: 'block', flexGrow: 1, maxWidth: '500px' }}>
      <Stack spacing={2}>
        <Typography variant="h3">
          {firstName || lastName ? `Welcome ${firstName ?? ''} ${lastName ?? ''}!` : 'Welcome!'}
        </Typography>
        <br />
        <Button text="Logout" color="secondary" onClick={onLogout} />
      </Stack>
    </Paper>
  </Box>
);

// ── Login panel (unauthenticated view) ─────────────────────────────────────

const LoginPanel: React.FC<{ onLogin: () => void }> = ({ onLogin }) => (
  <Box
    sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}
    data-testid="login-panel"
  >
    <Paper elevation={3} sx={{ padding: '15px', display: 'block', flexGrow: 1, maxWidth: '500px' }}>
      <Stack spacing={2}>
        <Typography variant="h3">Welcome!</Typography>
        <br />
        <Button text="Login" onClick={onLogin} />
      </Stack>
    </Paper>
  </Box>
);

// ── Page ───────────────────────────────────────────────────────────────────

const AdminPage: React.FC = () => {
  const { isAuthenticated, isLoading, token, userProfile, login, logout } = useAuth();

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

      {!isLoading && (isAuthenticated ? (
        <AdminPanel
          firstName={user?.firstName}
          lastName={user?.lastName}
          onLogout={logout}
        />
      ) : (
        <LoginPanel onLogin={login} />
      ))}
    </Box>
  );
};

export default AdminPage;
