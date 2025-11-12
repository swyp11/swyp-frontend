"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BackHeader } from "@/components/common/BackHeader";
import { getAssetPath } from "@/utils/assetPath";
import { withAuth } from "@/components/auth/withAuth";
import { useUserInfo } from "@/hooks/useUser";

function ProfilePage() {
  const router = useRouter();
  const { data: userInfo, isLoading } = useUserInfo();

  // 날짜 포맷 함수 (YYYY-MM-DD → YYYY년 M월 D일)
  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  // 신랑/신부 표시
  const roleText = useMemo(() => {
    if (!userInfo?.weddingRole) return "-";
    return userInfo.weddingRole === "GROOM" ? "신랑" : "신부";
  }, [userInfo?.weddingRole]);

  // OAuth 로그인 여부 (provider 필드가 있으면 OAuth)
  const isOAuthLogin = !!userInfo?.provider;

  const profileFields = [
    {
      label: "이름",
      value: userInfo?.nickname || "-",
      onClick: () => router.push("/my/profile/edit?field=name"),
    },
    {
      label: "생년월일",
      value: formatDate(userInfo?.birth),
      onClick: () => router.push("/my/profile/edit?field=birthDate"),
    },
    {
      label: "신랑/신부",
      value: roleText,
      onClick: () => router.push("/my/profile/edit?field=role"),
    },
    {
      label: "결혼식 예정일",
      value: formatDate(userInfo?.weddingDate),
      onClick: () => router.push("/my/profile/edit?field=weddingDate"),
    },
    ...(isOAuthLogin
      ? []
      : [
          {
            label: "비밀번호",
            value: "",
            onClick: () => router.push("/my/profile/edit?field=password"),
          },
        ]),
  ];

  if (isLoading) {
    return (
      <>
        <BackHeader title="내 정보" />
        <div className="flex items-center justify-center h-full">
          <div className="text-on-surface-subtle">로딩 중...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <BackHeader title="내 정보" />

      {/* Profile Fields */}
      <div className="flex flex-col gap-8 px-4 py-8">
        {profileFields.map((field, index) => (
          <button
            key={index}
            onClick={field.onClick}
            className="flex items-center gap-3 w-full"
          >
            <div className="flex-1 flex flex-col items-start gap-0.5">
              <span className="label-1 text-on-surface-subtle">
                {field.label}
              </span>
              {field.value && (
                <span className="body-2-medium text-on-surface">
                  {field.value}
                </span>
              )}
            </div>
            <Image
              className="relative w-6 h-6 rotate-180"
              alt=""
              src={getAssetPath("/img/chevron_backward.svg")}
              width={24}
              height={24}
            />
          </button>
        ))}
      </div>
    </>
  );
}

export default withAuth(ProfilePage);
