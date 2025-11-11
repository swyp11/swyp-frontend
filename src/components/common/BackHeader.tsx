"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getAssetPath } from "@/utils/assetPath";

interface BackHeaderProps {
  title: string;
  onBack?: () => void;
  rightElement?: React.ReactNode;
}

export const BackHeader = ({
  title,
  onBack,
  rightElement,
}: BackHeaderProps) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <div className="flex items-center px-4 py-4 shadow-2">
      <button
        onClick={handleBack}
        className="w-6 h-6 flex items-center justify-center"
        aria-label="뒤로가기"
      >
        <Image
          className="relative w-6 h-6"
          alt=""
          src={getAssetPath("/img/arrow_back.svg")}
          width={24}
          height={24}
        />
      </button>
      <h1 className="flex-1 text-center body-2-medium text-on-surface">
        {title}
      </h1>
      {rightElement || <div className="w-6" />}
    </div>
  );
};
