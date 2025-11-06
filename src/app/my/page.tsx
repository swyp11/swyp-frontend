"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getAssetPath } from "@/utils/assetPath";
import { withAuth } from "@/components/auth/withAuth";

function MyPage() {
  const router = useRouter();

  // TODO: 실제 사용자 정보를 가져와야 함
  const userName = "따뜻한고구마";
  const userRole = "신부님";
  const daysUntilWedding = 99;

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

  return (
    <>
      {/* Profile Section */}
      <div className="px-4 py-4">
        <button
          onClick={() => {
            // TODO: 프로필 편집 페이지로 이동
            console.log("프로필 편집");
          }}
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
              {userRole} ・ 결혼식까지 {daysUntilWedding}일
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
