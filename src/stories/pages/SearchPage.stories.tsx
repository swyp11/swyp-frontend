import type { Meta, StoryObj } from '@storybook/react';
import SearchPage from '@/app/search/page';
import { withAppLayout } from '@storybook/decorators';

const meta = {
  title: 'Pages/SearchPage',
  component: SearchPage,
  decorators: [withAppLayout],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/search',
        query: { q: '웨딩홀', tab: 'wedding-hall' },
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SearchPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '검색 결과 페이지 - 검색어에 따른 결과를 그리드 형태로 표시합니다.',
      },
    },
  },
};

export const EmptyResults: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/search',
        query: { q: 'nonexistent', tab: 'wedding-hall' },
      },
    },
    docs: {
      description: {
        story: '검색 결과가 없는 경우',
      },
    },
  },
};
