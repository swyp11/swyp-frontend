import type { Meta, StoryObj } from '@storybook/react';
import FavoritesPage from '@/app/my/favorites/page';
import { withAppLayout } from '@storybook/decorators';

const meta = {
  title: 'Pages/FavoritesPage',
  component: FavoritesPage,
  decorators: [withAppLayout],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FavoritesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '찜 목록 페이지 - 사용자가 찜한 웨딩홀과 드레스를 관리하는 화면입니다.',
      },
    },
  },
};

export const WeddingHallTab: Story = {
  parameters: {
    docs: {
      description: {
        story: '웨딩홀 탭이 활성화된 찜 목록 페이지입니다.',
      },
    },
  },
};

export const DressTab: Story = {
  parameters: {
    docs: {
      description: {
        story: '드레스 탭이 활성화된 찜 목록 페이지입니다.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = canvasElement;
    const dressTab = canvas.querySelectorAll('button')[2] as HTMLButtonElement;
    if (dressTab) {
      dressTab.click();
    }
  },
};
