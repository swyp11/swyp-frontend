"use client";

import React, { useState } from "react";
import { DayEventsModal } from "./DayEventsModal";

interface Event {
  id: string;
  title: string;
  startTime: number; // 0-23 (hour)
  endTime: number; // 0-23 (hour)
  dayOfWeek: number; // 0-6 (Mon-Sun)
  color?: string;
}

interface ProcessedEvent {
  id: string;
  title: string;
  dayOfWeek: number;
  startTime: number;
  duration: number; // hours
  color?: string;
  row: number; // 세로 배치 행 번호
}

interface WeekCalendarProps {
  currentDate: Date;
  weekSchedule: any;
  onEventClick?: (eventId: string) => void;
}

export const WeekCalendar: React.FC<WeekCalendarProps> = ({
  currentDate,
  weekSchedule,
  onEventClick,
}) => {
  const [isDayEventsModalOpen, setIsDayEventsModalOpen] = useState(false);
  const [selectedDayForModal, setSelectedDayForModal] = useState<Date | null>(null);

  // 주별 뷰용 이벤트 변환
  const getWeeklyEvents = (): Event[] => {
    if (!weekSchedule) return [];
    if (!Array.isArray(weekSchedule)) return [];
    if (weekSchedule.length === 0) return [];

    // 현재 주의 시작일(월요일)과 종료일(일요일) 계산
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

  const events = getWeeklyEvents();

  // 현재 주의 시작일(월요일) 계산
  const getWeekStart = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    d.setDate(d.getDate() + diff);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const weekStart = getWeekStart(currentDate);

  // 현재 주의 날짜들 생성
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    return date;
  });

  const weekdayLabels = ["월", "화", "수", "목", "금", "토", "일"];

  // 시간 라벨 생성 (0시~23시)
  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = i;
    if (hour === 0) return "12 AM";
    if (hour === 12) return "12 PM";
    if (hour < 12) return `${hour} AM`;
    return `${hour - 12} PM`;
  });

  // 이벤트를 요일별로 그룹화하고 세로 배치 행 번호 할당
  const processEvents = (): ProcessedEvent[] => {
    const processed: ProcessedEvent[] = [];
    const dayRows: Map<number, Array<{ startTime: number; endTime: number }>> = new Map();

    // 각 요일별로 초기화
    for (let day = 0; day < 7; day++) {
      dayRows.set(day, []);
    }

    // duration 기준 내림차순 정렬 (긴 일정이 먼저)
    const sortedEvents = [...events].sort((a, b) => {
      const aDuration = a.endTime - a.startTime;
      const bDuration = b.endTime - b.startTime;
      return bDuration - aDuration;
    });

    sortedEvents.forEach(event => {
      const dayOfWeek = event.dayOfWeek;
      const rows = dayRows.get(dayOfWeek)!;

      // 겹치지 않는 행 찾기
      let row = 0;
      while (row < rows.length) {
        const existingEvent = rows[row];
        // 시간이 겹치지 않으면 이 행 사용 가능
        if (event.startTime >= existingEvent.endTime || event.endTime <= existingEvent.startTime) {
          break;
        }
        row++;
      }

      // 해당 행에 이벤트 추가
      if (!rows[row]) {
        rows[row] = { startTime: event.startTime, endTime: event.endTime };
      }

      processed.push({
        id: event.id,
        title: event.title,
        dayOfWeek: event.dayOfWeek,
        startTime: event.startTime,
        duration: event.endTime - event.startTime,
        color: event.color,
        row,
      });
    });

    return processed;
  };

  const processedEvents = processEvents();

  // 특정 요일의 모든 이벤트 가져오기
  const getEventsForDay = (dayIndex: number) => {
    return processedEvents
      .filter(event => event.dayOfWeek === dayIndex)
      .map(event => ({
        id: event.id,
        title: event.title,
        color: event.color || "#f3335d",
        startDate: "", // 필요시 추가
        endDate: "", // 필요시 추가
      }));
  };

  return (
    <>
      <DayEventsModal
        isOpen={isDayEventsModalOpen}
        onClose={() => {
          setIsDayEventsModalOpen(false);
          setSelectedDayForModal(null);
        }}
        date={selectedDayForModal || new Date()}
        events={selectedDayForModal ? getEventsForDay(weekDays.findIndex(d => d.toDateString() === selectedDayForModal.toDateString())) : []}
        onEventClick={onEventClick || (() => {})}
      />

      <div className="flex flex-col bg-white w-full h-full overflow-hidden">
        {/* 요일 헤더 */}
        <div className="border-b border-[#f1f1f1] flex-none">
          <div className="flex w-full">
            {/* 빈 셀 (시간 열) */}
            <div className="flex-none w-[51.429px] h-7 bg-white" />

            {/* 요일 헤더 */}
            {weekDays.map((date, index) => (
              <div
                key={index}
                className="flex-1 h-7 flex items-center justify-center bg-white border-r border-[#f1f1f1]"
              >
                <span className="label-2 text-on-surface-subtle">
                  {weekdayLabels[index]} {date.getDate()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 캘린더 그리드 - 스크롤 가능 */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex w-full relative">
            {/* 시간 열 */}
            <div className="flex-none w-[51.429px] flex flex-col border-r border-[#f1f1f1]">
              {hours.map((hour, index) => (
                <div
                  key={index}
                  className="flex items-start justify-end px-1.5 pt-1 h-[60px] border-b border-[#f1f1f1]"
                >
                  <p className="label-2 text-on-surface-subtle text-right">
                    {hour}
                  </p>
                </div>
              ))}
            </div>

            {/* 요일 열들 */}
            {weekDays.map((date, dayIndex) => {
              const dayEvents = processedEvents.filter(e => e.dayOfWeek === dayIndex);
              const hasMoreThan2Events = dayEvents.length > 2;

              return (
                <div key={dayIndex} className="flex-1 flex flex-col border-r border-[#f1f1f1] relative">
                  {/* 시간 셀들 (배경) */}
                  {hours.map((_, hourIndex) => (
                    <div
                      key={hourIndex}
                      className="h-[60px] border-b border-[#f1f1f1]"
                    />
                  ))}

                  {/* 이벤트 바 레이어 */}
                  <div className="absolute inset-0 pointer-events-none">
                    {processedEvents
                      .filter(event => event.dayOfWeek === dayIndex && event.row < 2)
                      .map((event) => {
                        const cellHeight = 60; // px
                        const eventBarWidth = 47; // %
                        const columnWidth = 50; // % (각 열의 시작 위치)

                        const top = event.startTime * cellHeight;
                        const height = event.duration * cellHeight;
                        const left = event.row * columnWidth;

                        return (
                          <div
                            key={event.id}
                            className="absolute pointer-events-auto cursor-pointer hover:opacity-90 transition-opacity rounded-xs overflow-hidden"
                            style={{
                              backgroundColor: event.color || "#f3335d",
                              top: `${top}px`,
                              height: `${height}px`,
                              left: `${left}%`,
                              width: `${eventBarWidth}%`,
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              onEventClick?.(event.id);
                            }}
                          >
                            <div className="px-1 py-0.5">
                              <p className="text-white text-[10px] leading-3 overflow-hidden text-ellipsis whitespace-nowrap">
                                {event.title}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  {/* 더보기 버튼 */}
                  {hasMoreThan2Events && (
                    <div className="absolute top-2 right-2 z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDayForModal(date);
                          setIsDayEventsModalOpen(true);
                        }}
                        className="bg-surface-2 hover:bg-surface-3 rounded-xs px-1.5 py-0.5 transition-colors pointer-events-auto"
                      >
                        <p className="text-on-surface-subtle text-[9px] leading-3">
                          +{dayEvents.length - 2}
                        </p>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
