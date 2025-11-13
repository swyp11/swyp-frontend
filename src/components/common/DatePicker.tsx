"use client";

import React, { useState, useRef, useEffect } from "react";

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
  className?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = "날짜를 선택해주세요.",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState(value);
  const containerRef = useRef<HTMLDivElement>(null);

  // 연도 범위 (현재 연도부터 +10년까지)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  // 해당 월의 일 수 계산
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const days = Array.from(
    { length: getDaysInMonth(selectedYear, selectedMonth) },
    (_, i) => i + 1
  );

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

  // 날짜 선택 핸들러
  const handleDaySelect = (day: number) => {
    setSelectedDay(day);
    const formattedDate = `${selectedYear}년 ${selectedMonth}월 ${day}일`;
    setInputValue(formattedDate);
    onChange(formattedDate);
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
    // 여기서 날짜 형식 검증을 추가할 수 있습니다
    // 예: "2025년 1월 15일" 형식인지 확인
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
            <path d="M6 2V4M14 2V4M3 8H17M5 4H15C16.1046 4 17 4.89543 17 6V16C17 17.1046 16.1046 18 15 18H5C3.89543 18 3 17.1046 3 16V6C3 4.89543 3.89543 4 5 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-outline rounded-lg shadow-lg z-50 p-2">
          {/* Year and Month Selectors */}
          <div className="flex gap-1 mb-2">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="flex-1 h-7 text-xs px-1.5 border border-outline rounded"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}년
                </option>
              ))}
            </select>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="flex-1 h-7 text-xs px-1.5 border border-outline rounded"
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}월
                </option>
              ))}
            </select>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-0.5">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => handleDaySelect(day)}
                className={`h-7 rounded text-xs transition-colors ${
                  selectedDay === day &&
                  selectedYear === new Date(value).getFullYear() &&
                  selectedMonth === new Date(value).getMonth() + 1
                    ? "bg-primary text-white"
                    : "hover:bg-surface-secondary text-on-surface"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
