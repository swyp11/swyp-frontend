"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

import { WeekCalendar } from "../../components/schedule/WeekCalendar";
import { DayCalendar } from "../../components/schedule/DayCalendar";
import { ViewSelector, CalendarView } from "../../components/schedule/ViewSelector";
import { NavigationHeader } from "../../components/schedule/NavigationHeader";
import Image from "next/image";
import { getAssetPath } from "@/utils/assetPath";
import { withAuth } from "@/components/auth/withAuth";
import { useAuth } from "@/contexts/AuthContext";
import { useMonthSchedule, useWeekSchedule, useDaySchedule, useCreateSchedule } from "@/hooks/useSchedule";

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
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [calendarView, setCalendarView] = useState<CalendarView>("weekly");

  // 일정 생성 mutation
  const createSchedule = useCreateSchedule();

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
  const handleQuickAdd = async (title: string, startHour: number, date: Date) => {
    try {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const startDate = `${year}-${month}-${day}`;

      await createSchedule.mutateAsync({
        title,
        startDate,
        endDate: startDate,
        startTime: `${String(startHour).padStart(2, '0')}:00:00`,
        endTime: `${String(startHour + 1).padStart(2, '0')}:00:00`,
      });
    } catch (error) {
      console.error('빠른 일정 생성 실패:', error);
      alert('일정 생성에 실패했습니다.');
    }
  };

  // 현재 날짜 문자열 (YYYY-MM-DD) - useMemo로 최적화
  const currentDateString = useMemo(() => {
    const year = currentYear;
    const month = String(currentMonth).padStart(2, '0');
    const day = String(selectedDate).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }, [currentYear, currentMonth, selectedDate]);

  // 주별 뷰를 위한 시작일 계산 (해당 주의 월요일)
  const weekStartDate = useMemo(() => {
    const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const firstMonday = firstDayOfWeek === 0 ? 2 : (2 - firstDayOfWeek);

    const currentWeek = getCurrentWeek();
    const targetDate = new Date(currentYear, currentMonth - 1, firstMonday + (currentWeek - 1) * 7);

    const year = targetDate.getFullYear();
    const month = String(targetDate.getMonth() + 1).padStart(2, '0');
    const day = String(targetDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }, [currentYear, currentMonth, selectedDate]);

  // API 호출 - 뷰에 따라 조건부로 데이터 가져오기
  console.log(`현재 날짜: ${currentYear}년 ${currentMonth}월 ${selectedDate}일, 뷰: ${calendarView}`);
  console.log(`주별 시작일: ${weekStartDate}`);

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

  console.log('API 응답 - monthSchedule:', monthSchedule);
  console.log('API 응답 - weekSchedule:', weekSchedule);
  console.log('API 응답 - daySchedule:', daySchedule);

  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1).getDay();

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
    const monthlyEventsMap: { [key: number]: string[] } = {};

    if (!monthSchedule) return monthlyEventsMap;

    console.log('월별 스케줄 원본 데이터:', monthSchedule);

    // 배열 구조 확인 - ScheduleMonthResponse[] vs ScheduleResponse[]
    if (Array.isArray(monthSchedule) && monthSchedule.length > 0) {
      // ScheduleMonthResponse[] 형태인 경우
      if (monthSchedule[0].schedules && Array.isArray(monthSchedule[0].schedules)) {
        monthSchedule.forEach((dayData: any) => {
          const scheduleDate = new Date(dayData.date);
          const eventDate = scheduleDate.getDate();
          const eventMonth = scheduleDate.getMonth() + 1;
          const eventYear = scheduleDate.getFullYear();

          if (eventMonth === currentMonth && eventYear === currentYear) {
            if (!monthlyEventsMap[eventDate]) {
              monthlyEventsMap[eventDate] = [];
            }
            dayData.schedules.forEach((schedule: any) => {
              monthlyEventsMap[eventDate].push(schedule.title);
            });
          }
        });
      }
      // ScheduleResponse[] 형태인 경우 (백엔드가 다른 구조로 반환하는 경우)
      else {
        monthSchedule.forEach((schedule: any) => {
          const scheduleDate = new Date(schedule.startDate || schedule.scheduleDate);
          const eventDate = scheduleDate.getDate();
          const eventMonth = scheduleDate.getMonth() + 1;
          const eventYear = scheduleDate.getFullYear();

          console.log(`일정 날짜: ${eventYear}-${eventMonth}-${eventDate}, 현재: ${currentYear}-${currentMonth}`);

          if (eventMonth === currentMonth && eventYear === currentYear) {
            if (!monthlyEventsMap[eventDate]) {
              monthlyEventsMap[eventDate] = [];
            }
            monthlyEventsMap[eventDate].push(schedule.title);
            console.log(`일정 추가됨: ${eventDate}일 - ${schedule.title}`);
          }
        });
      }
    }

    console.log('최종 월별 이벤트 맵:', monthlyEventsMap);
    return monthlyEventsMap;
  };

  // 주별 뷰용 이벤트 변환
  const getWeeklyEvents = () => {
    if (!weekSchedule) return [];

    console.log('주별 스케줄 원본 데이터:', weekSchedule);

    // 첫 번째 요소 확인하여 데이터 구조 판별
    if (weekSchedule.length === 0) return [];

    const firstItem = weekSchedule[0];

    // ScheduleWeekResponse[] 구조인 경우
    if (firstItem.schedules && Array.isArray(firstItem.schedules)) {
      console.log('ScheduleWeekResponse[] 구조로 처리');
      return weekSchedule.flatMap((dayData: any) => {
        // 백엔드 dayOfWeek: 1=월, 2=화, ..., 7=일
        // WeekCalendar 기대값: 0=월, 1=화, ..., 6=일
        const weekCalendarDayOfWeek = dayData.dayOfWeek - 1;

        return dayData.schedules
          .filter((schedule: any) => schedule.startTime && schedule.endTime)
          .map((schedule: any) => {
            const startHour = parseInt(schedule.startTime.split(':')[0]);
            const endHour = parseInt(schedule.endTime.split(':')[0]);

            return {
              id: schedule.id.toString(),
              title: schedule.title,
              startTime: startHour,
              endTime: endHour,
              dayOfWeek: weekCalendarDayOfWeek,
              color: schedule.color || "#f3335d",
            };
          });
      });
    }

    // ScheduleResponse[] 구조인 경우 (백엔드가 직접 배열 반환)
    console.log('ScheduleResponse[] 구조로 처리');
    return weekSchedule
      .filter((schedule: any) => schedule.startTime && schedule.endTime)
      .map((schedule: any) => {
        const scheduleDate = new Date(schedule.startDate);
        const startHour = parseInt(schedule.startTime.split(':')[0]);
        const endHour = parseInt(schedule.endTime.split(':')[0]);

        // JavaScript getDay(): 0=일, 1=월, 2=화, ..., 6=토
        // WeekCalendar 기대값: 0=월, 1=화, ..., 6=일
        const jsDayOfWeek = scheduleDate.getDay();
        const weekCalendarDayOfWeek = jsDayOfWeek === 0 ? 6 : jsDayOfWeek - 1;

        return {
          id: schedule.id.toString(),
          title: schedule.title,
          startTime: startHour,
          endTime: endHour,
          dayOfWeek: weekCalendarDayOfWeek, // 0(월) ~ 6(일)
          color: schedule.color || "#f3335d",
        };
      });
  };

  // 일별 뷰용 이벤트 변환
  const getDailyEvents = () => {
    if (!daySchedule) return [];

    console.log('일별 스케줄 원본 데이터:', daySchedule);

    return daySchedule
      .filter((schedule: any) => schedule.startTime && schedule.endTime) // 시간이 있는 일정만 표시
      .map((schedule: any) => {
        const startHour = parseInt(schedule.startTime.split(':')[0]);
        const endHour = parseInt(schedule.endTime.split(':')[0]);

        return {
          id: schedule.id.toString(),
          title: schedule.title,
          startTime: startHour,
          duration: Math.max(endHour - startHour, 1), // 최소 1시간
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
                {hasEvents.map((event, idx) => (
                  <div
                    key={idx}
                    className="bg-alert rounded-xs px-1 py-0.5 overflow-hidden"
                  >
                    <p className="text-white text-[9px] leading-3 overflow-hidden text-ellipsis whitespace-nowrap">
                      {event}
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
      {/* Content Container */}
      <div className="pb-16">

        {/* D-Day & View Selector */}
        <div className="px-2 pb-4">
          <div className="bg-surface-2 rounded-lg px-4 py-2.5 flex items-center justify-between">
            <button
              className="flex items-center gap-2"
              onClick={() => {
                if (checkAuth()) {
                  // TODO: D-day 수정 모달 열기
                  console.log("D-day 수정");
                }
              }}
            >
              <span className="body-2-medium text-[#787878]">결혼식까지</span>
              <span className="body-2-medium text-primary font-bold">D-99</span>
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
            title={`${currentMonth}월 ${getCurrentWeek()}주차`}
            showDropdown={true}
            currentMonth={currentMonth}
            currentYear={currentYear}
            currentWeek={getCurrentWeek()}
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
            />
          </div>
        )}

        {/* 일별 캘린더 */}
        {calendarView === "daily" && (
          <div className="flex-1 overflow-hidden">
            <DayCalendar
              currentDate={new Date(currentYear, currentMonth - 1, selectedDate)}
              events={getDailyEvents()}
              onQuickAdd={handleQuickAdd}
            />
          </div>
        )}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => router.push("/schedule/add")}
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
