import React from "react";
import { BottomNavigation } from "../../components/common/BottomNavigation";

export default function MyPage() {
  return (
    <div 
      className="flex flex-col h-screen items-start relative bg-white mx-auto"
      style={{ width: "var(--app-width)" }}
    >
      {/* Scrollable Content */}
      <div className="flex-1 w-full overflow-y-auto flex flex-col items-center justify-center p-4" style={{ paddingBottom: "var(--footer-height)" }}>
        <h1 className="text-2xl font-bold mb-4">마이 페이지</h1>
        <p className="text-gray-600">사용자 정보 및 설정이 여기에 들어갑니다.</p>
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