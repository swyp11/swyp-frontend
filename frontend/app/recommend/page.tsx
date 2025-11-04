"use client";

import React from "react";
import { useNavigation } from "../../contexts/NavigationContext";
import { Header } from "../../components/common/Header";
import { BottomNavigation } from "../../components/common/BottomNavigation";
import { OptionsSection } from "../../components/recommend/OptionsSection";

export default function RecommendPage() {
  return (
    <div
      className="flex flex-col h-screen items-start relative bg-white mx-auto"
      style={{ width: "var(--app-width)" }}
      data-model-id="3:14535"
    >
      {/* Fixed Header */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 z-50"
        style={{ width: "var(--app-width)" }}
      >
        <Header />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 w-full overflow-y-auto" style={{ paddingTop: "var(--header-height)", paddingBottom: "var(--footer-height)" }}>
        <OptionsSection />
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
