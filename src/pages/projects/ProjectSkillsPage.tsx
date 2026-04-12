import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { ProjectSkill } from '../../types/project';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { NavBar } from '../../components/layout/NavBar';
import { SkillTree } from '../../components/projects/SkillTree';
import { useAuth } from '../../auth/useAuth';
import { getProject, getSkillTree, generateSkills, updateSkill } from '../../api/projects';
import type { SkillStatus } from '../../types/project';

const ProjectSkillsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { token, isAuthenticated, userProfile, login, logout } = useAuth();
  const queryClient = useQueryClient();

  const user = userProfile
    ? {
        firstName: userProfile.firstName ?? undefined,
        lastName: userProfile.lastName ?? undefined,
        realm_access: userProfile.realm_access,
      }
    : undefined;

  const { data: project } = useQuery({
    queryKey: ['projects', id],
    queryFn: () => getProject(id!, token),
    enabled: !!id,
  });

  const { data: skills = [], isLoading: isLoadingSkills } = useQuery({
    queryKey: ['projects', id, 'skills'],
    queryFn: () => getSkillTree(id!, token),
    enabled: !!id,
  });

  const generateMutation = useMutation({
    mutationFn: () => generateSkills(id!, token),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ['projects', id, 'skills'] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ skillId, status }: { skillId: string; status: string }) =>
      updateSkill(id!, skillId, { status }, token),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ['projects', id, 'skills'] }),
  });

  const handleToggle = (skillId: string, newStatus: SkillStatus) => {
    updateMutation.mutate({ skillId, status: newStatus });
  };

  // Mastery stats
  const allSkills = flattenSkills(skills);
  const masteredCount = allSkills.filter((s) => s.status === 'mastered').length;
  const learningCount = allSkills.filter((s) => s.status === 'learning').length;
  const totalCount = allSkills.length;

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <NavBar user={user} isAuthenticated={isAuthenticated} login={login} logout={logout} />

      <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            size="small"
            onClick={() => navigate(`/projects/${id}`)}
          >
            Back
          </Button>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {project?.title ?? 'Skills'} — Skill Tree
          </Typography>
        </Box>

        {/* Stats + generate */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          {totalCount > 0 && (
            <Stack direction="row" spacing={2}>
              <Typography variant="body2" color="text.secondary">
                {masteredCount}/{totalCount} mastered
              </Typography>
              <Typography variant="body2" color="primary.main">
                {learningCount} in progress
              </Typography>
            </Stack>
          )}

          <Button
            variant="contained"
            startIcon={
              generateMutation.isPending ? <CircularProgress size={16} /> : <AutoFixHighIcon />
            }
            onClick={() => generateMutation.mutate()}
            disabled={generateMutation.isPending}
          >
            {skills.length > 0 ? 'Regenerate Skills' : 'Generate Skills'}
          </Button>
        </Box>

        {generateMutation.isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Failed to generate skills. Please try again.
          </Alert>
        )}

        {isLoadingSkills ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Paper variant="outlined" sx={{ p: 2 }}>
            <SkillTree skills={skills} onToggle={handleToggle} />
          </Paper>
        )}
      </Box>
    </Box>
  );
};

function flattenSkills(skills: ProjectSkill[]): ProjectSkill[] {
  const result: ProjectSkill[] = [];
  const stack = [...skills];
  while (stack.length) {
    const node = stack.pop()!;
    result.push(node);
    if (node.children?.length) stack.push(...node.children);
  }
  return result;
}

export default ProjectSkillsPage;
