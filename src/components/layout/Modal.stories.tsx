import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { BasicModal, ModalTemplate } from './Modal';

const meta: Meta<typeof BasicModal> = {
  title: 'Layout/Modal',
  component: BasicModal,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof BasicModal>;

export const Default: Story = {
  args: {
    open: true,
    title: 'Example Modal',
    body: <div>This is the modal body content.</div>,
    level: 'info',
  },
};

export const ErrorLevel: Story = {
  args: {
    open: true,
    title: 'Error Modal',
    body: <div>Something went wrong!</div>,
    level: 'error',
  },
};

export const WithFooter: Story = {
  args: {
    open: true,
    title: 'Confirm Action',
    body: <div>Are you sure you want to proceed?</div>,
    footer: <div>Footer with action buttons</div>,
    level: 'warn',
  },
};

export const Template: StoryObj<typeof ModalTemplate> = {
  render: () => (
    <ModalTemplate
      title="Template Example"
      body={<div>Template body</div>}
      level="success"
    />
  ),
};
