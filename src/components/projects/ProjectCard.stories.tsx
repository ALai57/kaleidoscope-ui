import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import { ProjectCard } from './ProjectCard';
import type { Project } from '../../types/project';

const base: Project = {
  id: 'p-1',
  title: 'Kaleidoscope',
  description: 'A design-system-driven app for autonomous workflows.',
  status: 'executing',
  created_at: '2026-05-01T12:00:00Z',
  updated_at: '2026-06-01T12:00:00Z',
  scores: [],
};

const meta: Meta<typeof ProjectCard> = {
  title: 'Projects/ProjectCard',
  component: ProjectCard,
  parameters: { layout: 'centered' },
  // ProjectCard fills its container height; constrain it in the story.
  decorators: [
    (Story) => (
      <Box sx={{ width: 320 }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProjectCard>;

export const Executing: Story = { args: { project: base } };
export const Developing: Story = { args: { project: { ...base, status: 'developing' } } };
export const Idea: Story = { args: { project: { ...base, status: 'idea' } } };
export const Clickable: Story = { args: { project: base, onSelect: () => {} } };
