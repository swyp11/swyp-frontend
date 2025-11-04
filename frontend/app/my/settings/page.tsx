"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const settingsItems = [
    {
      label: "개인정보",
      onClick: () => {
        // TODO: 개인정보 페이지로 이동
        console.log("개인정보");
      },
    },
    {
      label: "개인정보 처리방침",
      onClick: () => {
        // TODO: 개인정보 처리방침 페이지로 이동
        console.log("개인정보 처리방침");
      },
    },
    {
      label: "저작권자",
      onClick: () => {
        // TODO: 저작권자 페이지로 이동
        console.log("저작권자");
      },
    },
    {
      label: "로그아웃",
      onClick: () => setShowLogoutModal(true),
    },
  ];

  const handleLogout = () => {
    // TODO: 실제 로그아웃 로직 구현
    console.log("로그아웃");
    setShowLogoutModal(false);
    router.push("/login");
  };

  return (
    <>
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
            설정
          </h1>
          <div className="w-6" /> {/* Spacer for centering */}
        </div>

        {/* Settings List */}
        <div className="flex-1 flex flex-col">
          {settingsItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="flex items-center justify-between px-4 py-4 border-b border-border-subtle hover:bg-surface-2 transition-colors"
            >
              <span className="body-2 text-on-surface">{item.label}</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.29 6.71L10.7 5.3L17.4 12L10.7 18.7L9.29 17.29L14.58 12L9.29 6.71Z"
                  fill="#1F1E1E"
                />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div
            className="bg-white rounded-lg p-6 mx-4"
            style={{ maxWidth: "320px", width: "100%" }}
          >
            <p className="body-2 text-on-surface text-center mb-6">
              정말 로그아웃 하시겠습니까?
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 btn h-12 border border-border bg-white text-on-surface"
              >
                로그아웃
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 btn btn-primary h-12"
              >
                네, 이동합니다
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
