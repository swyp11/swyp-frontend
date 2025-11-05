import type { Meta, StoryObj } from '@storybook/react';
import { Header } from '@/components/common/Header';

const meta = {
  title: 'Components/Common/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본 헤더 - 로고와 알림 아이콘이 있습니다.',
      },
    },
  },
};

export const WithNotification: Story = {
  parameters: {
    docs: {
      description: {
        story: '알림이 있는 상태의 헤더 - 빨간 점으로 알림을 표시합니다.',
      },
    },
  },
};
