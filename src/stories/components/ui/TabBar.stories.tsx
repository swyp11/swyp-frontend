import type { Meta, StoryObj } from '@storybook/react';
import { TabBar } from '@/components/ui/TabBar';
import { useState } from 'react';
import { getAssetPath } from '@/utils/assetPath';

const meta = {
  title: 'Components/UI/TabBar',
  component: TabBar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TabBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleTabs = [
  { id: 'home', icon: getAssetPath('/img/home.svg'), label: '홈', href: '/main' },
  { id: 'style', icon: getAssetPath('/img/face-retouching-natural.svg'), label: '스타일', href: '/recommend' },
  { id: 'calendar', icon: getAssetPath('/img/calendar-month.svg'), label: '캘린더', href: '/schedule' },
  { id: 'my', icon: getAssetPath('/img/person.svg'), label: '마이', href: '/my' },
];

export const Default: Story = {
  args: {
    items: sampleTabs,
    activeTab: 'home',
  },
};

export const StyleActive: Story = {
  args: {
    items: sampleTabs,
    activeTab: 'style',
  },
};

export const CalendarActive: Story = {
  args: {
    items: sampleTabs,
    activeTab: 'calendar',
  },
};

export const Interactive: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('home');

    return (
      <div style={{ position: 'relative', height: '100vh' }}>
        <div style={{ padding: '20px' }}>
          <p>현재 선택된 탭: {activeTab}</p>
        </div>
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
          <TabBar items={sampleTabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>
    );
  },
};
