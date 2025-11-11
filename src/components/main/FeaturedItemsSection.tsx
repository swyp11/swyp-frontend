"use client";

import React from "react";
import { SearchInput } from "../ui";

interface FeaturedItemsSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
}

export const FeaturedItemsSection = ({
  searchQuery,
  onSearchChange,
  onSearch,
}: FeaturedItemsSectionProps) => {
  return (
    <section className="flex flex-col items-start gap-2.5 p-4 relative self-stretch w-full">
      <SearchInput
        value={searchQuery}
        onChange={onSearchChange}
        onSearch={onSearch}
        placeholder="검색어를 입력해보세요."
        className="w-full"
      />
    </section>
  );
};
