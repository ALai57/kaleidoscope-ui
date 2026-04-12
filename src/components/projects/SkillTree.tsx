import React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import SchoolIcon from '@mui/icons-material/School';
import type { ProjectSkill, SkillStatus } from '../../types/project';

const STATUS_CONFIG: Record<
  SkillStatus,
  { label: string; color: 'default' | 'primary' | 'success'; icon: React.ReactElement }
> = {
  identified: {
    label: 'Identified',
    color: 'default',
    icon: <RadioButtonUncheckedIcon fontSize="small" />,
  },
  learning: {
    label: 'Learning',
    color: 'primary',
    icon: <SchoolIcon fontSize="small" />,
  },
  mastered: {
    label: 'Mastered',
    color: 'success',
    icon: <CheckCircleIcon fontSize="small" />,
  },
};

const STATUS_ORDER: SkillStatus[] = ['identified', 'learning', 'mastered'];

function nextStatus(current: SkillStatus): SkillStatus {
  const idx = STATUS_ORDER.indexOf(current);
  return STATUS_ORDER[(idx + 1) % STATUS_ORDER.length] ?? 'identified';
}

interface SkillNodeProps {
  skill: ProjectSkill;
  depth: number;
  onToggle: (skillId: string, newStatus: SkillStatus) => void;
}

const SkillNode: React.FC<SkillNodeProps> = ({ skill, depth, onToggle }) => {
  const config = STATUS_CONFIG[skill.status];
  const hasChildren = (skill.children ?? []).length > 0;

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Connector line for non-root nodes */}
      {depth > 0 && (
        <Box
          sx={{
            position: 'absolute',
            left: -20,
            top: '50%',
            width: 20,
            height: 2,
            bgcolor: 'divider',
            transform: 'translateY(-50%)',
          }}
        />
      )}

      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 1,
          p: 1,
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
          mb: 1,
          '&:hover': { bgcolor: 'action.hover' },
        }}
      >
        <Tooltip title={`Mark as ${nextStatus(skill.status)}`}>
          <IconButton
            size="small"
            onClick={() => onToggle(skill.id, nextStatus(skill.status))}
            color={config.color === 'default' ? 'default' : config.color}
          >
            {config.icon}
          </IconButton>
        </Tooltip>

        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {skill.name}
            </Typography>
            <Chip label={config.label} size="small" color={config.color} variant="outlined" />
          </Box>
          {skill.description && (
            <Typography variant="caption" color="text.secondary">
              {skill.description}
            </Typography>
          )}
        </Box>
      </Box>

      {hasChildren && (
        <Box sx={{ pl: 4, borderLeft: '2px solid', borderColor: 'divider', ml: 2 }}>
          {(skill.children ?? []).map((child) => (
            <SkillNode key={child.id} skill={child} depth={depth + 1} onToggle={onToggle} />
          ))}
        </Box>
      )}
    </Box>
  );
};

interface SkillTreeProps {
  skills: ProjectSkill[];
  onToggle: (skillId: string, newStatus: SkillStatus) => void;
}

export const SkillTree: React.FC<SkillTreeProps> = ({ skills, onToggle }) => {
  if (skills.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        No skills generated yet. Click "Generate Skills" to identify the skill tree for this project.
      </Typography>
    );
  }

  return (
    <Box>
      {skills.map((skill) => (
        <SkillNode key={skill.id} skill={skill} depth={0} onToggle={onToggle} />
      ))}
    </Box>
  );
};
