import type { Meta, StoryObj } from '@storybook/react';
import NotificationsPage from '@/app/notifications/page';

const meta = {
  title: 'Pages/NotificationsPage',
  component: NotificationsPage,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NotificationsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '알림 페이지 - 사용자에게 전달된 알림 목록을 확인하고 관리하는 화면입니다.',
      },
    },
  },
};

export const WithUnreadNotifications: Story = {
  parameters: {
    docs: {
      description: {
        story: '읽지 않은 알림이 있는 알림 페이지입니다. 읽지 않은 알림은 하이라이트 표시됩니다.',
      },
    },
  },
};

export const AllReadNotifications: Story = {
  parameters: {
    docs: {
      description: {
        story: '모든 알림을 읽은 상태의 알림 페이지입니다.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = canvasElement;
    const markAllReadButton = canvas.querySelector('button:last-of-type') as HTMLButtonElement;
    if (markAllReadButton && markAllReadButton.textContent?.includes('모두 읽음')) {
      markAllReadButton.click();
    }
  },
};
