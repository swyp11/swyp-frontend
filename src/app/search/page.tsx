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
import { useWeddingHallList, useWeddingHallSearch } from "@/hooks/useWeddingHall";

function SearchResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const tab = searchParams.get("tab") || "wedding-hall";
  const sort = searchParams.get("sort") || "RECENT";

  const [searchQuery, setSearchQuery] = useState(query);
  const [activeTab, setActiveTab] = useState(tab);
  const [sortOrder, setSortOrder] = useState<'FAVORITE' | 'RECENT'>(sort as 'FAVORITE' | 'RECENT');

  useEffect(() => {
    setSearchQuery(query);
    setActiveTab(tab);
    setSortOrder(sort as 'FAVORITE' | 'RECENT');
  }, [query, tab, sort]);

  // 탭에 따라 조건부로 API 호출
  // 웨딩홀: 검색어가 있으면 검색 API, 없으면 목록 API
  const { data: weddingHallsSearch, isLoading: weddingSearchLoading } = useWeddingHallSearch(
    query,
    { enabled: activeTab === 'wedding-hall' && query.trim().length > 0 }
  );

  const { data: weddingHallsList, isLoading: weddingListLoading } = useWeddingHallList(
    { sort: sortOrder },
    { enabled: activeTab === 'wedding-hall' && query.trim().length === 0 }
  );

  const weddingHalls = query.trim().length > 0 ? weddingHallsSearch : weddingHallsList;
  const weddingLoading = query.trim().length > 0 ? weddingSearchLoading : weddingListLoading;

  const { data: dressShops, isLoading: dressShopLoading } = useDressShopList(
    { shopName: query, sort: sortOrder },
    { enabled: activeTab === 'dress-shop' }
  );

  const { data: makeupShops, isLoading: makeupLoading } = useMakeupShopList(
    { shopName: query, sort: sortOrder },
    { enabled: activeTab === 'makeup-shop' }
  );

  const { data: dresses, isLoading: dressLoading } = useDressList(
    { shopNameContains: query, sort: sortOrder },
    { enabled: activeTab === 'dress' }
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
    const image = item.imageUrl || item.image || item.thumbnail || '/img/placeholder.jpg';
    const title = item.hallName || item.shopName || item.dressName || item.name || item.title || '업체명';
    const description = item.address || item.description || '';

    return {
      id: item.id,
      title,
      description,
      image,
    };
  });

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}&tab=${activeTab}&sort=${sortOrder}`);
    }
  };

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    router.replace(`/search?q=${encodeURIComponent(searchQuery)}&tab=${newTab}&sort=${sortOrder}`, { scroll: false });
  };

  const handleResultClick = (id: number) => {
    router.push(`/detail/${id}?tab=${activeTab}`);
  };

  const handleSortChange = (newSort: 'FAVORITE' | 'RECENT') => {
    setSortOrder(newSort);
    router.replace(`/search?q=${encodeURIComponent(searchQuery)}&tab=${activeTab}&sort=${newSort}`, { scroll: false });
  };

  return (
    <div className="flex flex-col h-screen">
      <BackHeader title="업체 찾기" />

      {/* 검색 입력 */}
      <div className="px-4 py-4 border-b border-subtlest">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          onSearch={handleSearch}
          placeholder="검색어를 입력하세요"
        />
      </div>

      {/* 탭 네비게이션 */}
      <NavigationTabSection activeTab={activeTab} onTabChange={handleTabChange} />

      {/* 정렬 드롭다운 */}
      <div className="flex items-center justify-end px-4 py-1">
        <div className="flex items-center cursor-pointer relative">
          <select
            value={sortOrder}
            onChange={(e) => handleSortChange(e.target.value as 'FAVORITE' | 'RECENT')}
            className="body-2-medium text-on-surface-subtle bg-transparent border-none outline-none cursor-pointer appearance-none pr-6"
          >
            <option value="FAVORITE">인기순</option>
            <option value="RECENT">최신순</option>
          </select>
          <Image
            src={getAssetPath("/img/keyboard-arrow-down.svg")}
            alt=""
            width={24}
            height={24}
            className="w-6 h-6 absolute right-0 pointer-events-none"
          />
        </div>
      </div>

      {/* 검색 결과 - 2열 그리드 (스크롤 영역) */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
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
          <div className="grid grid-cols-2 gap-x-3 gap-y-8">
            {results.map((result) => (
              <article
                key={result.id}
                onClick={() => handleResultClick(result.id)}
                className="flex flex-col gap-2 cursor-pointer"
              >
                {/* 이미지 */}
                <div className="relative w-full rounded aspect-[1.5] overflow-hidden bg-surface-2">
                  <Image
                    src={getAssetPath(result.image)}
                    alt={result.title}
                    width={180}
                    height={120}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 정보 */}
                <div className="flex flex-col gap-0.5">
                  <h3 className="body-2-medium text-on-surface truncate">
                    {result.title}
                  </h3>
                  {result.description && (
                    <p className="label-1-regular text-on-surface-subtle truncate">
                      {result.description}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}
