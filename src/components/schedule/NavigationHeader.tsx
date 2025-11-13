"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { getAssetPath } from "@/utils/assetPath";

interface NavigationHeaderProps {
    onPrev: () => void;
    onNext: () => void;
    title: string;
    showDropdown?: boolean;
    currentMonth?: number;
    currentYear?: number;
    currentWeek?: number;
    totalWeeks?: number;
    currentDay?: number;
    daysInMonth?: number;
    onMonthSelect?: (month: number) => void;
    onWeekSelect?: (week: number) => void;
    onDaySelect?: (day: number) => void;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
    onPrev,
    onNext,
    title,
    showDropdown = true,
    currentMonth,
    currentYear,
    currentWeek,
    totalWeeks,
    currentDay,
    daysInMonth,
    onMonthSelect,
    onWeekSelect,
    onDaySelect,
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // 드롭다운 타입 확인
    const isMonthDropdown = onMonthSelect && currentMonth;
    const isWeekDropdown = onWeekSelect && currentWeek && totalWeeks;
    const isDayDropdown = onDaySelect && currentDay && daysInMonth;

    // 복합 드롭다운 확인
    const isMonthWeekDropdown = isMonthDropdown && isWeekDropdown;
    const isMonthDayDropdown = isMonthDropdown && isDayDropdown;

    // 외부 클릭 감지
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleMonthSelect = (month: number) => {
        if (onMonthSelect) {
            onMonthSelect(month);
        }
        // 복합 드롭다운이 아닐 때만 닫기
        if (!isMonthWeekDropdown && !isMonthDayDropdown) {
            setIsDropdownOpen(false);
        }
    };

    const handleWeekSelect = (week: number) => {
        if (onWeekSelect) {
            onWeekSelect(week);
        }
        // 복합 드롭다운이 아닐 때만 닫기
        if (!isMonthWeekDropdown) {
            setIsDropdownOpen(false);
        }
    };

    const handleDaySelect = (day: number) => {
        if (onDaySelect) {
            onDaySelect(day);
        }
        // 복합 드롭다운이 아닐 때만 닫기
        if (!isMonthDayDropdown) {
            setIsDropdownOpen(false);
        }
    };

    return (
        <div className="flex items-center justify-between px-2 pb-5">
            <button
                onClick={onPrev}
                className="w-10 h-10 bg-surface-2 rounded-lg flex items-center justify-center"
            >
                <Image
                    className="relative w-6 h-6"
                    alt=""
                    src={getAssetPath("/img/chevron_backward.svg")}
                    width={24}
                    height={24}
                />
            </button>

            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => showDropdown && setIsDropdownOpen(!isDropdownOpen)}
                    className="bg-surface-2 rounded-lg px-5 py-2 flex items-center gap-1"
                >
                    <span className="title-2 text-on-surface">{title}</span>
                    {showDropdown && (
                        <Image
                            className="relative w-6 h-6"
                            alt=""
                            src={getAssetPath("/img/keyboard-arrow-down.svg")}
                            width={24}
                            height={24}
                        />
                    )}
                </button>

                {/* 월과 일을 모두 선택할 수 있는 드롭다운 */}
                {showDropdown && isDropdownOpen && isMonthDayDropdown && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-lg shadow-1 overflow-hidden z-50 min-w-[240px]">
                        <div className="grid grid-cols-2 divide-x divide-[#f1f1f1]">
                            {/* 월 선택 */}
                            <div className="max-h-[300px] overflow-y-auto">
                                <div className="px-3 py-2 bg-surface-2 sticky top-0">
                                    <span className="label-2 text-on-surface-subtle">월</span>
                                </div>
                                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                                    <button
                                        key={month}
                                        onClick={() => handleMonthSelect(month)}
                                        className={`w-full px-4 py-2 text-center body-2-medium transition-colors hover:bg-surface-2 ${
                                            currentMonth === month
                                                ? "text-primary bg-primary-container"
                                                : "text-on-surface"
                                        }`}
                                    >
                                        {month}월
                                    </button>
                                ))}
                            </div>

                            {/* 일 선택 */}
                            <div className="max-h-[300px] overflow-y-auto">
                                <div className="px-3 py-2 bg-surface-2 sticky top-0">
                                    <span className="label-2 text-on-surface-subtle">일</span>
                                </div>
                                {Array.from({ length: daysInMonth || 31 }, (_, i) => i + 1).map((day) => (
                                    <button
                                        key={day}
                                        onClick={() => handleDaySelect(day)}
                                        className={`w-full px-4 py-2 text-center body-2-medium transition-colors hover:bg-surface-2 ${
                                            currentDay === day
                                                ? "text-primary bg-primary-container"
                                                : "text-on-surface"
                                        }`}
                                    >
                                        {day}일
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* 월과 주차를 모두 선택할 수 있는 드롭다운 */}
                {showDropdown && isDropdownOpen && isMonthWeekDropdown && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-lg shadow-1 overflow-hidden z-50 min-w-[240px]">
                        <div className="grid grid-cols-2 divide-x divide-[#f1f1f1]">
                            {/* 월 선택 */}
                            <div className="max-h-[300px] overflow-y-auto">
                                <div className="px-3 py-2 bg-surface-2 sticky top-0">
                                    <span className="label-2 text-on-surface-subtle">월</span>
                                </div>
                                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                                    <button
                                        key={month}
                                        onClick={() => handleMonthSelect(month)}
                                        className={`w-full px-4 py-2 text-center body-2-medium transition-colors hover:bg-surface-2 ${
                                            currentMonth === month
                                                ? "text-primary bg-primary-container"
                                                : "text-on-surface"
                                        }`}
                                    >
                                        {month}월
                                    </button>
                                ))}
                            </div>

                            {/* 주차 선택 */}
                            <div className="max-h-[300px] overflow-y-auto">
                                <div className="px-3 py-2 bg-surface-2 sticky top-0">
                                    <span className="label-2 text-on-surface-subtle">주차</span>
                                </div>
                                {Array.from({ length: totalWeeks }, (_, i) => i + 1).map((week) => (
                                    <button
                                        key={week}
                                        onClick={() => handleWeekSelect(week)}
                                        className={`w-full px-4 py-2 text-center body-2-medium transition-colors hover:bg-surface-2 ${
                                            currentWeek === week
                                                ? "text-primary bg-primary-container"
                                                : "text-on-surface"
                                        }`}
                                    >
                                        {week}주차
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* 월만 선택하는 드롭다운 */}
                {showDropdown && isDropdownOpen && isMonthDropdown && !isMonthWeekDropdown && !isMonthDayDropdown && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-lg shadow-1 overflow-hidden z-50 min-w-[120px] max-h-[300px] overflow-y-auto">
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                            <button
                                key={month}
                                onClick={() => handleMonthSelect(month)}
                                className={`w-full px-4 py-3 text-center body-2-medium transition-colors hover:bg-surface-2 ${
                                    currentMonth === month
                                        ? "text-primary bg-primary-container"
                                        : "text-on-surface"
                                }`}
                            >
                                {month}월
                            </button>
                        ))}
                    </div>
                )}

                {/* 주차만 선택하는 드롭다운 */}
                {showDropdown && isDropdownOpen && isWeekDropdown && !isMonthWeekDropdown && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-lg shadow-1 overflow-hidden z-50 min-w-[120px]">
                        {Array.from({ length: totalWeeks }, (_, i) => i + 1).map((week) => (
                            <button
                                key={week}
                                onClick={() => handleWeekSelect(week)}
                                className={`w-full px-4 py-3 text-center body-2-medium transition-colors hover:bg-surface-2 ${
                                    currentWeek === week
                                        ? "text-primary bg-primary-container"
                                        : "text-on-surface"
                                }`}
                            >
                                {week}주차
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <button
                onClick={onNext}
                className="w-10 h-10 bg-surface-2 rounded-lg flex items-center justify-center"
            >
                <Image
                    className="relative w-6 h-6 rotate-180"
                    alt=""
                    src={getAssetPath("/img/chevron_backward.svg")}
                    width={24}
                    height={24}
                />
            </button>
        </div>
    );
};