import React from "react";
import { BottomNavigation } from "../components/common/BottomNavigation";

export default function SchedulePage() {
  return (
    <div 
      className="flex flex-col h-screen items-start relative bg-white mx-auto"
      style={{ width: "var(--app-width)" }}
    >
      {/* Scrollable Content */}
      <div className="flex-1 w-full overflow-y-auto flex flex-col items-center justify-center p-4" style={{ paddingBottom: "var(--footer-height)" }}>
        <h1 className="text-2xl font-bold mb-4">일정 페이지</h1>
        <p className="text-gray-600">일정 관리 기능이 여기에 들어갑니다.</p>
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