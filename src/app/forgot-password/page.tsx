"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { BackHeader } from "@/components/common/BackHeader";
import { FieldLabel } from "@/components/ui/FieldLabel";
import { Button } from "@/components/ui/Button";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isRequesting, setIsRequesting] = useState(false);

  const isEmailValid = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRequestCode = async () => {
    if (!isEmailValid || isRequesting) return;

    setIsRequesting(true);
    try {
      // API call to request verification code for password reset
      const response = await fetch("/api/auth/request-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, purpose: 'PASSWORD_RESET' }),
      });

      if (!response.ok) {
        throw new Error("인증 요청에 실패했습니다.");
      }

      // Store email in sessionStorage for next step
      sessionStorage.setItem("verificationEmail", email);
      router.push("/forgot-password/email");
    } catch (error) {
      console.error("Verification request error:", error);
      alert("인증 요청 중 오류가 발생했습니다.");
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <div
      className="bg-white flex flex-col h-screen mx-auto"
      style={{ width: "var(--app-width)" }}
    >
      <BackHeader title="임시 비밀번호 발급" />

      {/* Main Content */}
      <div className="flex-1 px-4 py-8 overflow-y-auto flex flex-col justify-between">
        <div className="flex flex-col gap-8">
          <h1 className="title-1 text-on-surface">
            임시 비밀번호 발급을 위해
            <br />
            계정인증을 진행해주세요.
          </h1>

          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <FieldLabel
                label="이메일"
                required
                placeholder="이메일을 입력해주세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fieldProps={{
                  type: "email",
                  autoComplete: "email",
                }}
              />
            </div>
            <button
              onClick={handleRequestCode}
              disabled={!isEmailValid || isRequesting}
              className="btn btn-secondary h-12 px-5 whitespace-nowrap"
            >
              {isRequesting ? "요청 중..." : "인증요청"}
            </button>
          </div>
        </div>

        {/* Bottom Button */}
        <Button
          variant="primary"
          colorType="accent"
          className="w-full opacity-40"
          disabled
        >
          다음
        </Button>
      </div>
    </div>
  );
}
