import type { Meta, StoryObj } from '@storybook/react';
import LoginPage from '@/app/login/page';
import { withAppLayout } from '@storybook/decorators';

const meta = {
  title: 'Pages/Auth/LoginPage',
  component: LoginPage,
  decorators: [withAppLayout],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '로그인 페이지 - 사용자가 로그인할 수 있는 화면입니다.',
      },
    },
  },
};
