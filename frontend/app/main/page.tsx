"use client";

import React from "react";
import { Header } from "../components/common/Header";
import { BottomNavigation } from "../components/common/BottomNavigation";
import { NavigationTabSection } from "../components/main/NavigationTabSection";
import { FeaturedItemsSection } from "../components/main/FeaturedItemsSection";
import { MainContentSection } from "../components/main/MainContentSection";
import { RecommendationSection } from "../components/main/RecommendationSection";

export default function MainPage() {
  return (
    <div
      className="flex flex-col h-screen items-start relative bg-white mx-auto"
      style={{ width: "var(--app-width)" }}
      data-model-id="3:14353"
    >
      {/* Fixed Header */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 z-50"
        style={{ width: "var(--app-width)" }}
      >
        <Header />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 w-full overflow-y-auto pt-[64px] pb-[80px]">
        <NavigationTabSection />
        <FeaturedItemsSection />
        <MainContentSection />
        <RecommendationSection />
      </div>

      {/* Fixed Bottom Navigation */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50"
        style={{ width: "var(--app-width)" }}
      >
        <BottomNavigation />
      </div>
    </div>
  );
}
