import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import { createTask } from '../../api/tasks';

interface QuickAddTaskInputProps {
  projectId: string;
  token: string | undefined;
}

export const QuickAddTaskInput: React.FC<QuickAddTaskInputProps> = ({ projectId, token }) => {
  const [value, setValue] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (title: string) =>
      createTask(projectId, { title, task_type: 'action' }, token),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['projects', projectId, 'tasks'] });
      void queryClient.invalidateQueries({ queryKey: ['projects', projectId, 'tasks', 'status'] });
      setValue('');
    },
  });

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed || mutation.isPending) return;
    mutation.mutate(trimmed);
  };

  return (
    <Box sx={{ display: 'flex', gap: 0.5, mb: 1.5 }}>
      <TextField
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSubmit();
        }}
        placeholder="Add a task… (press Enter)"
        size="small"
        fullWidth
        disabled={mutation.isPending}
      />
      <Tooltip title="Add task">
        <span>
          <IconButton
            onClick={handleSubmit}
            disabled={!value.trim() || mutation.isPending}
            size="small"
            color="primary"
          >
            {mutation.isPending ? <CircularProgress size={18} /> : <AddIcon />}
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  );
};
