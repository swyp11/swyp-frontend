import type { Meta, StoryObj } from '@storybook/react';
import MainPage from '@/app/main/page';

const meta = {
  title: 'Pages/MainPage',
  component: MainPage,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MainPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '메인 페이지 - 홈 화면입니다.',
      },
    },
  },
};
