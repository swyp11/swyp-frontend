"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { WeekCalendar } from "../../components/schedule/WeekCalendar";
import { DayCalendar } from "../../components/schedule/DayCalendar";
import { ViewSelector, CalendarView } from "../../components/schedule/ViewSelector";
import { NavigationHeader } from "../../components/schedule/NavigationHeader";
import { WeddingDateModal } from "../../components/schedule/WeddingDateModal";
import { DayEventsModal } from "../../components/schedule/DayEventsModal";
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
  const [isDayEventsModalOpen, setIsDayEventsModalOpen] = useState(false);
  const [selectedDayForModal, setSelectedDayForModal] = useState<number | null>(null);

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

  // 월별 뷰용 이벤트 변환 (날짜 범위 바 형태)
  const getMonthlyEvents = () => {
    const eventBars: Array<{
      id: string;
      title: string;
      startDay: number;
      endDay: number;
      startWeek: number;
      color: string;
      row: number; // 같은 주에서 몇 번째 줄인지
    }> = [];

    if (!monthSchedule) return eventBars;
    if (!Array.isArray(monthSchedule)) return eventBars;
    if (monthSchedule.length === 0) return eventBars;

    const firstItem = monthSchedule[0];
    const schedules: any[] = [];

    // ScheduleMonthResponse[] 형태인 경우
    if (firstItem && typeof firstItem === 'object' && 'schedules' in firstItem && Array.isArray(firstItem.schedules)) {
      monthSchedule.forEach((dayData: any) => {
        schedules.push(...dayData.schedules);
      });
    } else {
      schedules.push(...monthSchedule);
    }

    // 중복 제거 (같은 ID)
    const uniqueSchedules = schedules.filter((schedule, index, self) =>
      index === self.findIndex(s => s.id === schedule.id)
    );

    // 일정 길이 순으로 정렬 (긴 일정이 먼저)
    uniqueSchedules.sort((a, b) => {
      const aDuration = new Date(a.endDate || a.startDate).getTime() - new Date(a.startDate).getTime();
      const bDuration = new Date(b.endDate || b.startDate).getTime() - new Date(b.startDate).getTime();
      return bDuration - aDuration; // 내림차순 (긴 일정이 먼저)
    });

    // 각 주별로 이벤트 행 관리
    const weekRows: Map<number, Array<{ startDay: number; endDay: number }>> = new Map();

    uniqueSchedules.forEach((schedule: any) => {
      const startDate = new Date(schedule.startDate || schedule.scheduleDate);
      const endDate = new Date(schedule.endDate || schedule.startDate || schedule.scheduleDate);

      // 현재 월의 1일과 마지막 날
      const monthStart = new Date(currentYear, currentMonth - 1, 1);
      const monthEnd = new Date(currentYear, currentMonth, 0);

      // 현재 월에 포함되는 부분만 계산
      const displayStart = startDate > monthStart ? startDate : monthStart;
      const displayEnd = endDate < monthEnd ? endDate : monthEnd;

      // 현재 월과 겹치지 않으면 skip
      if (displayStart > monthEnd || displayEnd < monthStart) {
        return;
      }

      const startDay = displayStart.getDate();
      const endDay = displayEnd.getDate();

      // 시작 날짜의 주차 계산
      const emptyDays = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
      const startWeek = Math.floor((startDay - 1 + emptyDays) / 7);
      const endWeek = Math.floor((endDay - 1 + emptyDays) / 7);

      // 여러 주에 걸쳐있는 경우 각 주별로 행 할당
      for (let week = startWeek; week <= endWeek; week++) {
        if (!weekRows.has(week)) {
          weekRows.set(week, []);
        }

        const weekEvents = weekRows.get(week)!;

        // 현재 주에서의 시작/종료일 계산
        const weekStartDay = week === startWeek ? startDay : (week * 7 - emptyDays + 1);
        const weekEndDay = week === endWeek ? endDay : Math.min((week + 1) * 7 - emptyDays, daysInMonth);

        // 겹치지 않는 행 찾기
        let row = 0;
        while (row < weekEvents.length) {
          const existingEvent = weekEvents[row];
          // 겹치는지 확인
          if (weekStartDay > existingEvent.endDay || weekEndDay < existingEvent.startDay) {
            // 겹치지 않음
            break;
          }
          row++;
        }

        // 해당 행에 이벤트 추가
        if (!weekEvents[row]) {
          weekEvents[row] = { startDay: weekStartDay, endDay: weekEndDay };
        }

        // 첫 주에만 전체 이벤트 정보 추가
        if (week === startWeek) {
          eventBars.push({
            id: schedule.id.toString(),
            title: schedule.title,
            startDay,
            endDay,
            startWeek,
            color: schedule.color || "#f3335d",
            row,
          });
        }
      }
    });

    return eventBars;
  };

  // 주별 뷰용 이벤트 변환
  const getWeeklyEvents = () => {
    if (!weekSchedule) return [];
    if (!Array.isArray(weekSchedule)) return [];
    if (weekSchedule.length === 0) return [];

    // 현재 주의 시작일(월요일)과 종료일(일요일) 계산
    const currentDate = new Date(currentYear, currentMonth - 1, selectedDate);
    const dayOfWeek = currentDate.getDay();
    const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

    const weekStart = new Date(currentDate);
    weekStart.setDate(currentDate.getDate() + daysToMonday);
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);

    const firstItem = weekSchedule[0];

    // ScheduleWeekResponse[] 구조인 경우
    if (firstItem && typeof firstItem === 'object' && 'schedules' in firstItem && Array.isArray(firstItem.schedules)) {
      return weekSchedule.flatMap((dayData: any) => {
        return dayData.schedules
          .filter((schedule: any) => schedule.startTime && schedule.endTime)
          .flatMap((schedule: any) => {
            const events = [];
            const scheduleStart = new Date(schedule.startDate);
            const scheduleEnd = new Date(schedule.endDate);

            // 현재 주와 겹치는 범위만 계산
            const displayStart = scheduleStart > weekStart ? scheduleStart : weekStart;
            const displayEnd = scheduleEnd < weekEnd ? scheduleEnd : weekEnd;

            // 현재 주에 포함되지 않으면 skip
            if (displayStart > weekEnd || displayEnd < weekStart) {
              return [];
            }

            // displayStart부터 displayEnd까지 각 날짜에 대해 이벤트 생성
            const currentDate = new Date(displayStart);
            while (currentDate <= displayEnd) {
              const jsDayOfWeek = currentDate.getDay();
              const weekCalendarDayOfWeek = jsDayOfWeek === 0 ? 6 : jsDayOfWeek - 1;

              // 해당 날짜의 시작/종료 시간 계산
              const isFirstDay = currentDate.toDateString() === scheduleStart.toDateString();
              const isLastDay = currentDate.toDateString() === scheduleEnd.toDateString();

              const startHour = isFirstDay ? parseInt(schedule.startTime.split(':')[0]) : 0;
              const endHour = isLastDay ? parseInt(schedule.endTime.split(':')[0]) : 24;

              events.push({
                id: schedule.id.toString(),
                title: schedule.title,
                startTime: startHour,
                endTime: endHour,
                dayOfWeek: weekCalendarDayOfWeek,
                color: schedule.color || "#f3335d",
              });

              currentDate.setDate(currentDate.getDate() + 1);
            }

            return events;
          });
      });
    }

    // ScheduleResponse[] 구조인 경우
    return weekSchedule
      .filter((schedule: any) => schedule.startTime && schedule.endTime)
      .flatMap((schedule: any) => {
        const events = [];
        const scheduleStart = new Date(schedule.startDate);
        const scheduleEnd = new Date(schedule.endDate);

        // 현재 주와 겹치는 범위만 계산
        const displayStart = scheduleStart > weekStart ? scheduleStart : weekStart;
        const displayEnd = scheduleEnd < weekEnd ? scheduleEnd : weekEnd;

        // 현재 주에 포함되지 않으면 skip
        if (displayStart > weekEnd || displayEnd < weekStart) {
          return [];
        }

        // displayStart부터 displayEnd까지 각 날짜에 대해 이벤트 생성
        const currentDate = new Date(displayStart);
        while (currentDate <= displayEnd) {
          const jsDayOfWeek = currentDate.getDay();
          const weekCalendarDayOfWeek = jsDayOfWeek === 0 ? 6 : jsDayOfWeek - 1;

          // 해당 날짜의 시작/종료 시간 계산
          const isFirstDay = currentDate.toDateString() === scheduleStart.toDateString();
          const isLastDay = currentDate.toDateString() === scheduleEnd.toDateString();

          const startHour = isFirstDay ? parseInt(schedule.startTime.split(':')[0]) : 0;
          const endHour = isLastDay ? parseInt(schedule.endTime.split(':')[0]) : 24;

          events.push({
            id: schedule.id.toString(),
            title: schedule.title,
            startTime: startHour,
            endTime: endHour,
            dayOfWeek: weekCalendarDayOfWeek,
            color: schedule.color || "#f3335d",
          });

          currentDate.setDate(currentDate.getDate() + 1);
        }

        return events;
      });
  };

  // 일별 뷰용 이벤트 변환
  const getDailyEvents = () => {
    if (!daySchedule) return [];
    if (!Array.isArray(daySchedule)) return [];

    return daySchedule
      .filter((schedule: any) => schedule.startTime && schedule.endTime)
      .map((schedule: any) => {
        const startHour = parseInt(schedule.startTime.split(':')[0]);
        const endHour = parseInt(schedule.endTime.split(':')[0]);

        return {
          id: schedule.id.toString(),
          title: schedule.title,
          startTime: startHour,
          duration: Math.max(endHour - startHour, 1),
          color: schedule.color || "#f3335d",
        };
      });
  };

  // 특정 날짜의 모든 이벤트 가져오기
  const getEventsForDay = (day: number) => {
    if (!monthSchedule) return [];
    if (!Array.isArray(monthSchedule)) return [];
    if (monthSchedule.length === 0) return [];

    const firstItem = monthSchedule[0];
    const schedules: any[] = [];

    // ScheduleMonthResponse[] 형태인 경우
    if (firstItem && typeof firstItem === 'object' && 'schedules' in firstItem && Array.isArray(firstItem.schedules)) {
      monthSchedule.forEach((dayData: any) => {
        schedules.push(...dayData.schedules);
      });
    } else {
      schedules.push(...monthSchedule);
    }

    // 중복 제거
    const uniqueSchedules = schedules.filter((schedule, index, self) =>
      index === self.findIndex(s => s.id === schedule.id)
    );

    // 해당 날짜를 포함하는 이벤트 필터링
    return uniqueSchedules.filter((schedule: any) => {
      const startDate = new Date(schedule.startDate || schedule.scheduleDate);
      const endDate = new Date(schedule.endDate || schedule.startDate || schedule.scheduleDate);

      const targetDate = new Date(currentYear, currentMonth - 1, day);
      targetDate.setHours(0, 0, 0, 0);

      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);

      return targetDate >= startDate && targetDate <= endDate;
    }).map((schedule: any) => ({
      id: schedule.id.toString(),
      title: schedule.title,
      color: schedule.color || "#f3335d",
      startDate: schedule.startDate || schedule.scheduleDate,
      endDate: schedule.endDate || schedule.startDate || schedule.scheduleDate,
    }));
  };

  const renderCalendar = () => {
    const days = [];
    const totalCells = 35; // 5주
    const eventBars = getMonthlyEvents();

    // 빈 셀 추가 (월요일 시작 기준)
    const emptyDays = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    for (let i = 0; i < emptyDays; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border-r border-b border-[#f1f1f1]" />);
    }

    // 날짜 셀 추가
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDay(day);
      const hasMoreThan2Events = dayEvents.length > 2;

      days.push(
        <div
          key={day}
          className="h-24 border-r border-b border-[#f1f1f1] p-1 bg-white cursor-pointer hover:bg-surface-2 relative"
          onClick={() => setSelectedDate(day)}
        >
          <div className="flex flex-col gap-1 h-full">
            <div className="flex justify-center pt-1 relative z-10">
              {day === selectedDate ? (
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <span className="label-2 text-white">{day}</span>
                </div>
              ) : (
                <span className="label-2 text-on-surface-subtle">{day}</span>
              )}
            </div>
            {/* 더보기 버튼 */}
            {hasMoreThan2Events && (
              <div className="absolute bottom-1 left-1 right-1 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedDayForModal(day);
                    setIsDayEventsModalOpen(true);
                  }}
                  className="w-full bg-surface-2 hover:bg-surface-3 rounded-xs px-1 py-0.5 transition-colors"
                >
                  <p className="text-on-surface-subtle text-[9px] leading-3">
                    +{dayEvents.length - 2}개 더보기
                  </p>
                </button>
              </div>
            )}
          </div>
        </div>
      );
    }

    // 남은 빈 셀 추가
    const remainingCells = totalCells - days.length;
    for (let i = 0; i < remainingCells; i++) {
      days.push(<div key={`empty-end-${i}`} className="h-24 border-r border-b border-[#f1f1f1] opacity-0" />);
    }

    return { days, eventBars };
  };

  return (
    <div className="relative">
      {/* Wedding Date Modal */}
      <WeddingDateModal
        isOpen={isWeddingDateModalOpen}
        onClose={() => setIsWeddingDateModalOpen(false)}
        currentWeddingDate={userInfo?.weddingDate}
      />

      {/* Day Events Modal */}
      <DayEventsModal
        isOpen={isDayEventsModalOpen}
        onClose={() => {
          setIsDayEventsModalOpen(false);
          setSelectedDayForModal(null);
        }}
        date={selectedDayForModal ? new Date(currentYear, currentMonth - 1, selectedDayForModal) : new Date()}
        events={selectedDayForModal ? getEventsForDay(selectedDayForModal) : []}
        onEventClick={handleEventClick}
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
        {calendarView === "monthly" && (() => {
          const { days, eventBars } = renderCalendar();
          const emptyDays = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

          return (
            <div className="flex-1 flex flex-col w-full overflow-hidden">
              {/* Weekday Headers */}
              <div className="grid grid-cols-7 border-b border-[#f1f1f1] flex-none">
                {["월", "화", "수", "목", "금", "토", "일"].map((day) => (
                  <div
                    key={day}
                    className="h-7 flex items-center justify-center bg-white"
                  >
                    <span className="label-2 text-on-surface-subtle">{day}</span>
                  </div>
                ))}
              </div>

              {/* Calendar Grid - 스크롤 가능 */}
              <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-7 relative">
                  {days}

                  {/* 이벤트 바 레이어 */}
                  <div className="absolute inset-0 pointer-events-none">
                    {eventBars.filter(event => event.row < 2).map((event, index) => {
                      // 셀 크기 계산
                      const cellWidth = 100 / 7; // 7열
                      const cellHeight = 96; // h-24 = 96px
                      const eventBarHeight = 16; // 이벤트 바 높이
                      const eventBarSpacing = 2; // 이벤트 바 간격

                      // 시작 날짜의 column 위치
                      const startCol = (event.startDay - 1 + emptyDays) % 7;
                      // 종료 날짜의 column 위치
                      const endCol = (event.endDay - 1 + emptyDays) % 7;
                      // 시작 주차
                      const startRow = event.startWeek;
                      // 종료 주차
                      const endRow = Math.floor((event.endDay - 1 + emptyDays) / 7);

                      // 같은 주에 있는 경우
                      if (startRow === endRow) {
                        const left = startCol * cellWidth;
                        const width = (endCol - startCol + 1) * cellWidth;
                        const top = startRow * cellHeight + 32 + (event.row * (eventBarHeight + eventBarSpacing)); // 날짜 숫자 아래 + row별 간격

                        return (
                          <div
                            key={event.id}
                            className="absolute pointer-events-auto cursor-pointer hover:opacity-90 transition-opacity"
                            style={{
                              left: `${left}%`,
                              width: `${width}%`,
                              top: `${top}px`,
                              height: `${eventBarHeight}px`,
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEventClick(event.id);
                            }}
                          >
                            <div
                              className="h-full rounded-sm px-1 flex items-center"
                              style={{ backgroundColor: event.color }}
                            >
                              <p className="text-white text-[9px] leading-3 overflow-hidden text-ellipsis whitespace-nowrap">
                                {event.title}
                              </p>
                            </div>
                          </div>
                        );
                      } else {
                        // 여러 주에 걸쳐 있는 경우 - 각 주별로 바를 그림
                        const bars = [];
                        for (let row = startRow; row <= endRow; row++) {
                          const isFirstRow = row === startRow;
                          const isLastRow = row === endRow;

                          const left = isFirstRow ? startCol * cellWidth : 0;
                          const width = isFirstRow
                            ? (7 - startCol) * cellWidth
                            : isLastRow
                              ? (endCol + 1) * cellWidth
                              : 100;
                          const top = row * cellHeight + 32 + (event.row * (eventBarHeight + eventBarSpacing));

                          bars.push(
                            <div
                              key={`${event.id}-row-${row}`}
                              className="absolute pointer-events-auto cursor-pointer hover:opacity-90 transition-opacity"
                              style={{
                                left: `${left}%`,
                                width: `${width}%`,
                                top: `${top}px`,
                                height: `${eventBarHeight}px`,
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEventClick(event.id);
                              }}
                            >
                              <div
                                className="h-full px-1 flex items-center"
                                style={{
                                  backgroundColor: event.color,
                                  borderTopLeftRadius: isFirstRow ? '4px' : '0',
                                  borderBottomLeftRadius: isFirstRow ? '4px' : '0',
                                  borderTopRightRadius: isLastRow ? '4px' : '0',
                                  borderBottomRightRadius: isLastRow ? '4px' : '0',
                                }}
                              >
                                {isFirstRow && (
                                  <p className="text-white text-[9px] leading-3 overflow-hidden text-ellipsis whitespace-nowrap">
                                    {event.title}
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        }
                        return bars;
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* 주별 캘린더 */}
        {calendarView === "weekly" && (
          <div className="flex-1 overflow-hidden">
            <WeekCalendar
              currentDate={new Date(currentYear, currentMonth - 1, selectedDate)}
              events={getWeeklyEvents()}
              onEventClick={handleEventClick}
            />
          </div>
        )}

        {/* 일별 캘린더 */}
        {calendarView === "daily" && (
          <div className="flex-1 overflow-hidden">
            <DayCalendar
              currentDate={new Date(currentYear, currentMonth - 1, selectedDate)}
              events={getDailyEvents()}
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
