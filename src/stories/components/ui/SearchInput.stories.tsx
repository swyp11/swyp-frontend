import type { Meta, StoryObj } from '@storybook/react';
import { SearchInput } from '@/components/ui/SearchInput';

const meta = {
  title: 'Components/UI/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '검색어를 입력하세요',
    onSearch: (value) => console.log('Search:', value),
  },
};

export const WithValue: Story = {
  args: {
    placeholder: '검색어를 입력하세요',
    value: '드레스',
    onSearch: (value) => console.log('Search:', value),
  },
};
