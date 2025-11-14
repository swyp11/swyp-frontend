"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { MonthCalendar } from "../../components/schedule/MonthCalendar";
import { WeekCalendar } from "../../components/schedule/WeekCalendar";
import { DayCalendar } from "../../components/schedule/DayCalendar";
import { ViewSelector, CalendarView } from "../../components/schedule/ViewSelector";
import { NavigationHeader } from "../../components/schedule/NavigationHeader";
import { WeddingDateModal } from "../../components/schedule/WeddingDateModal";
import Image from "next/image";
import { getAssetPath } from "@/utils/assetPath";
import { withAuth } from "@/components/auth/withAuth";
import { useAuth } from "@/contexts/AuthContext";
import { useMonthSchedule, useWeekSchedule, useDaySchedule } from "@/hooks/useSchedule";
import { useUserInfo } from "@/hooks/useUser";
import { calculateDaysUntilWedding, formatDDay } from "@/utils/dateUtils";

interface Event {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  startTime: number;
  endTime: number;
  color: string;
  description?: string;
}

function SchedulePage() {
  const { checkAuth } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: userInfo } = useUserInfo();

  // 초기값: query params가 있으면 사용, 없으면 현재 날짜 사용
  const today = new Date();
  const initialYear = parseInt(searchParams.get('year') || '') || today.getFullYear();
  const initialMonth = parseInt(searchParams.get('month') || '') || (today.getMonth() + 1);
  const initialDate = parseInt(searchParams.get('date') || '') || today.getDate();
  const initialView = (searchParams.get('view') as CalendarView) || 'weekly';

  const [currentMonth, setCurrentMonth] = useState(initialMonth);
  const [currentYear, setCurrentYear] = useState(initialYear);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [calendarView, setCalendarView] = useState<CalendarView>(initialView);
  const [isWeddingDateModalOpen, setIsWeddingDateModalOpen] = useState(false);

  // URL query params 업데이트 함수
  const updateQueryParams = (year: number, month: number, date: number, view: CalendarView) => {
    const params = new URLSearchParams();
    params.set('year', year.toString());
    params.set('month', month.toString());
    params.set('date', date.toString());
    params.set('view', view);
    router.replace(`/schedule?${params.toString()}`, { scroll: false });
  };

  // 상태 변경 시 query params 업데이트
  useEffect(() => {
    updateQueryParams(currentYear, currentMonth, selectedDate, calendarView);
  }, [currentYear, currentMonth, selectedDate, calendarView]);

  // 현재 주차 계산 (해당 월의 몇 주차인지)
  const getCurrentWeek = () => {
    const date = new Date(currentYear, currentMonth - 1, selectedDate);
    const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1);
    const daysDiff = Math.floor((date.getTime() - firstDayOfMonth.getTime()) / (1000 * 60 * 60 * 24));
    return Math.floor(daysDiff / 7) + 1;
  };

  // 해당 월의 총 주 수 계산
  const getTotalWeeksInMonth = () => {
    const lastDay = new Date(currentYear, currentMonth, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth - 1, lastDay);
    const daysDiff = Math.floor((lastDayOfMonth.getTime() - firstDayOfMonth.getTime()) / (1000 * 60 * 60 * 24));
    return Math.floor(daysDiff / 7) + 1;
  };

  // 주차 선택 시 해당 주의 첫 날로 이동
  const handleWeekSelect = (week: number) => {
    const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1);
    const targetDate = new Date(firstDayOfMonth);
    targetDate.setDate(1 + (week - 1) * 7);
    setSelectedDate(targetDate.getDate());
  };

  // 일별 뷰 빠른 일정 추가
  // 일정 클릭 핸들러
  const handleEventClick = (eventId: string) => {
    router.push(`/schedule/${eventId}`);
  };

  // 현재 날짜 문자열 (YYYY-MM-DD) - useMemo로 최적화
  const currentDateString = useMemo(() => {
    const year = currentYear;
    const month = String(currentMonth).padStart(2, '0');
    const day = String(selectedDate).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }, [currentYear, currentMonth, selectedDate]);

  // 현재 주차 계산 (useMemo로 최적화)
  const currentWeek = useMemo(() => getCurrentWeek(), [currentYear, currentMonth, selectedDate]);

  // 주별 뷰를 위한 시작일 계산 (현재 선택된 날짜가 속한 주의 월요일)
  const weekStartDate = useMemo(() => {
    // 현재 선택된 날짜
    const currentDate = new Date(currentYear, currentMonth - 1, selectedDate);

    // JavaScript getDay(): 0=일요일, 1=월요일, ..., 6=토요일
    const dayOfWeek = currentDate.getDay();

    // 월요일까지의 일수 계산 (일요일인 경우 -6, 월요일인 경우 0, 화요일인 경우 -1, ...)
    const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

    // 해당 주의 월요일 계산
    const monday = new Date(currentDate);
    monday.setDate(currentDate.getDate() + daysToMonday);

    const year = monday.getFullYear();
    const month = String(monday.getMonth() + 1).padStart(2, '0');
    const day = String(monday.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }, [currentYear, currentMonth, selectedDate]);

  // API 호출 - 뷰에 따라 조건부로 데이터 가져오기
  const { data: monthSchedule } = useMonthSchedule(
    currentYear,
    currentMonth,
    calendarView === "monthly"
  );
  const { data: weekSchedule } = useWeekSchedule(
    weekStartDate,
    calendarView === "weekly"
  );
  const { data: daySchedule } = useDaySchedule(
    currentDateString,
    calendarView === "daily"
  );

  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1).getDay();

  // D-Day 계산
  const daysUntilWedding = useMemo(() => {
    return calculateDaysUntilWedding(userInfo?.weddingDate);
  }, [userInfo?.weddingDate]);

  const dDayText = useMemo(() => {
    return formatDDay(daysUntilWedding);
  }, [daysUntilWedding]);

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // 일별 뷰 날짜 이동
  const handlePrevDay = () => {
    const currentDate = new Date(currentYear, currentMonth - 1, selectedDate);
    currentDate.setDate(currentDate.getDate() - 1);
    setCurrentYear(currentDate.getFullYear());
    setCurrentMonth(currentDate.getMonth() + 1);
    setSelectedDate(currentDate.getDate());
  };

  const handleNextDay = () => {
    const currentDate = new Date(currentYear, currentMonth - 1, selectedDate);
    currentDate.setDate(currentDate.getDate() + 1);
    setCurrentYear(currentDate.getFullYear());
    setCurrentMonth(currentDate.getMonth() + 1);
    setSelectedDate(currentDate.getDate());
  };

  // 주별 뷰 주 이동
  const handlePrevWeek = () => {
    const currentDate = new Date(currentYear, currentMonth - 1, selectedDate);
    currentDate.setDate(currentDate.getDate() - 7);
    setCurrentYear(currentDate.getFullYear());
    setCurrentMonth(currentDate.getMonth() + 1);
    setSelectedDate(currentDate.getDate());
  };

  const handleNextWeek = () => {
    const currentDate = new Date(currentYear, currentMonth - 1, selectedDate);
    currentDate.setDate(currentDate.getDate() + 7);
    setCurrentYear(currentDate.getFullYear());
    setCurrentMonth(currentDate.getMonth() + 1);
    setSelectedDate(currentDate.getDate());
  };


  return (
    <div className="relative">
      {/* Wedding Date Modal */}
      <WeddingDateModal
        isOpen={isWeddingDateModalOpen}
        onClose={() => setIsWeddingDateModalOpen(false)}
        currentWeddingDate={userInfo?.weddingDate}
      />

      {/* Content Container */}
      <div className="pb-16">

        {/* D-Day & View Selector */}
        <div className="px-2 pb-4">
          <div className="bg-surface-2 rounded-lg px-4 py-2.5 flex items-center justify-between">
            <button
              className="flex items-center gap-2"
              onClick={() => {
                if (checkAuth()) {
                  setIsWeddingDateModalOpen(true);
                }
              }}
            >
              {userInfo?.weddingDate ? (
                <>
                  <span className="body-2-medium text-[#787878]">
                    {daysUntilWedding !== null && daysUntilWedding >= 0 ? '결혼식까지' : ''}
                  </span>
                  <span className="body-2-medium text-primary font-bold">{dDayText}</span>
                </>
              ) : (
                <span className="body-2-medium text-[#787878]">결혼식 날짜를 입력해주세요</span>
              )}
              <Image
                alt=""
                src={getAssetPath("/img/edit.svg")}
                width={16}
                height={16}
              />
            </button>
            <ViewSelector
              currentView={calendarView}
              onViewChange={setCalendarView}
            />
          </div>
        </div>

        {/* Month Navigator - 월별 뷰에서만 표시 */}
        {calendarView === "monthly" && (
          <NavigationHeader
            onPrev={handlePrevMonth}
            onNext={handleNextMonth}
            title={`${currentYear}년 ${currentMonth}월`}
            showDropdown={true}
            currentMonth={currentMonth}
            currentYear={currentYear}
            onMonthSelect={setCurrentMonth}
            onYearSelect={setCurrentYear}
          />
        )}

        {/* Week Navigator - 주별 뷰에서만 표시 */}
        {calendarView === "weekly" && (
          <NavigationHeader
            onPrev={handlePrevWeek}
            onNext={handleNextWeek}
            title={`${currentMonth}월 ${currentWeek}주차`}
            showDropdown={true}
            currentMonth={currentMonth}
            currentYear={currentYear}
            currentWeek={currentWeek}
            totalWeeks={getTotalWeeksInMonth()}
            onMonthSelect={setCurrentMonth}
            onWeekSelect={handleWeekSelect}
          />
        )}

        {/* Day Navigator - 일별 뷰에서만 표시 */}
        {calendarView === "daily" && (
          <NavigationHeader
            onPrev={handlePrevDay}
            onNext={handleNextDay}
            title={`${currentMonth}월 ${selectedDate}일`}
            showDropdown={true}
            currentMonth={currentMonth}
            currentYear={currentYear}
            currentDay={selectedDate}
            daysInMonth={daysInMonth}
            onMonthSelect={setCurrentMonth}
            onDaySelect={setSelectedDate}
          />
        )}

        {/* 월별 캘린더 */}
        {calendarView === "monthly" && (
          <MonthCalendar
            currentYear={currentYear}
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            monthSchedule={monthSchedule}
            onDateSelect={setSelectedDate}
            onEventClick={handleEventClick}
          />
        )}

        {/* 주별 캘린더 */}
        {calendarView === "weekly" && (
          <div className="flex-1 overflow-hidden">
            <WeekCalendar
              currentDate={new Date(currentYear, currentMonth - 1, selectedDate)}
              weekSchedule={weekSchedule}
              onEventClick={handleEventClick}
            />
          </div>
        )}

        {/* 일별 캘린더 */}
        {calendarView === "daily" && (
          <div className="flex-1 overflow-hidden">
            <DayCalendar
              currentDate={new Date(currentYear, currentMonth - 1, selectedDate)}
              daySchedule={daySchedule}
              onEventClick={handleEventClick}
            />
          </div>
        )}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => {
          if (checkAuth()) {
            router.push("/schedule/add");
          }
        }}
        className="fixed bottom-24 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg z-40"
        style={{
          right: "calc(50% - var(--app-width)/2 + 1rem)"
        }}
      >
        <Image
          alt=""
          src={getAssetPath("/img/add.svg")}
          width={24}
          height={24}
        />
      </button>
    </div >
  );
}

export default withAuth(SchedulePage);
