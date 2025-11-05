import type { Meta, StoryObj } from '@storybook/react';
import { ViewSelector } from '@/components/schedule/ViewSelector';

const meta = {
  title: 'Components/Schedule/ViewSelector',
  component: ViewSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ViewSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Monthly: Story = {
  args: {
    currentView: 'monthly',
    onViewChange: () => {},
  },
};

export const Weekly: Story = {
  args: {
    currentView: 'weekly',
    onViewChange: () => {},
  },
};

export const Daily: Story = {
  args: {
    currentView: 'daily',
    onViewChange: () => {},
  },
};
