import type { Meta, StoryObj } from '@storybook/react';
import ForgotPasswordSuccessPage from '@/app/forgot-password/success/page';
import { withAppLayout } from '@storybook/decorators';

const meta = {
  title: 'Pages/Auth/ForgotPasswordSuccessPage',
  component: ForgotPasswordSuccessPage,
  decorators: [withAppLayout],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/forgot-password/success',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ForgotPasswordSuccessPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '비밀번호 찾기 3단계 - 임시 비밀번호가 이메일로 전송되었음을 확인하는 화면입니다.',
      },
    },
  },
  beforeEach: () => {
    // Mock sessionStorage for Storybook
    sessionStorage.setItem('recoveryEmail', 'user@example.com');
  },
};
