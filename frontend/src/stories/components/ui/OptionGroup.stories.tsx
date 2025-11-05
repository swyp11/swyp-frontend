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

const sampleOptions = [
  { value: 'option1', label: '옵션 1' },
  { value: 'option2', label: '옵션 2' },
  { value: 'option3', label: '옵션 3' },
  { value: 'option4', label: '옵션 4' },
];

export const Default: Story = {
  args: {
    title: '옵션 선택',
    options: sampleOptions,
    selectedValue: 'option1',
    onChange: (value) => console.log('Selected:', value),
  },
};

export const NoSelection: Story = {
  args: {
    title: '옵션 선택',
    options: sampleOptions,
    selectedValue: undefined,
    onChange: (value) => console.log('Selected:', value),
  },
};

export const Interactive: Story = {
  render: () => {
    const [selected, setSelected] = useState('option2');

    return (
      <div>
        <OptionGroup
          title="스타일 선택"
          options={sampleOptions}
          selectedValue={selected}
          onChange={setSelected}
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
    title: '지역 선택',
    options: [
      { value: 'seoul', label: '서울' },
      { value: 'busan', label: '부산' },
      { value: 'incheon', label: '인천' },
      { value: 'daegu', label: '대구' },
      { value: 'gwangju', label: '광주' },
      { value: 'daejeon', label: '대전' },
      { value: 'ulsan', label: '울산' },
      { value: 'sejong', label: '세종' },
    ],
    selectedValue: 'seoul',
    onChange: (value) => console.log('Selected:', value),
  },
};
