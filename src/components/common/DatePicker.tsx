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

  // 날짜 선택 핸들러
  const handleDaySelect = (day: number) => {
    setSelectedDay(day);
    const formattedDate = `${selectedYear}년 ${selectedMonth}월 ${day}일`;
    onChange(formattedDate);
    setIsOpen(false);
  };

  // 표시용 날짜 포맷
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
          {/* Year and Month Selectors */}
          <div className="flex gap-2 mb-4">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="flex-1 field h-10 text-sm"
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
              className="flex-1 field h-10 text-sm"
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}월
                </option>
              ))}
            </select>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => handleDaySelect(day)}
                className={`h-10 rounded-lg body-3 transition-colors ${
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
