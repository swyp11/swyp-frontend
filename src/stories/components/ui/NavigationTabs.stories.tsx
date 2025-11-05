import type { Meta, StoryObj } from '@storybook/react';
import { NavigationTabs } from '@/components/ui/NavigationTabs';
import { useState } from 'react';

const meta = {
  title: 'Components/UI/NavigationTabs',
  component: NavigationTabs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NavigationTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleTabs = ['드레스', '스튜디오', '메이크업', '헤어', '예식장'];

export const Default: Story = {
  args: {
    tabs: sampleTabs,
    activeTab: '드레스',
    onTabChange: (tab) => console.log('Tab changed:', tab),
  },
};

export const SecondTabActive: Story = {
  args: {
    tabs: sampleTabs,
    activeTab: '스튜디오',
    onTabChange: (tab) => console.log('Tab changed:', tab),
  },
};

export const Interactive: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('드레스');

    return (
      <div>
        <NavigationTabs tabs={sampleTabs} activeTab={activeTab} onTabChange={setActiveTab} />
        <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
          <p>현재 선택된 탭: <strong>{activeTab}</strong></p>
        </div>
      </div>
    );
  },
};

export const ManyTabs: Story = {
  args: {
    tabs: ['탭1', '탭2', '탭3', '탭4', '탭5', '탭6', '탭7', '탭8'],
    activeTab: '탭1',
    onTabChange: (tab) => console.log('Tab changed:', tab),
  },
};
