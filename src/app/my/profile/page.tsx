"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BackHeader } from "@/components/common/BackHeader";
import { getAssetPath } from "@/utils/assetPath";
import { withAuth } from "@/components/auth/withAuth";

function ProfilePage() {
  const router = useRouter();

  // TODO: 실제 사용자 정보를 가져와야 함
  const userInfo = {
    name: "김수지",
    birthDate: "yyyy년 m월 d일",
    role: "-",
    weddingDate: "yyyy년 m월 d일",
    isGoogleLogin: false, // TODO: 실제 로그인 타입 확인
  };

  const profileFields = [
    {
      label: "이름",
      value: userInfo.name,
      onClick: () => router.push("/my/profile/edit?field=name"),
    },
    {
      label: "생년월일",
      value: userInfo.birthDate,
      onClick: () => router.push("/my/profile/edit?field=birthDate"),
    },
    {
      label: "신랑/신부",
      value: userInfo.role,
      onClick: () => router.push("/my/profile/edit?field=role"),
    },
    {
      label: "결혼식 예정일",
      value: userInfo.weddingDate,
      onClick: () => router.push("/my/profile/edit?field=weddingDate"),
    },
    ...(userInfo.isGoogleLogin
      ? []
      : [
          {
            label: "비밀번호",
            value: "",
            onClick: () => router.push("/my/profile/edit?field=password"),
          },
        ]),
  ];

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
