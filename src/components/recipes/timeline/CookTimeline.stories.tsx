import type { Meta, StoryObj } from '@storybook/react';
import { PrismThemeProvider } from '../../prism';
import { CookTimeline } from './CookTimeline';
import { salmonTimeline, salmonContent } from '../../../test/fixtures/salmonTimeline';

const meta: Meta<typeof CookTimeline> = {
  title: 'Recipes/CookTimeline',
  component: CookTimeline,
  decorators: [
    (Story) => (
      <PrismThemeProvider>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: 24 }}>
          <Story />
        </div>
      </PrismThemeProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof CookTimeline>;

export const MisoSalmon: Story = {
  args: { timeline: salmonTimeline, sections: salmonContent.sections },
};
