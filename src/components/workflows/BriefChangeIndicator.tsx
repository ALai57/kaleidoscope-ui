import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import PersonIcon from '@mui/icons-material/Person';
import { BriefDiffDialog } from './BriefDiffDialog';
import { getAgentPersona } from '../../types/agent';
import type { Agent } from '../../types/agent';
import type { ProjectBrief } from '../../types/workflow';

interface BriefChangeIndicatorProps {
  /** The brief version before this change */
  before: ProjectBrief;
  /** The brief version after this change */
  after: ProjectBrief;
  agents?: Agent[];
}

export const BriefChangeIndicator: React.FC<BriefChangeIndicatorProps> = ({
  before,
  after,
  agents = [],
}) => {
  const [diffOpen, setDiffOpen] = useState(false);

  const isAdvisor = after.source === 'advisor_refinement';
  const isUser = after.source === 'user_clarification';

  let label: string;
  if (isAdvisor && after.agent_type) {
    const persona = getAgentPersona(after.agent_type, agents);
    label = `${persona.name} added context`;
  } else if (isUser) {
    label = 'You added context';
  } else {
    label = 'Brief updated';
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 1.5,
          py: 0.75,
          my: 0.75,
          bgcolor: 'action.selected',
          borderRadius: 1,
          border: 1,
          borderColor: 'divider',
        }}
      >
        {isAdvisor ? (
          <AutoFixHighIcon sx={{ fontSize: 14, color: 'text.secondary', flexShrink: 0 }} />
        ) : (
          <PersonIcon sx={{ fontSize: 14, color: 'text.secondary', flexShrink: 0 }} />
        )}
        <Typography variant="caption" color="text.secondary" sx={{ flex: 1, fontStyle: 'italic' }}>
          {label}
        </Typography>
        <Button
          size="small"
          variant="text"
          sx={{ fontSize: '0.7rem', py: 0, px: 0.75, minWidth: 0, color: 'primary.main' }}
          onClick={() => setDiffOpen(true)}
        >
          See what changed
        </Button>
      </Box>

      <BriefDiffDialog
        open={diffOpen}
        onClose={() => setDiffOpen(false)}
        before={before}
        after={after}
        agents={agents}
      />
    </>
  );
};

export default BriefChangeIndicator;
