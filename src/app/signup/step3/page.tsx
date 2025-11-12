"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { BackHeader } from "@/components/common/BackHeader";
import { DatePicker } from "@/components/common/DatePicker";
import { useJoin } from "@/hooks/useUser";

type Gender = "groom" | "bride" | null;

export default function SignupStep3Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    birthdate: "",
    gender: null as Gender,
    weddingDate: "",
  });
  const [error, setError] = useState("");

  const joinMutation = useJoin();

  // 입력 필드 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 날짜 변경 핸들러
  const handleDateChange = (date: string) => {
    setFormData((prev) => ({ ...prev, weddingDate: date }));
  };

  // 신랑/신부 선택 핸들러
  const handleGenderSelect = (gender: Gender) => {
    setFormData((prev) => ({ ...prev, gender }));
  };

  // 완료 버튼 활성화 조건 (이름만 필수)
  const isFormValid = formData.name.trim() !== "";

  // 완료 버튼 핸들러
  const handleComplete = async () => {
    if (!isFormValid) return;

    setError("");

    try {
      // localStorage에서 이전 단계 데이터 가져오기
      const signupData = JSON.parse(localStorage.getItem("signupData") || "{}");

      // 전체 회원가입 데이터 구성
      const completeSignupData = {
        username: signupData.email || signupData.username,
        password: signupData.password,
        email: signupData.email,
        name: formData.name,
        phone: formData.birthdate, // TODO: phone 필드 추가 필요
      };

      console.log("Complete sign up:", completeSignupData);

      // 회원가입 API 호출 (Custom Hook 사용)
      await joinMutation.mutateAsync(completeSignupData);

      // 회원가입 성공 - localStorage 정리
      localStorage.removeItem("signupData");
      // 회원가입 완료 페이지로 이동
      router.push("/signup/complete");
    } catch (err: any) {
      console.error("Signup error:", err);
      setError(err.response?.data?.error || err.message || "회원가입에 실패했습니다.");
    }
  };

  const isLoading = joinMutation.isPending;

  // 뒤로가기 핸들러
  const handleBack = () => {
    router.back();
  };

  return (
    <div
      className="bg-white flex flex-col h-screen mx-auto"
      style={{ width: "var(--app-width)" }}
    >
      <BackHeader title="회원가입" onBack={handleBack} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col px-4 pt-6 overflow-y-auto">
        {/* Title */}
        <div className="mb-6">
          <h1 className="title-1 text-on-surface">추가정보를 입력해주세요</h1>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-6">
          {/* Name Field (Required) */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1">
              <label className="body-3 font-medium text-secondary">
                이름
              </label>
              <span className="text-alert text-xs font-medium">*</span>
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="이름을 입력해주세요."
              className="field h-12 w-full"
            />
          </div>

          {/* Birthdate Field (Optional) */}
          <div className="flex flex-col gap-1.5">
            <label className="body-3 font-medium text-secondary">
              생년월일(6자리) <span className="text-on-surface-subtle">(선택)</span>
            </label>
            <input
              type="text"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              placeholder="000000"
              maxLength={6}
              className="field h-12 w-full"
            />
          </div>

          {/* Gender Selection (Optional) */}
          <div className="flex flex-col gap-3">
            <label className="body-3 font-medium text-secondary">
              신랑/신부 <span className="text-on-surface-subtle">(선택)</span>
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleGenderSelect("groom")}
                className={`chip flex-1 h-12 ${
                  formData.gender === "groom" ? "chip-selected" : ""
                }`}
              >
                신랑
              </button>
              <button
                type="button"
                onClick={() => handleGenderSelect("bride")}
                className={`chip flex-1 h-12 ${
                  formData.gender === "bride" ? "chip-selected" : ""
                }`}
              >
                신부
              </button>
            </div>
          </div>

          {/* Wedding Date Field (Optional) */}
          <div className="flex flex-col gap-1.5">
            <label className="body-3 font-medium text-secondary">
              결혼식 예정 날짜 <span className="text-on-surface-subtle">(선택)</span>
            </label>
            <DatePicker
              value={formData.weddingDate}
              onChange={handleDateChange}
              placeholder="2026년 1월 1일"
            />
          </div>
        </div>
      </div>

      {/* Complete Button */}
      <div className="px-4 py-4 border-t border-[#f1f1f1]">
        {error && (
          <p className="field-error-text mb-3 text-center">{error}</p>
        )}
        <button
          onClick={handleComplete}
          disabled={!isFormValid || isLoading}
          className={`btn btn-primary w-full ${!isFormValid || isLoading ? "opacity-40" : ""}`}
        >
          {isLoading ? "처리 중..." : "완료"}
        </button>
      </div>
    </div>
  );
}
