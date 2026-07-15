import type { Meta, StoryObj } from '@storybook/react-vite';
import { LoadingScreen } from './LoadingScreen';

const meta: Meta<typeof LoadingScreen> = {
  title: 'Layout/LoadingScreen',
  component: LoadingScreen,
};

export default meta;
type Story = StoryObj<typeof LoadingScreen>;

export const Default: Story = {};
