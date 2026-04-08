import type { Meta, StoryObj } from '@storybook/react';
import { FullImageCard } from './FullImageCard';

const meta: Meta<typeof FullImageCard> = {
  title: 'Images/FullImageCard',
  component: FullImageCard,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof FullImageCard>;

export const Default: Story = {
  args: {
    image: {
      src: 'https://andrewslai.com/static/images/nav-bar/favicon.svg',
      width: 400,
      height: 300,
    },
  },
};
