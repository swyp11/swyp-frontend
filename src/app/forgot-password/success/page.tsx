"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BackHeader } from "@/components/common/BackHeader";
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
      <BackHeader title="비밀번호 재설정" />

      {/* Main Content */}
      <div className="flex-1 px-4 py-8 overflow-y-auto flex flex-col justify-between">
        <div className="flex flex-col gap-6">
          {/* Check Icon */}
          <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center">
            <svg
              viewBox="0 0 28 28"
              className="w-7 h-7 text-primary"
              fill="currentColor"
            >
              <path d="M11.6667 18.6667L6.41667 13.4167L8.1875 11.6459L11.6667 15.1251L19.8125 6.97925L21.5833 8.75008L11.6667 18.6667Z" />
            </svg>
          </div>

          {/* Success Message */}
          <div className="flex flex-col gap-2">
            <h1 className="title-1 text-on-surface">
              비밀번호가 변경되었습니다.
            </h1>
            <p className="body-1 text-on-surface">
              새로운 비밀번호로 로그인해 주세요.
            </p>
          </div>
        </div>

        {/* Bottom Button */}
        <Button
          variant="primary"
          colorType="accent"
          className="w-full"
          onClick={handleGoToLogin}
        >
          로그인 하러가기
        </Button>
      </div>
    </div>
  );
}
