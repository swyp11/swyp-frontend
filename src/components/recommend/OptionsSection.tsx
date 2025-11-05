"use client";

import React, { useState } from "react";
import { OptionGroup } from "../ui";
import { Button } from "../ui";

interface OptionGroupData {
  id: string;
  label: string;
  options: string[];
}

export const OptionsSection = () => {
  const optionGroups: OptionGroupData[] = [
    {
      id: "bodyType",
      label: "체형",
      options: ["마른", "보통", "통통한"],
    },
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
        disabled={!isAllSelected}
        className="self-stretch"
        variant="primary"
      >
        완료
      </Button>
    </section>
  );
};
