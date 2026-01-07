"use client";

import React, { useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import Image from "next/image";
import { getAssetPath } from "@/utils/assetPath";
import { BackHeader } from "@/components/common/BackHeader";
import { useDressDetail } from "@/hooks/useDress";
import { useDressShopDetail, useDressShopDresses, useMakeupShopDetail } from "@/hooks/useShops";
import { DressResponse } from "@/types/dress";
import { HallResponse } from "@/types/weddingHall";
import { HorizontalSlider } from "@/components/common/HorizontalSlider";
import { useWeddingHallDetail, useWeddingHallHalls, useHallDetail } from "@/hooks/useWeddingHall";
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

  const { data: hall, isLoading: hallLoading } = useHallDetail(
    tab === 'hall' ? id : 0
  );

  // 드레스샵일 때 해당 샵의 드레스 목록 조회
  const { data: shopDressesData, isLoading: shopDressesLoading } = useDressShopDresses(
    tab === 'dress-shop' ? id : 0
  );
  const shopDresses = shopDressesData?.content;

  // 웨딩홀일 때 해당 웨딩홀의 홀 목록 조회
  const { data: weddingHallHalls, isLoading: weddingHallHallsLoading } = useWeddingHallHalls(
    tab === 'wedding-hall' ? id : 0
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
      case 'hall':
        return { data: hall, isLoading: hallLoading };
      default:
        return { data: null, isLoading: false };
    }
  };

  const { data: currentData, isLoading } = getCurrentData();

  // 데이터 포맷팅
  const itemData = currentData ? (() => {
    const item = currentData as any;

    // 이미지 처리: imageUrl 단일 필드 또는 images 배열
    let images = ["/img/placeholder.jpg"];
    if (item.imageUrl) {
      images = [item.imageUrl];
    } else if (item.images && Array.isArray(item.images) && item.images.length > 0) {
      images = item.images;
    }

    // 타입별 이름 필드 매핑 (백엔드 DTO 기준)
    const getName = () => {
      switch (tab) {
        case 'wedding-hall':
          return item.name;  // WeddingHallResponse.name
        case 'dress-shop':
        case 'makeup-shop':
          return item.shopName;  // DressShopResponse.shopName, MakeupShopResponse.shopName
        case 'dress':
          return item.name;  // DressResponse.name
        case 'hall':
          return item.name;  // HallResponse.name
        default:
          return item.name || item.shopName;
      }
    };

    return {
      id: item.id,
      title: getName() || "정보 없음",
      phone: item.phone || "",
      description: item.description || "",
      address: item.address || "",
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
      // 홀 관련 필드
      capacityMin: item.capacityMin,
      capacityMax: item.capacityMax,
      hallType: item.hallType,
      lightType: item.lightType,
      ceilingHeight: item.ceilingHeight,
      areaM2: item.areaM2,
      floorNo: item.floorNo,
      stage: item.stage,
      ledWall: item.ledWall,
      aisleLength: item.aisleLength,
      pillar: item.pillar,
      desc: item.desc,
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
                {tab === 'hall' ? '홀소개' : '가게소개'}
              </p>
              <p className="body-2 text-on-surface flex-1">
                {itemData.description}
              </p>
            </div>
          )}

          {/* 홀 전용 정보 */}
          {tab === 'hall' && (
            <>
              {(itemData.capacityMin || itemData.capacityMax) && (
                <div className="flex gap-4 items-start w-full">
                  <p className="body-2-medium text-on-surface-subtle flex-shrink-0 w-[52px]">
                    수용인원
                  </p>
                  <p className="body-2 text-on-surface flex-1">
                    {itemData.capacityMin && itemData.capacityMax
                      ? `${itemData.capacityMin}~${itemData.capacityMax}명`
                      : itemData.capacityMax
                      ? `최대 ${itemData.capacityMax}명`
                      : `최소 ${itemData.capacityMin}명`}
                  </p>
                </div>
              )}
              {itemData.floorNo && (
                <div className="flex gap-4 items-start w-full">
                  <p className="body-2-medium text-on-surface-subtle flex-shrink-0 w-[52px]">
                    층수
                  </p>
                  <p className="body-2 text-on-surface flex-1">
                    {itemData.floorNo}층
                  </p>
                </div>
              )}
              {itemData.hallType && (
                <div className="flex gap-4 items-start w-full">
                  <p className="body-2-medium text-on-surface-subtle flex-shrink-0 w-[52px]">
                    홀타입
                  </p>
                  <p className="body-2 text-on-surface flex-1">
                    {itemData.hallType}
                  </p>
                </div>
              )}
              {itemData.lightType && (
                <div className="flex gap-4 items-start w-full">
                  <p className="body-2-medium text-on-surface-subtle flex-shrink-0 w-[52px]">
                    조명
                  </p>
                  <p className="body-2 text-on-surface flex-1">
                    {itemData.lightType}
                  </p>
                </div>
              )}
              {itemData.areaM2 && (
                <div className="flex gap-4 items-start w-full">
                  <p className="body-2-medium text-on-surface-subtle flex-shrink-0 w-[52px]">
                    면적
                  </p>
                  <p className="body-2 text-on-surface flex-1">
                    {itemData.areaM2}㎡
                  </p>
                </div>
              )}
              {itemData.ceilingHeight && (
                <div className="flex gap-4 items-start w-full">
                  <p className="body-2-medium text-on-surface-subtle flex-shrink-0 w-[52px]">
                    천장높이
                  </p>
                  <p className="body-2 text-on-surface flex-1">
                    {itemData.ceilingHeight}m
                  </p>
                </div>
              )}
              {itemData.aisleLength && (
                <div className="flex gap-4 items-start w-full">
                  <p className="body-2-medium text-on-surface-subtle flex-shrink-0 w-[52px]">
                    버진로드
                  </p>
                  <p className="body-2 text-on-surface flex-1">
                    {itemData.aisleLength}m
                  </p>
                </div>
              )}
              {(itemData.stage !== undefined || itemData.ledWall !== undefined || itemData.pillar !== undefined) && (
                <div className="flex gap-4 items-start w-full">
                  <p className="body-2-medium text-on-surface-subtle flex-shrink-0 w-[52px]">
                    시설
                  </p>
                  <p className="body-2 text-on-surface flex-1">
                    {[
                      itemData.stage && '무대',
                      itemData.ledWall && 'LED월',
                      itemData.pillar === false && '무기둥',
                    ].filter(Boolean).join(', ') || '-'}
                  </p>
                </div>
              )}
              {itemData.desc && (
                <div className="flex gap-4 items-start w-full">
                  <p className="body-2-medium text-on-surface-subtle flex-shrink-0 w-[52px]">
                    홀소개
                  </p>
                  <p className="body-2 text-on-surface flex-1">
                    {itemData.desc}
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* 웨딩홀일 때 홀 목록 표시 */}
        {tab === 'wedding-hall' && (
          <div className="flex flex-col gap-4 w-full mt-4">
            <h3 className="title-2 text-on-surface">보유 홀</h3>
            {weddingHallHallsLoading ? (
              <p className="body-2 text-on-surface-subtle">홀 목록 로딩 중...</p>
            ) : weddingHallHalls && weddingHallHalls.length > 0 ? (
              <HorizontalSlider gap={12} className="w-full -mx-6 px-6">
                {weddingHallHalls.map((hall: HallResponse) => (
                  <article
                    key={hall.id}
                    onClick={() => router.push(`/detail/${hall.id}?tab=hall`)}
                    className="flex flex-col min-w-[140px] w-[140px] md:min-w-[180px] md:w-[180px] lg:min-w-[220px] lg:w-[220px] items-start gap-2 flex-shrink-0 cursor-pointer"
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                  >
                    <div className="relative self-stretch w-full rounded aspect-[1.5] overflow-hidden">
                      <Image
                        src={getAssetPath(hall.imageUrl && hall.imageUrl.trim() ? hall.imageUrl : "/img/placeholder.jpg")}
                        alt={hall.name || "홀"}
                        width={220}
                        height={147}
                        className="object-cover w-full h-full"
                        draggable={false}
                        onDragStart={(e) => e.preventDefault()}
                      />
                    </div>
                    <div className="inline-flex flex-col items-start relative flex-[0_0_auto] w-full">
                      <h4 className="w-full mt-[-1.00px] body-2-medium font-[number:var(--body-2-medium-font-weight)] text-black text-[length:var(--body-2-medium-font-size)] tracking-[var(--body-2-medium-letter-spacing)] leading-[var(--body-2-medium-line-height)] relative truncate [font-style:var(--body-2-medium-font-style)]">
                        {hall.name || "홀"}
                      </h4>
                      <p className="w-full label-1-regular font-[number:var(--label-1-regular-font-weight)] text-on-surface-subtle text-[length:var(--label-1-regular-font-size)] tracking-[var(--label-1-regular-letter-spacing)] leading-[var(--label-1-regular-line-height)] relative truncate [font-style:var(--label-1-regular-font-style)]">
                        {hall.capacityMax ? `최대 ${hall.capacityMax}명` : hall.hallType || ""}
                      </p>
                    </div>
                  </article>
                ))}
              </HorizontalSlider>
            ) : (
              <p className="body-2 text-on-surface-subtle">등록된 홀이 없습니다.</p>
            )}
          </div>
        )}

        {/* 드레스샵일 때 드레스 목록 표시 */}
        {tab === 'dress-shop' && (
          <div className="flex flex-col gap-4 w-full mt-4">
            <h3 className="title-2 text-on-surface">보유 드레스</h3>
            {shopDressesLoading ? (
              <p className="body-2 text-on-surface-subtle">드레스 목록 로딩 중...</p>
            ) : shopDresses && shopDresses.length > 0 ? (
              <HorizontalSlider gap={12} className="w-full -mx-6 px-6">
                {shopDresses.map((dress: DressResponse) => (
                  <article
                    key={dress.id}
                    onClick={() => router.push(`/detail/${dress.id}?tab=dress`)}
                    className="flex flex-col min-w-[140px] w-[140px] md:min-w-[180px] md:w-[180px] lg:min-w-[220px] lg:w-[220px] items-start gap-2 flex-shrink-0 cursor-pointer"
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                  >
                    <div className="relative self-stretch w-full rounded aspect-[1.5] overflow-hidden">
                      <Image
                        src={getAssetPath(dress.imageUrl || "/img/placeholder.jpg")}
                        alt={dress.name || "드레스"}
                        width={220}
                        height={147}
                        className="object-cover w-full h-full"
                        draggable={false}
                        onDragStart={(e) => e.preventDefault()}
                      />
                    </div>
                    <div className="inline-flex flex-col items-start relative flex-[0_0_auto] w-full">
                      <h4 className="w-full mt-[-1.00px] body-2-medium font-[number:var(--body-2-medium-font-weight)] text-black text-[length:var(--body-2-medium-font-size)] tracking-[var(--body-2-medium-letter-spacing)] leading-[var(--body-2-medium-line-height)] relative truncate [font-style:var(--body-2-medium-font-style)]">
                        {dress.name || "드레스"}
                      </h4>
                      <p className="w-full label-1-regular font-[number:var(--label-1-regular-font-weight)] text-on-surface-subtle text-[length:var(--label-1-regular-font-size)] tracking-[var(--label-1-regular-letter-spacing)] leading-[var(--label-1-regular-line-height)] relative truncate [font-style:var(--label-1-regular-font-style)]">
                        {dress.type || dress.priceRange || ""}
                      </p>
                    </div>
                  </article>
                ))}
              </HorizontalSlider>
            ) : (
              <p className="body-2 text-on-surface-subtle">등록된 드레스가 없습니다.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
