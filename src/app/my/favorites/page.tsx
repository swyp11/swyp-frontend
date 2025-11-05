"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BackHeader } from "@/components/common/BackHeader";
import { getAssetPath } from "@/utils/assetPath";

interface FavoriteItem {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  isFavorite: boolean;
}

export default function FavoritesPage() {
  const router = useRouter();

  // TODO: 실제 데이터는 API에서 가져와야 함
  const [favorites, setFavorites] = useState<FavoriteItem[]>([
    {
      id: 1,
      title: "여름가요 컬렉션세트",
      category: "여름/드레스2",
      imageUrl: "/placeholder-dress.jpg",
      isFavorite: true,
    },
    {
      id: 2,
      title: "여름가요 컬렉션세트",
      category: "여름/드레스2",
      imageUrl: "/placeholder-dress.jpg",
      isFavorite: true,
    },
    {
      id: 3,
      title: "여름가요 컬렉션세트",
      category: "여름/드레스2",
      imageUrl: "/placeholder-dress.jpg",
      isFavorite: true,
    },
    {
      id: 4,
      title: "여름가요 컬렉션세트",
      category: "여름/드레스2",
      imageUrl: "/placeholder-dress.jpg",
      isFavorite: true,
    },
    {
      id: 5,
      title: "여름가요 컬렉션세트",
      category: "여름/드레스2",
      imageUrl: "/placeholder-dress.jpg",
      isFavorite: true,
    },
    {
      id: 6,
      title: "여름가요 컬렉션세트",
      category: "여름/드레스2",
      imageUrl: "/placeholder-dress.jpg",
      isFavorite: true,
    },
  ]);

  const [activeTab, setActiveTab] = useState<"웨딩홀" | "드레스">(
    "웨딩홀"
  );

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  return (
    <>
      <BackHeader title="찜" />

      {/* Tab Bar */}
      <div className="flex border-b border-[#f1f1f1]">
        {(["웨딩홀", "드레스"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 body-2 transition-colors relative ${activeTab === tab
              ? "text-primary font-medium"
              : "text-on-surface-subtle"
              }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-[2px]" />
            )}
          </button>
        ))}
      </div>

      {/* Favorites List */}
      <div className="flex-1 overflow-y-auto">
        {favorites.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 px-4 py-4 border-b border-[#f1f1f1] bg-white"
          >
            {/* Image */}
            <div className="w-16 h-16 bg-surface-2 rounded-lg overflow-hidden shrink-0">
              {/* TODO: 실제 이미지로 교체 */}
              <div className="w-full h-full flex items-center justify-center text-on-surface-subtlest text-xs">
                이미지
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 flex flex-col gap-1">
              <h3 className="body-1-medium text-on-surface truncate">
                {item.title}
              </h3>
              <p className="label-1 text-on-surface-subtle">{item.category}</p>
            </div>

            {/* Favorite Button */}
            <button
              onClick={() => toggleFavorite(item.id)}
              className="p-2 flex items-center justify-center shrink-0"
              aria-label={item.isFavorite ? "찜 해제" : "찜하기"}
            >
              <Image
                className="relative w-6 h-6"
                alt=""
                src={getAssetPath("/img/favorite_color.svg")}
                width={24}
                height={24}
              />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
