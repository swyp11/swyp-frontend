"use client";

import React from "react";

interface Event {
  id: string;
  title: string;
  startTime: number; // 0-23 (hour)
  endTime: number; // 0-23 (hour)
  dayOfWeek: number; // 0-6 (Mon-Sun)
  color?: string;
}

interface WeekCalendarProps {
  currentDate: Date;
  events?: Event[];
}

export const WeekCalendar: React.FC<WeekCalendarProps> = ({
  currentDate,
  events = [],
}) => {
  // 현재 주의 시작일(월요일) 계산
  const getWeekStart = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = day === 0 ? -6 : 1 - day; // 월요일 시작
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

  // 시간 라벨 생성 (12 AM부터)
  const hours = Array.from({ length: 14 }, (_, i) => {
    const hour = i;
    if (hour === 0) return "12 AM";
    if (hour === 12) return "12 PM";
    if (hour < 12) return `${hour} AM`;
    return `${hour - 12} PM`;
  });

  // 해당 요일과 시간에 맞는 이벤트 찾기
  const getEventsForCell = (dayIndex: number, hour: number) => {
    return events.filter(
      (event) =>
        event.dayOfWeek === dayIndex &&
        event.startTime <= hour &&
        event.endTime > hour
    );
  };

  return (
    <div className="flex flex-col bg-white w-full h-full overflow-hidden">
      {/* 요일 헤더 */}
      <div className="border-b border-[#f1f1f1] flex-none">
        <div className="flex w-full">
          {/* 빈 셀 (시간 열) */}
          <div className="flex-none w-[51.429px] h-7 bg-white opacity-0" />

          {/* 요일 헤더 */}
          {weekDays.map((date, index) => (
            <div
              key={index}
              className="flex-1 h-7 flex items-center justify-center bg-white"
            >
              <span className="label-2 text-on-surface-subtle">
                {weekdayLabels[index]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 캘린더 그리드 - 스크롤 가능 */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex w-full">
          {/* 시간 열 */}
          <div className="flex-none w-[51.429px] flex flex-col border-r border-[#f1f1f1]">
            <div className="flex items-center justify-end px-1.5 py-1 h-[79.2px]">
              <p className="label-2 text-on-surface-subtle opacity-0">
                12 AM
              </p>
            </div>
            {hours.slice(1).map((hour, index) => (
              <div
                key={index}
                className="flex items-center justify-end px-1.5 py-1 h-[79.2px] border-t border-[#f1f1f1]"
              >
                <p className="label-2 text-on-surface-subtle text-right">
                  {hour}
                </p>
              </div>
            ))}
          </div>

          {/* 요일 열들 */}
          {weekDays.map((date, dayIndex) => (
            <div key={dayIndex} className="flex-1 flex flex-col border-r border-[#f1f1f1]">
              {/* 날짜 셀 */}
              <div className="flex items-center justify-center p-1 h-[79.2px]">
                <div className="flex items-center justify-center rounded-full w-5 h-5">
                  <span className="label-2 text-on-surface-subtle">
                    {date.getDate()}
                  </span>
                </div>
              </div>

              {/* 시간 셀들 */}
              {hours.slice(1).map((_, hourIndex) => {
                const cellEvents = getEventsForCell(dayIndex, hourIndex + 1);

                return (
                  <div
                    key={hourIndex}
                    className="relative border-t border-[#f1f1f1] h-[79.2px] p-1"
                  >
                    {cellEvents.length > 0 && (
                      <div className="flex gap-0.5 h-full">
                        {cellEvents.map((event) => (
                          <div
                            key={event.id}
                            className="flex-1 bg-alert rounded-xs px-0.5 py-0.5 overflow-hidden"
                            style={{
                              backgroundColor: event.color || "#f3335d",
                            }}
                          >
                            <p
                              className="text-white text-[11px] font-medium leading-4 overflow-hidden text-ellipsis whitespace-nowrap"
                              style={{
                                fontFamily:
                                  "'Roboto', 'Noto Sans KR', sans-serif",
                                fontSize: "11px",
                                letterSpacing: "0.5px",
                              }}
                            >
                              {event.title}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
