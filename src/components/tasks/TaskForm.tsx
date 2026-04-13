import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import type { ProjectTask } from '../../types/tasks';

const TASK_TYPES = [
  { value: 'action', label: '✅ Action' },
  { value: 'research', label: '🔬 Research' },
  { value: 'purchase', label: '💳 Purchase' },
  { value: 'review', label: '👁 Review' },
  { value: 'development', label: '💻 Development' },
  { value: 'investigate', label: '🔍 Investigate' },
];

interface TaskFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: {
    title: string;
    description?: string;
    task_type: string;
    estimated_minutes?: number;
  }) => void;
  initialValues?: Partial<ProjectTask>;
  isSubmitting?: boolean;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  open,
  onClose,
  onSubmit,
  initialValues,
  isSubmitting,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [taskType, setTaskType] = useState('action');
  const [estimatedMinutes, setEstimatedMinutes] = useState('');

  useEffect(() => {
    if (open) {
      setTitle(initialValues?.title ?? '');
      setDescription(initialValues?.description ?? '');
      setTaskType(initialValues?.task_type ?? 'action');
      setEstimatedMinutes(initialValues?.estimated_minutes?.toString() ?? '');
    }
  }, [open, initialValues]);

  const handleSubmit = () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;
    const trimmedDesc = description.trim();
    const mins = estimatedMinutes ? parseInt(estimatedMinutes, 10) : undefined;
    const payload: Parameters<TaskFormProps['onSubmit']>[0] = {
      title: trimmedTitle,
      task_type: taskType,
    };
    if (trimmedDesc) payload.description = trimmedDesc;
    if (mins !== undefined) payload.estimated_minutes = mins;
    onSubmit(payload);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialValues?.id ? 'Edit Task' : 'Add Task'}</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '16px !important' }}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          fullWidth
          autoFocus
          size="small"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) handleSubmit();
          }}
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={2}
          size="small"
        />
        <FormControl size="small" fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            value={taskType}
            label="Type"
            onChange={(e) => setTaskType(e.target.value)}
          >
            {TASK_TYPES.map((t) => (
              <MenuItem key={t.value} value={t.value}>
                {t.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Estimated minutes"
          value={estimatedMinutes}
          onChange={(e) => setEstimatedMinutes(e.target.value.replace(/\D/g, ''))}
          fullWidth
          size="small"
          placeholder="Optional"
          helperText={taskType === 'investigate' ? 'Required for investigate tasks' : undefined}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!title.trim() || !!isSubmitting}
        >
          {initialValues?.id ? 'Save' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
