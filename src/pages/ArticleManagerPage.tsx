import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { NavBar } from '../components/layout/NavBar';
import { LoadingScreen } from '../components/layout/LoadingScreen';
import { Table } from '../components/layout/Table';
import { useAuth } from '../auth/useAuth';
import { getBranches, publishBranch, togglePublicVisibility } from '../api/articles';
import type { ArticleBranch } from '../types/article';

// ── Row type ───────────────────────────────────────────────────────────────

interface BranchRow extends ArticleBranch {
  id: string;
}

function toBranchRow(branch: ArticleBranch): BranchRow {
  return { ...branch, id: branch.branch_id };
}

// ── Page ───────────────────────────────────────────────────────────────────

const ArticleManagerPage: React.FC = () => {
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

  const visibilityMutation = useMutation({
    mutationFn: ({
      articleUrl,
      visible,
    }: {
      articleUrl: string;
      visible: boolean;
    }) => togglePublicVisibility(articleUrl, visible, token),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['branches'] });
    },
  });

  const columns: GridColDef[] = [
    { field: 'article_url', headerName: 'Article URL', flex: 1 },
    { field: 'branch_name', headerName: 'Branch', width: 120 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 320,
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
            <Button
              size="small"
              variant="outlined"
              color="warning"
              onClick={() =>
                visibilityMutation.mutate({
                  articleUrl: row.article_url,
                  visible: true,
                })
              }
            >
              Show
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
        <Typography variant="h4" gutterBottom>
          Article Manager
        </Typography>

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
    </Box>
  );
};

export default ArticleManagerPage;
