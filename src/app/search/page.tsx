"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { getAssetPath } from "@/utils/assetPath";
import { SearchInput } from "@/components/ui";
import { NavigationTabSection } from "@/components/main/NavigationTabSection";

function SearchResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const tab = searchParams.get("tab") || "wedding-hall";

  const [searchQuery, setSearchQuery] = useState(query);
  const [activeTab, setActiveTab] = useState(tab);
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setSearchQuery(query);
    setActiveTab(tab);
    // TODO: Fetch search results from API
    // For now, showing empty results
    setIsLoading(false);
    setResults([]);
  }, [query, tab]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}&tab=${activeTab}`);
    }
  };

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    router.push(`/search?q=${encodeURIComponent(searchQuery)}&tab=${newTab}`);
  };

  const handleResultClick = (id: number) => {
    router.push(`/detail/${id}?tab=${activeTab}`);
  };

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
        <h1 className="body-3-bold text-on-surface">업체찾기</h1>
        <div className="flex items-center justify-center gap-2.5 px-4 py-0 opacity-0">
          <Image
            src={getAssetPath("/img/arrow_back.svg")}
            alt=""
            width={24}
            height={24}
          />
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col items-end gap-2.5 p-4">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          onSearch={handleSearch}
          placeholder="검색어를 입력해보세요."
          className="w-full"
        />
      </div>

      {/* Navigation Tabs */}
      <NavigationTabSection activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Search Results */}
      <div className="flex-1 bg-white flex flex-col items-center justify-center gap-3 p-6">
        {isLoading ? (
          <p className="body-2 text-on-surface-subtle">검색 중...</p>
        ) : results.length === 0 ? (
          <>
            <div className="w-6 h-6">
              <Image
                src={getAssetPath("/img/search.svg")}
                alt="검색"
                width={24}
                height={24}
                className="text-on-surface-subtle"
              />
            </div>
            <div className="flex flex-col items-center gap-0.5 text-center">
              <p className="body-1-medium text-on-surface-subtle">
                검색결과 없음
              </p>
              <p className="body-2 text-on-surface-subtle">
                검색 옵션을 변경해서 다시 검색해 보세요.
              </p>
            </div>
          </>
        ) : (
          <div className="w-full px-4">
            <div className="mb-4">
              <p className="body-2-medium text-on-surface">
                '{query}' 검색 결과 {results.length}개
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result.id)}
                  className="flex flex-col gap-2 text-left"
                >
                  <div className="aspect-[3/2] relative rounded bg-surface-2 overflow-hidden">
                    <Image
                      src={getAssetPath(result.image)}
                      alt={result.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="body-2-medium text-on-surface truncate">
                      {result.title}
                    </p>
                    <p className="label-1-regular text-on-surface-subtle truncate">
                      {result.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
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
