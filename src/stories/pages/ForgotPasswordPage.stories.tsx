import type { Meta, StoryObj } from '@storybook/react';
import ForgotPasswordPage from '@/app/forgot-password/page';
import { withAppLayout } from '@storybook/decorators';

const meta = {
  title: 'Pages/Auth/ForgotPasswordPage',
  component: ForgotPasswordPage,
  decorators: [withAppLayout],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/forgot-password',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ForgotPasswordPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '비밀번호 찾기 1단계 - 사용자의 계정 정보(이름, 생년월일, 휴대폰 번호)를 확인합니다.',
      },
    },
  },
};

export const FilledForm: Story = {
  parameters: {
    docs: {
      description: {
        story: '입력 필드가 채워진 상태',
      },
    },
  },
  play: async ({ canvasElement }) => {
    // This would need to be implemented with proper Storybook interactions
    // For now, it serves as a visual reference
  },
};
