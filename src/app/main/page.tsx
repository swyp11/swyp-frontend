"use client";

import React, { useState } from "react";
import { useNavigation } from "../../contexts/NavigationContext";
import { NavigationTabSection } from "../../components/main/NavigationTabSection";
import { FeaturedItemsSection } from "../../components/main/FeaturedItemsSection";
import { MainContentSection } from "../../components/main/MainContentSection";
import { RecommendationSection } from "../../components/main/RecommendationSection";

export default function MainPage() {
  const [activeTab, setActiveTab] = useState<string>("dress");

  return (
    <>
      <NavigationTabSection activeTab={activeTab} onTabChange={setActiveTab} />
      <FeaturedItemsSection />
      {activeTab === "dress" && <MainContentSection />}
      <RecommendationSection activeTab={activeTab} />
    </>
  );
}
