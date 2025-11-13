"use client";

import React, { useState, useRef, useEffect } from "react";

interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
  placeholder?: string;
  className?: string;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  placeholder = "시간을 선택해주세요.",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<"오전" | "오후">("오전");
  const [selectedHour, setSelectedHour] = useState<number>(9);
  const containerRef = useRef<HTMLDivElement>(null);

  const periods = ["오전", "오후"];
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // 시간 선택 핸들러
  const handleTimeSelect = () => {
    const formattedTime = `${selectedPeriod} ${selectedHour}시`;
    onChange(formattedTime);
    setIsOpen(false);
  };

  // 표시용 시간 포맷
  const displayValue = value || placeholder;

  return (
    <div ref={containerRef} className="relative">
      {/* Input Field */}
      <input
        type="text"
        value={displayValue}
        onClick={() => setIsOpen(!isOpen)}
        readOnly
        placeholder={placeholder}
        className={`field h-12 w-full cursor-pointer ${className}`}
      />

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-outline rounded-lg shadow-lg z-50 p-4">
          {/* Period and Hour Selectors */}
          <div className="flex gap-2 mb-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as "오전" | "오후")}
              className="flex-1 field h-10 text-sm"
            >
              {periods.map((period) => (
                <option key={period} value={period}>
                  {period}
                </option>
              ))}
            </select>
            <select
              value={selectedHour}
              onChange={(e) => setSelectedHour(Number(e.target.value))}
              className="flex-1 field h-10 text-sm"
            >
              {hours.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}시
                </option>
              ))}
            </select>
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleTimeSelect}
            className="w-full h-10 bg-primary text-white rounded-sm body-3 font-medium"
          >
            확인
          </button>
        </div>
      )}
    </div>
  );
};
