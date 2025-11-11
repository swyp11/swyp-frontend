"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FieldLabel } from "@/components/ui/FieldLabel";
import { Button } from "@/components/ui/Button";

export default function ForgotPasswordEmailPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    // Check if user came from step 1
    const storedEmail = sessionStorage.getItem("verificationEmail");
    if (!storedEmail) {
      router.push("/forgot-password");
    } else {
      setEmail(storedEmail);
    }
  }, [router]);

  const isCodeValid = verificationCode.length === 6;

  const handleResendCode = async () => {
    if (isResending) return;

    setIsResending(true);
    try {
      const response = await fetch("/api/auth/request-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("재전송에 실패했습니다.");
      }

      alert("인증번호가 재전송되었습니다.");
    } catch (error) {
      console.error("Resend error:", error);
      alert("재전송 중 오류가 발생했습니다.");
    } finally {
      setIsResending(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCodeValid || isVerifying) return;

    console.log("🔍 인증 시도:", { email, verificationCode });
    setError("");
    setIsVerifying(true);

    try {
      // Call API to verify code and send temporary password
      const response = await fetch("/api/auth/verify-and-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, verificationCode }),
      });

      console.log("📡 API 응답 상태:", response.status);

      if (!response.ok) {
        const result = await response.json();
        console.log("❌ 인증 실패:", result);
        setError(result.error || "인증에 실패했습니다.");
        return;
      }

      const result = await response.json();
      console.log("✅ 인증 성공:", result);

      // Success - proceed to success page
      sessionStorage.removeItem("verificationEmail");
      sessionStorage.setItem("recoveryEmail", email);
      router.push("/forgot-password/success");
    } catch (error) {
      console.error("💥 Verification error:", error);
      setError("인증 중 오류가 발생했습니다.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div
      className="bg-white flex flex-col h-screen mx-auto"
      style={{ width: "var(--app-width)" }}
    >
      {/* System Bar */}
      <div className="h-11 bg-surface-1" />

      {/* Header */}
      <div className="h-[50px] flex items-center justify-center px-4 border-b border-outline-subtle relative">
        <button
          onClick={() => router.back()}
          className="absolute left-4 w-6 h-6"
          aria-label="뒤로 가기"
        >
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <path
              fill="currentColor"
              d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
            />
          </svg>
        </button>
        <h2 className="body-3-bold text-on-surface">임시 비밀번호 발급</h2>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-8 overflow-y-auto flex flex-col justify-between">
        <div className="flex flex-col gap-8">
          <h1 className="title-1 text-on-surface">
            임시 비밀번호 발급을 위해
            <br />
            계정인증을 진행해주세요.
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {/* Email Field with Resend Button */}
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <FieldLabel
                  label="이메일"
                  required
                  value={email}
                  fieldProps={{
                    type: "email",
                    readOnly: true,
                    disabled: true,
                  }}
                />
              </div>
              <button
                type="button"
                onClick={handleResendCode}
                disabled={isResending}
                className="btn btn-secondary h-12 px-5 whitespace-nowrap"
              >
                {isResending ? "전송 중..." : "재전송"}
              </button>
            </div>

            {/* Verification Code Field */}
            <div className="flex flex-col gap-2">
              <FieldLabel
                label="인증번호 입력"
                required
                placeholder="인증번호 6자리를 입력해주세요"
                value={verificationCode}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                  setVerificationCode(value);
                  setError(""); // Clear error when typing
                }}
                fieldProps={{
                  type: "text",
                  maxLength: 6,
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
                error={error}
              />

              {/* Help Text - Only show when no error */}
              {!error && (
                <div className="flex flex-col gap-1 text-on-surface-subtle label-1">
                  <div className="flex items-start gap-1">
                    <span>•</span>
                    <span>메일 도착까지 최대 1~2분 걸릴 수 있어요.</span>
                  </div>
                  <div className="flex items-start gap-1">
                    <span>•</span>
                    <span>스팸함 · 프로모션함을 확인해보세요.</span>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Bottom Button */}
        <Button
          variant="primary"
          colorType="accent"
          className="w-full"
          onClick={handleSubmit}
          disabled={!isCodeValid || isVerifying}
        >
          {isVerifying ? "확인 중..." : "다음"}
        </Button>
      </div>
    </div>
  );
}
