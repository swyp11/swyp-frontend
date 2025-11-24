"use client";

import React, { useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import Image from "next/image";
import { getAssetPath } from "@/utils/assetPath";
import { BackHeader } from "@/components/common/BackHeader";
import { useDressDetail } from "@/hooks/useDress";
import { useDressShopDetail, useMakeupShopDetail } from "@/hooks/useShops";
import { useWeddingHallDetail } from "@/hooks/useWeddingHall";
import { useToggleLikes } from "@/hooks/useLikes";

export default function DetailPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const id = Number(params.id);
  const tab = searchParams.get("tab") || "wedding-hall";

  // 탭에 따라 조건부로 API 호출
  const { data: weddingHall, isLoading: weddingLoading } = useWeddingHallDetail(
    id,
    { enabled: tab === 'wedding-hall' }
  );

  const { data: dressShop, isLoading: dressShopLoading } = useDressShopDetail(
    id,
    { enabled: tab === 'dress-shop' }
  );

  const { data: makeupShop, isLoading: makeupLoading } = useMakeupShopDetail(
    id,
    { enabled: tab === 'makeup-shop' }
  );

  const { data: dress, isLoading: dressLoading } = useDressDetail(
    id,
    { enabled: tab === 'dress' }
  );

  const { toggleLikes, isLoading: isTogglingLikes } = useToggleLikes();

  // 현재 탭의 데이터 및 로딩 상태
  const getCurrentData = () => {
    switch (tab) {
      case 'wedding-hall':
        return { data: weddingHall, isLoading: weddingLoading };
      case 'dress-shop':
        return { data: dressShop, isLoading: dressShopLoading };
      case 'makeup-shop':
        return { data: makeupShop, isLoading: makeupLoading };
      case 'dress':
        return { data: dress, isLoading: dressLoading };
      default:
        return { data: null, isLoading: false };
    }
  };

  const { data: currentData, isLoading } = getCurrentData();

  // 데이터 포맷팅
  const itemData = currentData ? (() => {
    const item = currentData as any;

    // Use images from API response (proxy API handles fallback images)
    let images = ["/img/placeholder.jpg"]; // Default image

    if (item.images && Array.isArray(item.images) && item.images.length > 0) {
      images = item.images;
    } else if (item.image || item.imageUrl || item.thumbnail) {
      images = [item.image || item.imageUrl || item.thumbnail];
    }

    return {
      id: item.id,
      title: item.shopName || item.hallName || item.dressName || item.title || "업체명",
      phone: item.phone || "전화번호 없음",
      description: item.description || item.features || "소개 정보 없음",
      address: item.address || "주소 정보 없음",
      specialty: item.specialty || "",
      features: item.features || "",
      snsUrl: item.snsUrl || "",
      isLiked: item.isLiked || false,
      images,
      businessHours: [
        { day: "월", time: "10:00 - 20:00" },
        { day: "화", time: "10:00 - 20:00" },
        { day: "수", time: "10:00 - 20:00" },
        { day: "목", time: "10:00 - 20:00" },
        { day: "금", time: "10:00 - 20:00" },
        { day: "토", time: "10:00 - 20:00" },
        { day: "일", time: "휴무일" },
      ], // Mock business hours for now
    };
  })() : null;

  const handleFavoriteToggle = () => {
    if (!itemData) return;

    // 백엔드 category 문자열로 매핑
    const categoryMap: Record<string, 'hall' | 'wedding_hall' | 'dress' | 'dress_shop' | 'makeup_shop'> = {
      'wedding-hall': 'wedding_hall',
      'dress-shop': 'dress_shop',     // 드레스샵
      'makeup-shop': 'makeup_shop',   // 메이크업샵
      'dress': 'dress',               // 드레스 아이템
      'hall': 'hall',
    };

    const category = categoryMap[tab] || 'wedding_hall';

    toggleLikes({
      isLiked: itemData.isLiked,
      category,
      postId: id,
    });
  };

  if (isLoading) {
    return (
      <div
        className="bg-white flex items-center justify-center min-h-screen mx-auto"
        style={{ width: "var(--app-width)" }}
      >
        <p className="body-2 text-on-surface-subtle">로딩 중...</p>
      </div>
    );
  }

  if (!itemData) {
    return (
      <div
        className="bg-white flex flex-col items-center justify-center min-h-screen mx-auto"
        style={{ width: "var(--app-width)" }}
      >
        <p className="headline-3 text-on-surface mb-2">항목을 찾을 수 없습니다</p>
      </div>
    );
  }

  return (
    <div className="bg-white flex flex-col h-screen">
      <BackHeader title={itemData.title} />

      {/* Content - Scrollable */}
      <div className="flex-1 bg-white flex flex-col gap-6 p-6 overflow-y-auto">
        {/* Image Gallery - Horizontal Scroll or Single Image */}
        {itemData.images.length === 1 ? (
          <div className="relative w-full rounded-lg overflow-hidden aspect-square">
            <Image
              src={getAssetPath(itemData.images[0])}
              alt={itemData.title}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex gap-2 overflow-x-auto">
            {itemData.images.map((image: string, index: number) => (
              <div
                key={index}
                className="relative flex-shrink-0 w-[280px] h-[280px] rounded-lg overflow-hidden"
              >
                <Image
                  src={getAssetPath(image)}
                  alt={`${itemData.title} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Title & Favorite */}
        <div className="flex items-center gap-2.5 w-full">
          <h2 className="title-1 text-on-surface flex-1">{itemData.title}</h2>
          <button
            onClick={handleFavoriteToggle}
            disabled={isTogglingLikes}
            className="flex items-center justify-center p-2 w-10 h-10"
            aria-label={itemData.isLiked ? "즐겨찾기 해제" : "즐겨찾기 추가"}
          >
            <Image
              src={getAssetPath(
                itemData.isLiked ? "/img/favorite_color.svg" : "/img/favorite_border.svg"
              )}
              alt=""
              width={24}
              height={24}
            />
          </button>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-2 w-full">
          {/* Address */}
          {itemData.address && itemData.address !== "주소 정보 없음" && (
            <div className="flex gap-4 items-start w-full">
              <p className="body-2-medium text-on-surface-subtle flex-shrink-0 w-[52px]">
                주소
              </p>
              <p className="body-2 text-on-surface flex-1">
                {itemData.address}
              </p>
            </div>
          )}

          {/* Business Hours */}
          {itemData.businessHours && (
            <div className="flex gap-4 items-start w-full">
              <p className="body-2-medium text-on-surface-subtle flex-shrink-0 w-[52px]">
                영업시간
              </p>
              <div className="flex flex-col body-2 text-on-surface flex-1">
                {itemData.businessHours.map((hours: any, index: number) => (
                  <p key={index}>
                    {hours.day}: {hours.time}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Phone */}
          {itemData.phone && itemData.phone !== "전화번호 없음" && (
            <div className="flex gap-4 items-start">
              <p className="body-2-medium text-on-surface-subtle flex-shrink-0 w-[52px]">
                전화번호
              </p>
              <a
                href={`tel:${itemData.phone}`}
                className="body-2 text-[#3190ff]"
              >
                {itemData.phone}
              </a>
            </div>
          )}

          {/* SNS URL */}
          {itemData.snsUrl && (
            <div className="flex gap-4 items-start">
              <p className="body-2-medium text-on-surface-subtle flex-shrink-0 w-[52px]">
                SNS
              </p>
              <a
                href={itemData.snsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="body-2 text-[#3190ff] break-all"
              >
                {itemData.snsUrl}
              </a>
            </div>
          )}

          {/* Specialty */}
          {itemData.specialty && (
            <div className="flex gap-4 items-start w-full">
              <p className="body-2-medium text-on-surface-subtle flex-shrink-0 w-[52px]">
                전문분야
              </p>
              <p className="body-2 text-on-surface flex-1">
                {itemData.specialty}
              </p>
            </div>
          )}

          {/* Features */}
          {itemData.features && (
            <div className="flex gap-4 items-start w-full">
              <p className="body-2-medium text-on-surface-subtle flex-shrink-0 w-[52px]">
                특징
              </p>
              <p className="body-2 text-on-surface flex-1">
                {itemData.features}
              </p>
            </div>
          )}

          {/* Description */}
          {itemData.description && itemData.description !== "소개 정보 없음" && (
            <div className="flex gap-4 items-start w-full">
              <p className="body-2-medium text-on-surface-subtle flex-shrink-0 w-[52px]">
                가게소개
              </p>
              <p className="body-2 text-on-surface flex-1">
                {itemData.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
