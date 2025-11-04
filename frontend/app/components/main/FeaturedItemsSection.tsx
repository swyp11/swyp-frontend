"use client";

import React, { useState } from "react";
import Image from "next/image";

export const FeaturedItemsSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedParkingOption, setSelectedParkingOption] = useState("");

  return (
    <section className="flex flex-col items-start gap-2.5 p-4 relative self-stretch w-full flex-[0_0_auto]">
      <div className="flex w-[343px] h-12 items-center gap-2.5 px-3 py-2 relative bg-white rounded-lg overflow-hidden border border-solid border-color-border-default-default">
        <Image
          className="relative w-6 h-6"
          alt="Search"
          src="/img/search.svg"
          width={24}
          height={24}
        />

        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="검색어를 입력해보세요."
          className="font-body-2 font-[number:var(--body-2-font-weight)] text-on-surface-subtlest text-[length:var(--body-2-font-size)] leading-[var(--body-2-line-height)] relative flex items-center justify-center w-full tracking-[var(--body-2-letter-spacing)] [font-style:var(--body-2-font-style)] placeholder:text-on-surface-subtlest"
          aria-label="검색어를 입력해보세요"
        />
      </div>

      <div className="inline-flex items-start gap-2 relative flex-[0_0_auto]">
        <button
          type="button"
          onClick={() => setSelectedRegion(selectedRegion ? "" : "selected")}
          className="inline-flex items-center justify-center pl-4 pr-2 py-2 relative flex-[0_0_auto] bg-surface-2 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
          aria-label="지역 선택"
          aria-expanded="false"
        >
          <span className="w-fit font-m3-body-medium-emphasized font-[number:var(--m3-body-medium-emphasized-font-weight)] text-on-surface-subtle text-[length:var(--m3-body-medium-emphasized-font-size)] tracking-[var(--m3-body-medium-emphasized-letter-spacing)] leading-[var(--m3-body-medium-emphasized-line-height)] whitespace-nowrap relative flex items-center justify-center [font-style:var(--m3-body-medium-emphasized-font-style)]">
            지역
          </span>

          <Image
            className="relative w-6 h-6 aspect-[1]"
            alt=""
            src="/img/keyboard-arrow-down-1.svg"
            width={24}
            height={24}
            aria-hidden="true"
          />
        </button>

        <button
          type="button"
          onClick={() =>
            setSelectedParkingOption(selectedParkingOption ? "" : "selected")
          }
          className="inline-flex items-center justify-center pl-4 pr-2 py-2 relative flex-[0_0_auto] bg-surface-2 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
          aria-label="주차가능여부 선택"
          aria-expanded="false"
        >
          <span className="w-fit font-m3-body-medium-emphasized font-[number:var(--m3-body-medium-emphasized-font-weight)] text-on-surface-subtle text-[length:var(--m3-body-medium-emphasized-font-size)] tracking-[var(--m3-body-medium-emphasized-letter-spacing)] leading-[var(--m3-body-medium-emphasized-line-height)] whitespace-nowrap relative flex items-center justify-center [font-style:var(--m3-body-medium-emphasized-font-style)]">
            주차가능여부
          </span>

          <Image
            className="relative w-6 h-6 aspect-[1]"
            alt=""
            src="/img/keyboard-arrow-down-1.svg"
            width={24}
            height={24}
            aria-hidden="true"
          />
        </button>
      </div>
    </section>
  );
};
