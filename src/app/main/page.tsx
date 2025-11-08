"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FeaturedItemsSection } from "../../components/main/FeaturedItemsSection";
import { NavigationTabSection } from "../../components/main/NavigationTabSection";
import { MainContentSection } from "../../components/main/MainContentSection";
import { RecommendationSection } from "../../components/main/RecommendationSection";

function MainPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // URL에서 초기 탭 읽어오기 (깜빡임 방지)
  const initialTab = searchParams.get('tab') || "wedding-hall";
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [searchQuery, setSearchQuery] = useState("");

  // URL에서 탭 정보 읽어오기
  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl && tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    // URL에 탭 정보 반영
    router.push(`/main?tab=${newTab}`, { scroll: false });
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}&tab=${activeTab}`);
    }
  };

  return (
    <>
      {/* Search Bar Section */}
      <FeaturedItemsSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearch={handleSearch}
      />

      {/* Navigation Tabs */}
      <NavigationTabSection activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Recommendation Banner */}
      {activeTab === "dress" && <MainContentSection />}

      {/* Content Sections */}
      <RecommendationSection activeTab={activeTab} />
    </>
  );
}

export default function MainPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainPageContent />
    </Suspense>
  );
}
