import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import { NavBar } from '../components/layout/NavBar';
import { LoadingScreen } from '../components/layout/LoadingScreen';
import { useAuth } from '../auth/useAuth';
import { getGroups, addGroup, deleteGroup, addGroupMember, deleteGroupMember } from '../api/groups';
import type { Group, Membership } from '../types/group';

// ── Confirm Dialog ─────────────────────────────────────────────────────────

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  message,
  confirmLabel = 'Delete',
  onConfirm,
  onCancel,
}) => (
  <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>{message}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel}>Cancel</Button>
      <Button onClick={onConfirm} color="error" variant="contained">
        {confirmLabel}
      </Button>
    </DialogActions>
  </Dialog>
);

// ── Group Item ─────────────────────────────────────────────────────────────

interface GroupItemProps {
  group: Group;
  token: string | undefined;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

const GroupItem: React.FC<GroupItemProps> = ({ group, token, onSuccess, onError }) => {
  const queryClient = useQueryClient();
  const [newEmail, setNewEmail] = useState('');
  const [newAlias, setNewAlias] = useState('');
  const [confirmDeleteGroup, setConfirmDeleteGroup] = useState(false);
  const [confirmDeleteMemberId, setConfirmDeleteMemberId] = useState<string | null>(null);

  const addMemberMutation = useMutation({
    mutationFn: () =>
      addGroupMember(
        group.group_id,
        { email: newEmail, ...(newAlias ? { alias: newAlias } : {}) },
        token
      ),
    onSuccess: () => {
      setNewEmail('');
      setNewAlias('');
      void queryClient.invalidateQueries({ queryKey: ['groups'] });
      onSuccess('Member added');
    },
    onError: () => onError('Failed to add member'),
  });

  const deleteMemberMutation = useMutation({
    mutationFn: (memberId: string) => deleteGroupMember(group.group_id, memberId, token),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['groups'] });
      onSuccess('Member removed');
    },
    onError: () => onError('Failed to remove member'),
  });

  const deleteGroupMutation = useMutation({
    mutationFn: () => deleteGroup(group.group_id, token),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['groups'] });
      onSuccess(`"${group.display_name}" deleted`);
    },
    onError: () => onError('Failed to delete group'),
  });

  const memberCount = group.memberships?.length ?? 0;

  const handleAddMember = () => {
    if (newEmail && !addMemberMutation.isPending) {
      addMemberMutation.mutate();
    }
  };

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ flexGrow: 1 }}>{group.display_name}</Typography>
          <Chip
            label={memberCount === 1 ? '1 member' : `${memberCount} members`}
            size="small"
            sx={{ mr: 1, alignSelf: 'center' }}
          />
        </AccordionSummary>
        <AccordionDetails>
          {/* Member list */}
          <Typography variant="subtitle2" gutterBottom>
            Members
          </Typography>
          {memberCount === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              No members yet — add one below.
            </Typography>
          ) : (
            <List dense disablePadding>
              {(group.memberships ?? []).map((m: Membership) => (
                <ListItem
                  key={m.membership_id}
                  secondaryAction={
                    <Tooltip title="Remove member">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => setConfirmDeleteMemberId(m.membership_id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  }
                >
                  <ListItemText
                    primary={m.alias ?? m.email}
                    secondary={m.alias ? m.email : undefined}
                  />
                </ListItem>
              ))}
            </List>
          )}

          <Divider sx={{ my: 1.5 }} />

          {/* Add member form */}
          <Typography variant="subtitle2" gutterBottom>
            Add Member
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            alignItems={{ sm: 'flex-start' }}
          >
            <TextField
              size="small"
              label="Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddMember();
              }}
              sx={{ flex: 1 }}
            />
            <TextField
              size="small"
              label="Alias (optional)"
              value={newAlias}
              onChange={(e) => setNewAlias(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddMember();
              }}
              sx={{ flex: 1 }}
            />
            <Tooltip title="Add member">
              <IconButton
                color="primary"
                onClick={handleAddMember}
                disabled={!newEmail || addMemberMutation.isPending}
                aria-label="Add member"
              >
                <PersonAddIcon />
              </IconButton>
            </Tooltip>
          </Stack>

          <Divider sx={{ my: 1.5 }} />

          {/* Delete group — placed in details to prevent accidental clicks */}
          <Button
            variant="outlined"
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={() => setConfirmDeleteGroup(true)}
            aria-label="Delete group"
          >
            Delete Group
          </Button>
        </AccordionDetails>
      </Accordion>

      <ConfirmDialog
        open={confirmDeleteGroup}
        title="Delete Group"
        message={`Delete "${group.display_name}"? This cannot be undone.`}
        onConfirm={() => {
          setConfirmDeleteGroup(false);
          deleteGroupMutation.mutate();
        }}
        onCancel={() => setConfirmDeleteGroup(false)}
      />

      <ConfirmDialog
        open={confirmDeleteMemberId !== null}
        title="Remove Member"
        message="Remove this member from the group?"
        confirmLabel="Remove"
        onConfirm={() => {
          if (confirmDeleteMemberId) {
            deleteMemberMutation.mutate(confirmDeleteMemberId);
          }
          setConfirmDeleteMemberId(null);
        }}
        onCancel={() => setConfirmDeleteMemberId(null)}
      />
    </>
  );
};

// ── Page ───────────────────────────────────────────────────────────────────

const GroupsPage: React.FC = () => {
  const { token, isAuthenticated, userProfile, login, logout } = useAuth();
  const queryClient = useQueryClient();
  const [newGroupName, setNewGroupName] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity: 'success' | 'error';
  } | null>(null);

  const user = userProfile
    ? {
        firstName: userProfile.firstName ?? undefined,
        lastName: userProfile.lastName ?? undefined,
        realm_access: userProfile.realm_access,
      }
    : undefined;

  const { data: groups = [], isLoading } = useQuery({
    queryKey: ['groups'],
    queryFn: () => getGroups(token),
  });

  const addGroupMutation = useMutation({
    mutationFn: () => addGroup(newGroupName, token),
    onSuccess: () => {
      setNewGroupName('');
      void queryClient.invalidateQueries({ queryKey: ['groups'] });
      setSnackbar({ message: 'Group created', severity: 'success' });
    },
    onError: () => setSnackbar({ message: 'Failed to create group', severity: 'error' }),
  });

  const handleAddGroup = () => {
    if (newGroupName && !addGroupMutation.isPending) {
      addGroupMutation.mutate();
    }
  };

  const filteredGroups = groups.filter((g: Group) =>
    g.display_name.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <NavBar user={user} isAuthenticated={isAuthenticated} login={login} logout={logout} />
      <Box id="primary-content" sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          Groups
        </Typography>

        {/* Create group */}
        <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
            Create New Group
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
            <TextField
              size="small"
              label="New group name"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddGroup();
              }}
              sx={{ flex: 1 }}
            />
            <Button
              variant="contained"
              onClick={handleAddGroup}
              disabled={!newGroupName || addGroupMutation.isPending}
              data-testid="add-group-button"
            >
              Add Group
            </Button>
          </Stack>
        </Paper>

        {isLoading && <LoadingScreen />}

        {!isLoading && (
          <>
            {/* Count chip + search filter */}
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
              <Chip
                label={`${groups.length} ${groups.length === 1 ? 'group' : 'groups'}`}
                size="small"
              />
              {groups.length > 1 && (
                <TextField
                  size="small"
                  placeholder="Search groups…"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  sx={{ flex: 1 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            </Stack>

            {/* Empty state */}
            {groups.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
                <GroupsIcon sx={{ fontSize: 56, mb: 1.5, opacity: 0.35 }} />
                <Typography variant="h6" gutterBottom>
                  No groups yet
                </Typography>
                <Typography variant="body2">Create your first group above.</Typography>
              </Box>
            )}

            {/* No search results */}
            {groups.length > 0 && filteredGroups.length === 0 && (
              <Typography color="text.secondary">
                No groups match &ldquo;{searchFilter}&rdquo;
              </Typography>
            )}

            {/* Group list */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {filteredGroups.map((group: Group) => (
                <GroupItem
                  key={group.group_id}
                  group={group}
                  token={token}
                  onSuccess={(msg) => setSnackbar({ message: msg, severity: 'success' })}
                  onError={(msg) => setSnackbar({ message: msg, severity: 'error' })}
                />
              ))}
            </Box>
          </>
        )}
      </Box>

      {/* Feedback snackbar */}
      <Snackbar
        open={snackbar !== null}
        autoHideDuration={4000}
        onClose={() => setSnackbar(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar(null)}
          severity={snackbar?.severity ?? 'info'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar?.message ?? ''}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default GroupsPage;
