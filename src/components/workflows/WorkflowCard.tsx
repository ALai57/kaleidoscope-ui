import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import type { Workflow } from '../../types/workflow';
import { StatusChip } from '../common/StatusChip';
import { EntityCard } from '../common/EntityCard';

interface WorkflowCardProps {
  workflow: Workflow;
  onEdit: (id: string) => void;
  onArchive: (id: string) => void;
  archiving: boolean;
}

const WorkflowCard: React.FC<WorkflowCardProps> = ({ workflow, onEdit, onArchive, archiving }) => {
  const stepCount = (workflow.steps ?? []).length;
  return (
    <EntityCard
      title={workflow.name}
      sx={{ opacity: workflow.status === 'archived' ? 0.6 : 1 }}
      headerAction={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <StatusChip
            status={workflow.status}
            label={workflow.status}
            variant="filled"
            sx={{ textTransform: 'capitalize' }}
          />
          {workflow.is_default && <Chip label="Default" size="small" variant="outlined" />}
        </Box>
      }
      actions={
        <>
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
        </>
      }
    >
      {workflow.description && (
        <Typography variant="body2" color="text.secondary" noWrap>
          {workflow.description}
        </Typography>
      )}
      <Typography variant="caption" color="text.disabled">
        {stepCount} step{stepCount !== 1 ? 's' : ''}
      </Typography>
    </EntityCard>
  );
};

export default WorkflowCard;
