import type { Meta, StoryObj } from '@storybook/react-vite';
import Stack from '@mui/material/Stack';
import { TaskTypeChip } from './TaskTypeChip';

const meta: Meta<typeof TaskTypeChip> = {
  title: 'Tasks/TaskTypeChip',
  component: TaskTypeChip,
  parameters: { layout: 'centered' },
  argTypes: { size: { control: 'radio', options: ['small', 'medium'] } },
};

export default meta;
type Story = StoryObj<typeof TaskTypeChip>;

export const Research: Story = { args: { taskType: 'research' } };

/** All well-known task types. */
export const AllTypes: Story = {
  render: (args) => (
    <Stack direction="row" spacing={1} sx={{
      flexWrap: "wrap"
    }}>
      {['action', 'research', 'purchase', 'review', 'development', 'investigate'].map((t) => (
        <TaskTypeChip {...args} key={t} taskType={t} />
      ))}
    </Stack>
  ),
};

/** Unknown types fall back to an outlined chip with the raw label. */
export const UnknownType: Story = { args: { taskType: 'brainstorm' } };
