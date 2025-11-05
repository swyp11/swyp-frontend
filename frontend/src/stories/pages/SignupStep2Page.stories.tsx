import type { Meta, StoryObj } from '@storybook/react';
import SignupStep2Page from '@/app/signup/step2/page';

const meta = {
  title: 'Pages/Auth/SignupStep2Page',
  component: SignupStep2Page,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SignupStep2Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '회원가입 2단계 페이지 - 추가 정보를 입력하는 화면입니다.',
      },
    },
  },
};
