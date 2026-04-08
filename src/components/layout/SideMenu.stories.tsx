import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from '@mui/material';
import { SideMenu } from './SideMenu';

const meta: Meta<typeof SideMenu> = {
  title: 'Layout/SideMenu',
  component: SideMenu,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof SideMenu>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Articles', href: '/archive' },
      { label: 'Admin', href: '/admin' },
    ],
    expandButton: <Button variant="contained">Open Menu</Button>,
  },
};
