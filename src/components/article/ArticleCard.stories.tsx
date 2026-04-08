import type { Meta, StoryObj } from '@storybook/react';
import { ArticleCard, ThinArticleCard } from './ArticleCard';

const meta: Meta<typeof ArticleCard> = {
  title: 'Article/ArticleCard',
  component: ArticleCard,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ArticleCard>;

export const Default: Story = {
  args: {
    articleTitle: 'Introduction to TypeScript',
    articleTags: 'research',
    articleUrl: 'intro-to-typescript',
    createdAt: '2024-01-15T00:00:00Z',
    summary: 'A brief introduction to TypeScript for JavaScript developers.',
  },
};

export const Archive: Story = {
  args: {
    articleTitle: 'My Travel Journal',
    articleTags: 'archive',
    articleUrl: 'travel-journal',
    createdAt: '2023-06-01T00:00:00Z',
    summary: 'A collection of travel stories.',
  },
};

export const Thin: StoryObj<typeof ThinArticleCard> = {
  render: () => (
    <ThinArticleCard
      articleTitle="Multi-branch Article"
      articleTags="research"
      branches={[
        { branchName: 'main', branchId: 'b1', publishedAt: '2024-01-15' },
        { branchName: 'draft', branchId: 'b2', createdAt: '2024-01-10' },
      ]}
    />
  ),
};
