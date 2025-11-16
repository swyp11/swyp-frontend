"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BackHeader } from "@/components/common/BackHeader";
import { FieldLabel } from "@/components/ui/FieldLabel";
import { Button } from "@/components/ui/Button";

export default function ForgotPasswordEmailPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isRequesting, setIsRequesting] = useState(false);
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [codeError, setCodeError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationToken, setVerificationToken] = useState("");

  useEffect(() => {
    // Check if user came from step 1
    const storedEmail = sessionStorage.getItem("verificationEmail");
    if (storedEmail) {
      setEmail(storedEmail);
      sessionStorage.removeItem("verificationEmail");
    }
  }, []);

  const isEmailValid = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isCodeValid = verificationCode.length === 8;

  const handleRequestCode = async () => {
    if (!isEmailValid || isRequesting) return;

    setIsRequesting(true);
    setEmailError("");
    try {
      const response = await fetch("/api/auth/request-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, purpose: 'PASSWORD_RESET' }),
      });

      const result = await response.json();

      if (!response.ok) {
        setEmailError(result.error || "인증 요청에 실패했습니다.");
        return;
      }

      setIsVerificationSent(true);
      setIsVerified(false);
      setVerificationToken("");
    } catch {
      setEmailError("인증 요청 중 오류가 발생했습니다.");
    } finally {
      setIsRequesting(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!isCodeValid || isVerifying) return;

    console.log("🔍 인증 시도:", { email, verificationCode });
    setCodeError("");
    setIsVerifying(true);

    try {
      // Call API to verify code and get token
      const response = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: verificationCode, purpose: 'PASSWORD_RESET' }),
      });

      console.log("📡 API 응답 상태:", response.status);

      if (!response.ok) {
        const result = await response.json();
        console.log("❌ 인증 실패:", result);
        setCodeError(result.error || "인증에 실패했습니다.");
        return;
      }

      const result = await response.json();
      console.log("✅ 인증 성공:", result);

      // Success - save token and mark as verified
      setVerificationToken(result.data.token);
      setIsVerified(true);
      setCodeError("");
    } catch {
      setCodeError("인증 중 오류가 발생했습니다.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleNext = () => {
    if (!isVerified || !verificationToken) return;

    sessionStorage.setItem("passwordResetToken", verificationToken);
    sessionStorage.setItem("passwordResetEmail", email);
    sessionStorage.removeItem("verificationEmail");
    router.push("/forgot-password/reset");
  };

  return (
    <div
      className="bg-white flex flex-col h-screen mx-auto"
      style={{ width: "var(--app-width)" }}
    >
      <BackHeader title="비밀번호 재설정" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col px-4 pt-6 overflow-y-auto">
        {/* Title */}
        <div className="mb-6">
          <h1 className="title-1 text-on-surface">
            {isVerificationSent ? (
              <>
                입력하신 이메일 주소로
                <br />
                인증번호가 발송되었습니다.
              </>
            ) : (
              <>
                비밀번호 재설정을 위해
                <br />
                이메일을 입력해주세요.
              </>
            )}
          </h1>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-6">
          {/* Email Field with Request Button */}
          <div className="flex flex-col gap-1.5">
            <label className="body-3 font-medium text-secondary">이메일</label>
            <div className="flex gap-2 items-end">
              <div className="flex-1 flex flex-col gap-1.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }}
                  placeholder="이메일을 입력해주세요."
                  className={`field h-12 w-full ${
                    emailError ? "field-error" : ""
                  }`}
                  disabled={isRequesting || isVerificationSent}
                />
              </div>
              <button
                onClick={handleRequestCode}
                disabled={!isEmailValid || isRequesting}
                className={`btn h-12 px-5 shrink-0 ${
                  !isEmailValid || isRequesting
                    ? "btn-tertiary opacity-40"
                    : "btn-tertiary"
                }`}
              >
                {isRequesting ? "전송 중..." : isVerificationSent ? "재전송" : "인증요청"}
              </button>
            </div>
            {emailError && (
              <p className="field-error-text">{emailError}</p>
            )}
          </div>

          {/* Verification Code Field (shown after email sent) */}
          {isVerificationSent && (
            <div className="flex flex-col gap-1.5">
              <label className="body-3 font-medium text-secondary">
                인증번호 입력
              </label>
              <div className="flex gap-2 items-end">
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => {
                    const value = e.target.value.slice(0, 8);
                    setVerificationCode(value);
                    setCodeError("");
                  }}
                  placeholder="인증번호 8자리를 입력해주세요."
                  maxLength={8}
                  disabled={isVerified}
                  className={`field h-12 w-full ${
                    codeError ? "field-error" : isVerified ? "field-success" : ""
                  }`}
                />
                <button
                  onClick={handleVerifyCode}
                  disabled={!isCodeValid || isVerifying || isVerified}
                  className={`btn h-12 px-5 shrink-0 ${
                    isVerified
                      ? "btn-primary opacity-40"
                      : !isCodeValid || isVerifying
                      ? "btn-tertiary opacity-40"
                      : "btn-tertiary"
                  }`}
                >
                  {isVerifying ? "확인 중..." : isVerified ? "인증완료" : "인증확인"}
                </button>
              </div>
              {codeError && (
                <p className="field-error-text">{codeError}</p>
              )}
              {isVerified && (
                <p className="label-1 text-success">이메일 인증이 완료되었습니다.</p>
              )}
              {/* Info Text */}
              {!isVerified && (
                <div className="flex flex-col gap-1">
                  <p className="label-1 text-on-surface-subtle">
                    • 메일 도착까지 최대 1~2분 걸릴 수 있어요.
                  </p>
                  <p className="label-1 text-on-surface-subtle">
                    • 스팸함・프로모션함을 확인해보세요.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Next Button */}
      <div className="px-4 py-4 border-t border-[#f1f1f1]">
        <button
          onClick={handleNext}
          disabled={!isVerified}
          className={`btn btn-primary w-full ${!isVerified ? "opacity-40" : ""}`}
        >
          다음
        </button>
      </div>
    </div>
  );
}
