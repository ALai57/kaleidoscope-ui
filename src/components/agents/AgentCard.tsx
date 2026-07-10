import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import type { Agent } from '../../types/agent';
import { EntityCard } from '../common/EntityCard';

interface AgentCardProps {
  agent: Agent;
  onEdit: (agent: Agent) => void;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, onEdit }) => (
  <EntityCard
    interactive
    title={agent.name}
    subtitle={agent.agent_type}
    avatar={
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          bgcolor: agent.color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.6rem',
          lineHeight: 1,
          boxShadow: `0 0 0 4px ${agent.color}30`,
        }}
      >
        {agent.avatar}
      </Box>
    }
    headerAction={agent.is_default ? <Chip label="Default" size="small" variant="outlined" /> : undefined}
    actions={
      <Button size="small" variant="outlined" startIcon={<EditIcon />} onClick={() => onEdit(agent)} fullWidth>
        Edit
      </Button>
    }
  >
    {agent.system_prompt && (
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          lineHeight: 1.45,
        }}
      >
        {agent.system_prompt}
      </Typography>
    )}
  </EntityCard>
);

export default AgentCard;
