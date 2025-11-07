"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui";
import type { RecommendResponse } from "@/app/api/recommend/route";

export default function RecommendResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<RecommendResponse | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const currentRecommendation = result.recommendations[currentIndex];

  const handleSearchStyle = () => {
    // Navigate to dress search with style name
    router.push(`/dresshop?search=${encodeURIComponent(currentRecommendation.style_name)}`);
  };

  const handleRetry = () => {
    // Clear stored result and go back to form
    sessionStorage.removeItem("recommendResult");
    router.push("/recommend");
  };

  const handleNext = () => {
    if (currentIndex < result.recommendations.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="flex flex-col items-start min-h-screen bg-white">
      {/* Main Content */}
      <div className="flex flex-col items-center gap-6 px-4 py-8 w-full">
        {/* Navigation Dots */}
        {result.recommendations.length > 1 && (
          <div className="flex gap-2 mb-4">
            {result.recommendations.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? "bg-primary w-6" : "bg-surface-2"
                }`}
                aria-label={`추천 ${index + 1}번으로 이동`}
              />
            ))}
          </div>
        )}

        {/* Style Name */}
        <h1 className="title-2 font-[number:var(--title-2-font-weight)] text-on-surface text-[length:var(--title-2-font-size)] tracking-[var(--title-2-letter-spacing)] leading-[var(--title-2-line-height)] text-center [font-style:var(--title-2-font-style)]">
          &quot;{currentRecommendation.style_name}&quot;
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
            {currentRecommendation.why_recommended}
          </p>
          <p className="body-3 font-[number:var(--body-3-font-weight)] text-on-surface-subtle text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)] text-center [font-style:var(--body-3-font-style)] mt-2">
            {currentRecommendation.description}
          </p>
        </div>

        {/* Styling Tips */}
        {currentRecommendation.styling_tips && currentRecommendation.styling_tips.length > 0 && (
          <div className="flex flex-col gap-2 w-full max-w-md mt-4">
            <h3 className="body-2-medium font-[number:var(--body-2-medium-font-weight)] text-on-surface text-[length:var(--body-2-medium-font-size)] tracking-[var(--body-2-medium-letter-spacing)] leading-[var(--body-2-medium-line-height)] [font-style:var(--body-2-medium-font-style)]">
              스타일링 팁
            </h3>
            <ul className="list-disc list-inside space-y-1">
              {currentRecommendation.styling_tips.map((tip, index) => (
                <li
                  key={index}
                  className="body-3 font-[number:var(--body-3-font-weight)] text-on-surface-subtle text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)] [font-style:var(--body-3-font-style)]"
                >
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Navigation Buttons */}
        {result.recommendations.length > 1 && (
          <div className="flex gap-2 mt-4">
            <Button
              variant="secondary"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="w-24"
            >
              이전
            </Button>
            <Button
              variant="secondary"
              onClick={handleNext}
              disabled={currentIndex === result.recommendations.length - 1}
              className="w-24"
            >
              다음
            </Button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 w-full max-w-md mt-8">
          <Button variant="primary" onClick={handleSearchStyle} className="w-full">
            &quot;{currentRecommendation.style_name}&quot; 더 보러가기
          </Button>
          <Button variant="tertiary" onClick={handleRetry} className="w-full">
            다시하기
          </Button>
        </div>

        {/* Overall Advice */}
        {result.overall_advice && (
          <div className="mt-8 p-4 bg-surface-2 rounded-2xl w-full max-w-md">
            <h3 className="body-2-medium font-[number:var(--body-2-medium-font-weight)] text-on-surface text-[length:var(--body-2-medium-font-size)] tracking-[var(--body-2-medium-letter-spacing)] leading-[var(--body-2-medium-line-height)] [font-style:var(--body-2-medium-font-style)] mb-2">
              전체 조언
            </h3>
            <p className="body-3 font-[number:var(--body-3-font-weight)] text-on-surface-subtle text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)] [font-style:var(--body-3-font-style)]">
              {result.overall_advice}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
