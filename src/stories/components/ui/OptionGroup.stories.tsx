import type { Meta, StoryObj } from '@storybook/react';
import { OptionGroup } from '@/components/ui/OptionGroup';
import { useState } from 'react';

const meta = {
  title: 'Components/UI/OptionGroup',
  component: OptionGroup,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OptionGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOptions = ['옵션 1', '옵션 2', '옵션 3', '옵션 4'];

export const Default: Story = {
  args: {
    label: '옵션 선택',
    options: sampleOptions,
    selectedOption: '옵션 1',
    onOptionSelect: (value: string) => console.log('Selected:', value),
  },
};

export const NoSelection: Story = {
  args: {
    label: '옵션 선택',
    options: sampleOptions,
    selectedOption: undefined,
    onOptionSelect: (value: string) => console.log('Selected:', value),
  },
};

export const Interactive: Story = {
  args: {
    label: '옵션 선택',
    options: sampleOptions,
    selectedOption: '옵션 1',
    onOptionSelect: (value: string) => console.log('Selected:', value),
  },
  render: () => {
    const [selected, setSelected] = useState('옵션 2');

    return (
      <div>
        <OptionGroup
          label="스타일 선택"
          options={sampleOptions}
          selectedOption={selected}
          onOptionSelect={setSelected}
        />
        <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
          <p>현재 선택: <strong>{selected}</strong></p>
        </div>
      </div>
    );
  },
};

export const ManyOptions: Story = {
  args: {
    label: '지역 선택',
    options: ['서울', '부산', '인천', '대구', '광주', '대전', '울산', '세종'],
    selectedOption: '서울',
    onOptionSelect: (value: string) => console.log('Selected:', value),
  },
};
