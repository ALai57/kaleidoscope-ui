import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { NavBar } from '../components/layout/NavBar';
import { LoadingScreen } from '../components/layout/LoadingScreen';
import { useKeycloak } from '../auth/useKeycloak';
import { getGroups, addGroup, deleteGroup, addGroupMember, deleteGroupMember } from '../api/groups';
import type { Group } from '../types/group';

// ── Group Item ─────────────────────────────────────────────────────────────

interface GroupItemProps {
  group: Group;
  token: string | undefined;
  onGroupDeleted: () => void;
}

const GroupItem: React.FC<GroupItemProps> = ({ group, token, onGroupDeleted }) => {
  const queryClient = useQueryClient();
  const [newEmail, setNewEmail] = useState('');
  const [newAlias, setNewAlias] = useState('');

  const addMemberMutation = useMutation({
    mutationFn: () =>
      addGroupMember(
        group.group_id,
        { email: newEmail },
        token
      ),
    onSuccess: () => {
      setNewEmail('');
      setNewAlias('');
      void queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
  });

  const _deleteMemberMutation = useMutation({
    mutationFn: (memberId: string) => deleteGroupMember(group.group_id, memberId, token),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ['groups'] }),
  });

  const deleteGroupMutation = useMutation({
    mutationFn: () => deleteGroup(group.group_id, token),
    onSuccess: () => {
      onGroupDeleted();
      void queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
  });

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ flexGrow: 1 }}>{group.display_name}</Typography>
        <Tooltip title="Delete group">
          <IconButton
            size="small"
            color="error"
            onClick={(e) => {
              e.stopPropagation();
              deleteGroupMutation.mutate();
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </AccordionSummary>
      <AccordionDetails>
        {/* Member list */}
        <Typography variant="subtitle2">Members</Typography>
        <List dense>
          {/* No memberships on the Group type — shown if enriched by API */}
          <ListItem>
            <ListItemText primary="(no members)" />
          </ListItem>
        </List>

        <Divider sx={{ my: 1 }} />

        {/* Add member form */}
        <Stack direction="row" spacing={1} alignItems="center">
          <TextField
            size="small"
            label="Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <TextField
            size="small"
            label="Alias (optional)"
            value={newAlias}
            onChange={(e) => setNewAlias(e.target.value)}
          />
          <Tooltip title="Add member">
            <IconButton
              color="primary"
              onClick={() => addMemberMutation.mutate()}
              disabled={!newEmail || addMemberMutation.isPending}
            >
              <PersonAddIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

// ── Page ───────────────────────────────────────────────────────────────────

const GroupsPage: React.FC = () => {
  const { token, isAuthenticated, userProfile, login, logout } = useKeycloak();
  const queryClient = useQueryClient();
  const [newGroupName, setNewGroupName] = useState('');

  const user = userProfile
    ? {
        firstName: userProfile.firstName ?? undefined,
        lastName: userProfile.lastName ?? undefined,
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
    },
  });

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <NavBar user={user} isAuthenticated={isAuthenticated} login={login} logout={logout} />
      <Box id="primary-content" sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          Groups
        </Typography>

        {/* Create group */}
        <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
          <TextField
            size="small"
            label="New group name"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={() => addGroupMutation.mutate()}
            disabled={!newGroupName || addGroupMutation.isPending}
            data-testid="add-group-button"
          >
            Add Group
          </Button>
        </Stack>

        {isLoading && <LoadingScreen />}

        {!isLoading && (
          <>
            <Chip label={`${groups.length} groups`} size="small" sx={{ mb: 2 }} />
            <Box>
              {groups.map((group: Group) => (
                <GroupItem
                  key={group.group_id}
                  group={group}
                  token={token}
                  onGroupDeleted={() => void queryClient.invalidateQueries({ queryKey: ['groups'] })}
                />
              ))}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default GroupsPage;
