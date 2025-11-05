import type { Meta, StoryObj } from '@storybook/react';
import { GNB } from '@/components/ui/GNB';

const meta = {
  title: 'Components/UI/GNB',
  component: GNB,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    logo: {
      control: 'text',
      description: '로고 텍스트',
    },
    logoHref: {
      control: 'text',
      description: '로고 링크',
    },
    hasNotification: {
      control: 'boolean',
      description: '알림 뱃지 표시 여부',
    },
    onNotificationClick: {
      action: 'notification clicked',
    },
  },
} satisfies Meta<typeof GNB>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    logo: 'LOGO',
    logoHref: '/',
    hasNotification: false,
  },
};

export const WithNotification: Story = {
  args: {
    logo: 'LOGO',
    logoHref: '/',
    hasNotification: true,
  },
};

export const CustomLogo: Story = {
  args: {
    logo: '결혼준비',
    logoHref: '/main',
    hasNotification: false,
  },
};
