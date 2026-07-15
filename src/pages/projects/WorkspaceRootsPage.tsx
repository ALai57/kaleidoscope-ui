import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { WorkspaceRootsSettings } from '../../components/settings/WorkspaceRootsSettings';
import { useAuth } from '../../auth/useAuth';

const WorkspaceRootsPage: React.FC = () => {
  const { token, isAuthenticated, userProfile, login } = useAuth();

  const user = userProfile
    ? {
        firstName: userProfile.firstName ?? undefined,
        lastName: userProfile.lastName ?? undefined,
        realm_access: userProfile.realm_access,
      }
    : undefined;

  return (
    <AdminLayout title="Workspace Roots" user={user} isAuthenticated={isAuthenticated} login={login}>
      <Box sx={{ maxWidth: 700, mx: 'auto', pb: 5 }}>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            mb: 3
          }}>
          Register directories where your codebases live. The Engineering Reviewer uses these to
          find and read relevant code when evaluating a project.
        </Typography>

        <Paper variant="outlined" sx={{ p: 2.5 }}>
          <WorkspaceRootsSettings token={token} />
        </Paper>
      </Box>
    </AdminLayout>
  );
};

export default WorkspaceRootsPage;
