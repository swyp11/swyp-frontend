import type { Meta, StoryObj } from '@storybook/react';
import { CalendarSelect } from '@/components/ui/CalendarSelect';

const meta = {
  title: 'Components/UI/CalendarSelect',
  component: CalendarSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CalendarSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '2025. 10. 25',
    isActive: false,
  },
};

export const Active: Story = {
  args: {
    value: '2025. 10. 25',
    isActive: true,
  },
};

export const TimeFormat: Story = {
  args: {
    value: '오전 9시',
    isActive: false,
  },
};
