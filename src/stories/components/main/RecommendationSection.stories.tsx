import type { Meta, StoryObj } from '@storybook/react';
import { RecommendationSection } from '@/components/main/RecommendationSection';

const meta = {
  title: 'Components/Main/RecommendationSection',
  component: RecommendationSection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RecommendationSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activeTab: 'wedding-hall',
  },
};
