import type { Meta, StoryObj } from '@storybook/react-vite';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { EntityCard } from './EntityCard';

const meta: Meta<typeof EntityCard> = {
  title: 'Common/EntityCard',
  component: EntityCard,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof EntityCard>;

const Body = () => (
  <Typography variant="body2" sx={{
    color: "text.secondary"
  }}>
    Any content composes inside the card body, below the header row.
  </Typography>
);

export const Playground: Story = {
  args: {
    title: 'Research Agent',
    subtitle: 'gpt-4o · autonomous',
    status: 'running',
    children: <Body />,
  },
};

export const WithAvatarAndActions: Story = {
  args: {
    title: 'Research Agent',
    subtitle: 'gpt-4o · autonomous',
    status: 'running',
    avatar: <Avatar sx={{ bgcolor: 'primary.main' }}>RA</Avatar>,
    children: <Body />,
    actions: (
      <>
        <Button size="small" variant="text">
          View
        </Button>
        <Button size="small" variant="contained">
          Run
        </Button>
      </>
    ),
  },
};

export const Interactive: Story = {
  args: {
    title: 'Clickable entity',
    subtitle: 'raises on hover',
    interactive: true,
    onClick: () => {},
    children: <Body />,
  },
};
