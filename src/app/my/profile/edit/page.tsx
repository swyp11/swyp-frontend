"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { BackHeader } from "@/components/common/BackHeader";
import { getAssetPath } from "@/utils/assetPath";
import { withAuth } from "@/components/auth/withAuth";
import { useUserInfo, useUpdateUserInfo } from "@/hooks/useUser";

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

  // 사용자 정보 가져오기
  const { data: userInfo, isLoading } = useUserInfo();
  const updateUserMutation = useUpdateUserInfo();

  // 사용자 정보로 초기값 설정
  useEffect(() => {
    if (userInfo) {
      switch (field) {
        case "name":
          setEditValue(userInfo.nickname || "");
          break;
        case "birthDate":
          setEditValue(userInfo.birth || "");
          break;
        case "role":
          setEditValue(userInfo.weddingRole || "-");
          break;
        case "weddingDate":
          setEditValue(userInfo.weddingDate || "");
          break;
        case "password":
          setEditValue("");
          break;
        default:
          router.push("/my/profile");
      }
    }
  }, [field, userInfo, router]);

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

      // TODO: 백엔드에 비밀번호 변경 API 추가 필요
      // 현재 PUT /api/user/info는 password 필드를 지원하지 않음
      // 별도의 비밀번호 변경 엔드포인트 필요 (예: PUT /api/user/password)
      setErrorMessage("비밀번호 변경 기능은 현재 지원되지 않습니다.");
      return;
    }

    // 다른 필드 업데이트
    try {
      const updateData: any = {};

      if (field === "name") {
        updateData.name = editValue;
      } else if (field === "birthDate") {
        updateData.birthDate = editValue;
      } else if (field === "role") {
        updateData.role = editValue;
      } else if (field === "weddingDate") {
        updateData.weddingDate = editValue;
      }

      await updateUserMutation.mutateAsync(updateData);

      alert("프로필이 업데이트되었습니다.");
      router.back();
    } catch (error: any) {
      console.error("프로필 업데이트 오류:", error);
      setErrorMessage(error.response?.data?.error || error.message || "프로필 업데이트에 실패했습니다.");
    }
  };

  if (!field) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-on-surface-subtle">로딩 중...</p>
      </div>
    );
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
          disabled={updateUserMutation.isPending || (field === "password" && (!currentPassword || !newPassword || !confirmPassword))}
          className={`h-12 w-full bg-primary rounded-lg body-2-medium text-on-primary ${
            (updateUserMutation.isPending || (field === "password" && (!currentPassword || !newPassword || !confirmPassword))) ? "opacity-40" : ""
          }`}
        >
          {updateUserMutation.isPending ? "처리 중..." : "완료"}
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
