import type { Meta, StoryObj } from '@storybook/react';
import { DayCalendar } from '@/components/schedule/DayCalendar';

const meta = {
  title: 'Components/Schedule/DayCalendar',
  component: DayCalendar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DayCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleEvents = [
  { id: '1', title: '드레스 투어', startTime: 10, duration: 2, color: '#f3335d' },
  { id: '2', title: '스튜디오 촬영', startTime: 14, duration: 3, color: '#562699' },
  { id: '3', title: '웨딩 플래너 미팅', startTime: 18, duration: 1, color: '#5bb16b' },
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
      { id: '1', title: '아침 미팅', startTime: 9, duration: 1, color: '#562699' },
      { id: '2', title: '드레스 투어', startTime: 10, duration: 2, color: '#f3335d' },
      { id: '3', title: '점심', startTime: 12, duration: 1, color: '#5bb16b' },
      { id: '4', title: '스튜디오 촬영', startTime: 14, duration: 3, color: '#562699' },
      { id: '5', title: '웨딩 플래너 미팅', startTime: 18, duration: 1, color: '#5bb16b' },
      { id: '6', title: '저녁 식사', startTime: 19, duration: 1, color: '#f3335d' },
    ],
  },
};

export const LongEvent: Story = {
  args: {
    currentDate: new Date(2024, 9, 25),
    events: [
      { id: '1', title: '종일 행사', startTime: 9, duration: 10, color: '#562699' },
    ],
  },
};
