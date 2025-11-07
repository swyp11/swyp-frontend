"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FieldLabel } from "@/components/ui/FieldLabel";
import { Button } from "@/components/ui/Button";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    phoneNumber: "",
  });

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const isFormValid = formData.name && formData.birthDate && formData.phoneNumber;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      // Store form data in sessionStorage for next step
      sessionStorage.setItem("passwordRecoveryData", JSON.stringify(formData));
      router.push("/forgot-password/email");
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
      <div className="h-[50px] flex items-center px-4 border-b border-outline-subtle">
        <button
          onClick={() => router.back()}
          className="w-6 h-6"
          aria-label="뒤로 가기"
        >
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <path
              fill="currentColor"
              d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
            />
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-8 overflow-y-auto">
        <h1 className="headline-3 text-on-surface mb-8">
          임시 비밀번호 발급을 위해
          <br />
          계정 정보를 확인해주세요.
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <FieldLabel
            label="이름"
            required
            placeholder="이름을 입력하세요"
            value={formData.name}
            onChange={handleChange("name")}
            fieldProps={{
              type: "text",
              autoComplete: "name",
            }}
          />

          <FieldLabel
            label="생년월일"
            required
            placeholder="YYYY-MM-DD"
            value={formData.birthDate}
            onChange={handleChange("birthDate")}
            fieldProps={{
              type: "text",
              pattern: "\\d{4}-\\d{2}-\\d{2}",
              maxLength: 10,
            }}
          />

          <FieldLabel
            label="휴대폰 번호"
            required
            placeholder="010-0000-0000"
            value={formData.phoneNumber}
            onChange={handleChange("phoneNumber")}
            fieldProps={{
              type: "tel",
              pattern: "\\d{3}-\\d{4}-\\d{4}",
              maxLength: 13,
            }}
          />
        </form>
      </div>

      {/* Bottom Button */}
      <div className="px-4 py-4">
        <Button
          variant="primary"
          colorType="accent"
          className="w-full"
          onClick={handleSubmit}
          disabled={!isFormValid}
        >
          다음
        </Button>
      </div>
    </div>
  );
}
