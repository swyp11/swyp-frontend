import type { Meta, StoryObj } from '@storybook/react';
import DetailPage from '@/app/detail/[id]/page';
import { withAppLayout } from '@storybook/decorators';

const meta = {
  title: 'Pages/DetailPage',
  component: DetailPage,
  decorators: [withAppLayout],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/detail/1',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DetailPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '상세보기 페이지 - 웨딩홀/드레스샵/메이크업샵의 상세 정보를 표시합니다.',
      },
    },
  },
};

export const WeddingHall: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/detail/1',
        query: { tab: 'wedding-hall' },
      },
    },
    docs: {
      description: {
        story: '웨딩홀 상세보기',
      },
    },
  },
};

export const DressShop: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/detail/2',
        query: { tab: 'dress' },
      },
    },
    docs: {
      description: {
        story: '드레스샵 상세보기',
      },
    },
  },
};
