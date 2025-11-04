"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function ReviewsPage() {
  const router = useRouter();

  return (
    <div
      className="flex flex-col h-screen bg-white mx-auto"
      style={{ width: "var(--app-width)" }}
    >
      {/* Header */}
      <div className="flex items-center px-4 py-4 border-b border-border-subtle">
        <button
          onClick={() => router.back()}
          className="w-6 h-6 flex items-center justify-center"
          aria-label="뒤로가기"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z"
              fill="#1F1E1E"
            />
          </svg>
        </button>
        <h1 className="flex-1 text-center body-2-medium text-on-surface">
          리뷰보기
        </h1>
        <div className="w-6" /> {/* Spacer for centering */}
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="body-2 text-on-surface-subtle">
            아직 작성한 리뷰가 없습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
