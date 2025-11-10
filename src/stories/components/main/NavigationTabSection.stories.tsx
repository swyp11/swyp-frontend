import type { Meta, StoryObj } from '@storybook/react';
import { NavigationTabSection } from '@/components/main/NavigationTabSection';

const meta = {
  title: 'Components/Main/NavigationTabSection',
  component: NavigationTabSection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NavigationTabSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activeTab: 'wedding-hall',
    onTabChange: (tab: string) => console.log('Tab changed:', tab),
  },
};
