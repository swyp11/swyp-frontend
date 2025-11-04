"use client";

import React, { useState } from "react";

interface OptionGroup {
  id: string;
  label: string;
  options: string[];
}

export const OptionsSection = () => {
  const optionGroups: OptionGroup[] = [
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

  const handleOptionClick = (groupId: string, option: string) => {
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
        <h1 className="relative flex items-center justify-center self-stretch mt-[-1.00px] font-title-1 font-[number:var(--title-1-font-weight)] text-on-surface text-[length:var(--title-1-font-size)] tracking-[var(--title-1-letter-spacing)] leading-[var(--title-1-line-height)] [font-style:var(--title-1-font-style)]">
          드레스 추천을 위해 <br />
          아래 옵션을 선택해주세요!
        </h1>

        <div className="flex flex-col items-start gap-10 relative self-stretch w-full flex-[0_0_auto]">
          {optionGroups.map((group) => (
            <fieldset
              key={group.id}
              className="flex flex-col items-start gap-3 relative self-stretch w-full flex-[0_0_auto]"
            >
              <legend className="flex items-start gap-1 relative self-stretch w-full flex-[0_0_auto]">
                <span className="relative flex items-center justify-center flex-1 mt-[-1.00px] font-body-2-medium font-[number:var(--body-2-medium-font-weight)] text-black text-[length:var(--body-2-medium-font-size)] tracking-[var(--body-2-medium-letter-spacing)] leading-[var(--body-2-medium-line-height)] [font-style:var(--body-2-medium-font-style)]">
                  {group.label}
                </span>
              </legend>

              <div
                className="flex items-start gap-2 relative self-stretch w-full flex-[0_0_auto]"
                role="group"
                aria-labelledby={`${group.id}-label`}
              >
                {group.options.map((option) => {
                  const isSelected = selectedOptions[group.id] === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleOptionClick(group.id, option)}
                      className={`flex flex-col h-11 items-center justify-center gap-2.5 px-4 py-2 relative flex-1 grow rounded-[999px] overflow-hidden border border-solid ${
                        isSelected
                          ? "border-primary bg-primary"
                          : "border-border"
                      }`}
                      aria-pressed={isSelected}
                    >
                      <span
                        className={`relative flex items-center justify-center w-fit font-body-3 font-[number:var(--body-3-font-weight)] ${
                          isSelected
                            ? "text-on-primary"
                            : "text-on-surface-subtle"
                        } text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)] whitespace-nowrap [font-style:var(--body-3-font-style)]`}
                      >
                        {option}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>
      </div>

      <button
        type="button"
        disabled={!isAllSelected}
        className={`all-[unset] box-border flex flex-col h-11 items-center justify-center gap-2.5 px-5 py-2 relative self-stretch w-full bg-primary rounded-lg overflow-hidden ${
          !isAllSelected ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <span className="relative flex items-center justify-center w-fit font-body-2-medium font-[number:var(--body-2-medium-font-weight)] text-on-primary text-[length:var(--body-2-medium-font-size)] tracking-[var(--body-2-medium-letter-spacing)] leading-[var(--body-2-medium-line-height)] whitespace-nowrap [font-style:var(--body-2-medium-font-style)]">
          완료
        </span>
      </button>
    </section>
  );
};
