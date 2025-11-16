"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BackHeader } from "@/components/common/BackHeader";
import { FieldLabel } from "@/components/ui/FieldLabel";
import { Button } from "@/components/ui/Button";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if user came from verification step
    const storedToken = sessionStorage.getItem("passwordResetToken");
    const storedEmail = sessionStorage.getItem("passwordResetEmail");

    if (!storedToken || !storedEmail) {
      router.push("/forgot-password");
    } else {
      setToken(storedToken);
      setEmail(storedEmail);
    }
  }, [router]);

  // 비밀번호 유효성 검사 (영문, 숫자 포함 8자리 이상)
  const validatePassword = (password: string): boolean => {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const isLongEnough = password.length >= 8;
    return hasLetter && hasNumber && isLongEnough;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNewPassword(value);

    if (value && !validatePassword(value)) {
      setPasswordError("영문, 숫자 포함 8자리 이상");
    } else {
      setPasswordError("");
    }

    if (confirmPassword && value !== confirmPassword) {
      setConfirmError("비밀번호가 일치하지 않습니다.");
    } else if (confirmPassword) {
      setConfirmError("");
    }
  };

  const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (value && value !== newPassword) {
      setConfirmError("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmError("");
    }
  };

  const isFormValid =
    newPassword &&
    confirmPassword &&
    validatePassword(newPassword) &&
    newPassword === confirmPassword &&
    !passwordError &&
    !confirmError;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isResetting) return;

    setError("");
    setIsResetting(true);

    try {
      const response = await fetch("/api/user/password/reset", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          newPassword,
          verificationToken: token,
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        setError(result.error || "비밀번호 재설정에 실패했습니다.");
        return;
      }

      // Success - clean up and go to success page
      sessionStorage.removeItem("passwordResetToken");
      sessionStorage.removeItem("passwordResetEmail");
      sessionStorage.setItem("recoveryEmail", email);
      router.push("/forgot-password/success");
    } catch (error) {
      console.error("Password reset error:", error);
      setError("비밀번호 재설정 중 오류가 발생했습니다.");
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div
      className="bg-white flex flex-col h-screen mx-auto"
      style={{ width: "var(--app-width)" }}
    >
      <BackHeader title="비밀번호 재설정" />

      <div className="flex-1 px-4 py-8 overflow-y-auto flex flex-col justify-between">
        <div className="flex flex-col gap-8">
          <h1 className="title-1 text-on-surface">
            새로운 비밀번호를
            <br />
            입력해주세요.
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* New Password Field */}
            <div className="flex flex-col gap-1.5">
              <FieldLabel
                label="새 비밀번호"
                required
                placeholder="비밀번호를 입력해주세요."
                value={newPassword}
                onChange={handlePasswordChange}
                fieldProps={{
                  type: "password",
                }}
                error={passwordError}
              />
              {!passwordError && (
                <p className="label-1 text-on-surface-subtle">
                  영문, 숫자 포함 8자리 이상
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="flex flex-col gap-1.5">
              <FieldLabel
                label="새 비밀번호 확인"
                required
                placeholder="비밀번호를 한 번 더 입력해주세요."
                value={confirmPassword}
                onChange={handleConfirmChange}
                fieldProps={{
                  type: "password",
                }}
                error={confirmError}
              />
            </div>
          </form>

          {error && (
            <p className="field-error-text text-center">{error}</p>
          )}
        </div>

        {/* Bottom Button */}
        <Button
          variant="primary"
          colorType="accent"
          className="w-full"
          onClick={handleSubmit}
          disabled={!isFormValid || isResetting}
        >
          {isResetting ? "처리 중..." : "비밀번호 변경"}
        </Button>
      </div>
    </div>
  );
}
