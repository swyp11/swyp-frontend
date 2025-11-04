"use client";

import React, { useState } from "react";
import { NavigationTabs, type NavigationTab } from "../ui";

export const NavigationTabSection = () => {
  const tabs: NavigationTab[] = [
    { id: "wedding-hall", label: "웨딩홀" },
    { id: "dress", label: "드레스" },
  ];

  const [activeTab, setActiveTab] = useState<string>("dress");

  return (
    <NavigationTabs
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    />
  );
};
