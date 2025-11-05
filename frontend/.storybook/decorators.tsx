import React from "react";
import { Header } from "../src/components/common/Header";
import { BottomNavigation } from "../src/components/common/BottomNavigation";

/**
 * 페이지 스토리에서 사용할 레이아웃 데코레이터
 * app/layout.tsx의 구조를 Storybook에서 재현합니다.
 */
export const withAppLayout = (Story: React.ComponentType) => {
  return (
    <div
      className="flex flex-col h-screen items-start relative bg-white mx-auto"
      style={{ width: "var(--app-width)" }}
    >
      {/* Fixed Header */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 z-50"
        style={{ width: "var(--app-width)" }}
      >
        <Header />
      </div>

      {/* Scrollable Content */}
      <div 
        className="flex-1 w-full overflow-y-auto" 
        style={{ 
          paddingTop: "var(--header-height)", 
          paddingBottom: "var(--footer-height)" 
        }}
      >
        <Story />
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
};

/**
 * 컴포넌트 스토리에서 사용할 간단한 레이아웃 데코레이터
 */
export const withSimpleLayout = (Story: React.ComponentType) => {
  return (
    <div
      className="bg-white p-4"
      style={{ width: "var(--app-width)" }}
    >
      <Story />
    </div>
  );
};