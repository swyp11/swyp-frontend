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

// Week of Oct 21-27, 2024 (currentDate is Friday Oct 25)
const sampleSchedule = [
  {
    id: 1,
    title: '드레스 투어',
    startTime: '10:00',
    endTime: '12:00',
    startDate: '2024-10-24T10:00:00', // Thursday
    endDate: '2024-10-24T12:00:00',
    color: '#f3335d'
  },
  {
    id: 2,
    title: '스튜디오 촬영',
    startTime: '14:00',
    endTime: '15:00',
    startDate: '2024-10-25T14:00:00', // Friday
    endDate: '2024-10-25T15:00:00',
    color: '#562699'
  },
  {
    id: 3,
    title: '웨딩 플래너',
    startTime: '16:00',
    endTime: '17:00',
    startDate: '2024-10-25T16:00:00', // Friday
    endDate: '2024-10-25T17:00:00',
    color: '#5bb16b'
  },
];

export const Default: Story = {
  args: {
    currentDate: new Date(2024, 9, 25),
    weekSchedule: sampleSchedule,
  },
};

export const NoEvents: Story = {
  args: {
    currentDate: new Date(2024, 9, 25),
    weekSchedule: [],
  },
};

export const ManyEvents: Story = {
  args: {
    currentDate: new Date(2024, 9, 25),
    weekSchedule: [
      { id: 1, title: '일정1', startTime: '09:00', endTime: '11:00', startDate: '2024-10-21T09:00:00', endDate: '2024-10-21T11:00:00', color: '#f3335d' }, // Mon
      { id: 2, title: '일정2', startTime: '14:00', endTime: '16:00', startDate: '2024-10-22T14:00:00', endDate: '2024-10-22T16:00:00', color: '#562699' }, // Tue
      { id: 3, title: '일정3', startTime: '10:00', endTime: '11:00', startDate: '2024-10-23T10:00:00', endDate: '2024-10-23T11:00:00', color: '#5bb16b' }, // Wed
      { id: 4, title: '일정4', startTime: '13:00', endTime: '15:00', startDate: '2024-10-24T13:00:00', endDate: '2024-10-24T15:00:00', color: '#f3335d' }, // Thu
      { id: 5, title: '일정5', startTime: '11:00', endTime: '12:00', startDate: '2024-10-25T11:00:00', endDate: '2024-10-25T12:00:00', color: '#562699' }, // Fri
      { id: 6, title: '일정6', startTime: '15:00', endTime: '16:00', startDate: '2024-10-26T15:00:00', endDate: '2024-10-26T16:00:00', color: '#5bb16b' }, // Sat
      { id: 7, title: '일정7', startTime: '10:00', endTime: '11:00', startDate: '2024-10-27T10:00:00', endDate: '2024-10-27T11:00:00', color: '#f3335d' }, // Sun
    ],
  },
};
