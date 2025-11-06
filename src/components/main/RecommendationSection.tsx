"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { HorizontalSlider } from "../common/HorizontalSlider";
import { getAssetPath } from "@/utils/assetPath";

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
  const [popularShops, setPopularShops] = useState<ShopCard[]>([]);
  const [newShops, setNewShops] = useState<ShopCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchShops = async () => {
      setIsLoading(true);
      try {
        // activeTab에 따라 다른 API 엔드포인트 선택
        const getApiEndpoint = () => {
          switch (activeTab) {
            case 'wedding-hall':
              return '/api/weddinghole';
            case 'dress':
              return '/api/dressshop';
            case 'makeup':
              return '/api/makeupshop';
            default:
              return '/api/dressshop';
          }
        };

        const apiEndpoint = getApiEndpoint();

        // 인기 상품 가져오기
        const popularResponse = await fetch(`${apiEndpoint}?type=popular`);
        const popularData = await popularResponse.json();

        // 신규 상품 가져오기
        const newResponse = await fetch(`${apiEndpoint}?type=new`);
        const newData = await newResponse.json();

        if (popularData.success) {
          setPopularShops(popularData.data);
        }

        if (newData.success) {
          setNewShops(newData.data);
        }
      } catch (error) {
        console.error('Failed to fetch shops:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShops();
  }, [activeTab]);

  const renderShopCard = (shop: ShopCard, index: number) => (
    <article
      key={index}
      className="flex flex-col min-w-[140px] w-[140px] md:min-w-[180px] md:w-[180px] lg:min-w-[220px] lg:w-[220px] items-start gap-2 flex-shrink-0"
      draggable={false}
      onDragStart={(e) => e.preventDefault()}
    >
      <div className="relative self-stretch w-full rounded aspect-[1.5] overflow-hidden">
        <Image
          src={shop.image}
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

  return (
    <section className="flex flex-col items-start gap-10 px-4 py-6 relative self-stretch w-full bg-white">
      {/* 인기있는 샵 */}
      <div className="flex flex-col items-start gap-4 w-full">
        <h2 className="w-fit mt-[-1.00px] title-2 font-[number:var(--title-2-font-weight)] text-black text-[length:var(--title-2-font-size)] tracking-[var(--title-2-letter-spacing)] leading-[var(--title-2-line-height)] whitespace-nowrap relative flex items-center justify-center [font-style:var(--title-2-font-style)]">
          지금 인기있는 {categoryLabel}
        </h2>
        <HorizontalSlider gap={12} className="w-full px-0 py-1">
          {popularShops.map((shop, index) => renderShopCard(shop, index))}
        </HorizontalSlider>
      </div>

      {/* 신규 샵 */}
      <div className="flex flex-col items-start gap-4 w-full">
        <h2 className="w-fit mt-[-1.00px] title-2 font-[number:var(--title-2-font-weight)] text-black text-[length:var(--title-2-font-size)] tracking-[var(--title-2-letter-spacing)] leading-[var(--title-2-line-height)] whitespace-nowrap relative flex items-center justify-center [font-style:var(--title-2-font-style)]">
          신규 {categoryLabel}
        </h2>
        <HorizontalSlider gap={12} className="w-full px-0 py-1">
          {newShops.map((shop, index) => renderShopCard(shop, index))}
        </HorizontalSlider>
      </div>
    </section>
  );
};
