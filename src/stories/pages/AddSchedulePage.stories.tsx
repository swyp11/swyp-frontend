import type { Meta, StoryObj } from '@storybook/react';
import AddSchedulePage from '@/app/schedule/add/page';
import { withAppLayout } from '@storybook/decorators';

const meta = {
  title: 'Pages/Schedule/AddSchedulePage',
  component: AddSchedulePage,
  decorators: [withAppLayout],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AddSchedulePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '일정 추가 페이지 - 새로운 일정을 생성할 수 있는 폼 화면입니다.',
      },
    },
  },
};

export const EmptyForm: Story = {
  parameters: {
    docs: {
      description: {
        story: '빈 폼 상태 - 모든 필드가 초기 상태입니다.',
      },
    },
  },
};

export const WithData: Story = {
  parameters: {
    docs: {
      description: {
        story: '데이터 입력 상태 - 사용자가 일정 정보를 입력하는 중입니다.',
      },
    },
  },
};
