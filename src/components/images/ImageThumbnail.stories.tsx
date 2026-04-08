import type { Meta, StoryObj } from '@storybook/react';
import { ImageThumbnail } from './ImageThumbnail';

const meta: Meta<typeof ImageThumbnail> = {
  title: 'Images/ImageThumbnail',
  component: ImageThumbnail,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ImageThumbnail>;

export const Default: Story = {
  args: {
    image: {
      src: 'https://andrewslai.com/static/images/nav-bar/favicon.svg',
      width: 100,
      height: 100,
    },
  },
};
