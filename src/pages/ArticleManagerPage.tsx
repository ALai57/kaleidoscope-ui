import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { NavBar } from '../components/layout/NavBar';
import { LoadingScreen } from '../components/layout/LoadingScreen';
import { Table } from '../components/layout/Table';
import { useAuth } from '../auth/useAuth';
import { getBranches, publishBranch, togglePublicVisibility } from '../api/articles';
import { getGroups, getAudiencesForArticle, addAudience, deleteAudience } from '../api/groups';
import type { ArticleBranch } from '../types/article';
import type { Group } from '../types/group';

// ── Row type ───────────────────────────────────────────────────────────────

interface BranchRow extends ArticleBranch {
  id: string;
}

function toBranchRow(branch: ArticleBranch): BranchRow {
  return { ...branch, id: branch.branch_id };
}

// ── Visibility modal ───────────────────────────────────────────────────────

interface VisibilityModalProps {
  row: BranchRow;
  token: string | undefined;
  onClose: () => void;
}

const VisibilityModal: React.FC<VisibilityModalProps> = ({ row, token, onClose }) => {
  const queryClient = useQueryClient();
  const [mode, setMode] = useState<'public' | 'audience'>(
    row.public_visibility ? 'public' : 'audience'
  );

  const { data: audiences = [] } = useQuery({
    queryKey: ['audiences', row.article_id],
    queryFn: () => getAudiencesForArticle(row.article_id, token),
  });

  const { data: groups = [] } = useQuery({
    queryKey: ['groups'],
    queryFn: () => getGroups(token),
  });

  const visibilityMutation = useMutation({
    mutationFn: (visible: boolean) => togglePublicVisibility(row.article_url, visible, token),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ['branches'] }),
  });

  const addMutation = useMutation({
    mutationFn: (groupId: string) => addAudience(row.article_id, groupId, token),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ['audiences', row.article_id] }),
  });

  const removeMutation = useMutation({
    mutationFn: (audienceId: string) => deleteAudience(audienceId, token),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ['audiences', row.article_id] }),
  });

  const handleModeChange = (newMode: 'public' | 'audience') => {
    setMode(newMode);
    visibilityMutation.mutate(newMode === 'public');
  };

  const audienceGroupIds = new Set(audiences.map((a) => a.group_id));
  const availableGroups = groups.filter((g: Group) => !audienceGroupIds.has(g.group_id));

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Visibility — {row.article_title ?? row.article_url}</DialogTitle>
      <DialogContent>
        <RadioGroup
          value={mode}
          onChange={(e) => handleModeChange(e.target.value as 'public' | 'audience')}
        >
          <FormControlLabel value="public" control={<Radio />} label="Public — anyone can view" />
          <FormControlLabel value="audience" control={<Radio />} label="Audience — restricted to selected groups" />
        </RadioGroup>

        {mode === 'audience' && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2" gutterBottom>Current audiences</Typography>
            {audiences.length === 0 ? (
              <Typography variant="body2" color="text.secondary">No audiences — article is private.</Typography>
            ) : (
              <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 1 }}>
                {audiences.map((a) => {
                  const group = groups.find((g: Group) => g.group_id === a.group_id);
                  return (
                    <Chip
                      key={a.id}
                      label={group?.display_name ?? a.group_id}
                      onDelete={() => removeMutation.mutate(a.id)}
                      disabled={removeMutation.isPending}
                    />
                  );
                })}
              </Stack>
            )}

            {availableGroups.length > 0 && (
              <>
                <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>Add audience</Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {availableGroups.map((g: Group) => (
                    <Chip
                      key={g.group_id}
                      label={g.display_name}
                      variant="outlined"
                      onClick={() => addMutation.mutate(g.group_id)}
                      disabled={addMutation.isPending}
                    />
                  ))}
                </Stack>
              </>
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Done</Button>
      </DialogActions>
    </Dialog>
  );
};

// ── Page ───────────────────────────────────────────────────────────────────

const ArticleManagerPage: React.FC = () => {
  const navigate = useNavigate();
  const { token, isAuthenticated, userProfile, login, logout } = useAuth();
  const queryClient = useQueryClient();
  const [visibilityRow, setVisibilityRow] = useState<BranchRow | null>(null);

  const user = userProfile
    ? {
        firstName: userProfile.firstName ?? undefined,
        lastName: userProfile.lastName ?? undefined,
        realm_access: userProfile.realm_access,
      }
    : undefined;

  const { data: branches = [], isLoading } = useQuery({
    queryKey: ['branches'],
    queryFn: () => getBranches(token),
  });

  const publishMutation = useMutation({
    mutationFn: ({ articleUrl, branchName }: { articleUrl: string; branchName: string }) =>
      publishBranch(articleUrl, branchName, token),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['branches'] });
    },
  });

  const columns: GridColDef[] = [
    { field: 'article_title', headerName: 'Title', flex: 1 },
    { field: 'article_url', headerName: 'URL', width: 180 },
    { field: 'branch_name', headerName: 'Branch', width: 100 },
    {
      field: 'published_at',
      headerName: 'Published',
      width: 130,
      renderCell: (params) => {
        const val = params.value as string | null | undefined;
        return val ? new Date(val).toLocaleDateString() : <em style={{ color: '#999' }}>Unpublished</em>;
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 300,
      sortable: false,
      renderCell: (params) => {
        const row = params.row as BranchRow;
        return (
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', height: '100%' }}>
            <Button
              size="small"
              variant="outlined"
              onClick={() => navigate(`/articles/${row.article_url}/edit`)}
            >
              Edit
            </Button>
            {!row.published_at && (
              <Button
                size="small"
                variant="outlined"
                color="success"
                onClick={() =>
                  publishMutation.mutate({
                    articleUrl: row.article_url,
                    branchName: row.branch_name,
                  })
                }
              >
                Publish
              </Button>
            )}
            <Button
              size="small"
              variant="outlined"
              color="warning"
              onClick={() => setVisibilityRow(row)}
            >
              Visibility
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <NavBar user={user} isAuthenticated={isAuthenticated} login={login} logout={logout} />
      <Box id="primary-content" sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4">Article Manager</Typography>
          <Button variant="contained" onClick={() => navigate('/articles/new')}>
            New Article
          </Button>
        </Box>

        {isLoading && <LoadingScreen />}

        {!isLoading && (
          <>
            <Box sx={{ mb: 1 }}>
              <Chip label={`${branches.length} branches`} size="small" />
            </Box>
            <Table
              rows={branches.map(toBranchRow)}
              columns={columns}
              maxWidth={900}
            />
          </>
        )}
      </Box>

      {visibilityRow && (
        <VisibilityModal
          row={visibilityRow}
          token={token}
          onClose={() => setVisibilityRow(null)}
        />
      )}
    </Box>
  );
};

export default ArticleManagerPage;
