"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { getAssetPath } from "@/utils/assetPath";

export type CalendarView = "monthly" | "weekly" | "daily";

interface ViewSelectorProps {
  currentView: CalendarView;
  onViewChange: (view: CalendarView) => void;
}

const viewLabels: Record<CalendarView, string> = {
  monthly: "월별",
  weekly: "주별",
  daily: "일별",
};

export const ViewSelector: React.FC<ViewSelectorProps> = ({
  currentView,
  onViewChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (view: CalendarView) => {
    onViewChange(view);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1"
      >
        <span className="body-2-medium text-on-surface">
          {viewLabels[currentView]}
        </span>
        <Image
          alt=""
          src={getAssetPath("/img/keyboard-arrow-down.svg")}
          width={24}
          height={24}
        />
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-1 overflow-hidden z-50 min-w-[100px]">
          {(["monthly", "weekly", "daily"] as CalendarView[]).map((view) => (
            <button
              key={view}
              onClick={() => handleSelect(view)}
              className={`w-full px-4 py-3 text-left body-2-medium transition-colors hover:bg-surface-2 ${currentView === view
                ? "text-primary bg-primary-container"
                : "text-on-surface"
                }`}
            >
              {viewLabels[view]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
