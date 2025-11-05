"use client";

import React from "react";
import Image from "next/image";
import { HorizontalSlider } from "../common/HorizontalSlider";

interface ShopCard {
  image: string;
  title: string;
  description: string;
}

export const RecommendationSection = () => {
  const popularShops: ShopCard[] = [
    {
      image: "/img/frame-482543-1.png",
      title: "아펠가모 광화문점",
      description: "서울시 종로구",
    },
    {
      image: "/img/frame-482543-1.png",
      title: "규수당 문래점",
      description: "서울시 영등포구",
    },
    {
      image: "/img/frame-482543-2.png",
      title: "루벨 강동",
      description: "서울시 강동구",
    },
    {
      image: "/img/frame-482543-2.png",
      title: "추가 샵 1",
      description: "서울시 강남구",
    },
    {
      image: "/img/frame-482543-1.png",
      title: "추가 샵 2",
      description: "서울시 송파구",
    },
  ];

  const seoulShops: ShopCard[] = [
    {
      image: "/img/frame-482543-4.png",
      title: "제목",
      description: "설명",
    },
    {
      image: "/img/frame-482543-4.png",
      title: "제목",
      description: "설명",
    },
    {
      image: "/img/frame-482543-5.png",
      title: "제목",
      description: "설명",
    },
    {
      image: "/img/frame-482543-4.png",
      title: "제목 4",
      description: "설명 4",
    },
    {
      image: "/img/frame-482543-5.png",
      title: "제목 5",
      description: "설명 5",
    },
  ];

  const hotelWeddingHalls: ShopCard[] = [
    {
      image: "/img/frame-482543-8.png",
      title: "제목",
      description: "설명",
    },
    {
      image: "/img/frame-482543-8.png",
      title: "제목",
      description: "설명",
    },
    {
      image: "/img/frame-482543-8.png",
      title: "제목",
      description: "설명",
    },
    {
      image: "/img/frame-482543-8.png",
      title: "제목 4",
      description: "설명 4",
    },
    {
      image: "/img/frame-482543-8.png",
      title: "제목 5",
      description: "설명 5",
    },
  ];

  const renderShopCard = (shop: ShopCard, index: number) => (
    <article
      key={index}
      className="flex flex-col min-w-[140px] w-[140px] md:min-w-[180px] md:w-[180px] lg:min-w-[220px] lg:w-[220px] items-start gap-2 flex-shrink-0"
      draggable={false}
      onDragStart={(e) => e.preventDefault()}
    >
      <div className="relative self-stretch w-full rounded aspect-[1.5] overflow-hidden">
        <Image
          src={shop.image}
          alt={shop.title}
          width={220}
          height={147}
          className="object-cover w-full h-full"
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
        />
      </div>
      <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
        <h3 className="w-fit mt-[-1.00px] body-2-medium font-[number:var(--body-2-medium-font-weight)] text-black text-[length:var(--body-2-medium-font-size)] tracking-[var(--body-2-medium-letter-spacing)] leading-[var(--body-2-medium-line-height)] whitespace-nowrap relative flex items-center justify-center [font-style:var(--body-2-medium-font-style)]">
          {shop.title}
        </h3>
        <p className="w-fit label-1-regular font-[number:var(--label-1-regular-font-weight)] text-on-surface-subtle text-[length:var(--label-1-regular-font-size)] tracking-[var(--label-1-regular-letter-spacing)] leading-[var(--label-1-regular-line-height)] whitespace-nowrap relative flex items-center justify-center [font-style:var(--label-1-regular-font-style)]">
          {shop.description}
        </p>
      </div>
    </article>
  );

  return (
    <section className="flex flex-col items-start gap-10 px-4 py-6 relative self-stretch w-full bg-white">
      {/* 인기있는 드레스샵 */}
      <div className="flex flex-col items-start gap-4 w-full">
        <h2 className="w-fit mt-[-1.00px] title-2 font-[number:var(--title-2-font-weight)] text-black text-[length:var(--title-2-font-size)] tracking-[var(--title-2-letter-spacing)] leading-[var(--title-2-line-height)] whitespace-nowrap relative flex items-center justify-center [font-style:var(--title-2-font-style)]">
          지금 인기있는 드레스샵
        </h2>
        <HorizontalSlider gap={12} className="w-full px-0 py-1">
          {popularShops.map((shop, index) => renderShopCard(shop, index))}
        </HorizontalSlider>
      </div>

      {/* 서울시 소재 드레스샵 */}
      <div className="flex flex-col items-start gap-4 w-full">
        <h2 className="w-fit mt-[-1.00px] title-2 font-[number:var(--title-2-font-weight)] text-black text-[length:var(--title-2-font-size)] tracking-[var(--title-2-letter-spacing)] leading-[var(--title-2-line-height)] whitespace-nowrap relative flex items-center justify-center [font-style:var(--title-2-font-style)]">
          서울시 소재 드레스샵
        </h2>
        <HorizontalSlider gap={12} className="w-full px-0 py-1">
          {seoulShops.map((shop, index) => renderShopCard(shop, index))}
        </HorizontalSlider>
      </div>

      {/* 호텔 웨딩홀 */}
      <div className="flex flex-col items-start gap-3 w-full">
        <h2 className="w-fit mt-[-1.00px] m3-body-medium-emphasized font-[number:var(--m3-body-medium-emphasized-font-weight)] text-black text-[length:var(--m3-body-medium-emphasized-font-size)] tracking-[var(--m3-body-medium-emphasized-letter-spacing)] leading-[var(--m3-body-medium-emphasized-line-height)] whitespace-nowrap relative flex items-center justify-center [font-style:var(--m3-body-medium-emphasized-font-style)]">
          호텔 웨딩홀
        </h2>
        <HorizontalSlider gap={12} className="w-full px-0 py-1">
          {hotelWeddingHalls.map((shop, index) => renderShopCard(shop, index))}
        </HorizontalSlider>
      </div>
    </section>
  );
};
