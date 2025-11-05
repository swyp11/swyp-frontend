"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { WeekCalendar } from "../../components/schedule/WeekCalendar";
import { DayCalendar } from "../../components/schedule/DayCalendar";
import { ViewSelector, CalendarView } from "../../components/schedule/ViewSelector";
import { NavigationHeader } from "../../components/schedule/NavigationHeader";
import Image from "next/image";
import { getAssetPath } from "@/utils/assetPath";

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
              <Image
                alt=""
                src={getAssetPath("/img/edit.svg")}
                width={16}
                height={16}
              />
            </div>
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
          />
        )}

        {/* Week Navigator - 주별 뷰에서만 표시 */}
        {calendarView === "weekly" && (
          <NavigationHeader
            onPrev={handlePrevWeek}
            onNext={handleNextWeek}
            title={`${currentMonth}월`}
            showDropdown={true}
          />
        )}

        {/* Day Navigator - 일별 뷰에서만 표시 */}
        {calendarView === "daily" && (
          <NavigationHeader
            onPrev={handlePrevDay}
            onNext={handleNextDay}
            title={`${currentMonth}월 ${selectedDate}일`}
            showDropdown={false}
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
