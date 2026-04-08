import type { Meta, StoryObj } from '@storybook/react';
import { ImageBrowser } from './ImageBrowser';

const meta: Meta<typeof ImageBrowser> = {
  title: 'Images/ImageBrowser',
  component: ImageBrowser,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ImageBrowser>;

const mockImages = [
  {
    name: 'photo-1.jpg',
    title: 'Mountain Sunset',
    description: 'A beautiful mountain sunset',
    creator: 'Alice',
    created_at: '2024-01-01T00:00:00Z',
    versions: {
      raw: { src: 'https://andrewslai.com/static/images/nav-bar/favicon.svg', width: 400, height: 300 },
      thumbnail: { src: 'https://andrewslai.com/static/images/nav-bar/favicon.svg', width: 100, height: 75 },
    },
  },
  {
    name: 'photo-2.jpg',
    title: 'Ocean View',
    description: 'Waves crashing',
    creator: 'Bob',
    created_at: '2024-01-02T00:00:00Z',
    versions: {
      raw: { src: 'https://andrewslai.com/static/images/nav-bar/articles.svg', width: 400, height: 300 },
      thumbnail: { src: 'https://andrewslai.com/static/images/nav-bar/articles.svg', width: 100, height: 75 },
    },
  },
];

export const EditMode: Story = {
  args: {
    images: mockImages,
    mode: 'edit',
    albums: ['Travel', 'Nature'],
  },
};

export const SelectMode: Story = {
  args: {
    images: mockImages,
    mode: 'select',
    photoManager: {
      selectPhoto: (src) => console.log('Selected:', src),
    },
  },
};
