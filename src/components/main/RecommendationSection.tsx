"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { HorizontalSlider } from "../common/HorizontalSlider";
import { getAssetPath } from "@/utils/assetPath";
import { useDressShopList, useMakeupShopList } from "@/hooks/useShops";
import { useWeddingHallList } from "@/hooks/useWeddingHall";

interface ShopCard {
  id: string;
  image: string;
  title: string;
  description: string;
  category: 'wedding-hall' | 'dress' | 'makeup';
}

interface RecommendationSectionProps {
  activeTab: string;
}

export const RecommendationSection = ({ activeTab }: RecommendationSectionProps) => {
  const router = useRouter();

  // 탭에 따라 조건부로 API 호출
  // 인기 있는 샵 (FAVORITE 정렬)
  const { data: popularWeddingHalls, isLoading: popularWeddingLoading } = useWeddingHallList(
    { sort: 'FAVORITE' },
    { enabled: activeTab === 'wedding-hall' }
  );

  const { data: popularDressShops, isLoading: popularDressLoading } = useDressShopList(
    { sort: 'FAVORITE' },
    { enabled: activeTab === 'dress' }
  );

  const { data: popularMakeupShops, isLoading: popularMakeupLoading } = useMakeupShopList(
    { sort: 'FAVORITE' },
    { enabled: activeTab === 'makeup' }
  );

  // 신규 샵 (RECENT 정렬)
  const { data: newWeddingHalls, isLoading: newWeddingLoading } = useWeddingHallList(
    { sort: 'RECENT' },
    { enabled: activeTab === 'wedding-hall' }
  );

  const { data: newDressShops, isLoading: newDressLoading } = useDressShopList(
    { sort: 'RECENT' },
    { enabled: activeTab === 'dress' }
  );

  const { data: newMakeupShops, isLoading: newMakeupLoading } = useMakeupShopList(
    { sort: 'RECENT' },
    { enabled: activeTab === 'makeup' }
  );

  // 현재 탭의 데이터 가져오기
  const getPopularData = () => {
    switch (activeTab) {
      case 'wedding-hall':
        return { data: popularWeddingHalls, isLoading: popularWeddingLoading };
      case 'dress':
        return { data: popularDressShops, isLoading: popularDressLoading };
      case 'makeup':
        return { data: popularMakeupShops, isLoading: popularMakeupLoading };
      default:
        return { data: [], isLoading: false };
    }
  };

  const getNewData = () => {
    switch (activeTab) {
      case 'wedding-hall':
        return { data: newWeddingHalls, isLoading: newWeddingLoading };
      case 'dress':
        return { data: newDressShops, isLoading: newDressLoading };
      case 'makeup':
        return { data: newMakeupShops, isLoading: newMakeupLoading };
      default:
        return { data: [], isLoading: false };
    }
  };

  const { data: popularData, isLoading: popularLoading } = getPopularData();
  const { data: newData, isLoading: newLoading } = getNewData();

  // 데이터 포맷팅
  const formatShopData = (data: any[]): ShopCard[] => {
    return (data || []).map((item: any) => ({
      id: item.id,
      image: item.imageUrl || item.image || item.thumbnail || '/img/placeholder.jpg',
      title: item.name || item.shopName || item.hallName || item.dressName || '업체명',
      description: item.address || item.description || '주소 정보 없음',
      category: activeTab as 'wedding-hall' | 'dress' | 'makeup'
    }));
  };

  const popularShops = formatShopData(popularData || []);
  const newShops = formatShopData(newData || []);
  const isLoading = popularLoading || newLoading;

  const handleShopClick = (shopId: string) => {
    router.push(`/detail/${shopId}?tab=${activeTab}`);
  };

  const renderShopCard = (shop: ShopCard, index: number) => (
    <article
      key={index}
      onClick={() => handleShopClick(shop.id)}
      className="flex flex-col min-w-[140px] w-[140px] md:min-w-[180px] md:w-[180px] lg:min-w-[220px] lg:w-[220px] items-start gap-2 flex-shrink-0 cursor-pointer"
      draggable={false}
      onDragStart={(e) => e.preventDefault()}
    >
      <div className="relative self-stretch w-full rounded aspect-[1.5] overflow-hidden">
        <Image
          src={getAssetPath(shop.image)}
          alt={shop.title}
          width={220}
          height={147}
          className="object-cover w-full h-full"
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
        />
      </div>
      <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
        <h3 className="w-fit mt-[-1.00px] body-2-medium font-[number:var(--body-2-medium-font-weight)] text-black text-[length:var(--body-2-medium-font-size)] tracking-[var(--body-2-medium-letter-spacing)] leading-[var(--body-2-medium-line-height)] whitespace-nowrap relative flex items-center justify-center [font-style:var(--body-2-medium-font-style)]">
          {shop.title}
        </h3>
        <p className="w-fit label-1-regular font-[number:var(--label-1-regular-font-weight)] text-on-surface-subtle text-[length:var(--label-1-regular-font-size)] tracking-[var(--label-1-regular-letter-spacing)] leading-[var(--label-1-regular-line-height)] whitespace-nowrap relative flex items-center justify-center [font-style:var(--label-1-regular-font-style)]">
          {shop.description}
        </p>
      </div>
    </article>
  );

  // 카테고리별 제목 매핑
  const getCategoryLabel = () => {
    switch (activeTab) {
      case 'wedding-hall':
        return '웨딩홀';
      case 'dress':
        return '드레스샵';
      case 'makeup':
        return '메이크업샵';
      default:
        return '샵';
    }
  };

  const categoryLabel = getCategoryLabel();

  if (isLoading) {
    return (
      <section className="flex flex-col items-start gap-10 px-4 py-6 relative self-stretch w-full bg-white">
        <div className="flex items-center justify-center w-full py-10">
          <p className="text-on-surface-subtle">로딩 중...</p>
        </div>
      </section>
    );
  }

  const renderEmptyState = (message: string) => (
    <div className="flex items-center justify-center w-full min-h-[180px]">
      <p className="body-2 text-on-surface-subtle">{message}</p>
    </div>
  );

  const handleSeeMore = (type: 'popular' | 'new') => {
    const sort = type === 'popular' ? 'FAVORITE' : 'RECENT';
    router.push(`/search?tab=${activeTab}&sort=${sort}`);
  };

  return (
    <section className="flex flex-col items-start gap-10 px-4 py-6 relative self-stretch w-full bg-white flex-1">
      {/* 인기있는 샵 */}
      <div className="flex flex-col items-start gap-4 w-full">
        {/* 섹션 헤더 */}
        <div className="flex items-center justify-between w-full">
          <h2 className="title-2 font-[number:var(--title-2-font-weight)] text-black text-[length:var(--title-2-font-size)] tracking-[var(--title-2-letter-spacing)] leading-[var(--title-2-line-height)] whitespace-nowrap [font-style:var(--title-2-font-style)]">
            지금 인기있는 {categoryLabel}
          </h2>
          <button
            onClick={() => handleSeeMore('popular')}
            className="flex items-center gap-0 shrink-0"
          >
            <span className="body-2-medium font-[number:var(--body-2-medium-font-weight)] text-on-surface-subtle text-[length:var(--body-2-medium-font-size)] tracking-[var(--body-2-medium-letter-spacing)] leading-[var(--body-2-medium-line-height)] whitespace-nowrap [font-style:var(--body-2-medium-font-style)]">
              더보기
            </span>
            <Image
              src={getAssetPath("/img/chevron_forward.svg")}
              alt="더보기"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </button>
        </div>

        {popularShops.length > 0 ? (
          <HorizontalSlider gap={12} className="w-full px-0 py-1">
            {popularShops.map((shop, index) => renderShopCard(shop, index))}
          </HorizontalSlider>
        ) : (
          renderEmptyState('인기 있는 업체가 없습니다')
        )}
      </div>

      {/* 신규 샵 */}
      <div className="flex flex-col items-start gap-4 w-full">
        {/* 섹션 헤더 */}
        <div className="flex items-center justify-between w-full">
          <h2 className="title-2 font-[number:var(--title-2-font-weight)] text-black text-[length:var(--title-2-font-size)] tracking-[var(--title-2-letter-spacing)] leading-[var(--title-2-line-height)] whitespace-nowrap [font-style:var(--title-2-font-style)]">
            신규 {categoryLabel}
          </h2>
          <button
            onClick={() => handleSeeMore('new')}
            className="flex items-center gap-0 shrink-0"
          >
            <span className="body-2-medium font-[number:var(--body-2-medium-font-weight)] text-on-surface-subtle text-[length:var(--body-2-medium-font-size)] tracking-[var(--body-2-medium-letter-spacing)] leading-[var(--body-2-medium-line-height)] whitespace-nowrap [font-style:var(--body-2-medium-font-style)]">
              더보기
            </span>
            <Image
              src={getAssetPath("/img/chevron_forward.svg")}
              alt="더보기"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </button>
        </div>

        {newShops.length > 0 ? (
          <HorizontalSlider gap={12} className="w-full px-0 py-1">
            {newShops.map((shop, index) => renderShopCard(shop, index))}
          </HorizontalSlider>
        ) : (
          renderEmptyState('신규 업체가 없습니다')
        )}
      </div>
    </section>
  );
};
