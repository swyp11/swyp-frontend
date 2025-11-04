"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

type Gender = "groom" | "bride" | null;

export default function SignupStep2Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nickname: "",
    birthdate: "",
    gender: null as Gender,
    email: "",
    weddingDate: "",
  });

  // 입력 필드 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 신랑/신부 선택 핸들러
  const handleGenderSelect = (gender: Gender) => {
    setFormData((prev) => ({ ...prev, gender }));
  };

  // 완료 버튼 활성화 조건 (닉네임만 필수)
  const isFormValid = formData.nickname.trim() !== "";

  // 완료 버튼 핸들러
  const handleComplete = () => {
    if (!isFormValid) return;

    // TODO: 회원가입 완료 로직 구현
    console.log("Complete sign up:", formData);
    // router.push("/login"); // 로그인 페이지로 이동
  };

  // 뒤로가기 핸들러
  const handleBack = () => {
    router.back();
  };

  return (
    <div
      className="bg-white flex flex-col h-screen mx-auto"
      style={{ width: "var(--app-width)" }}
    >
      {/* Main Content */}
      <div className="flex-1 flex flex-col px-4 py-8 gap-6 overflow-y-auto">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="w-6 h-6 flex items-center justify-center shrink-0"
          aria-label="뒤로가기"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z"
              fill="#1F1E1E"
            />
          </svg>
        </button>

        {/* Title */}
        <div>
          <h1 className="title-1 text-on-surface">추가정보를 입력해주세요</h1>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-8">
          {/* Nickname Field (Required) */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1">
              <label className="body-3 font-medium text-secondary">
                닉네임
              </label>
              <span className="text-alert text-xs font-medium">*</span>
            </div>
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              placeholder="닉네임을 입력해주세요."
              className="field h-12 w-full"
            />
          </div>

          {/* Birthdate Field (Optional) */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1">
              <label className="body-3 font-medium text-secondary">
                생년월일(6자리)
              </label>
              <span className="text-on-surface-subtle text-xs font-medium">
                (선택)
              </span>
            </div>
            <input
              type="text"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              placeholder="생년월일을 입력해주세요."
              maxLength={6}
              className="field h-12 w-full"
            />
          </div>

          {/* Gender Selection (Optional) */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-1">
              <label className="body-2-medium text-secondary">신랑/신부</label>
              <span className="text-on-surface-subtle text-xs font-medium">
                (선택)
              </span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleGenderSelect("groom")}
                className={`chip flex-1 h-10 ${
                  formData.gender === "groom" ? "chip-selected" : ""
                }`}
              >
                신랑
              </button>
              <button
                type="button"
                onClick={() => handleGenderSelect("bride")}
                className={`chip flex-1 h-10 ${
                  formData.gender === "bride" ? "chip-selected" : ""
                }`}
              >
                신부
              </button>
            </div>
          </div>

          {/* Email Field (Optional) */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1">
              <label className="body-3 font-medium text-secondary">
                이메일
              </label>
              <span className="text-on-surface-subtle text-xs font-medium">
                (선택)
              </span>
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="이메일을 입력해주세요."
              className="field h-12 w-full"
            />
          </div>

          {/* Wedding Date Field (Optional) */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1">
              <label className="body-3 font-medium text-secondary">
                결혼식 예정 날짜
              </label>
              <span className="text-on-surface-subtle text-xs font-medium">
                (선택)
              </span>
            </div>
            <input
              type="text"
              name="weddingDate"
              value={formData.weddingDate}
              onChange={handleChange}
              placeholder="결혼식 예정 날짜를 입력해주세요."
              className="field h-12 w-full"
            />
          </div>
        </div>
      </div>

      {/* Complete Button */}
      <div className="px-4 pb-8">
        <button
          onClick={handleComplete}
          disabled={!isFormValid}
          className={`btn btn-primary w-full ${!isFormValid ? "opacity-40" : ""}`}
        >
          완료
        </button>
      </div>
    </div>
  );
}
