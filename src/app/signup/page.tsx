"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { BackHeader } from "@/components/common/BackHeader";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [codeError, setCodeError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 이메일 유효성 검사
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 이메일 입력 필드 변경 핸들러
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError("");
  };

  // 인증번호 입력 필드 변경 핸들러
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setVerificationCode(value);
    setCodeError("");
  };

  // 인증요청/재전송 핸들러
  const handleVerificationRequest = async () => {
    if (!email) {
      setEmailError("이메일을 입력해주세요.");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("올바른 이메일 형식이 아닙니다.");
      return;
    }

    setIsLoading(true);
    setEmailError("");

    try {
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setIsVerificationSent(true);
        setEmailError("");
      } else {
        setEmailError(data.error || "인증요청에 실패했습니다.");
      }
    } catch (err) {
      console.error("Verification request error:", err);
      setEmailError("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  // 다음 버튼 활성화 조건
  const isFormValid =
    email &&
    validateEmail(email) &&
    isVerificationSent &&
    verificationCode.trim() !== "" &&
    !emailError &&
    !codeError;

  // 다음 버튼 핸들러
  const handleNext = () => {
    if (!isFormValid) return;

    // 회원가입 1단계 데이터 저장 (localStorage에 임시 저장)
    localStorage.setItem("signupData", JSON.stringify({ email, verificationCode }));
    console.log("Sign up step 1 data:", { email, verificationCode });
    router.push("/signup/step2");
  };

  return (
    <div
      className="bg-white flex flex-col h-screen mx-auto"
      style={{ width: "var(--app-width)" }}
    >
      <BackHeader title="회원가입" />

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
                계정 생성을 위해
                <br />
                이메일을 입력해주세요.
              </>
            )}
          </h1>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-6">
          {/* Email Field with Verification Button */}
          <div className="flex flex-col gap-1.5">
            <label className="body-3 font-medium text-secondary">이메일</label>
            <div className="flex gap-2 items-end">
              <div className="flex-1 flex flex-col gap-1.5">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="이메일을 입력해주세요."
                  className={`field h-12 w-full ${
                    emailError ? "field-error" : ""
                  }`}
                  disabled={isLoading || isVerificationSent}
                />
              </div>
              <button
                onClick={handleVerificationRequest}
                disabled={!email || isLoading}
                className={`btn h-12 px-5 shrink-0 ${
                  !email || isLoading
                    ? "btn-tertiary opacity-40"
                    : "btn-tertiary"
                }`}
              >
                {isLoading ? "전송 중..." : isVerificationSent ? "재전송" : "인증요청"}
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
              <input
                type="text"
                name="verificationCode"
                value={verificationCode}
                onChange={handleCodeChange}
                placeholder="인증번호 6자리를 입력해주세요."
                maxLength={6}
                className={`field h-12 w-full ${
                  codeError ? "field-error" : ""
                }`}
              />
              {codeError && (
                <p className="field-error-text">{codeError}</p>
              )}
              {/* Info Text */}
              <div className="flex flex-col gap-1">
                <p className="label-1 text-on-surface-subtle">
                  • 메일 도착까지 최대 1~2분 걸릴 수 있어요.
                </p>
                <p className="label-1 text-on-surface-subtle">
                  • 스팸함・프로모션함을 확인해보세요.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Next Button */}
      <div className="px-4 py-4 border-t border-[#f1f1f1]">
        <button
          onClick={handleNext}
          disabled={!isFormValid}
          className={`btn btn-primary w-full ${!isFormValid ? "opacity-40" : ""}`}
        >
          다음
        </button>
      </div>
    </div>
  );
}
