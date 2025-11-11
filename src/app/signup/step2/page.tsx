"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { BackHeader } from "@/components/common/BackHeader";

export default function SignupStep2Page() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  // 비밀번호 유효성 검사 (영문, 숫자 포함 8자리 이상)
  const validatePassword = (password: string): boolean => {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const isLongEnough = password.length >= 8;
    return hasLetter && hasNumber && isLongEnough;
  };

  // 비밀번호 입력 필드 변경 핸들러
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    // 실시간 유효성 검사
    if (value && !validatePassword(value)) {
      setPasswordError("영문, 숫자 포함 8자리 이상");
    } else {
      setPasswordError("");
    }

    // 비밀번호 확인 필드가 이미 입력되어 있으면 일치 여부 확인
    if (passwordConfirm && value !== passwordConfirm) {
      setConfirmError("비밀번호가 일치하지 않습니다.");
    } else if (passwordConfirm) {
      setConfirmError("");
    }
  };

  // 비밀번호 확인 입력 필드 변경 핸들러
  const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPasswordConfirm(value);

    // 실시간 일치 여부 확인
    if (value && value !== password) {
      setConfirmError("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmError("");
    }
  };

  // 다음 버튼 활성화 조건
  const isFormValid =
    password &&
    passwordConfirm &&
    validatePassword(password) &&
    password === passwordConfirm &&
    !passwordError &&
    !confirmError;

  // 다음 버튼 핸들러
  const handleNext = () => {
    if (!isFormValid) return;

    // 비밀번호 데이터 저장 (localStorage 업데이트)
    const signupData = JSON.parse(localStorage.getItem("signupData") || "{}");
    signupData.password = password;
    localStorage.setItem("signupData", JSON.stringify(signupData));
    console.log("Sign up step 2 data:", { password });
    router.push("/signup/step3");
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
          <h1 className="title-1 text-on-surface">비밀번호를 생성해주세요.</h1>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-6">
          {/* Password Field */}
          <div className="flex flex-col gap-1.5">
            <label className="body-3 font-medium text-secondary">
              비밀번호
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="비밀번호를 입력해주세요."
              className={`field h-12 w-full ${
                passwordError ? "field-error" : ""
              }`}
            />
            <p
              className={`label-1 ${
                passwordError ? "text-alert" : "text-on-surface-subtle"
              }`}
            >
              영문, 숫자 포함 8자리 이상
            </p>
          </div>

          {/* Password Confirm Field */}
          <div className="flex flex-col gap-1.5">
            <label className="body-3 font-medium text-secondary">
              비밀번호 확인
            </label>
            <input
              type="password"
              name="passwordConfirm"
              value={passwordConfirm}
              onChange={handleConfirmChange}
              placeholder="비밀번호를 한 번 더 입력해주세요."
              className={`field h-12 w-full ${
                confirmError ? "field-error" : ""
              }`}
            />
            <p
              className={`label-1 ${
                confirmError ? "text-alert" : "text-on-surface-subtle"
              }`}
            >
              {confirmError || "영문, 숫자 포함 8자리 이상"}
            </p>
          </div>
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
