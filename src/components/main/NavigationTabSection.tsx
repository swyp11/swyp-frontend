"use client";

import React from "react";
import { NavigationTabs, type NavigationTab } from "../ui";

interface NavigationTabSectionProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const NavigationTabSection = ({ activeTab, onTabChange }: NavigationTabSectionProps) => {
  const tabs: NavigationTab[] = [
    { id: "wedding-hall", label: "웨딩홀" },
    { id: "dress-shop", label: "드레스샵" },
    { id: "makeup-shop", label: "메이크업샵" },
  ];

  return (
    <NavigationTabs
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={onTabChange}
    />
  );
};
