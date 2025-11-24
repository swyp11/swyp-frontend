"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { BackHeader } from "@/components/common/BackHeader";
import { NavigationTabs, type NavigationTab } from "@/components/ui";
import { getAssetPath } from "@/utils/assetPath";
import { useLikesList } from "@/hooks/useLikes";
import { useDeleteLikes } from "@/hooks/useLikes";
import { LikesResponse, LikesType } from "@/types";

function FavoritesPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || "wedding-hall";
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // 찜 목록 조회
  const { data: likesData, isLoading } = useLikesList();
  const { mutate: deleteLikes, isPending: isDeleting } = useDeleteLikes();

  // URL에서 탭 정보 읽어오기
  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl && tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    router.replace(`/my/favorites?tab=${newTab}`, { scroll: false });
  };

  // 탭에 따라 필터링
  const getFilteredLikes = () => {
    if (!likesData) return [];

    switch (activeTab) {
      case 'wedding-hall':
        return likesData.filter(like => like.likesType === LikesType.WEDDING_HALL);
      case 'dress-shop':
        return likesData.filter(like => like.likesType === LikesType.DRESS_SHOP);
      case 'makeup-shop':
        return likesData.filter(like => like.likesType === LikesType.MAKEUP_SHOP);
      default:
        return [];
    }
  };

  const filteredLikes = getFilteredLikes();

  const handleItemClick = (like: LikesResponse) => {
    // 백엔드 category를 프론트엔드 tab으로 변환
    let tab = 'wedding-hall';
    switch (like.likesType) {
      case LikesType.WEDDING_HALL:
        tab = 'wedding-hall';
        break;
      case LikesType.DRESS_SHOP:
        tab = 'dress-shop';
        break;
      case LikesType.MAKEUP_SHOP:
        tab = 'makeup-shop';
        break;
      case LikesType.DRESS:
        tab = 'dress';
        break;
      case LikesType.HALL:
        tab = 'hall';
        break;
    }
    router.push(`/detail/${like.targetId}?tab=${tab}`);
  };

  const handleDeleteLike = (like: LikesResponse, e: React.MouseEvent) => {
    e.stopPropagation();

    // 백엔드 category 문자열로 변환
    let category: 'wedding_hall' | 'dress_shop' | 'makeup_shop' | 'dress' | 'hall' = 'wedding_hall';
    switch (like.likesType) {
      case LikesType.WEDDING_HALL:
        category = 'wedding_hall';
        break;
      case LikesType.DRESS_SHOP:
        category = 'dress_shop';
        break;
      case LikesType.MAKEUP_SHOP:
        category = 'makeup_shop';
        break;
      case LikesType.DRESS:
        category = 'dress';
        break;
      case LikesType.HALL:
        category = 'hall';
        break;
    }

    setDeletingId(like.id);
    deleteLikes(
      { category, postId: like.targetId },
      { onSettled: () => setDeletingId(null) }
    );
  };

  const tabs: NavigationTab[] = [
    { id: "wedding-hall", label: "웨딩홀" },
    { id: "dress-shop", label: "드레스샵" },
    { id: "makeup-shop", label: "메이크업샵" },
  ];

  return (
    <div className="flex flex-col bg-white">
      {/* Fixed Header */}
      <div className="sticky top-0 z-10 bg-white">
        <BackHeader title="찜" />
        <NavigationTabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
      </div>

      {/* Scrollable Favorites List */}
      <div>
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <p className="body-2 text-on-surface-subtle">로딩 중...</p>
          </div>
        ) : filteredLikes.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <p className="body-2 text-on-surface-subtle">찜한 항목이 없습니다.</p>
          </div>
        ) : (
          <div className="flex flex-col">
            {filteredLikes.map((like) => {
              const details = like.itemDetails || {};
              const image = details.imageUrl || details.image || details.thumbnail || '/img/placeholder.jpg';
              const title = details.hallName || details.shopName || details.dressName || details.name || '업체명';
              const description = details.address || details.description || '';

              return (
                <div
                  key={like.id}
                  onClick={() => handleItemClick(like)}
                  className="flex items-center gap-4 px-4 py-4 border-b border-[#f1f1f1] bg-white cursor-pointer hover:bg-surface-1 transition-colors"
                >
                  {/* Image */}
                  <div className="w-16 h-16 bg-surface-2 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={getAssetPath(image)}
                      alt={title}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col gap-1">
                    <h3 className="body-1-medium text-on-surface truncate">
                      {title}
                    </h3>
                    {description && (
                      <p className="label-1 text-on-surface-subtle truncate">
                        {description}
                      </p>
                    )}
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => handleDeleteLike(like, e)}
                    className="p-2 flex items-center justify-center shrink-0"
                    aria-label="찜 해제"
                    disabled={deletingId === like.id}
                  >
                    {deletingId === like.id ? (
                      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Image
                        className="relative w-6 h-6"
                        alt=""
                        src={getAssetPath("/img/favorite_color.svg")}
                        width={24}
                        height={24}
                      />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function FavoritesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FavoritesPageContent />
    </Suspense>
  );
}
