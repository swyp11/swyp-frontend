"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getAssetPath } from "@/utils/assetPath";
import { withAuth } from "@/components/auth/withAuth";
import { useUserInfo } from "@/hooks/useUser";

function MyPage() {
  const router = useRouter();
  const { data: userInfo, isLoading } = useUserInfo();

  // 결혼식까지 남은 날짜 계산
  const daysUntilWedding = useMemo(() => {
    if (!userInfo?.weddingDate) return null;

    const today = new Date();
    const weddingDate = new Date(userInfo.weddingDate);
    const diffTime = weddingDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : null;
  }, [userInfo?.weddingDate]);

  // 신랑/신부 표시
  const userRole = useMemo(() => {
    if (!userInfo?.weddingRole) return "";
    return userInfo.weddingRole === "GROOM" ? "신랑님" : "신부님";
  }, [userInfo?.weddingRole]);

  const userName = userInfo?.nickname || "사용자";

  const menuItems = [
    {
      icon: (
        <Image
          className="relative w-6 h-6"
          alt=""
          src={getAssetPath("/img/settings.svg")}
          width={24}
          height={24}
        />
      ),
      label: "설정",
      onClick: () => router.push("/my/settings"),
    },
    {
      icon: (
        <Image
          className="relative w-6 h-6"
          alt=""
          src={getAssetPath("/img/favorite_border.svg")}
          width={24}
          height={24}
        />
      ),
      label: "찜 목록",
      onClick: () => router.push("/my/favorites"),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-on-surface-subtle">로딩 중...</div>
      </div>
    );
  }

  return (
    <>
      {/* Profile Section */}
      <div className="px-4 py-4">
        <button
          onClick={() => router.push("/my/profile")}
          className="flex items-center gap-4 w-full"
        >
          {/* Profile Image */}
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-semibold text-[26px]">
            {userName.charAt(0)}
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-left">
            <div className="body-1-medium text-on-surface font-bold">
              {userName}
            </div>
            <div className="label-1 text-on-surface-subtle">
              {userRole && `${userRole}`}
              {userRole && daysUntilWedding && " ・ "}
              {daysUntilWedding && `결혼식까지 ${daysUntilWedding}일`}
              {!userRole && !daysUntilWedding && "프로필을 완성해보세요"}
            </div>
          </div>

          <Image
            className="relative w-6 h-6 rotate-180"
            alt=""
            src={getAssetPath("/img/chevron_backward.svg")}
            width={24}
            height={24}
          />
        </button>
      </div>

      {/* Divider */}
      <div className="w-full h-2 bg-[#f6f6f6]" />

      {/* Menu List */}
      <div className="flex flex-col gap-6 px-4 py-6">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={item.onClick}
            className="flex items-center gap-3 w-full"
          >
            <div className="w-6 h-6 shrink-0">{item.icon}</div>
            <span className="flex-1 text-left body-2-medium text-on-surface">
              {item.label}
            </span>
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

export default withAuth(MyPage);
