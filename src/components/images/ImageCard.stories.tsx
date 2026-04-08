import type { Meta, StoryObj } from '@storybook/react';
import { ImageCard } from './ImageCard';

const meta: Meta<typeof ImageCard> = {
  title: 'Images/ImageCard',
  component: ImageCard,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ImageCard>;

export const Default: Story = {
  args: {
    image: {
      src: 'https://andrewslai.com/static/images/nav-bar/favicon.svg',
      alt: 'Test image',
      title: 'Sample Photo',
      body: 'A sample image card',
      width: 300,
      height: 200,
    },
  },
};

export const WithAuthToken: Story = {
  args: {
    image: {
      src: 'https://andrewslai.com/static/images/nav-bar/favicon.svg',
      alt: 'Protected image',
      title: 'Protected Photo',
      body: 'Requires auth token',
      width: 300,
      height: 200,
    },
    authToken: 'example-token',
  },
};
