import type { Meta, StoryObj } from '@storybook/react';
import { OptionsSection } from '@/components/recommend/OptionsSection';

const meta = {
  title: 'Components/Recommend/OptionsSection',
  component: OptionsSection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OptionsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
