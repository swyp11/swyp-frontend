import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '@/components/ui/Tooltip';

const meta = {
  title: 'Components/UI/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: '툴팁 텍스트',
    },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right', 'top-start', 'top-end'],
      description: '툴팁 위치',
    },
    showArrow: {
      control: 'boolean',
      description: '화살표 표시 여부',
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: '툴팁 텍스트',
    position: 'top',
    showArrow: true,
  },
};

export const WithoutArrow: Story = {
  args: {
    text: '화살표 없는 툴팁',
    position: 'top',
    showArrow: false,
  },
};

export const LongText: Story = {
  args: {
    text: '이것은 긴 텍스트를 가진 툴팁입니다. 여러 줄로 표시될 수 있습니다.',
    position: 'top',
    showArrow: true,
  },
};

export const AllPositions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '100px', padding: '100px' }}>
      <Tooltip text="Top" position="top" />
      <Tooltip text="Bottom" position="bottom" />
      <Tooltip text="Left" position="left" />
      <Tooltip text="Right" position="right" />
      <Tooltip text="Top Start" position="top-start" />
      <Tooltip text="Top End" position="top-end" />
    </div>
  ),
};
