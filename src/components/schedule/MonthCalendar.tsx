"use client";

import React, { useState } from "react";
import { DayEventsModal } from "./DayEventsModal";

interface MonthCalendarProps {
  currentYear: number;
  currentMonth: number;
  selectedDate: number;
  monthSchedule: any;
  onDateSelect: (date: number) => void;
  onEventClick: (eventId: string) => void;
}

export const MonthCalendar: React.FC<MonthCalendarProps> = ({
  currentYear,
  currentMonth,
  selectedDate,
  monthSchedule,
  onDateSelect,
  onEventClick,
}) => {
  const [isDayEventsModalOpen, setIsDayEventsModalOpen] = useState(false);
  const [selectedDayForModal, setSelectedDayForModal] = useState<number | null>(null);

  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1).getDay();

  // 월별 뷰용 이벤트 변환 (날짜 범위 바 형태)
  const getMonthlyEvents = () => {
    const eventBars: Array<{
      id: string;
      title: string;
      startDay: number;
      endDay: number;
      startWeek: number;
      color: string;
      row: number;
    }> = [];

    if (!monthSchedule) return eventBars;
    if (!Array.isArray(monthSchedule)) return eventBars;
    if (monthSchedule.length === 0) return eventBars;

    const firstItem = monthSchedule[0];
    const schedules: any[] = [];

    if (firstItem && typeof firstItem === 'object' && 'schedules' in firstItem && Array.isArray(firstItem.schedules)) {
      monthSchedule.forEach((dayData: any) => {
        schedules.push(...dayData.schedules);
      });
    } else {
      schedules.push(...monthSchedule);
    }

    const uniqueSchedules = schedules.filter((schedule, index, self) =>
      index === self.findIndex(s => s.id === schedule.id)
    );

    uniqueSchedules.sort((a, b) => {
      const aDuration = new Date(a.endDate || a.startDate).getTime() - new Date(a.startDate).getTime();
      const bDuration = new Date(b.endDate || b.startDate).getTime() - new Date(b.startDate).getTime();
      return bDuration - aDuration;
    });

    const weekRows: Map<number, Array<{ startDay: number; endDay: number }>> = new Map();

    uniqueSchedules.forEach((schedule: any) => {
      const startDate = new Date(schedule.startDate || schedule.scheduleDate);
      const endDate = new Date(schedule.endDate || schedule.startDate || schedule.scheduleDate);

      const monthStart = new Date(currentYear, currentMonth - 1, 1);
      const monthEnd = new Date(currentYear, currentMonth, 0);

      const displayStart = startDate > monthStart ? startDate : monthStart;
      const displayEnd = endDate < monthEnd ? endDate : monthEnd;

      if (displayStart > monthEnd || displayEnd < monthStart) {
        return;
      }

      const startDay = displayStart.getDate();
      const endDay = displayEnd.getDate();

      const emptyDays = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
      const startWeek = Math.floor((startDay - 1 + emptyDays) / 7);
      const endWeek = Math.floor((endDay - 1 + emptyDays) / 7);

      for (let week = startWeek; week <= endWeek; week++) {
        if (!weekRows.has(week)) {
          weekRows.set(week, []);
        }

        const weekEvents = weekRows.get(week)!;
        const weekStartDay = week === startWeek ? startDay : (week * 7 - emptyDays + 1);
        const weekEndDay = week === endWeek ? endDay : Math.min((week + 1) * 7 - emptyDays, daysInMonth);

        let row = 0;
        while (row < weekEvents.length) {
          const existingEvent = weekEvents[row];
          if (weekStartDay > existingEvent.endDay || weekEndDay < existingEvent.startDay) {
            break;
          }
          row++;
        }

        if (!weekEvents[row]) {
          weekEvents[row] = { startDay: weekStartDay, endDay: weekEndDay };
        }

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

  // 특정 날짜의 모든 이벤트 가져오기
  const getEventsForDay = (day: number) => {
    if (!monthSchedule) return [];
    if (!Array.isArray(monthSchedule)) return [];
    if (monthSchedule.length === 0) return [];

    const firstItem = monthSchedule[0];
    const schedules: any[] = [];

    if (firstItem && typeof firstItem === 'object' && 'schedules' in firstItem && Array.isArray(firstItem.schedules)) {
      monthSchedule.forEach((dayData: any) => {
        schedules.push(...dayData.schedules);
      });
    } else {
      schedules.push(...monthSchedule);
    }

    const uniqueSchedules = schedules.filter((schedule, index, self) =>
      index === self.findIndex(s => s.id === schedule.id)
    );

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
    const totalCells = 35;
    const eventBars = getMonthlyEvents();

    const emptyDays = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    for (let i = 0; i < emptyDays; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border-r border-b border-[#f1f1f1]" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDay(day);
      const hasMoreThan2Events = dayEvents.length > 2;

      days.push(
        <div
          key={day}
          className="h-24 border-r border-b border-[#f1f1f1] p-1 bg-white cursor-pointer hover:bg-surface-2 relative"
          onClick={() => onDateSelect(day)}
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

    const remainingCells = totalCells - days.length;
    for (let i = 0; i < remainingCells; i++) {
      days.push(<div key={`empty-end-${i}`} className="h-24 border-r border-b border-[#f1f1f1] opacity-0" />);
    }

    return { days, eventBars, emptyDays };
  };

  const { days, eventBars, emptyDays } = renderCalendar();

  return (
    <>
      <DayEventsModal
        isOpen={isDayEventsModalOpen}
        onClose={() => {
          setIsDayEventsModalOpen(false);
          setSelectedDayForModal(null);
        }}
        date={selectedDayForModal ? new Date(currentYear, currentMonth - 1, selectedDayForModal) : new Date()}
        events={selectedDayForModal ? getEventsForDay(selectedDayForModal) : []}
        onEventClick={onEventClick}
      />

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

        {/* Calendar Grid */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-7 relative">
            {days}

            {/* 이벤트 바 레이어 */}
            <div className="absolute inset-0 pointer-events-none">
              {eventBars.filter(event => event.row < 2).map((event, index) => {
                const cellWidth = 100 / 7;
                const cellHeight = 96;
                const eventBarHeight = 16;
                const eventBarSpacing = 2;

                const startCol = (event.startDay - 1 + emptyDays) % 7;
                const endCol = (event.endDay - 1 + emptyDays) % 7;
                const startRow = event.startWeek;
                const endRow = Math.floor((event.endDay - 1 + emptyDays) / 7);

                if (startRow === endRow) {
                  const left = startCol * cellWidth;
                  const width = (endCol - startCol + 1) * cellWidth;
                  const top = startRow * cellHeight + 32 + (event.row * (eventBarHeight + eventBarSpacing));

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
                        onEventClick(event.id);
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
                          onEventClick(event.id);
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
    </>
  );
};
