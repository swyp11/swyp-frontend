import type { Meta, StoryObj } from '@storybook/react';
import { NavigationHeader } from '@/components/schedule/NavigationHeader';

const meta = {
  title: 'Components/Schedule/NavigationHeader',
  component: NavigationHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NavigationHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MonthWithDropdown: Story = {
  args: {
    title: '10월',
    showDropdown: true,
    onPrev: () => {},
    onNext: () => {},
  },
};

export const DayView: Story = {
  args: {
    title: '10월 25일',
    showDropdown: false,
    onPrev: () => {},
    onNext: () => {},
  },
};
