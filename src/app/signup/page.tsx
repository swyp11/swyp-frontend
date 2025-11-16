"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { BackHeader } from "@/components/common/BackHeader";
import { useRequestEmailVerification, useVerifyEmail } from "@/hooks/useAuth";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationToken, setVerificationToken] = useState("");
  const [emailError, setEmailError] = useState("");
  const [codeError, setCodeError] = useState("");

  const requestVerificationMutation = useRequestEmailVerification();
  const verifyEmailMutation = useVerifyEmail();

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

    setEmailError("");

    try {
      await requestVerificationMutation.mutateAsync({ email, purpose: 'SIGNUP' });
      setIsVerificationSent(true);
      setIsVerified(false);
      setVerificationToken("");
      setEmailError("");
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || "인증요청에 실패했습니다.";
      setEmailError(errorMessage);
    }
  };

  // 인증코드 검증 핸들러
  const handleVerifyCode = async () => {
    if (!verificationCode || verificationCode.length !== 8) {
      setCodeError("인증번호 8자리를 입력해주세요.");
      return;
    }

    setCodeError("");

    try {
      const result = await verifyEmailMutation.mutateAsync({
        email,
        code: verificationCode,
        purpose: 'SIGNUP'
      });
      console.log("Verification result:", result);
      setVerificationToken(result.token);
      setIsVerified(true);
      setCodeError("");
      console.log("Token set:", result.token, "isVerified:", true);
    } catch (err: any) {
      console.error("Verification error:", err);
      setCodeError(err.response?.data?.error || err.message || "인증번호가 일치하지 않습니다.");
    }
  };

  // 로딩 상태
  const isLoading = requestVerificationMutation.isPending;
  const isVerifying = verifyEmailMutation.isPending;

  // 다음 버튼 활성화 조건
  const isFormValid =
    email &&
    validateEmail(email) &&
    isVerificationSent &&
    isVerified &&
    verificationToken &&
    !emailError &&
    !codeError;

  // 다음 버튼 핸들러
  const handleNext = () => {
    if (!isFormValid) return;

    // 회원가입 1단계 데이터 저장 (localStorage에 임시 저장)
    localStorage.setItem("signupData", JSON.stringify({ email, verificationToken }));
    console.log("Sign up step 1 data:", { email, verificationToken });
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
              <div className="flex gap-2 items-end">
                <input
                  type="text"
                  name="verificationCode"
                  value={verificationCode}
                  onChange={handleCodeChange}
                  placeholder="인증번호 8자리를 입력해주세요."
                  maxLength={8}
                  disabled={isVerified}
                  className={`field h-12 w-full ${
                    codeError ? "field-error" : isVerified ? "field-success" : ""
                  }`}
                />
                <button
                  onClick={handleVerifyCode}
                  disabled={!verificationCode || verificationCode.length !== 8 || isVerifying || isVerified}
                  className={`btn h-12 px-5 shrink-0 ${
                    isVerified
                      ? "btn-primary opacity-40"
                      : !verificationCode || verificationCode.length !== 8 || isVerifying
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
          disabled={!isFormValid}
          className={`btn btn-primary w-full ${!isFormValid ? "opacity-40" : ""}`}
        >
          다음
        </button>
      </div>
    </div>
  );
}
