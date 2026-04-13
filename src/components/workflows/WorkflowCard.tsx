import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import type { Workflow, WorkflowStatus } from '../../types/workflow';

interface WorkflowCardProps {
  workflow: Workflow;
  onEdit: (id: string) => void;
  onArchive: (id: string) => void;
  archiving: boolean;
}

const STATUS_COLOR: Record<WorkflowStatus, 'default' | 'success' | 'warning'> = {
  draft: 'warning',
  live: 'success',
  archived: 'default',
};

const WorkflowCard: React.FC<WorkflowCardProps> = ({ workflow, onEdit, onArchive, archiving }) => (
  <Box
    sx={{
      p: 2,
      border: 1,
      borderColor: 'divider',
      borderRadius: 1,
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      opacity: workflow.status === 'archived' ? 0.6 : 1,
    }}
  >
    <Box sx={{ flex: 1, minWidth: 0 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.25 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }} noWrap>
          {workflow.name}
        </Typography>
        <Chip
          label={workflow.status}
          size="small"
          color={STATUS_COLOR[workflow.status]}
          sx={{ textTransform: 'capitalize', flexShrink: 0 }}
        />
        {workflow.is_default && (
          <Chip label="Default" size="small" variant="outlined" sx={{ flexShrink: 0 }} />
        )}
      </Box>
      {workflow.description && (
        <Typography variant="body2" color="text.secondary" noWrap>
          {workflow.description}
        </Typography>
      )}
      <Typography variant="caption" color="text.disabled">
        {workflow.steps.length} step{workflow.steps.length !== 1 ? 's' : ''}
      </Typography>
    </Box>

    <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
      <Button
        size="small"
        variant="outlined"
        startIcon={<EditIcon />}
        onClick={() => onEdit(workflow.id)}
      >
        Edit
      </Button>
      {!workflow.is_default && workflow.status !== 'archived' && (
        <Button
          size="small"
          variant="outlined"
          color="warning"
          startIcon={<ArchiveIcon />}
          onClick={() => onArchive(workflow.id)}
          disabled={!!archiving}
        >
          Archive
        </Button>
      )}
    </Box>
  </Box>
);

export default WorkflowCard;
