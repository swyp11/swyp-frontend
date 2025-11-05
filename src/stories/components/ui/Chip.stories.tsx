import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from '@/components/ui/Chip';

const meta = {
  title: 'Components/UI/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '기본 Chip',
    variant: 'default',
    selected: false,
  },
};

export const DefaultSelected: Story = {
  args: {
    label: '선택된 Chip',
    variant: 'default',
    selected: true,
  },
};

export const Pill: Story = {
  args: {
    label: 'Pill Chip',
    variant: 'pill',
    selected: false,
  },
};

export const AllVariants: Story = {
  args: {
    label: '기본 Chip',
    variant: 'default',
    selected: false,
  },
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Chip label="Default" variant="default" />
      <Chip label="Default Selected" variant="default" selected />
      <Chip label="Pill" variant="pill" />
      <Chip label="Pill Selected" variant="pill" selected />
    </div>
  ),
};
