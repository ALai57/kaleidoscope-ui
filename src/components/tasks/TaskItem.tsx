import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import DeleteIcon from '@mui/icons-material/Delete';
import { TaskTypeChip } from './TaskTypeChip';
import type { ProjectTask } from '../../types/tasks';

export const TASK_DRAG_TYPE = 'TASK_ITEM';

interface DragItem {
  id: string;
  index: number;
}

interface TaskItemProps {
  task: ProjectTask;
  index: number;
  isDraggable?: boolean;
  onToggleStatus: (task: ProjectTask) => void;
  onDelete: (taskId: string) => void;
  onMove: (dragIndex: number, hoverIndex: number) => void;
  onMoveEnd: () => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  index,
  isDraggable = true,
  onToggleStatus,
  onDelete,
  onMove,
  onMoveEnd,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  const isInvestigate = task.task_type === 'investigate';
  const isCompleted = task.status === 'completed';

  const [{ isDragging }, drag, dragPreview] = useDrag<DragItem, void, { isDragging: boolean }>({
    type: TASK_DRAG_TYPE,
    item: () => ({ id: task.id, index }),
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    end: () => onMoveEnd(),
    canDrag: () => isDraggable,
  });

  const [, drop] = useDrop<DragItem, void, Record<string, never>>({
    accept: TASK_DRAG_TYPE,
    hover(item, monitor) {
      if (!containerRef.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      const hoverRect = containerRef.current.getBoundingClientRect();
      const hoverMiddleY = (hoverRect.bottom - hoverRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
      const hoverClientY = clientOffset.y - hoverRect.top;

      // Only move when past the middle
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      onMove(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  // Container: drop target + drag preview
  drag(handleRef);
  dragPreview(drop(containerRef));

  return (
    <Box
      ref={containerRef}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        p: 1,
        mb: 0.5,
        border: 1,
        borderColor: isInvestigate && !isCompleted ? 'warning.light' : 'divider',
        borderRadius: 1,
        bgcolor: isInvestigate && !isCompleted ? 'warning.50' : 'background.paper',
        opacity: isDragging ? 0.4 : 1,
        transition: 'opacity 0.15s',
      }}
    >
      {/* Drag handle */}
      <Box
        ref={handleRef}
        sx={{
          cursor: isDraggable ? 'grab' : 'default',
          color: isDraggable ? 'text.disabled' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          flexShrink: 0,
          '&:active': { cursor: 'grabbing' },
        }}
      >
        <DragIndicatorIcon fontSize="small" />
      </Box>

      {/* Checkbox */}
      <Checkbox
        size="small"
        checked={isCompleted}
        onChange={() => onToggleStatus(task)}
        sx={{ p: 0.5, flexShrink: 0 }}
      />

      {/* Task content */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flexWrap: 'wrap' }}>
          <Typography
            variant="body2"
            sx={{
              textDecoration: isCompleted ? 'line-through' : 'none',
              color: isCompleted ? 'text.disabled' : 'text.primary',
              fontWeight: 500,
            }}
          >
            {task.title}
          </Typography>
          {/* Investigate: show time estimate prominently next to title */}
          {isInvestigate && task.estimated_minutes != null && !isCompleted && (
            <Chip
              label={`${task.estimated_minutes} min`}
              size="small"
              color="warning"
              sx={{ fontWeight: 600, fontSize: '0.7rem' }}
            />
          )}
        </Box>
        {task.description && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: 'block', mt: 0.25 }}
          >
            {task.description}
          </Typography>
        )}
      </Box>

      {/* Task type badge */}
      <TaskTypeChip taskType={task.task_type} />

      {/* Effort chip for non-investigate tasks */}
      {task.estimated_minutes != null && task.task_type !== 'investigate' && (
        <Chip
          label={`${task.estimated_minutes} min`}
          size="small"
          variant="outlined"
          sx={{ fontSize: '0.7rem', flexShrink: 0 }}
        />
      )}

      {/* Delete */}
      <IconButton
        size="small"
        onClick={() => onDelete(task.id)}
        sx={{ color: 'text.disabled', flexShrink: 0, '&:hover': { color: 'error.main' } }}
        aria-label="Delete task"
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};
