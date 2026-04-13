import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { TaskList } from './TaskList';
import { TaskForm } from './TaskForm';
import { QuickAddTaskInput } from './QuickAddTaskInput';
import { PlanNextStepsNudge } from './PlanNextStepsNudge';
import { getTasks, updateTask, deleteTask, reorderTasks, createTask } from '../../api/tasks';
import type { ProjectTask } from '../../types/tasks';

interface TasksTabProps {
  projectId: string;
  token: string | undefined;
}

export const TasksTab: React.FC<TasksTabProps> = ({ projectId, token }) => {
  const [formOpen, setFormOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: tasks = [] } = useQuery({
    queryKey: ['projects', projectId, 'tasks'],
    queryFn: () => getTasks(projectId, token),
    enabled: !!projectId,
  });

  const invalidateTasks = () => {
    void queryClient.invalidateQueries({ queryKey: ['projects', projectId, 'tasks'] });
    void queryClient.invalidateQueries({ queryKey: ['projects', projectId, 'tasks', 'status'] });
  };

  const toggleStatusMutation = useMutation({
    mutationFn: (task: ProjectTask) =>
      updateTask(
        projectId,
        task.id,
        { status: task.status === 'completed' ? 'pending' : 'completed' },
        token
      ),
    onSuccess: invalidateTasks,
  });

  const deleteMutation = useMutation({
    mutationFn: (taskId: string) => deleteTask(projectId, taskId, token),
    onSuccess: invalidateTasks,
    onMutate: async (taskId) => {
      // Optimistic delete
      await queryClient.cancelQueries({ queryKey: ['projects', projectId, 'tasks'] });
      const previous = queryClient.getQueryData<ProjectTask[]>(['projects', projectId, 'tasks']);
      queryClient.setQueryData<ProjectTask[]>(
        ['projects', projectId, 'tasks'],
        (old) => old?.filter((t) => t.id !== taskId) ?? []
      );
      return { previous };
    },
    onError: (_err, _taskId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['projects', projectId, 'tasks'], context.previous);
      }
    },
  });

  const reorderMutation = useMutation({
    mutationFn: (positions: { id: string; position: number }[]) =>
      reorderTasks(projectId, positions, token),
    onError: () => {
      // Revert to server state on error
      void queryClient.invalidateQueries({ queryKey: ['projects', projectId, 'tasks'] });
    },
  });

  const createMutation = useMutation({
    mutationFn: (body: { title: string; description?: string; task_type: string; estimated_minutes?: number }) =>
      createTask(projectId, body, token),
    onSuccess: invalidateTasks,
  });

  return (
    <Box>
      <PlanNextStepsNudge projectId={projectId} token={token} />
      <QuickAddTaskInput projectId={projectId} token={token} />

      <TaskList
        tasks={tasks}
        onToggleStatus={(task) => toggleStatusMutation.mutate(task)}
        onDelete={(taskId) => deleteMutation.mutate(taskId)}
        onReorder={(positions) => reorderMutation.mutate(positions)}
      />

      <Button
        size="small"
        startIcon={<AddIcon />}
        onClick={() => setFormOpen(true)}
        sx={{ mt: 1 }}
      >
        Add task with details
      </Button>

      <TaskForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={(values) => {
          createMutation.mutate(values);
          setFormOpen(false);
        }}
        isSubmitting={createMutation.isPending}
      />
    </Box>
  );
};
