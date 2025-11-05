"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Notification {
  id: number;
  label: string;
  description: string;
  timestamp: string;
}

export default function NotificationsPage() {
  const router = useRouter();

  // TODO: 실제 데이터는 API에서 가져와야 함
  const [notifications] = useState<Notification[]>([
    {
      id: 1,
      label: "{{label}}",
      description: "{{description}}",
      timestamp: "10분 전",
    },
    {
      id: 2,
      label: "캘린더",
      description: '오늘 "강남역 드레스샵 투어예약" 일정이 있습니다.',
      timestamp: "10월 25일",
    },
  ]);

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-[13px] border-b border-[#f1f1f1] bg-white">
        <div className="flex items-center justify-center gap-[10px] px-4 py-0">
          <button
            onClick={() => router.back()}
            className="w-6 h-6 overflow-hidden"
            aria-label="뒤로가기"
          >
            <Image
              className="relative w-6 h-6"
              alt=""
              src="/img/arrow_back.svg"
              width={24}
              height={24}
            />
          </button>
        </div>
        <p className="body-2-medium text-on-surface">알림</p>
        <div className="flex items-center justify-center gap-[10px] px-4 py-0 opacity-0">
          <div className="w-6 h-6 overflow-hidden">
            <Image
              className="relative w-6 h-6"
              alt=""
              src="/img/arrow_back.svg"
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 flex flex-col bg-white overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex flex-col gap-2 p-4 border-b border-[#f1f1f1] bg-white"
          >
            <div className="flex items-start justify-between w-full text-on-surface-subtle body-2">
              <p className="body-2-medium">{notification.label}</p>
              <p className="body-2">{notification.timestamp}</p>
            </div>
            <p className="body-2-medium text-on-surface w-full">
              {notification.description}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
