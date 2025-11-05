import type { Meta, StoryObj } from '@storybook/react';
import SignupPage from '@/app/signup/page';
import { withAppLayout } from '@storybook/decorators';

const meta = {
  title: 'Pages/Auth/SignupPage',
  component: SignupPage,
  decorators: [withAppLayout],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SignupPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '회원가입 페이지 - 신규 사용자가 회원가입할 수 있는 화면입니다.',
      },
    },
  },
};
