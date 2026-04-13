import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import type { Agent } from '../../types/agent';

interface AgentCardProps {
  agent: Agent;
  onEdit: (agent: Agent) => void;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, onEdit }) => (
  <Box
    sx={{
      border: 1,
      borderColor: 'divider',
      borderRadius: 2,
      p: 2.5,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 1,
      bgcolor: 'background.paper',
      transition: 'box-shadow 0.15s',
      '&:hover': { boxShadow: 3 },
    }}
  >
    {/* Avatar */}
    <Box
      sx={{
        width: 72,
        height: 72,
        borderRadius: '50%',
        bgcolor: agent.color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2rem',
        lineHeight: 1,
        boxShadow: `0 0 0 4px ${agent.color}30`,
        mb: 0.5,
      }}
    >
      {agent.avatar}
    </Box>

    {/* Names */}
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
        {agent.name}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {agent.agent_type}
      </Typography>
    </Box>

    {/* System prompt preview */}
    {agent.system_prompt && (
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textAlign: 'center',
          lineHeight: 1.45,
          px: 0.5,
        }}
      >
        {agent.system_prompt}
      </Typography>
    )}

    {/* Tags */}
    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', justifyContent: 'center' }}>
      {agent.is_default && (
        <Chip label="Default" size="small" variant="outlined" />
      )}
    </Box>

    <Button
      size="small"
      variant="outlined"
      startIcon={<EditIcon />}
      onClick={() => onEdit(agent)}
      fullWidth
      sx={{ mt: 0.5 }}
    >
      Edit
    </Button>
  </Box>
);

export default AgentCard;
