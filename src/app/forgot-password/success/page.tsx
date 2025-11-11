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
      <BackHeader title="임시 비밀번호 발급" />

      {/* Main Content */}
      <div className="flex-1 px-4 py-8 overflow-y-auto flex flex-col justify-between">
        <div className="flex flex-col gap-6">
          {/* Email Icon */}
          <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center">
            <svg
              viewBox="0 0 28 28"
              className="w-7 h-7 text-primary"
              fill="currentColor"
            >
              <path d="M23.3333 4.66675H4.66667C3.38333 4.66675 2.34833 5.71341 2.34833 7.00008L2.33333 21.0001C2.33333 22.2867 3.38333 23.3334 4.66667 23.3334H23.3333C24.6167 23.3334 25.6667 22.2867 25.6667 21.0001V7.00008C25.6667 5.71341 24.6167 4.66675 23.3333 4.66675ZM23.3333 21.0001H4.66667V9.33341L14 15.1667L23.3333 9.33341V21.0001ZM14 12.8334L4.66667 7.00008H23.3333L14 12.8334Z" />
            </svg>
          </div>

          {/* Success Message */}
          <div className="flex flex-col gap-2">
            <h1 className="title-1 text-on-surface">
              임시 비밀번호가 전송되었습니다.
            </h1>
            <p className="body-1 text-on-surface">
              이메일로 임시 비밀번호를 전송했습니다.
              <br />
              확인 후 로그인해 주세요.
            </p>
          </div>

          {/* Notice Box */}
          <div className="w-full bg-surface-2 rounded-lg p-3 flex flex-col gap-1">
            <div className="flex items-start gap-1 text-on-surface-subtle label-1">
              <span>•</span>
              <span>메일 도착까지 최대 1~2분 걸릴 수 있어요.</span>
            </div>
            <div className="flex items-start gap-1 text-on-surface-subtle label-1">
              <span>•</span>
              <span>스팸함 · 프로모션함을 확인해보세요.</span>
            </div>
            <div className="flex items-start gap-1 text-on-surface-subtle label-1">
              <span>•</span>
              <span>로그인 후 비밀번호를 바로 변경하는 게 안전해요.</span>
            </div>
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
