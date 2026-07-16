import React, { useCallback, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { TaskItem } from './TaskItem';
import type { ProjectTask } from '../../types/tasks';

interface TaskListProps {
  tasks: ProjectTask[];
  onToggleStatus: (task: ProjectTask) => void;
  onDelete: (taskId: string) => void;
  // Called with the new full position sequence when drag-reorder ends
  onReorder: (positions: { id: string; position: number }[]) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleStatus,
  onDelete,
  onReorder,
}) => {
  const pending = tasks.filter((t) => t.status !== 'completed').sort((a, b) => a.position - b.position);
  const completed = tasks.filter((t) => t.status === 'completed').sort((a, b) => a.position - b.position);

  // Local pending list for optimistic drag reorder
  const [localPending, setLocalPending] = useState<ProjectTask[]>(pending);

  // Re-sync local state from server data when the tasks prop changes (e.g. after
  // a mutation). Adjusting state during render on an identity change is React's
  // recommended alternative to a setState-in-effect sync.
  const [prevTasks, setPrevTasks] = useState(tasks);
  if (tasks !== prevTasks) {
    setPrevTasks(tasks);
    setLocalPending(pending);
  }

  const handleMove = useCallback((dragIndex: number, hoverIndex: number) => {
    setLocalPending((prev) => {
      const next = [...prev];
      const removed = next.splice(dragIndex, 1)[0];
      if (removed === undefined) return prev;
      next.splice(hoverIndex, 0, removed);
      return next;
    });
  }, []);

  const handleMoveEnd = useCallback(() => {
    const positions = localPending.map((t, i) => ({ id: t.id, position: i }));
    onReorder(positions);
  }, [localPending, onReorder]);

  if (tasks.length === 0) {
    return (
      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          py: 2
        }}>No tasks yet. Tasks will be generated automatically when a workflow runs.
              </Typography>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Box>
        {localPending.length > 0 && (
          <Box>
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                display: 'block',
                mb: 0.75,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: 0.5
              }}>
              What to do next
            </Typography>
            {localPending.map((task, index) => (
              <TaskItem
                key={task.id}
                task={task}
                index={index}
                isDraggable
                onToggleStatus={onToggleStatus}
                onDelete={onDelete}
                onMove={handleMove}
                onMoveEnd={handleMoveEnd}
              />
            ))}
          </Box>
        )}

        {completed.length > 0 && (
          <Box sx={{ mt: localPending.length > 0 ? 2 : 0 }}>
            {localPending.length > 0 && <Divider sx={{ mb: 1.5 }} />}
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                display: 'block',
                mb: 0.75,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: 0.5
              }}>
              Completed
            </Typography>
            {completed.map((task, index) => (
              <TaskItem
                key={task.id}
                task={task}
                index={index}
                isDraggable={false}
                onToggleStatus={onToggleStatus}
                onDelete={onDelete}
                onMove={() => {}}
                onMoveEnd={() => {}}
              />
            ))}
          </Box>
        )}
      </Box>
    </DndProvider>
  );
};
