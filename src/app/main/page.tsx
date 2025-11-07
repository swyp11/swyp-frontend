"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FeaturedItemsSection } from "../../components/main/FeaturedItemsSection";
import { NavigationTabSection } from "../../components/main/NavigationTabSection";
import { MainContentSection } from "../../components/main/MainContentSection";
import { RecommendationSection } from "../../components/main/RecommendationSection";

export default function MainPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("wedding-hall");
  const [searchQuery, setSearchQuery] = useState("");

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
      <NavigationTabSection activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Recommendation Banner */}
      {activeTab === "dress" && <MainContentSection />}

      {/* Content Sections */}
      <RecommendationSection activeTab={activeTab} />
    </>
  );
}
