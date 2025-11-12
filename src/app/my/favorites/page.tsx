"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { BackHeader } from "@/components/common/BackHeader";
import { getAssetPath } from "@/utils/assetPath";

interface FavoriteItem {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  isFavorite: boolean;
  type: string;
}

function FavoritesPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [activeTab, setActiveTab] = useState<"웨딩홀" | "드레스">("웨딩홀");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // URL에서 탭 정보 읽어오기
  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl === "웨딩홀" || tabFromUrl === "드레스") {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  // API에서 찜 목록 가져오기
  useEffect(() => {
    const fetchFavorites = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // TODO: 백엔드에서 찜 목록을 가져오는 API가 필요합니다
        // 현재는 카테고리별로 찜한 항목만 가져올 수 있습니다
        // GET /api/likes 엔드포인트를 백엔드에 추가해야 합니다

        // 임시로 빈 배열 반환
        setFavorites([]);
      } catch (err) {
        console.error('[Favorites] Fetch error:', err);
        setError(err instanceof Error ? err.message : '서버 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [activeTab]);

  const handleTabChange = (tab: "웨딩홀" | "드레스") => {
    setActiveTab(tab);
    router.push(`/my/favorites?tab=${tab}`, { scroll: false });
  };

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
            onClick={() => handleTabChange(tab)}
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
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <p className="body-2 text-on-surface-subtle">로딩 중...</p>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-20">
            <p className="body-2 text-alert">{error}</p>
          </div>
        ) : favorites.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <p className="body-2 text-on-surface-subtle">찜한 항목이 없습니다.</p>
          </div>
        ) : (
          favorites.map((item) => (
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
          ))
        )}
      </div>
    </>
  );
}

export default function FavoritesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FavoritesPageContent />
    </Suspense>
  );
}
