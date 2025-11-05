import type { Meta, StoryObj } from '@storybook/react';
import SignupCompletePage from '@/app/signup/complete/page';
import { withAppLayout } from '@storybook/decorators';

const meta = {
  title: 'Pages/Auth/SignupCompletePage',
  component: SignupCompletePage,
  decorators: [withAppLayout],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SignupCompletePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '회원가입 완료 페이지 - 회원가입이 완료되었음을 알려주는 화면입니다.',
      },
    },
  },
};
