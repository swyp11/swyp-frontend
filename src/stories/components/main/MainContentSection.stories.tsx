import type { Meta, StoryObj } from '@storybook/react';
import { MainContentSection } from '@/components/main/MainContentSection';

const meta = {
  title: 'Components/Main/MainContentSection',
  component: MainContentSection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MainContentSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
