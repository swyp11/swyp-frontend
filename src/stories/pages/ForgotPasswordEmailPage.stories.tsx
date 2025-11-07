import type { Meta, StoryObj } from '@storybook/react';
import ForgotPasswordEmailPage from '@/app/forgot-password/email/page';
import { withAppLayout } from '@storybook/decorators';

const meta = {
  title: 'Pages/Auth/ForgotPasswordEmailPage',
  component: ForgotPasswordEmailPage,
  decorators: [withAppLayout],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/forgot-password/email',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ForgotPasswordEmailPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '비밀번호 찾기 2단계 - 임시 비밀번호를 받을 이메일 주소를 입력합니다.',
      },
    },
  },
  beforeEach: () => {
    // Mock sessionStorage for Storybook
    sessionStorage.setItem(
      'passwordRecoveryData',
      JSON.stringify({
        name: '홍길동',
        birthDate: '1990-01-01',
        phoneNumber: '010-1234-5678',
      })
    );
  },
};
