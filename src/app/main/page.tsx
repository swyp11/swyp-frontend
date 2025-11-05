"use client";

import React from "react";
import { useNavigation } from "../../contexts/NavigationContext";
import { NavigationTabSection } from "../../components/main/NavigationTabSection";
import { FeaturedItemsSection } from "../../components/main/FeaturedItemsSection";
import { MainContentSection } from "../../components/main/MainContentSection";
import { RecommendationSection } from "../../components/main/RecommendationSection";

export default function MainPage() {
  return (
    <>
      <NavigationTabSection />
      <FeaturedItemsSection />
      <MainContentSection />
      <RecommendationSection />
    </>
  );
}
