"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { BottomNavigation } from "../../components/common/BottomNavigation";

export default function MyPage() {
  const router = useRouter();

  // TODO: 실제 사용자 정보를 가져와야 함
  const userName = "따뜻한고구마";
  const userRole = "신부님";
  const daysUntilWedding = 99;

  const menuItems = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"
            fill="#1F1E1E"
          />
        </svg>
      ),
      label: "설정",
      onClick: () => router.push("/my/settings"),
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"
            fill="#1F1E1E"
          />
        </svg>
      ),
      label: "찜 목록",
      onClick: () => router.push("/my/favorites"),
    },
  ];

  return (
    <div
      className="flex flex-col h-screen items-start relative bg-white mx-auto"
      style={{ width: "var(--app-width)" }}
    >
      {/* Scrollable Content */}
      <div
        className="flex-1 w-full overflow-y-auto"
        style={{ paddingBottom: "var(--footer-height)" }}
      >
        {/* Header - GNB */}
        <div className="flex items-center justify-between px-4 py-4 bg-white">
          <h1 className="title-1 text-primary">LOGO</h1>
          <div className="relative">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"
                fill="#1F1E1E"
              />
            </svg>
            {/* Notification Badge */}
            <div className="absolute top-0 right-0 w-2 h-2 bg-alert rounded-full" />
          </div>
        </div>

        {/* Profile Section */}
        <div className="px-4 py-4">
          <button
            onClick={() => {
              // TODO: 프로필 편집 페이지로 이동
              console.log("프로필 편집");
            }}
            className="flex items-center gap-4 w-full"
          >
            {/* Profile Image */}
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-semibold text-[26px]">
              {userName.charAt(0)}
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-left">
              <div className="body-1-medium text-on-surface font-bold">
                {userName}
              </div>
              <div className="label-1 text-on-surface-subtle">
                {userRole} ・ 결혼식까지 {daysUntilWedding}일
              </div>
            </div>

            {/* Arrow */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M9.29 6.71L10.7 5.3L17.4 12L10.7 18.7L9.29 17.29L14.58 12L9.29 6.71Z"
                fill="#1F1E1E"
              />
            </svg>
          </button>
        </div>

        {/* Divider */}
        <div className="w-full h-2 bg-[#f6f6f6]" />

        {/* Menu List */}
        <div className="flex flex-col gap-6 px-4 py-6">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="flex items-center gap-3 w-full"
            >
              <div className="w-6 h-6 shrink-0">{item.icon}</div>
              <span className="flex-1 text-left body-2-medium text-on-surface">
                {item.label}
              </span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9.29 6.71L10.7 5.3L17.4 12L10.7 18.7L9.29 17.29L14.58 12L9.29 6.71Z"
                  fill="#1F1E1E"
                />
              </svg>
            </button>
          ))}
        </div>
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
