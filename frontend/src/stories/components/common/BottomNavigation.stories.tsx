import type { Meta, StoryObj } from '@storybook/react';
import { BottomNavigation } from '@/components/common/BottomNavigation';
import { NavigationProvider } from '@/contexts/NavigationContext';

const meta = {
  title: 'Components/Common/BottomNavigation',
  component: BottomNavigation,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <NavigationProvider>
        <div style={{ position: 'relative', height: '100vh', paddingBottom: '60px' }}>
          <div style={{ padding: '20px' }}>
            <p>메인 콘텐츠 영역</p>
          </div>
          <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
            <Story />
          </div>
        </div>
      </NavigationProvider>
    ),
  ],
} satisfies Meta<typeof BottomNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
