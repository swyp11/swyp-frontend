import type { Meta, StoryObj } from '@storybook/react';
import RecommendPage from '@/app/recommend/page';

const meta = {
  title: 'Pages/RecommendPage',
  component: RecommendPage,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RecommendPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '추천 페이지 - 스타일 추천 화면입니다.',
      },
    },
  },
};
