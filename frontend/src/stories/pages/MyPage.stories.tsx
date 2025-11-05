import type { Meta, StoryObj } from '@storybook/react';
import MyPage from '@/app/my/page';
import { withAppLayout } from '@storybook/decorators';

const meta = {
  title: 'Pages/MyPage',
  component: MyPage,
  decorators: [withAppLayout],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MyPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '마이페이지 - 사용자 정보 및 설정 화면입니다.',
      },
    },
  },
};
