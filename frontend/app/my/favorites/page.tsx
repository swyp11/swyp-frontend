"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

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
    <div
      className="flex flex-col h-screen bg-white mx-auto"
      style={{ width: "var(--app-width)" }}
    >
      {/* Header */}
      <div className="flex items-center px-4 py-4 border-b border-border-subtle">
        <button
          onClick={() => router.back()}
          className="w-6 h-6 flex items-center justify-center"
          aria-label="뒤로가기"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z"
              fill="#1F1E1E"
            />
          </svg>
        </button>
        <h1 className="flex-1 text-center body-2-medium text-on-surface">
          찜
        </h1>
        <div className="w-6" /> {/* Spacer for centering */}
      </div>

      {/* Tab Bar */}
      <div className="flex border-b border-border-subtle">
        {(["웨딩홀", "드레스"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 body-2 transition-colors ${activeTab === tab
              ? "text-primary border-b-2 border-primary font-medium"
              : "text-on-surface-subtle"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Favorites List */}
      <div className="flex-1 overflow-y-auto">
        {favorites.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 px-4 py-3 border-b border-border-subtle"
          >
            {/* Image */}
            <div className="w-20 h-20 bg-surface-2 rounded-lg overflow-hidden shrink-0">
              {/* TODO: 실제 이미지로 교체 */}
              <div className="w-full h-full flex items-center justify-center text-on-surface-subtlest">
                이미지
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className="body-2-medium text-on-surface truncate">
                {item.title}
              </h3>
              <p className="label-1 text-on-surface-subtle">{item.category}</p>
            </div>

            {/* Favorite Button */}
            <button
              onClick={() => toggleFavorite(item.id)}
              className="w-10 h-10 flex items-center justify-center shrink-0"
              aria-label={item.isFavorite ? "찜 해제" : "찜하기"}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={item.isFavorite ? "#F3335D" : "none"}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
                  stroke="#F3335D"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
