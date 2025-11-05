import type { Meta, StoryObj } from '@storybook/react';
import SchedulePage from '@/app/schedule/page';

const meta = {
  title: 'Pages/Schedule/SchedulePage',
  component: SchedulePage,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SchedulePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MonthlyView: Story = {
  parameters: {
    docs: {
      description: {
        story: '월별 캘린더 뷰 - 한 달의 모든 날짜와 일정을 표시합니다.',
      },
    },
  },
};

export const WeeklyView: Story = {
  parameters: {
    docs: {
      description: {
        story: '주별 캘린더 뷰 - 일주일의 시간대별 일정을 표시합니다.',
      },
    },
  },
};

export const DailyView: Story = {
  parameters: {
    docs: {
      description: {
        story: '일별 캘린더 뷰 - 하루의 시간대별 상세 일정을 표시합니다.',
      },
    },
  },
};
