"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  const settingsItems = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M16 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V8L16 3ZM7 7H12V9H7V7ZM17 17H7V15H17V17ZM17 13H7V11H17V13ZM15 9V5L19 9H15Z"
            fill="#1F1E1E"
          />
        </svg>
      ),
      label: "이용약관",
      onClick: () => {
        // TODO: 이용약관 페이지로 이동
        console.log("이용약관");
      },
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H19C18.47 16.11 15.72 19.78 12 20.93V12H5V6.3L12 3.19V11.99Z"
            fill="#1F1E1E"
          />
        </svg>
      ),
      label: "개인정보 처리방침",
      onClick: () => {
        // TODO: 개인정보 처리방침 페이지로 이동
        console.log("개인정보 처리방침");
      },
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="15.5" cy="9.5" r="1.5" fill="#1F1E1E" />
          <circle cx="8.5" cy="9.5" r="1.5" fill="#1F1E1E" />
          <path
            d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 11.3 4.11 10.62 4.31 9.98L8 11V12C8 13.1 8.9 14 10 14V17.93C7.06 17.43 5 14.97 5 12C5 10.9 5.26 9.87 5.69 8.94C6.29 9.58 7.12 10 8 10H10V8C10 6.9 10.9 6 12 6H14V4H16V8H14V10H16L16.74 13.97C15.5 15.25 13.78 16 12 16H11V18H12C13.68 18 15.23 17.42 16.49 16.46L18.19 19.1C16.88 19.68 14.5 20 12 20Z"
            fill="#1F1E1E"
          />
        </svg>
      ),
      label: "회원탈퇴",
      onClick: () => setShowWithdrawModal(true),
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M17 8L15.59 9.41L17.17 11H9V13H17.17L15.59 14.59L17 16L21 12L17 8ZM5 5H12V3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H12V19H5V5Z"
            fill="#1F1E1E"
          />
        </svg>
      ),
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

  const handleWithdraw = () => {
    // TODO: 실제 회원탈퇴 로직 구현
    console.log("회원탈퇴");
    setShowWithdrawModal(false);
    router.push("/login");
  };

  return (
    <>
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
      <div className="flex flex-col gap-6 px-4 py-6">
          {settingsItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="flex items-center gap-3 w-full"
            >
              <div className="w-6 h-6 shrink-0">{item.icon}</div>
              <span className="flex-1 text-left body-2-medium text-on-surface">
                {item.label}
              </span>
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
                취소
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 btn btn-primary h-12"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div
            className="bg-white rounded-lg p-6 mx-4"
            style={{ maxWidth: "320px", width: "100%" }}
          >
            <p className="body-2 text-on-surface text-center mb-6">
              정말 회원탈퇴 하시겠습니까?
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="flex-1 btn h-12 border border-border bg-white text-on-surface"
              >
                취소
              </button>
              <button
                onClick={handleWithdraw}
                className="flex-1 btn btn-primary h-12"
              >
                탈퇴하기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
