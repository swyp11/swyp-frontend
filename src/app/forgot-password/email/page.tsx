"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FieldLabel } from "@/components/ui/FieldLabel";
import { Button } from "@/components/ui/Button";

export default function ForgotPasswordEmailPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Check if user came from step 1
    const recoveryData = sessionStorage.getItem("passwordRecoveryData");
    if (!recoveryData) {
      router.push("/forgot-password");
    }
  }, [router]);

  const isEmailValid = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEmailValid) {
      try {
        // Get stored data from step 1
        const recoveryData = sessionStorage.getItem("passwordRecoveryData");
        if (!recoveryData) {
          throw new Error("Recovery data not found");
        }

        const data = JSON.parse(recoveryData);

        // Call API to send temporary password
        const response = await fetch('/api/auth/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...data, email }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || '임시 비밀번호 발급에 실패했습니다.');
        }

        // Success - proceed to success page
        sessionStorage.setItem("recoveryEmail", email);
        sessionStorage.removeItem("passwordRecoveryData");
        router.push("/forgot-password/success");
      } catch (error) {
        console.error("Password recovery error:", error);
        alert("임시 비밀번호 발급 중 오류가 발생했습니다.");
      }
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
          임시 비밀번호를 발급 받을
          <br />
          이메일을 입력해주세요.
        </h1>

        <form onSubmit={handleSubmit}>
          <FieldLabel
            label="이메일"
            required
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fieldProps={{
              type: "email",
              autoComplete: "email",
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
          disabled={!isEmailValid}
        >
          임시 비밀번호 발급
        </Button>
      </div>
    </div>
  );
}
