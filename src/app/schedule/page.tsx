"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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

  // 월별 뷰용 이벤트 변환
  const getMonthlyEvents = () => {
    const monthlyEventsMap: { [key: number]: Array<{ id: string; title: string }> } = {};

    if (!monthSchedule) return monthlyEventsMap;
    if (!Array.isArray(monthSchedule)) return monthlyEventsMap;
    if (monthSchedule.length === 0) return monthlyEventsMap;

    const firstItem = monthSchedule[0];

    // ScheduleMonthResponse[] 형태인 경우
    if (firstItem && typeof firstItem === 'object' && 'schedules' in firstItem && Array.isArray(firstItem.schedules)) {
      monthSchedule.forEach((dayData: any) => {
        dayData.schedules.forEach((schedule: any) => {
          // startDate부터 endDate까지 모든 날짜에 일정 추가
          const startDate = new Date(schedule.startDate);
          const endDate = new Date(schedule.endDate);

          const currentDate = new Date(startDate);
          while (currentDate <= endDate) {
            const eventDate = currentDate.getDate();
            const eventMonth = currentDate.getMonth() + 1;
            const eventYear = currentDate.getFullYear();

            if (eventMonth === currentMonth && eventYear === currentYear) {
              if (!monthlyEventsMap[eventDate]) {
                monthlyEventsMap[eventDate] = [];
              }
              // 중복 방지: 같은 ID가 이미 있는지 확인
              const isDuplicate = monthlyEventsMap[eventDate].some(e => e.id === schedule.id.toString());
              if (!isDuplicate) {
                monthlyEventsMap[eventDate].push({
                  id: schedule.id.toString(),
                  title: schedule.title
                });
              }
            }

            currentDate.setDate(currentDate.getDate() + 1);
          }
        });
      });
    }
    // ScheduleResponse[] 형태인 경우
    else {
      monthSchedule.forEach((schedule: any) => {
        // startDate부터 endDate까지 모든 날짜에 일정 추가
        const startDate = new Date(schedule.startDate || schedule.scheduleDate);
        const endDate = new Date(schedule.endDate || schedule.startDate || schedule.scheduleDate);

        const currentDate = new Date(startDate);
        while (currentDate <= endDate) {
          const eventDate = currentDate.getDate();
          const eventMonth = currentDate.getMonth() + 1;
          const eventYear = currentDate.getFullYear();

          if (eventMonth === currentMonth && eventYear === currentYear) {
            if (!monthlyEventsMap[eventDate]) {
              monthlyEventsMap[eventDate] = [];
            }
            // 중복 방지: 같은 ID가 이미 있는지 확인
            const isDuplicate = monthlyEventsMap[eventDate].some(e => e.id === schedule.id.toString());
            if (!isDuplicate) {
              monthlyEventsMap[eventDate].push({
                id: schedule.id.toString(),
                title: schedule.title
              });
            }
          }

          currentDate.setDate(currentDate.getDate() + 1);
        }
      });
    }

    return monthlyEventsMap;
  };

  // 주별 뷰용 이벤트 변환
  const getWeeklyEvents = () => {
    if (!weekSchedule) return [];
    if (!Array.isArray(weekSchedule)) return [];
    if (weekSchedule.length === 0) return [];

    const firstItem = weekSchedule[0];

    // ScheduleWeekResponse[] 구조인 경우
    if (firstItem && typeof firstItem === 'object' && 'schedules' in firstItem && Array.isArray(firstItem.schedules)) {
      return weekSchedule.flatMap((dayData: any) => {
        return dayData.schedules
          .filter((schedule: any) => schedule.startTime && schedule.endTime)
          .flatMap((schedule: any) => {
            const events = [];
            const startDate = new Date(schedule.startDate);
            const endDate = new Date(schedule.endDate);

            // startDate부터 endDate까지 각 날짜에 대해 이벤트 생성
            const currentDate = new Date(startDate);
            while (currentDate <= endDate) {
              const jsDayOfWeek = currentDate.getDay();
              const weekCalendarDayOfWeek = jsDayOfWeek === 0 ? 6 : jsDayOfWeek - 1;

              // 해당 날짜의 시작/종료 시간 계산
              const isFirstDay = currentDate.getTime() === startDate.getTime();
              const isLastDay = currentDate.getTime() === endDate.getTime();

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
        const startDate = new Date(schedule.startDate);
        const endDate = new Date(schedule.endDate);

        // startDate부터 endDate까지 각 날짜에 대해 이벤트 생성
        const currentDate = new Date(startDate);
        while (currentDate <= endDate) {
          const jsDayOfWeek = currentDate.getDay();
          const weekCalendarDayOfWeek = jsDayOfWeek === 0 ? 6 : jsDayOfWeek - 1;

          // 해당 날짜의 시작/종료 시간 계산
          const isFirstDay = currentDate.getTime() === startDate.getTime();
          const isLastDay = currentDate.getTime() === endDate.getTime();

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

  const renderCalendar = () => {
    const days = [];
    const totalCells = 35; // 5주
    const monthlyEvents = getMonthlyEvents();

    // 빈 셀 추가 (월요일 시작 기준)
    const emptyDays = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    for (let i = 0; i < emptyDays; i++) {
      days.push(<div key={`empty-${i}`} className="h-20 border-r border-b border-[#f1f1f1]" />);
    }

    // 날짜 셀 추가
    for (let day = 1; day <= daysInMonth; day++) {
      const hasEvents = monthlyEvents[day];

      days.push(
        <div
          key={day}
          className="h-20 border-r border-b border-[#f1f1f1] p-1 bg-white cursor-pointer hover:bg-surface-2"
          onClick={() => setSelectedDate(day)}
        >
          <div className="flex flex-col gap-1 h-full">
            <div className="flex justify-center pt-1">
              {day === selectedDate ? (
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <span className="label-2 text-white">{day}</span>
                </div>
              ) : (
                <span className="label-2 text-on-surface-subtle">{day}</span>
              )}
            </div>
            {/* 이벤트 표시 */}
            {hasEvents && (
              <div className="flex flex-col gap-0.5 px-1">
                {hasEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-alert rounded-xs px-1 py-0.5 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEventClick(event.id);
                    }}
                  >
                    <p className="text-white text-[9px] leading-3 overflow-hidden text-ellipsis whitespace-nowrap">
                      {event.title}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }

    // 남은 빈 셀 추가
    const remainingCells = totalCells - days.length;
    for (let i = 0; i < remainingCells; i++) {
      days.push(<div key={`empty-end-${i}`} className="h-20 border-r border-b border-[#f1f1f1] opacity-0" />);
    }

    return days;
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
            title={`${currentMonth}월`}
            showDropdown={true}
            currentMonth={currentMonth}
            currentYear={currentYear}
            onMonthSelect={setCurrentMonth}
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
              <div className="grid grid-cols-7">{renderCalendar()}</div>
            </div>
          </div>
        )}

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
