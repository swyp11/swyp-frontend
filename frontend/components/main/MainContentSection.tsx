"use client";

import React from "react";
import Image from "next/image";

export const MainContentSection = () => {
  return (
    <section className="flex flex-col items-start gap-2.5 pt-2 pb-0 px-4 relative self-stretch w-full flex-[0_0_auto]">
      <article className="flex items-center gap-6 px-5 py-4 relative self-stretch w-full flex-[0_0_auto] bg-primary rounded-xl overflow-hidden">
        <div className="flex flex-col items-start gap-1 relative flex-1 grow">
          <h2 className="w-fit mt-[-1.00px] body-1 font-[number:var(--body-1-font-weight)] text-on-primary text-[length:var(--body-1-font-size)] tracking-[var(--body-1-letter-spacing)] leading-[var(--body-1-line-height)] whitespace-nowrap relative flex items-center justify-center [font-style:var(--body-1-font-style)]">
            드레스 추천받기
          </h2>

          <p className="self-stretch body-3 font-[number:var(--body-3-font-weight)] text-on-primary text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)] relative flex items-center justify-center [font-style:var(--body-3-font-style)]">
            체형 데이터를 기반으로 가장 <br />
            잘 어울리는 드레스를 추천해드려요.
          </p>
        </div>

        <div className="flex w-[50px] h-[50px] items-center justify-center gap-2.5 relative bg-surface-1 rounded-[999px] overflow-hidden aspect-[1]">
          <Image
            className="relative w-[50px] h-[50px] mix-blend-multiply object-cover"
            alt="드레스 추천 아이콘"
            src="/img/rectangle-9.png"
            width={50}
            height={50}
          />
        </div>
      </article>
    </section>
  );
};
