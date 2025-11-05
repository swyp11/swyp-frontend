import type { Meta, StoryObj } from '@storybook/react';
import { FieldLabel } from '@/components/ui/FieldLabel';

const meta = {
  title: 'Components/UI/FieldLabel',
  component: FieldLabel,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FieldLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '이메일',
    children: <input type="email" className="field" placeholder="example@email.com" />,
  },
};

export const WithHelpText: Story = {
  args: {
    label: '비밀번호',
    helpText: '8자 이상 입력해주세요',
    children: <input type="password" className="field" placeholder="비밀번호" />,
  },
};

export const Required: Story = {
  args: {
    label: '이름',
    required: true,
    children: <input type="text" className="field" placeholder="이름을 입력하세요" />,
  },
};

export const WithTextarea: Story = {
  args: {
    label: '설명',
    helpText: '상세한 설명을 입력해주세요',
    children: <textarea className="field field-textbox" rows={4} placeholder="설명" />,
  },
};
