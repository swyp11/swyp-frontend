"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { OptionGroup } from "../ui";
import { Button } from "../ui";
import type { RecommendRequest } from "@/app/api/recommend/route";

interface OptionGroupData {
  id: string;
  label: string;
  options: string[];
}

export const OptionsSection = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const optionGroups: OptionGroupData[] = [
    {
      id: "armLength",
      label: "팔길이",
      options: ["짧은", "보통", "긴"],
    },
    {
      id: "legLength",
      label: "다리길이",
      options: ["짧은", "보통", "긴"],
    },
    {
      id: "neckLength",
      label: "목길이",
      options: ["짧은", "보통", "긴"],
    },
    {
      id: "faceShape",
      label: "얼굴형",
      options: ["달걀", "넓은", "각진", "긴"],
    },
  ];

  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});

  const handleOptionSelect = (groupId: string, option: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [groupId]: option,
    }));
  };

  const isAllSelected = optionGroups.every(
    (group) => selectedOptions[group.id],
  );

  // Map Korean options to English API values
  const mapToApiValue = (value: string): string => {
    const mapping: Record<string, string> = {
      "짧은": "short",
      "보통": "medium",
      "긴": "long",
      "달걀": "oval",
      "넓은": "round",
      "각진": "square",
    };
    return mapping[value] || value;
  };

  const handleSubmit = async () => {
    if (!isAllSelected) return;

    setIsLoading(true);
    try {
      const requestData: RecommendRequest = {
        arm_length: mapToApiValue(selectedOptions.armLength) as any,
        face_shape: mapToApiValue(selectedOptions.faceShape) as any,
        leg_length: mapToApiValue(selectedOptions.legLength) as any,
        neck_length: mapToApiValue(selectedOptions.neckLength) as any,
        num_recommendations: 3,
      };

      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Failed to get recommendations");
      }

      const result = await response.json();

      // Store result in sessionStorage and navigate
      sessionStorage.setItem("recommendResult", JSON.stringify(result.data));
      router.push("/recommend/result");
    } catch (error) {
      console.error("Failed to get recommendations:", error);
      alert("추천을 받는 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-start gap-8 px-4 py-8 relative self-stretch w-full flex-[0_0_auto] bg-white">
      <div className="flex flex-col items-start gap-12 relative self-stretch w-full flex-[0_0_auto]">
        <h1 className="relative flex items-center justify-center self-stretch mt-[-1.00px] title-1 font-[number:var(--title-1-font-weight)] text-on-surface text-[length:var(--title-1-font-size)] tracking-[var(--title-1-letter-spacing)] leading-[var(--title-1-line-height)] [font-style:var(--title-1-font-style)]">
          드레스 추천을 위해 <br />
          아래 옵션을 선택해주세요!
        </h1>

        <div className="flex flex-col items-start gap-10 relative self-stretch w-full flex-[0_0_auto]">
          {optionGroups.map((group) => (
            <OptionGroup
              key={group.id}
              label={group.label}
              options={group.options}
              selectedOption={selectedOptions[group.id]}
              onOptionSelect={(option) => handleOptionSelect(group.id, option)}
              variant="pill"
              className="self-stretch"
            />
          ))}
        </div>
      </div>

      <Button
        disabled={!isAllSelected || isLoading}
        className="self-stretch"
        variant="primary"
        onClick={handleSubmit}
      >
        {isLoading ? "추천 받는 중..." : "완료"}
      </Button>
    </section>
  );
};
