"use client";

import React, { useState } from "react";
import { SearchInput, Button } from "../ui";

export const FeaturedItemsSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedParkingOption, setSelectedParkingOption] = useState("");

  return (
    <section className="flex flex-col items-start gap-2.5 p-4 relative self-stretch w-full flex-[0_0_auto]">
      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="검색어를 입력해보세요."
        className="w-full max-w-[343px] md:max-w-full"
      />

      <div className="inline-flex items-start gap-2 relative flex-[0_0_auto]">
        <Button
          variant="filter"
          selected={!!selectedRegion}
          onClick={() => setSelectedRegion(selectedRegion ? "" : "selected")}
          ariaLabel="지역 선택"
        >
          지역
        </Button>

        <Button
          variant="filter"
          selected={!!selectedParkingOption}
          onClick={() => setSelectedParkingOption(selectedParkingOption ? "" : "selected")}
          ariaLabel="주차가능여부 선택"
        >
          주차가능여부
        </Button>
      </div>
    </section>
  );
};
