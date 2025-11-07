"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function ForgotPasswordSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user completed the process
    const recoveryEmail = sessionStorage.getItem("recoveryEmail");
    if (!recoveryEmail) {
      router.push("/forgot-password");
    }
  }, [router]);

  const handleGoToLogin = () => {
    sessionStorage.removeItem("recoveryEmail");
    router.push("/login");
  };

  return (
    <div
      className="bg-white flex flex-col h-screen mx-auto"
      style={{ width: "var(--app-width)" }}
    >
      {/* System Bar */}
      <div className="h-11 bg-surface-1" />

      {/* Header */}
      <div className="h-[50px] flex items-center px-4 border-b border-outline-subtle">
        <button
          onClick={handleGoToLogin}
          className="w-6 h-6"
          aria-label="닫기"
        >
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <path
              fill="currentColor"
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
            />
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-8 flex flex-col items-center">
        {/* Email Icon */}
        <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center mb-6">
          <svg viewBox="0 0 24 24" className="w-7 h-7 text-primary">
            <path
              fill="currentColor"
              d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
            />
          </svg>
        </div>

        {/* Success Message */}
        <div className="text-center mb-8">
          <h1 className="headline-3 text-on-surface mb-3">
            임시 비밀번호가 전송되었습니다.
          </h1>
          <p className="body-2 text-on-surface-subtle">
            등록하신 이메일로 임시 비밀번호를 전송했습니다.
            <br />
            확인 후 로그인해 주세요.
          </p>
        </div>

        {/* Notice Box */}
        <div className="w-full bg-surface-2 rounded-lg p-4 space-y-2">
          <div className="flex items-start gap-1">
            <span className="text-primary text-sm">•</span>
            <p className="body-2 text-on-surface-subtle flex-1">
              메일 도착까지 최대 1~2분 걸릴 수 있어요.
            </p>
          </div>
          <div className="flex items-start gap-1">
            <span className="text-primary text-sm">•</span>
            <p className="body-2 text-on-surface-subtle flex-1">
              스팸함·프로모션함으로 이동될 수 있어요.
            </p>
          </div>
          <div className="flex items-start gap-1">
            <span className="text-primary text-sm">•</span>
            <p className="body-2 text-on-surface-subtle flex-1">
              로그인 후 비밀번호를 바로 변경하는 게 안전해요.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="px-4 py-4">
        <Button
          variant="primary"
          colorType="accent"
          className="w-full"
          onClick={handleGoToLogin}
        >
          로그인하러 가기
        </Button>
      </div>
    </div>
  );
}
