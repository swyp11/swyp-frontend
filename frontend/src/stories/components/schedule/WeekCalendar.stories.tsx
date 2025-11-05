import type { Meta, StoryObj } from '@storybook/react';
import { WeekCalendar } from '@/components/schedule/WeekCalendar';

const meta = {
  title: 'Components/Schedule/WeekCalendar',
  component: WeekCalendar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof WeekCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleEvents = [
  { id: '1', title: '드레스 투어', startTime: 0, endTime: 2, dayOfWeek: 3, color: '#f3335d' },
  { id: '2', title: '스튜디오 촬영', startTime: 0, endTime: 1, dayOfWeek: 4, color: '#562699' },
  { id: '3', title: '웨딩 플래너', startTime: 0, endTime: 1, dayOfWeek: 4, color: '#5bb16b' },
];

export const Default: Story = {
  args: {
    currentDate: new Date(2024, 9, 25),
    events: sampleEvents,
  },
};

export const NoEvents: Story = {
  args: {
    currentDate: new Date(2024, 9, 25),
    events: [],
  },
};

export const ManyEvents: Story = {
  args: {
    currentDate: new Date(2024, 9, 25),
    events: [
      { id: '1', title: '일정1', startTime: 0, endTime: 2, dayOfWeek: 0, color: '#f3335d' },
      { id: '2', title: '일정2', startTime: 3, endTime: 5, dayOfWeek: 1, color: '#562699' },
      { id: '3', title: '일정3', startTime: 0, endTime: 1, dayOfWeek: 2, color: '#5bb16b' },
      { id: '4', title: '일정4', startTime: 0, endTime: 2, dayOfWeek: 3, color: '#f3335d' },
      { id: '5', title: '일정5', startTime: 0, endTime: 1, dayOfWeek: 4, color: '#562699' },
      { id: '6', title: '일정6', startTime: 0, endTime: 1, dayOfWeek: 5, color: '#5bb16b' },
      { id: '7', title: '일정7', startTime: 0, endTime: 1, dayOfWeek: 6, color: '#f3335d' },
    ],
  },
};
