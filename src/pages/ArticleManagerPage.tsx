import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueries, useMutation, useQueryClient } from '@tanstack/react-query';
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
import { GridToolbarContainer } from '@mui/x-data-grid';
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

// ── Table toolbar ──────────────────────────────────────────────────────────

interface ArticleToolbarProps {
  onNewArticle: () => void;
  branchCount: number;
}

const ArticleToolbar: React.FC<ArticleToolbarProps> = ({ onNewArticle, branchCount }) => (
  <GridToolbarContainer sx={{ px: 2, py: 1, justifyContent: 'space-between' }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography variant="h6">Article Manager</Typography>
      <Chip label={`${branchCount} branches`} size="small" />
    </Box>
    <Button variant="contained" size="small" onClick={onNewArticle}>
      New Article
    </Button>
  </GridToolbarContainer>
);

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

  const { data: groups = [] } = useQuery({
    queryKey: ['groups'],
    queryFn: () => getGroups(token),
  });

  const audienceQueries = useQueries({
    queries: branches.map((b) => ({
      queryKey: ['audiences', b.article_id],
      queryFn: () => getAudiencesForArticle(b.article_id, token),
    })),
  });

  const audiencesByArticle = useMemo(() => {
    const map = new Map<string, string[]>();
    branches.forEach((b, i) => {
      const audiences = audienceQueries[i]?.data ?? [];
      const names = audiences.map((a) => {
        const group = groups.find((g: Group) => g.group_id === a.group_id);
        return group?.display_name ?? a.group_id;
      });
      map.set(b.article_id, names);
    });
    return map;
  }, [audienceQueries, branches, groups]);

  const publishMutation = useMutation({
    mutationFn: ({ articleUrl, branchName }: { articleUrl: string; branchName: string }) =>
      publishBranch(articleUrl, branchName, token),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['branches'] });
    },
  });

  const columns: GridColDef[] = [
    { field: 'article_title', headerName: 'Title', flex: 1, minWidth: 160 },
    { field: 'article_url', headerName: 'URL', width: 160 },
    { field: 'branch_name', headerName: 'Branch', width: 90 },
    {
      field: 'published_at',
      headerName: 'Published',
      width: 120,
      renderCell: (params) => {
        const val = params.value as string | null | undefined;
        return val ? new Date(val).toLocaleDateString() : <em style={{ color: '#999' }}>Unpublished</em>;
      },
    },
    {
      field: 'public_visibility',
      headerName: 'Visibility',
      width: 110,
      renderCell: (params) => {
        const row = params.row as BranchRow;
        const isPublic = params.value as boolean;
        return (
          <Chip
            label={isPublic ? 'Public' : 'Audience'}
            color={isPublic ? 'success' : 'warning'}
            size="small"
            onClick={() => setVisibilityRow(row)}
            sx={{ cursor: 'pointer' }}
          />
        );
      },
    },
    {
      field: 'groups',
      headerName: 'Groups',
      flex: 1,
      minWidth: 120,
      sortable: false,
      renderCell: (params) => {
        const row = params.row as BranchRow;
        const groupNames = audiencesByArticle.get(row.article_id) ?? [];
        if (!groupNames.length) {
          return <em style={{ color: '#999' }}>—</em>;
        }
        return (
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', alignItems: 'center', height: '100%' }}>
            {groupNames.map((name) => (
              <Chip key={name} label={name} size="small" variant="outlined" />
            ))}
          </Box>
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 180,
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
          </Box>
        );
      },
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <NavBar user={user} isAuthenticated={isAuthenticated} login={login} logout={logout} />
      <Box id="primary-content" sx={{ p: 3 }}>
        {isLoading && <LoadingScreen />}

        {!isLoading && (
          <Table
            rows={branches.map(toBranchRow)}
            columns={columns}
            maxWidth={1200}
            rowHeight={44}
            Toolbar={ArticleToolbar as React.ComponentType}
            toolbarProps={{ onNewArticle: () => navigate('/articles/new'), branchCount: branches.length }}
          />
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
