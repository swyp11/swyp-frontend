import type { Meta, StoryObj } from '@storybook/react';
import { NavigationTabs, NavigationTab } from '@/components/ui/NavigationTabs';
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

const sampleTabs: NavigationTab[] = [
  { id: 'dress', label: '드레스' },
  { id: 'studio', label: '스튜디오' },
  { id: 'makeup', label: '메이크업' },
  { id: 'hair', label: '헤어' },
  { id: 'venue', label: '예식장' },
];

export const Default: Story = {
  args: {
    tabs: sampleTabs,
    activeTab: 'dress',
    onTabChange: (tab) => console.log('Tab changed:', tab),
  },
};

export const SecondTabActive: Story = {
  args: {
    tabs: sampleTabs,
    activeTab: 'studio',
    onTabChange: (tab) => console.log('Tab changed:', tab),
  },
};

export const Interactive: Story = {
  args: {
    tabs: sampleTabs,
    activeTab: 'dress',
    onTabChange: (tab) => console.log('Tab changed:', tab),
  },
  render: () => {
    const [activeTab, setActiveTab] = useState('dress');

    return (
      <div>
        <NavigationTabs tabs={sampleTabs} activeTab={activeTab} onTabChange={setActiveTab} />
        <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
          <p>현재 선택된 탭: <strong>{sampleTabs.find(tab => tab.id === activeTab)?.label}</strong></p>
        </div>
      </div>
    );
  },
};

export const ManyTabs: Story = {
  args: {
    tabs: [
      { id: 'tab1', label: '탭1' },
      { id: 'tab2', label: '탭2' },
      { id: 'tab3', label: '탭3' },
      { id: 'tab4', label: '탭4' },
      { id: 'tab5', label: '탭5' },
      { id: 'tab6', label: '탭6' },
      { id: 'tab7', label: '탭7' },
      { id: 'tab8', label: '탭8' },
    ],
    activeTab: 'tab1',
    onTabChange: (tab) => console.log('Tab changed:', tab),
  },
};
