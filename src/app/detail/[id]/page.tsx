"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import Image from "next/image";
import { getAssetPath } from "@/utils/assetPath";

export default function DetailPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const tab = searchParams.get("tab") || "wedding-hall";

  const [itemData, setItemData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchItemDetails();
  }, [id, tab]);

  const fetchItemDetails = async () => {
    setIsLoading(true);
    try {
      let apiEndpoint = '';

      switch (tab) {
        case 'wedding-hall':
          apiEndpoint = `/api/weddinghole/${id}`;
          break;
        case 'dress-shop':
          apiEndpoint = `/api/dressshop/${id}`;
          break;
        case 'makeup-shop':
          apiEndpoint = `/api/makeupshop/${id}`;
          break;
        case 'dress':
          apiEndpoint = `/api/dressshop/${id}`;
          break;
        default:
          apiEndpoint = `/api/weddinghole/${id}`;
      }

      const response = await fetch(apiEndpoint);
      const result = await response.json();

      if (result.success && result.data) {
        const item = result.data;

        // Use images from API response (proxy API handles fallback images)
        let images = ["/img/placeholder.jpg"]; // Default image

        if (item.images && Array.isArray(item.images) && item.images.length > 0) {
          images = item.images;
        } else if (item.image || item.imageUrl || item.thumbnail) {
          images = [item.image || item.imageUrl || item.thumbnail];
        }

        setItemData({
          id: item.id,
          title: item.shopName || item.hallName || item.dressName || item.title || "업체명",
          phone: item.phone || "전화번호 없음",
          description: item.description || item.features || "소개 정보 없음",
          address: item.address || "주소 정보 없음",
          specialty: item.specialty || "",
          features: item.features || "",
          snsUrl: item.snsUrl || "",
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
        });
      } else {
        setItemData(null);
      }
    } catch (error) {
      console.error('Error fetching item details:', error);
      setItemData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    // TODO: Update favorite status in backend
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
    <div
      className="bg-white flex flex-col min-h-screen mx-auto"
      style={{ width: "var(--app-width)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-0 py-3 relative">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center gap-2.5 px-4 py-0"
          aria-label="뒤로 가기"
        >
          <Image
            src={getAssetPath("/img/arrow_back.svg")}
            alt="뒤로 가기"
            width={24}
            height={24}
          />
        </button>
        <h1 className="body-3-bold text-on-surface">{itemData.title}</h1>
        <div className="flex items-center justify-center gap-2.5 px-4 py-0 opacity-0">
          <Image
            src={getAssetPath("/img/arrow_back.svg")}
            alt=""
            width={24}
            height={24}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-white flex flex-col gap-6 p-6 overflow-y-auto">
        {/* Image Gallery - Horizontal Scroll */}
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

        {/* Title & Favorite */}
        <div className="flex items-center justify-center gap-2.5 w-full">
          <h2 className="title-1 text-on-surface flex-1">{itemData.title}</h2>
          <button
            onClick={handleFavoriteToggle}
            className="flex items-center gap-2.5 p-2"
            aria-label={isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
          >
            <Image
              src={getAssetPath(
                isFavorite ? "/img/favorite_color.svg" : "/img/favorite_border.svg"
              )}
              alt="즐겨찾기"
              width={24}
              height={24}
            />
          </button>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-2 w-full">
          {/* Address */}
          {itemData.address && (
            <div className="flex gap-4 items-start w-full">
              <p className="body-2-medium text-on-surface-subtle flex-shrink-0">
                주소
              </p>
              <p className="body-2 text-on-surface flex-1">
                {itemData.address}
              </p>
            </div>
          )}

          {/* Phone */}
          {itemData.phone && (
            <div className="flex gap-4 items-center">
              <p className="body-2-medium text-on-surface-subtle flex-shrink-0">
                전화번호
              </p>
              <a
                href={`tel:${itemData.phone}`}
                className="body-2 text-[#3190ff] flex items-center gap-1.5"
              >
                {itemData.phone}
              </a>
            </div>
          )}

          {/* SNS URL */}
          {itemData.snsUrl && (
            <div className="flex gap-4 items-center">
              <p className="body-2-medium text-on-surface-subtle flex-shrink-0">
                SNS
              </p>
              <a
                href={itemData.snsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="body-2 text-[#3190ff] flex items-center gap-1.5"
              >
                {itemData.snsUrl}
              </a>
            </div>
          )}

          {/* Specialty */}
          {itemData.specialty && (
            <div className="flex gap-4 items-start w-full">
              <p className="body-2-medium text-on-surface-subtle flex-shrink-0">
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
              <p className="body-2-medium text-on-surface-subtle flex-shrink-0">
                특징
              </p>
              <p className="body-2 text-on-surface flex-1">
                {itemData.features}
              </p>
            </div>
          )}

          {/* Description */}
          {itemData.description && (
            <div className="flex gap-4 items-start w-full">
              <p className="body-2-medium text-on-surface-subtle flex-shrink-0">
                소개
              </p>
              <p className="body-2 text-on-surface flex-1">
                {itemData.description}
              </p>
            </div>
          )}

          {/* Business Hours */}
          {itemData.businessHours && (
            <div className="flex gap-4 items-start w-full">
              <p className="body-2-medium text-on-surface-subtle flex-shrink-0">
                영업시간
              </p>
              <div className="flex flex-col body-2 text-on-surface flex-1">
                {itemData.businessHours.map((hours: any, index: number) => (
                  <p key={index} className="whitespace-nowrap">
                    {hours.day}: {hours.time}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
