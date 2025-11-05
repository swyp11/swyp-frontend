import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui/Button';

const meta = {
  title: 'Components/UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AccentPrimary: Story = {
  args: {
    variant: 'primary',
    colorType: 'accent',
    children: 'Primary Button',
  },
};

export const AccentSecondary: Story = {
  args: {
    variant: 'secondary',
    colorType: 'accent',
    children: 'Secondary Button',
  },
};

export const Filter: Story = {
  args: {
    variant: 'filter',
    children: '지역',
    selected: false,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Button variant="primary" colorType="accent">Accent Primary</Button>
      <Button variant="secondary" colorType="accent">Accent Secondary</Button>
      <Button variant="tertiary" colorType="accent">Accent Tertiary</Button>
      <Button variant="filter">필터</Button>
    </div>
  ),
};
