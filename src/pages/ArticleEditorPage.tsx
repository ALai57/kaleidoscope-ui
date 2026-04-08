import React, { useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { NavBar } from '../components/layout/NavBar';
import { LoadingScreen } from '../components/layout/LoadingScreen';
import { RichTextEditor } from '../components/editor/RichTextEditor';
import { useKeycloak } from '../auth/useKeycloak';
import { useEditorStore } from '../store/editorStore';
import { getBranches, getBranchVersions, saveArticleVersion, publishBranch } from '../api/articles';
import { getImageMetadata } from '../api/images';
import type { ArticleBranch } from '../types/article';

// ── Page ───────────────────────────────────────────────────────────────────

const ArticleEditorPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { token, isAuthenticated, userProfile, login, logout } = useKeycloak();
  const queryClient = useQueryClient();
  const { editorBranchId, setEditorBranchId } = useEditorStore();

  // Capture current editor HTML via ref callback
  const editorHtmlRef = useRef<string>('');

  const user = userProfile
    ? {
        firstName: userProfile.firstName ?? undefined,
        lastName: userProfile.lastName ?? undefined,
      }
    : undefined;

  // ── Fetch branches ─────────────────────────────────────────────────────

  const { data: branches = [], isLoading: branchesLoading } = useQuery({
    queryKey: ['branches'],
    queryFn: () => getBranches(token),
  });

  // Filter branches for this article if slug provided
  const articleBranches: ArticleBranch[] = slug
    ? branches.filter((b) => b.article_url === slug)
    : branches;

  // Derive selected branch
  const selectedBranch =
    articleBranches.find((b) => b.branch_id === editorBranchId) ?? articleBranches[0] ?? null;

  // ── Fetch images ───────────────────────────────────────────────────────

  const { data: images = [] } = useQuery({
    queryKey: ['images'],
    queryFn: () => getImageMetadata(token),
  });

  // ── Fetch version for selected branch ─────────────────────────────────

  const { data: versions = [], isLoading: versionsLoading } = useQuery({
    queryKey: ['versions', selectedBranch?.branch_id],
    queryFn: () => getBranchVersions(selectedBranch!.branch_id, token),
    enabled: selectedBranch !== null,
  });

  const latestVersion = versions[0] ?? null;

  // ── Mutations ──────────────────────────────────────────────────────────

  const saveMutation = useMutation({
    mutationFn: () =>
      saveArticleVersion(
        {
          article_title: latestVersion?.title ?? selectedBranch?.article_url ?? 'Untitled',
          ...(selectedBranch?.article_url !== undefined
            ? { article_url: selectedBranch.article_url }
            : {}),
          ...(selectedBranch?.branch_name !== undefined
            ? { branch_name: selectedBranch.branch_name }
            : {}),
          content: editorHtmlRef.current,
          article_tags: 'thoughts',
        },
        token
      ),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['versions', selectedBranch?.branch_id] });
    },
  });

  const publishMutation = useMutation({
    mutationFn: () =>
      publishBranch(
        selectedBranch?.article_url ?? '',
        selectedBranch?.branch_name ?? 'main',
        token
      ),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['branches'] });
    },
  });

  const handleEditorChange = useCallback((html: string) => {
    editorHtmlRef.current = html;
  }, []);

  // ── Render ─────────────────────────────────────────────────────────────

  const isLoading = branchesLoading || versionsLoading;

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <NavBar user={user} isAuthenticated={isAuthenticated} login={login} logout={logout} />
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Article Editor
        </Typography>

        {isLoading && <LoadingScreen />}

        {!branchesLoading && (
          <>
            {/* Branch selector */}
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
              <FormControl size="small" sx={{ minWidth: 200 }}>
                <InputLabel>Branch</InputLabel>
                <Select
                  value={selectedBranch?.branch_id ?? ''}
                  label="Branch"
                  onChange={(e) => setEditorBranchId(e.target.value)}
                  data-testid="branch-selector"
                >
                  {articleBranches.map((branch) => (
                    <MenuItem key={branch.branch_id} value={branch.branch_id}>
                      {branch.article_url} / {branch.branch_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                variant="contained"
                onClick={() => saveMutation.mutate()}
                disabled={saveMutation.isPending || !selectedBranch}
                data-testid="save-button"
              >
                {saveMutation.isPending ? 'Saving…' : 'Save'}
              </Button>

              <Button
                variant="outlined"
                color="success"
                onClick={() => publishMutation.mutate()}
                disabled={publishMutation.isPending || !selectedBranch}
                data-testid="publish-button"
              >
                {publishMutation.isPending ? 'Publishing…' : 'Publish'}
              </Button>
            </Stack>

            <Divider sx={{ mb: 2 }} />

            {/* Editor */}
            {versionsLoading ? (
              <LoadingScreen />
            ) : (
              <RichTextEditor
                key={latestVersion?.version_id ?? 'empty'}
                initialContent={latestVersion?.content ?? ''}
                onChange={handleEditorChange}
                editable
                images={images}
                {...(token !== undefined ? { authToken: token } : {})}
              />
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default ArticleEditorPage;
