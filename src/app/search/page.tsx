"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { getAssetPath } from "@/utils/assetPath";
import { BackHeader } from "@/components/common/BackHeader";
import { SearchInput } from "@/components/ui";
import { NavigationTabSection } from "@/components/main/NavigationTabSection";
import { useDressList } from "@/hooks/useDress";
import { useDressShopList, useMakeupShopList } from "@/hooks/useShops";
import { useWeddingHallList } from "@/hooks/useWeddingHall";

function SearchResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const tab = searchParams.get("tab") || "wedding-hall";

  const [searchQuery, setSearchQuery] = useState(query);
  const [activeTab, setActiveTab] = useState(tab);

  useEffect(() => {
    setSearchQuery(query);
    setActiveTab(tab);
  }, [query, tab]);

  // 탭에 따라 조건부로 API 호출
  const { data: weddingHalls, isLoading: weddingLoading } = useWeddingHallList(
    { sort: 'RECENT' },
    { enabled: activeTab === 'wedding-hall' }
  );

  const { data: dressShops, isLoading: dressShopLoading } = useDressShopList(
    { shopName: query, sort: 'RECENT' },
    { enabled: activeTab === 'dress-shop' && !!query }
  );

  const { data: makeupShops, isLoading: makeupLoading } = useMakeupShopList(
    { shopName: query, sort: 'RECENT' },
    { enabled: activeTab === 'makeup-shop' && !!query }
  );

  const { data: dresses, isLoading: dressLoading } = useDressList(
    { shopNameContains: query, sort: 'RECENT' },
    { enabled: activeTab === 'dress' && !!query }
  );

  // 현재 탭의 데이터 및 로딩 상태
  const getCurrentData = () => {
    switch (activeTab) {
      case 'wedding-hall':
        return { data: weddingHalls, isLoading: weddingLoading };
      case 'dress-shop':
        return { data: dressShops, isLoading: dressShopLoading };
      case 'makeup-shop':
        return { data: makeupShops, isLoading: makeupLoading };
      case 'dress':
        return { data: dresses, isLoading: dressLoading };
      default:
        return { data: [], isLoading: false };
    }
  };

  const { data: currentData, isLoading } = getCurrentData();

  // 데이터 포맷팅
  const results = (currentData || []).map((item: any) => {
    const image = item.image || item.imageUrl || item.thumbnail || '/img/placeholder.jpg';

    return {
      id: item.id,
      title: item.shopName || item.hallName || item.dressName || item.title,
      description: item.address || item.description,
      image,
    };
  });

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}&tab=${activeTab}`);
    }
  };

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    router.push(`/search?q=${encodeURIComponent(searchQuery)}&tab=${newTab}`, { scroll: false });
  };

  const handleResultClick = (id: number) => {
    router.push(`/detail/${id}?tab=${activeTab}`);
  };

  return (
    <>
      <BackHeader title="" />

      {/* 검색 입력 */}
      <div className="px-4 py-4 border-b border-[#f1f1f1]">
        <SearchInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearch={handleSearch}
          placeholder="검색어를 입력하세요"
        />
      </div>

      {/* 탭 네비게이션 */}
      <NavigationTabSection activeTab={activeTab} onTabChange={handleTabChange} />

      {/* 검색 결과 */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <p className="body-2 text-on-surface-subtle">검색 중...</p>
          </div>
        ) : results.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <p className="body-2 text-on-surface-subtle">
              {query ? "검색 결과가 없습니다." : "검색어를 입력해주세요."}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {results.map((result) => (
              <div
                key={result.id}
                onClick={() => handleResultClick(result.id)}
                className="flex items-center gap-4 cursor-pointer hover:bg-surface-1 p-3 rounded-lg transition-colors"
              >
                {/* 이미지 */}
                <div className="w-20 h-20 bg-surface-2 rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={getAssetPath(result.image)}
                    alt={result.title}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 정보 */}
                <div className="flex-1 min-w-0">
                  <h3 className="body-1-medium text-on-surface truncate mb-1">
                    {result.title}
                  </h3>
                  {result.description && (
                    <p className="label-1 text-on-surface-subtle truncate">
                      {result.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}
