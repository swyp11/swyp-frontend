"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { BackHeader } from "@/components/common/BackHeader";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
  });
  const [isUsernameChecked, setIsUsernameChecked] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
  });

  // 비밀번호 유효성 검사 (영문, 숫자 포함 8자리 이상)
  const validatePassword = (password: string): boolean => {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const isLongEnough = password.length >= 8;
    return hasLetter && hasNumber && isLongEnough;
  };

  // 입력 필드 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // 아이디 변경 시 중복체크 초기화
    if (name === "username") {
      setIsUsernameChecked(false);
      setErrors((prev) => ({ ...prev, username: "" }));
    }

    // 비밀번호 실시간 검증
    if (name === "password") {
      if (value && !validatePassword(value)) {
        setErrors((prev) => ({
          ...prev,
          password: "영문, 숫자 포함 8자리 이상 입력해주세요.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, password: "" }));
      }
    }

    // 비밀번호 확인 실시간 검증
    if (name === "passwordConfirm") {
      if (value && value !== formData.password) {
        setErrors((prev) => ({
          ...prev,
          passwordConfirm: "비밀번호가 일치하지 않습니다.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, passwordConfirm: "" }));
      }
    }
  };

  // 중복체크 핸들러
  const handleCheckUsername = async () => {
    if (!formData.username) {
      setErrors((prev) => ({
        ...prev,
        username: "아이디를 입력해주세요.",
      }));
      return;
    }

    // TODO: 실제 API 호출로 중복 체크
    // 임시로 시뮬레이션
    try {
      // const response = await fetch('/api/check-username', { ... })
      setIsUsernameChecked(true);
      setErrors((prev) => ({ ...prev, username: "" }));
      alert("사용 가능한 아이디입니다.");
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        username: "이미 사용 중인 아이디입니다.",
      }));
    }
  };

  // 다음 버튼 활성화 조건
  const isFormValid =
    formData.username &&
    isUsernameChecked &&
    formData.password &&
    validatePassword(formData.password) &&
    formData.passwordConfirm &&
    formData.password === formData.passwordConfirm &&
    !errors.username &&
    !errors.password &&
    !errors.passwordConfirm;

  // 다음 버튼 핸들러
  const handleNext = () => {
    if (!isFormValid) return;

    // TODO: 회원가입 1단계 데이터 저장 (예: localStorage, 전역 상태 등)
    console.log("Sign up step 1 data:", formData);
    router.push("/signup/step2"); // 2단계로 이동
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
            회원가입을 위해
            <br />
            아래 정보를 입력해주세요.
          </h1>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-6">
          {/* Username Field with Check Button */}
          <div className="flex flex-col gap-1.5">
            <label className="body-3 font-medium text-secondary">아이디</label>
            <div className="flex gap-2 items-end">
              <div className="flex-1 flex flex-col gap-1.5">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="아이디를 입력해주세요."
                  className={`field h-12 w-full ${
                    errors.username ? "border-alert" : ""
                  }`}
                />
              </div>
              <button
                onClick={handleCheckUsername}
                disabled={!formData.username || isUsernameChecked}
                className={`btn h-12 px-5 shrink-0 ${
                  !formData.username || isUsernameChecked
                    ? "btn-tertiary opacity-40"
                    : "btn-tertiary"
                }`}
              >
                중복체크
              </button>
            </div>
            {errors.username && (
              <p className="label-1 text-alert">{errors.username}</p>
            )}
            {isUsernameChecked && !errors.username && (
              <p className="label-1 text-positive">사용 가능한 아이디입니다.</p>
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1.5">
            <label className="body-3 font-medium text-secondary">
              비밀번호
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력해주세요."
              className={`field h-12 w-full ${
                errors.password ? "border-alert" : ""
              }`}
            />
            <p
              className={`label-1 ${
                errors.password ? "text-alert" : "text-on-surface-subtle"
              }`}
            >
              {errors.password || "영문, 숫자 포함 8자리 이상"}
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
              value={formData.passwordConfirm}
              onChange={handleChange}
              placeholder="비밀번호를 한 번 더 입력해주세요."
              className={`field h-12 w-full ${
                errors.passwordConfirm ? "border-alert" : ""
              }`}
            />
            <p
              className={`label-1 ${
                errors.passwordConfirm ? "text-alert" : "text-on-surface-subtle"
              }`}
            >
              {errors.passwordConfirm || "영문, 숫자 포함 8자리 이상"}
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
