"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui";
import { getAssetPath } from "@/utils/assetPath";
import type { RecommendResponse } from "@/app/api/recommend/route";

// Translation mapping for English to Korean
const translationMap: Record<string, string> = {
  // Body types
  "thin": "마른",
  "medium": "보통",
  "heavy": "통통한",

  // Lengths
  "short": "짧은",
  "long": "긴",

  // Face shapes
  "oval": "달걀형",
  "round": "넓은",
  "square": "각진",
  "heart": "하트형",
  "oblong": "긴",

  // Style names
  "A-Line": "A라인",
  "Ball Gown": "볼가운",
  "Mermaid": "머메이드",
  "Trumpet": "트럼펫",
  "Sheath": "시스",
  "Empire": "엠파이어",
  "Tea-Length": "티 렝스",
  "High-Low": "하이로우",

  // Body parts
  "팔": "팔",
  "다리": "다리",
  "목": "목",
  "얼굴형": "얼굴형",
  "체형": "체형",
};

// Replace English words in text with Korean equivalents
const translateText = (text: string): string => {
  let translatedText = text;

  // Replace each English word with its Korean equivalent
  Object.entries(translationMap).forEach(([english, korean]) => {
    // Use word boundary to match whole words only
    const regex = new RegExp(`\\b${english}\\b`, 'gi');
    translatedText = translatedText.replace(regex, korean);
  });

  return translatedText;
};

export default function RecommendResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<RecommendResponse | null>(null);

  useEffect(() => {
    // Load result from sessionStorage
    const storedResult = sessionStorage.getItem("recommendResult");
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    } else {
      // No result found, redirect back to recommend page
      router.push("/recommend");
    }
  }, [router]);

  if (!result || !result.recommendations || result.recommendations.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <p className="text-on-surface">로딩 중...</p>
      </div>
    );
  }

  // Only show the first recommendation
  const recommendation = result.recommendations[0];

  const handleRetry = () => {
    // Clear stored result and go back to form
    sessionStorage.removeItem("recommendResult");
    router.push("/recommend");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col items-start bg-white">
      {/* Back Header */}
      <header className="flex items-center gap-2.5 p-4 relative w-full bg-white">
        <button
          onClick={handleBack}
          className="w-6 h-6 flex items-center justify-center"
          aria-label="뒤로가기"
        >
          <Image
            className="relative w-6 h-6"
            alt=""
            src={getAssetPath("/img/arrow_back.svg")}
            width={24}
            height={24}
          />
        </button>
        <h2 className="title-1 font-[number:var(--title-1-font-weight)] text-on-surface text-[length:var(--title-1-font-size)] tracking-[var(--title-1-letter-spacing)] leading-[var(--title-1-line-height)] [font-style:var(--title-1-font-style)]">
          추천 결과
        </h2>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center gap-6 px-4 py-8 w-full pb-8">
        {/* Style Name */}
        <h1 className="title-2 font-[number:var(--title-2-font-weight)] text-on-surface text-[length:var(--title-2-font-size)] tracking-[var(--title-2-letter-spacing)] leading-[var(--title-2-line-height)] text-center [font-style:var(--title-2-font-style)]">
          &quot;{translateText(recommendation.style_name)}&quot;
        </h1>

        {/* Image Placeholder */}
        <div className="relative w-[260px] h-[360px] rounded-3xl border border-[#dfdfdf] overflow-hidden bg-surface-2">
          {/* This would be replaced with actual dress images */}
          <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-surface-2 to-surface-1">
            <p className="text-on-surface-subtle text-sm">드레스 이미지</p>
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1 w-full max-w-md">
          <p className="body-3 font-[number:var(--body-3-font-weight)] text-on-surface-subtle text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)] text-center [font-style:var(--body-3-font-style)]">
            {translateText(recommendation.why_recommended)}
          </p>
          <p className="body-3 font-[number:var(--body-3-font-weight)] text-on-surface-subtle text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)] text-center [font-style:var(--body-3-font-style)] mt-2">
            {translateText(recommendation.description)}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 w-full max-w-md mt-8">
          {/* <Button variant="primary" onClick={handleSearchStyle} className="w-full">
            &quot;{recommendation.style_name}&quot; 더 보러가기
          </Button> */}
          <Button variant="tertiary" onClick={handleRetry} className="w-full">
            다시하기
          </Button>
        </div>
      </div>
    </div>
  );
}
