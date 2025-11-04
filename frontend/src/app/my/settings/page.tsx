"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SettingsPage() {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  const settingsItems = [
    {
      icon: (
        <Image
          className="relative w-6 h-6"
          alt=""
          src="/img/feed.svg"
          width={24}
          height={24}
        />
      ),
      label: "이용약관",
      onClick: () => {
        // TODO: 이용약관 페이지로 이동
        console.log("이용약관");
      },
    },
    {
      icon: (
        <Image
          className="relative w-6 h-6"
          alt=""
          src="/img/policy.svg"
          width={24}
          height={24}
        />
      ),
      label: "개인정보 처리방침",
      onClick: () => {
        // TODO: 개인정보 처리방침 페이지로 이동
        console.log("개인정보 처리방침");
      },
    },
    {
      icon: (
        <Image
          className="relative w-6 h-6"
          alt=""
          src="/img/sentiment-dissatisfied.svg"
          width={24}
          height={24}
        />
      ),
      label: "회원탈퇴",
      onClick: () => setShowWithdrawModal(true),
    },
    {
      icon: (
        <Image
          className="relative w-6 h-6"
          alt=""
          src="/img/logout.svg"
          width={24}
          height={24}
        />
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
          <Image
            className="relative w-6 h-6"
            alt=""
            src="/img/arrow_back.svg"
            width={24}
            height={24}
          />
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
