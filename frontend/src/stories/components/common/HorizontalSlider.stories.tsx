import type { Meta, StoryObj } from '@storybook/react';
import { HorizontalSlider } from '@/components/common/HorizontalSlider';

const meta = {
  title: 'Components/Common/HorizontalSlider',
  component: HorizontalSlider,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    gap: {
      control: 'number',
      description: '아이템 간 간격 (px)',
    },
  },
} satisfies Meta<typeof HorizontalSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    gap: 12,
    children: (
      <>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
          <div
            key={num}
            style={{
              minWidth: '200px',
              height: '150px',
              backgroundColor: '#f0f0f0',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 'bold',
            }}
          >
            Item {num}
          </div>
        ))}
      </>
    ),
  },
};

export const WithImages: Story = {
  args: {
    gap: 16,
    children: (
      <>
        {[1, 2, 3, 4, 5].map((num) => (
          <div
            key={num}
            style={{
              minWidth: '250px',
              height: '200px',
              backgroundColor: '#e0e0e0',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '120px',
                backgroundColor: '#ccc',
                borderRadius: '8px',
                marginBottom: '12px',
              }}
            />
            <p style={{ margin: 0, fontSize: '14px' }}>상품 {num}</p>
          </div>
        ))}
      </>
    ),
  },
};

export const SmallGap: Story = {
  args: {
    gap: 4,
    children: (
      <>
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <div
            key={num}
            style={{
              minWidth: '100px',
              height: '100px',
              backgroundColor: '#562699',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '18px',
            }}
          >
            {num}
          </div>
        ))}
      </>
    ),
  },
};

export const LargeGap: Story = {
  args: {
    gap: 24,
    children: (
      <>
        {[1, 2, 3, 4].map((num) => (
          <div
            key={num}
            style={{
              minWidth: '300px',
              height: '200px',
              backgroundColor: '#f3335d',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '32px',
              fontWeight: 'bold',
            }}
          >
            {num}
          </div>
        ))}
      </>
    ),
  },
};
