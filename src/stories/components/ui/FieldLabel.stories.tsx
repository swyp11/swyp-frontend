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
    fieldType: 'input',
    placeholder: 'example@email.com',
  },
};

export const WithHelpText: Story = {
  args: {
    label: '비밀번호',
    helptext: '8자 이상 입력해주세요',
    fieldType: 'input',
    placeholder: '비밀번호',
  },
};

export const Required: Story = {
  args: {
    label: '이름',
    required: true,
    fieldType: 'input',
    placeholder: '이름을 입력하세요',
  },
};

export const WithTextarea: Story = {
  args: {
    label: '설명',
    helptext: '상세한 설명을 입력해주세요',
    fieldType: 'textarea',
    placeholder: '설명',
  },
};
