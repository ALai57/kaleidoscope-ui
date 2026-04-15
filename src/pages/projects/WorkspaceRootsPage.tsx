import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NavBar } from '../../components/layout/NavBar';
import { WorkspaceRootsSettings } from '../../components/settings/WorkspaceRootsSettings';
import { useAuth } from '../../auth/useAuth';

const WorkspaceRootsPage: React.FC = () => {
  const navigate = useNavigate();
  const { token, isAuthenticated, userProfile, login, logout } = useAuth();

  const user = userProfile
    ? {
        firstName: userProfile.firstName ?? undefined,
        lastName: userProfile.lastName ?? undefined,
        realm_access: userProfile.realm_access,
      }
    : undefined;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <NavBar user={user} isAuthenticated={isAuthenticated} login={login} logout={logout} />

      <Box sx={{ maxWidth: 700, mx: 'auto', px: 3, pt: 3, pb: 8 }}>
        {/* Breadcrumb */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 3 }}>
          <Button
            size="small"
            startIcon={<ArrowBackIcon sx={{ fontSize: '1rem !important' }} />}
            onClick={() => navigate('/projects')}
            sx={{ color: 'text.secondary', fontWeight: 400, px: 0.5, minWidth: 0 }}
          >
            Projects
          </Button>
          <Typography variant="body2" color="text.disabled">/</Typography>
          <Typography variant="body2" color="text.secondary">Workspace Roots</Typography>
        </Box>

        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Workspace Roots
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Register directories where your codebases live. The Engineering Reviewer uses these
            to find and read relevant code when evaluating a project.
          </Typography>
        </Box>

        <Paper variant="outlined" sx={{ p: 2.5 }}>
          <WorkspaceRootsSettings token={token} />
        </Paper>
      </Box>
    </Box>
  );
};

export default WorkspaceRootsPage;
