"use client";

import React from "react";
import { Header } from "../components/common/Header";
import { BottomNavigation } from "../components/common/BottomNavigation";
import { OptionsSection } from "../components/recommend/OptionsSection";

export default function RecommendPage() {
  return (
    <div
      className="flex flex-col w-[375px] items-start relative bg-white mx-auto"
      data-model-id="3:14535"
    >
      <Header />
      <OptionsSection />
      <BottomNavigation />
    </div>
  );
}
