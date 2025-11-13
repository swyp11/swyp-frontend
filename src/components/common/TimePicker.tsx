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
  const [inputValue, setInputValue] = useState(value);
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

  // value 변경 시 inputValue 동기화
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // 시간 선택 핸들러
  const handleTimeSelect = () => {
    const formattedTime = `${selectedPeriod} ${selectedHour}시`;
    setInputValue(formattedTime);
    onChange(formattedTime);
    setIsOpen(false);
  };

  // 직접 입력 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  // 입력 포커스 해제 시 유효성 검증 (선택 사항)
  const handleInputBlur = () => {
    // 여기서 시간 형식 검증을 추가할 수 있습니다
    // 예: "오전 9시" 형식인지 확인
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Input Field */}
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          className={`field h-12 w-full pr-10 ${className}`}
        />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-surface-secondary rounded transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 6V10L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-outline rounded-lg shadow-lg z-50 p-2">
          {/* Period and Hour Selectors */}
          <div className="flex gap-1 mb-2">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as "오전" | "오후")}
              className="flex-1 h-7 text-xs px-1.5 border border-outline rounded"
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
              className="flex-1 h-7 text-xs px-1.5 border border-outline rounded"
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
            className="w-full h-7 bg-primary text-white rounded text-xs font-medium"
          >
            확인
          </button>
        </div>
      )}
    </div>
  );
};
