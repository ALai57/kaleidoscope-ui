import React from 'react';
import Chip from '@mui/material/Chip';
import type { WellKnownTaskType } from '../../types/tasks';

interface TypeConfig {
  icon: string;
  label: string;
  color: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
}

const TYPE_CONFIG: Record<WellKnownTaskType, TypeConfig> = {
  action:      { icon: '✅', label: 'Action',      color: 'default' },
  research:    { icon: '🔬', label: 'Research',    color: 'info' },
  purchase:    { icon: '💳', label: 'Purchase',    color: 'secondary' },
  review:      { icon: '👁',  label: 'Review',      color: 'primary' },
  development: { icon: '💻', label: 'Development', color: 'success' },
  investigate: { icon: '🔍', label: 'Investigate', color: 'warning' },
};

interface TaskTypeChipProps {
  taskType: string;
  size?: 'small' | 'medium';
}

export const TaskTypeChip: React.FC<TaskTypeChipProps> = ({ taskType, size = 'small' }) => {
  const config = TYPE_CONFIG[taskType as WellKnownTaskType];
  if (!config) {
    return <Chip label={taskType} size={size} variant="outlined" />;
  }
  return (
    <Chip
      label={`${config.icon} ${config.label}`}
      size={size}
      color={config.color}
      variant="outlined"
    />
  );
};
