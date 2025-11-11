"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { BackHeader } from "@/components/common/BackHeader";
import { getAssetPath } from "@/utils/assetPath";
import { withAuth } from "@/components/auth/withAuth";

type FieldType = "name" | "birthDate" | "role" | "weddingDate" | "password";

function ProfileEditContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const field = searchParams.get("field") as FieldType | null;

  const [editValue, setEditValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // 비밀번호 변경용 추가 state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // TODO: 실제 사용자 정보를 가져와야 함
  useEffect(() => {
    // 초기값 설정
    switch (field) {
      case "name":
        setEditValue("김수지");
        break;
      case "birthDate":
        setEditValue("yyyy년 m월 d일");
        break;
      case "role":
        setEditValue("-");
        break;
      case "weddingDate":
        setEditValue("yyyy년 m월 d일");
        break;
      case "password":
        setEditValue("");
        break;
      default:
        router.push("/my/profile");
    }
  }, [field, router]);

  const getTitle = () => {
    switch (field) {
      case "name":
        return "이름";
      case "birthDate":
        return "생년월일";
      case "role":
        return "신랑/신부";
      case "weddingDate":
        return "결혼식 예정일";
      case "password":
        return "비밀번호";
      default:
        return "";
    }
  };

  const getPlaceholder = () => {
    switch (field) {
      case "name":
        return "이름을 입력해주세요.";
      case "birthDate":
        return "생년월일을 선택해주세요.";
      case "role":
        return "신랑 또는 신부를 선택해주세요.";
      case "weddingDate":
        return "결혼식 예정일을 선택해주세요.";
      case "password":
        return "새 비밀번호를 입력해주세요.";
      default:
        return "";
    }
  };

  const handleSave = async () => {
    setErrorMessage("");

    // 이름 유효성 검사
    if (field === "name" && editValue.length < 2) {
      setErrorMessage("2자 이상이어야 합니다.");
      return;
    }

    // 비밀번호 변경 유효성 검사
    if (field === "password") {
      if (!currentPassword) {
        setErrorMessage("현재 비밀번호를 입력해주세요.");
        return;
      }
      if (!newPassword) {
        setErrorMessage("새 비밀번호를 입력해주세요.");
        return;
      }
      // 영문, 숫자 포함 8자리 이상 검증
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!passwordRegex.test(newPassword)) {
        setErrorMessage("영문, 숫자 포함 8자리 이상 입력해주세요.");
        return;
      }
      if (newPassword !== confirmPassword) {
        setErrorMessage("비밀번호가 일치하지 않습니다.");
        return;
      }

      // 비밀번호 변경 API 호출
      try {
        const response = await fetch("/api/auth/change-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setErrorMessage(data.error || "비밀번호 변경에 실패했습니다.");
          return;
        }

        alert("비밀번호가 변경되었습니다.");
        router.back();
      } catch (error) {
        console.error("비밀번호 변경 오류:", error);
        setErrorMessage("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
      return;
    }

    // 다른 필드 업데이트 API 호출
    try {
      const response = await fetch("/api/profile/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          field,
          value: editValue,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || "프로필 업데이트에 실패했습니다.");
        return;
      }

      alert("프로필이 업데이트되었습니다.");
      router.back();
    } catch (error) {
      console.error("프로필 업데이트 오류:", error);
      setErrorMessage("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  if (!field) {
    return null;
  }

  return (
    <>
      <BackHeader title={getTitle()} />

      <div className="px-4 py-8 pb-28">
        {field !== "password" && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-on-surface">
              {getTitle()}
            </label>
          </div>
        )}

        <div className={field === "password" ? "flex flex-col gap-8" : "flex flex-col gap-2"}>
          {field === "role" ? (
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setEditValue("신랑")}
                className={`h-12 px-4 rounded-lg border ${
                  editValue === "신랑"
                    ? "border-primary bg-primary-subtle"
                    : "border-border bg-white"
                } body-2 text-on-surface flex items-center`}
              >
                신랑
              </button>
              <button
                onClick={() => setEditValue("신부")}
                className={`h-12 px-4 rounded-lg border ${
                  editValue === "신부"
                    ? "border-primary bg-primary-subtle"
                    : "border-border bg-white"
                } body-2 text-on-surface flex items-center`}
              >
                신부
              </button>
            </div>
          ) : field === "birthDate" || field === "weddingDate" ? (
            <input
              type="date"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="h-12 w-full px-4 rounded-lg border border-border bg-white body-2 text-on-surface"
            />
          ) : field === "password" ? (
            <div className="flex flex-col gap-8">
              {/* 기존 비밀번호 */}
              <div className="flex flex-col gap-1.5">
                <div className="flex gap-1 items-center">
                  <p className="font-medium text-[14px] leading-[20px] tracking-[0.1px] text-black">
                    기존 비밀번호
                  </p>
                </div>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="비밀번호를 입력해주세요"
                  className="bg-white border border-[#dfdfdf] h-12 px-4 py-2 rounded-lg body-2 text-on-surface placeholder:text-[#cbc8c8]"
                />
                <a
                  href="/forgot-password"
                  className="label-1 text-primary underline decoration-solid"
                >
                  비밀번호를 잊으셨나요?
                </a>
              </div>

              {/* 구분선 */}
              <div className="w-full h-px bg-[#efefef]" />

              {/* 새로운 비밀번호 */}
              <div className="flex flex-col gap-1.5">
                <div className="flex gap-1 items-center">
                  <p className="font-medium text-[14px] leading-[20px] tracking-[0.1px] text-black">
                    새로운 비밀번호
                  </p>
                </div>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="비밀번호를 입력해주세요"
                  className="bg-white border border-[#dfdfdf] h-12 px-4 py-2 rounded-lg body-2 text-on-surface placeholder:text-[#cbc8c8]"
                />
                <p className="label-1 text-on-surface-subtle">
                  영문, 숫자 포함 8자리 이상
                </p>
              </div>

              {/* 새로운 비밀번호 확인 */}
              <div className="flex flex-col gap-1.5">
                <div className="flex gap-1 items-center">
                  <p className="font-medium text-[14px] leading-[20px] tracking-[0.1px] text-black">
                    새로운 비밀번호 확인
                  </p>
                </div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="비밀번호를 한 번 더 입력해주세요"
                  className="bg-white border border-[#dfdfdf] h-12 px-4 py-2 rounded-lg body-2 text-on-surface placeholder:text-[#cbc8c8]"
                />
                <p className="label-1 text-on-surface-subtle">
                  영문, 숫자 포함 8자리 이상
                </p>
              </div>
            </div>
          ) : (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              placeholder={getPlaceholder()}
              className="h-12 w-full px-4 rounded-lg border border-border bg-white body-2 text-on-surface placeholder:text-on-surface-subtlest"
            />
          )}

          {errorMessage && (
            <p className="label-1 text-alert mt-1">{errorMessage}</p>
          )}
        </div>
      </div>

      {/* 하단 고정 완료 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 px-4 pb-8 pt-4 bg-white" style={{ maxWidth: "var(--app-width)", margin: "0 auto" }}>
        <button
          onClick={handleSave}
          className={`h-12 w-full bg-primary rounded-lg body-2-medium text-on-primary ${
            field === "password" && (!currentPassword || !newPassword || !confirmPassword) ? "opacity-40" : ""
          }`}
          disabled={field === "password" && (!currentPassword || !newPassword || !confirmPassword)}
        >
          완료
        </button>
      </div>
    </>
  );
}

function ProfileEditPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileEditContent />
    </Suspense>
  );
}

export default withAuth(ProfileEditPage);
