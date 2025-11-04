"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { WeekCalendar } from "../../components/schedule/WeekCalendar";
import { DayCalendar } from "../../components/schedule/DayCalendar";
import { ViewSelector, CalendarView } from "../../components/schedule/ViewSelector";
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

export default function SchedulePage() {
  const router = useRouter();
  const [currentMonth, setCurrentMonth] = useState(10);
  const [currentYear, setCurrentYear] = useState(2024);
  const [selectedDate, setSelectedDate] = useState(10);
  const [calendarView, setCalendarView] = useState<CalendarView>("weekly");
  const [events, setEvents] = useState<Event[]>([]);

  // 샘플 이벤트 데이터 (월별 뷰용)
  const sampleMonthlyEvents: { [key: number]: string[] } = {
    4: ["드레스 투어", "스튜디오 예약"],
    10: ["웨딩 플래너 미팅"],
    15: ["예식장 방문"],
    20: ["답례품 구매"],
  };

  // 샘플 이벤트 데이터 (주별 뷰용)
  const sampleWeekEvents = [
    {
      id: "1",
      title: "드레스 투어",
      startTime: 0,
      endTime: 2,
      dayOfWeek: 3, // 목요일
      color: "#f3335d",
    },
    {
      id: "2",
      title: "드레스 투어",
      startTime: 0,
      endTime: 1,
      dayOfWeek: 4, // 금요일
      color: "#f3335d",
    },
    {
      id: "3",
      title: "드레스 투어",
      startTime: 0,
      endTime: 1,
      dayOfWeek: 4, // 금요일
      color: "#f3335d",
    },
  ];

  // 샘플 이벤트 데이터 (일별 뷰용)
  const sampleDayEvents = [
    {
      id: "1",
      title: "드레스 투어",
      startTime: 10,
      duration: 2, // 2시간
      color: "#f3335d",
    },
    {
      id: "2",
      title: "스튜디오 촬영",
      startTime: 14,
      duration: 3, // 3시간
      color: "#562699",
    },
    {
      id: "3",
      title: "웨딩 플래너 미팅",
      startTime: 18,
      duration: 1, // 1시간
      color: "#5bb16b",
    },
  ];

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

    events.forEach((event) => {
      const eventDate = event.startDate.getDate();
      const eventMonth = event.startDate.getMonth() + 1;
      const eventYear = event.startDate.getFullYear();

      if (eventMonth === currentMonth && eventYear === currentYear) {
        if (!monthlyEventsMap[eventDate]) {
          monthlyEventsMap[eventDate] = [];
        }
        monthlyEventsMap[eventDate].push(event.title);
      }
    });

    return monthlyEventsMap;
  };

  // 주별 뷰용 이벤트 변환
  const getWeeklyEvents = () => {
    return events.map((event) => ({
      id: event.id,
      title: event.title,
      startTime: event.startTime,
      endTime: event.endTime,
      dayOfWeek: event.startDate.getDay(),
      color: event.color,
    }));
  };

  // 일별 뷰용 이벤트 변환
  const getDailyEvents = () => {
    return events
      .filter((event) => {
        const eventDate = event.startDate.getDate();
        const eventMonth = event.startDate.getMonth() + 1;
        const eventYear = event.startDate.getFullYear();
        return (
          eventDate === selectedDate &&
          eventMonth === currentMonth &&
          eventYear === currentYear
        );
      })
      .map((event) => ({
        id: event.id,
        title: event.title,
        startTime: event.startTime,
        duration: event.endTime - event.startTime,
        color: event.color,
      }));
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
            <div className="flex items-center gap-2">
              <span className="body-2-medium text-[#787878]">결혼식까지</span>
              <span className="body-2-medium text-primary font-bold">D-99</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                  fill="#1F1E1E"
                />
              </svg>
            </div>
            <ViewSelector
              currentView={calendarView}
              onViewChange={setCalendarView}
            />
          </div>
        </div>

        {/* Month Navigator - 월별 뷰에서만 표시 */}
        {calendarView === "monthly" && (
          <div className="flex items-center justify-between px-2 pb-5">
            <button
              onClick={handlePrevMonth}
              className="w-10 h-10 bg-surface-2 rounded-lg flex items-center justify-center"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z"
                  fill="#1F1E1E"
                />
              </svg>
            </button>

            <button className="bg-surface-2 rounded-lg px-5 py-2 flex items-center gap-1">
              <span className="title-2 text-on-surface">{currentMonth}월</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M7 10l5 5 5-5z" fill="#1F1E1E" />
              </svg>
            </button>

            <button
              onClick={handleNextMonth}
              className="w-10 h-10 bg-surface-2 rounded-lg flex items-center justify-center"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9.29 6.71L10.7 5.3L17.4 12L10.7 18.7L9.29 17.29L14.58 12L9.29 6.71Z"
                  fill="#1F1E1E"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Week Navigator - 주별 뷰에서만 표시 */}
        {calendarView === "weekly" && (
          <div className="flex items-center justify-between px-2 pb-5">
            <button
              onClick={handlePrevWeek}
              className="w-10 h-10 bg-surface-2 rounded-lg flex items-center justify-center"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z"
                  fill="#1F1E1E"
                />
              </svg>
            </button>

            <button className="bg-surface-2 rounded-lg px-5 py-2 flex items-center gap-1">
              <span className="title-2 text-on-surface">{currentMonth}월</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M7 10l5 5 5-5z" fill="#1F1E1E" />
              </svg>
            </button>

            <button
              onClick={handleNextWeek}
              className="w-10 h-10 bg-surface-2 rounded-lg flex items-center justify-center"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9.29 6.71L10.7 5.3L17.4 12L10.7 18.7L9.29 17.29L14.58 12L9.29 6.71Z"
                  fill="#1F1E1E"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Day Navigator - 일별 뷰에서만 표시 */}
        {calendarView === "daily" && (
          <div className="flex items-center justify-between px-2 pb-5">
            <button
              onClick={handlePrevDay}
              className="w-10 h-10 bg-surface-2 rounded-lg flex items-center justify-center"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z"
                  fill="#1F1E1E"
                />
              </svg>
            </button>

            <button className="bg-surface-2 rounded-lg px-5 py-2 flex items-center gap-1">
              <span className="title-2 text-on-surface">
                {currentMonth}월 {selectedDate}일
              </span>
            </button>

            <button
              onClick={handleNextDay}
              className="w-10 h-10 bg-surface-2 rounded-lg flex items-center justify-center"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9.29 6.71L10.7 5.3L17.4 12L10.7 18.7L9.29 17.29L14.58 12L9.29 6.71Z"
                  fill="#1F1E1E"
                />
              </svg>
            </button>
          </div>
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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
            fill="#FFFFFF"
          />
        </svg>
      </button>
    </div>
  );
}
