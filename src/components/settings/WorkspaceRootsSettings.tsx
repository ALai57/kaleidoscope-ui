import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { getWorkspaceRoots, addWorkspaceRoot, deleteWorkspaceRoot } from '../../api/workspaceRoots';

interface WorkspaceRootsSettingsProps {
  token?: string | undefined;
}

interface AddRootDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (path: string, label: string) => void;
  adding: boolean;
}

const AddRootDialog: React.FC<AddRootDialogProps> = ({ open, onClose, onAdd, adding }) => {
  const [path, setPath] = useState('');
  const [label, setLabel] = useState('');

  const handleClose = () => {
    setPath('');
    setLabel('');
    onClose();
  };

  const handleAdd = () => {
    const trimmedPath = path.trim();
    if (!trimmedPath) return;
    onAdd(trimmedPath, label.trim());
  };

  const canAdd = path.trim().length > 0;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add workspace root</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Register a directory where your codebases live. The Engineering Reviewer will look for
          matching subdirectories when reviewing a project.
        </Typography>
        <TextField
          label="Path"
          placeholder="/Users/you/code"
          value={path}
          onChange={(e) => setPath(e.target.value)}
          fullWidth
          size="small"
          disabled={adding}
          autoFocus
          sx={{ mb: 2, '& input': { fontFamily: 'monospace' } }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && canAdd) handleAdd();
          }}
        />
        <TextField
          label="Label (optional)"
          placeholder="e.g. Work projects"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          fullWidth
          size="small"
          disabled={adding}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && canAdd) handleAdd();
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={adding} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleAdd}
          disabled={adding || !canAdd}
          variant="contained"
          startIcon={adding ? <CircularProgress size={14} /> : undefined}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const WorkspaceRootsSettings: React.FC<WorkspaceRootsSettingsProps> = ({ token }) => {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: roots = [], isLoading } = useQuery({
    queryKey: ['workspace-roots'],
    queryFn: () => getWorkspaceRoots(token),
    enabled: !!token,
  });

  const addMutation = useMutation({
    mutationFn: ({ path, label }: { path: string; label: string }) =>
      addWorkspaceRoot(label ? { path, label } : { path }, token),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['workspace-roots'] });
      setDialogOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteWorkspaceRoot(id, token),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['workspace-roots'] });
    },
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Workspace roots
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Directories where your codebases live. Used by the Engineering Reviewer to find relevant
            code automatically.
          </Typography>
        </Box>
        <Tooltip title="Add workspace root">
          <IconButton size="small" onClick={() => setDialogOpen(true)} color="primary">
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Divider />

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
          <CircularProgress size={20} />
        </Box>
      ) : roots.length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: 3,
            gap: 1,
            color: 'text.secondary',
          }}
        >
          <FolderOpenIcon sx={{ fontSize: 32, opacity: 0.4 }} />
          <Typography variant="body2" color="text.secondary">
            No workspace roots registered yet.
          </Typography>
          <Button
            size="small"
            startIcon={<AddIcon />}
            onClick={() => setDialogOpen(true)}
          >
            Add a root
          </Button>
        </Box>
      ) : (
        <List disablePadding>
          {roots.map((root) => (
            <ListItem
              key={root.id}
              disablePadding
              sx={{
                py: 0.5,
                borderBottom: 1,
                borderColor: 'divider',
                '&:last-child': { borderBottom: 0 },
              }}
              secondaryAction={
                <Tooltip title="Remove">
                  <IconButton
                    edge="end"
                    size="small"
                    onClick={() => deleteMutation.mutate(root.id)}
                    disabled={deleteMutation.isPending}
                    color="error"
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              }
            >
              <ListItemText
                primary={
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: 'monospace', fontSize: '0.8rem', wordBreak: 'break-all', pr: 4 }}
                  >
                    {root.path}
                  </Typography>
                }
                secondary={root.label ?? undefined}
              />
            </ListItem>
          ))}
        </List>
      )}

      <AddRootDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onAdd={(path, label) => addMutation.mutate({ path, label })}
        adding={addMutation.isPending}
      />
    </Box>
  );
};

export default WorkspaceRootsSettings;
