import type { Meta, StoryObj } from '@storybook/react';
import { BackHeader } from '@/components/common/BackHeader';

const meta = {
  title: 'Components/Common/BackHeader',
  component: BackHeader,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BackHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '페이지 제목',
  },
  parameters: {
    docs: {
      description: {
        story: '기본 뒤로가기 헤더입니다.',
      },
    },
  },
};

export const Settings: Story = {
  args: {
    title: '설정',
  },
  parameters: {
    docs: {
      description: {
        story: '설정 페이지에서 사용되는 헤더입니다.',
      },
    },
  },
};

export const Favorites: Story = {
  args: {
    title: '찜',
  },
  parameters: {
    docs: {
      description: {
        story: '찜 목록 페이지에서 사용되는 헤더입니다.',
      },
    },
  },
};

export const Signup: Story = {
  args: {
    title: '회원가입',
  },
  parameters: {
    docs: {
      description: {
        story: '회원가입 페이지에서 사용되는 헤더입니다.',
      },
    },
  },
};

export const WithRightElement: Story = {
  args: {
    title: '페이지 제목',
    rightElement: (
      <button className="text-primary body-2-medium">
        완료
      </button>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: '오른쪽에 추가 요소(버튼 등)가 있는 헤더입니다.',
      },
    },
  },
};
