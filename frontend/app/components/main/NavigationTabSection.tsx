"use client";

import React, { useState } from "react";

interface TabItem {
  id: string;
  label: string;
}

export const NavigationTabSection = () => {
  const tabs: TabItem[] = [
    { id: "wedding-hall", label: "웨딩홀" },
    { id: "dress", label: "드레스" },
  ];

  const [activeTab, setActiveTab] = useState<string>("dress");

  return (
    <nav
      className="self-stretch w-full flex-[0_0_auto] border-b [border-bottom-style:solid] border-border-subtlest flex items-center relative"
      role="navigation"
      aria-label="카테고리 탐색"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-col ${isActive ? "h-11" : ""} justify-${isActive ? "around" : "center"
              } gap-3 ${isActive ? "pt-3 pb-0" : "py-3"} px-4 flex-1 grow ${isActive ? "overflow-hidden" : ""
              } border-0 border-none flex items-center relative ${isActive ? "border-primary" : ""
              }`}
            role="tab"
            aria-selected={isActive}
            aria-controls={`${tab.id}-panel`}
            type="button"
          >
            {isActive ? (
              <div className="inline-flex flex-col items-center gap-[9px] relative flex-[0_0_auto] mt-[-0.50px]">
                <span className="relative flex items-center justify-center w-fit mt-[-1.00px] font-m3-body-medium-emphasized font-[number:var(--m3-body-medium-emphasized-font-weight)] text-primary text-[length:var(--m3-body-medium-emphasized-font-size)] tracking-[var(--m3-body-medium-emphasized-letter-spacing)] leading-[var(--m3-body-medium-emphasized-line-height)] whitespace-nowrap [font-style:var(--m3-body-medium-emphasized-font-style)]">
                  {tab.label}
                </span>
                <div
                  className="relative self-stretch w-full h-1 bg-primary rounded-[2px_2px_0px_0px]"
                  aria-hidden="true"
                />
              </div>
            ) : (
              <span className="w-fit font-m3-body-medium-emphasized font-[number:var(--m3-body-medium-emphasized-font-weight)] text-on-surface-subtle text-[length:var(--m3-body-medium-emphasized-font-size)] tracking-[var(--m3-body-medium-emphasized-letter-spacing)] leading-[var(--m3-body-medium-emphasized-line-height)] whitespace-nowrap relative flex items-center justify-center [font-style:var(--m3-body-medium-emphasized-font-style)]">
                {tab.label}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
};
