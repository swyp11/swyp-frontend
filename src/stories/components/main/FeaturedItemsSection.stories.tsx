import type { Meta, StoryObj } from '@storybook/react';
import { FeaturedItemsSection } from '@/components/main/FeaturedItemsSection';

const meta = {
  title: 'Components/Main/FeaturedItemsSection',
  component: FeaturedItemsSection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FeaturedItemsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    searchQuery: '',
    onSearchChange: (value: string) => console.log('Search changed:', value),
    onSearch: () => console.log('Search submitted'),
  },
};
