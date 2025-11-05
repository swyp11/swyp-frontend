import type { Meta, StoryObj } from '@storybook/react';
import SettingsPage from '@/app/my/settings/page';

const meta = {
  title: 'Pages/SettingsPage',
  component: SettingsPage,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SettingsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '설정 페이지 - 이용약관, 개인정보 처리방침, 로그아웃, 회원탈퇴 등을 관리하는 화면입니다.',
      },
    },
  },
};

export const WithLogoutModal: Story = {
  parameters: {
    docs: {
      description: {
        story: '로그아웃 모달이 표시된 설정 페이지입니다.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = canvasElement;
    const logoutButton = canvas.querySelector('button:nth-child(4)') as HTMLButtonElement;
    if (logoutButton) {
      logoutButton.click();
    }
  },
};

export const WithWithdrawModal: Story = {
  parameters: {
    docs: {
      description: {
        story: '회원탈퇴 모달이 표시된 설정 페이지입니다.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = canvasElement;
    const withdrawButton = canvas.querySelector('button:nth-child(3)') as HTMLButtonElement;
    if (withdrawButton) {
      withdrawButton.click();
    }
  },
};
