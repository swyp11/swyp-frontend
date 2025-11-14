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

interface ProcessedEvent {
  id: string;
  title: string;
  startDayOfWeek: number;
  endDayOfWeek: number;
  startTime: number;
  endTime: number;
  color?: string;
}

interface WeekCalendarProps {
  currentDate: Date;
  events?: Event[];
  onEventClick?: (eventId: string) => void;
}

export const WeekCalendar: React.FC<WeekCalendarProps> = ({
  currentDate,
  events = [],
  onEventClick,
}) => {
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

  // 시간 라벨 생성 (12 AM부터)
  const hours = Array.from({ length: 14 }, (_, i) => {
    const hour = i;
    if (hour === 0) return "12 AM";
    if (hour === 12) return "12 PM";
    if (hour < 12) return `${hour} AM`;
    return `${hour - 12} PM`;
  });

  // 같은 ID의 이벤트들을 하나로 합치기
  const processEvents = (): ProcessedEvent[] => {
    const eventMap = new Map<string, Event[]>();

    // ID별로 그룹화
    events.forEach(event => {
      if (!eventMap.has(event.id)) {
        eventMap.set(event.id, []);
      }
      eventMap.get(event.id)!.push(event);
    });

    // 각 그룹을 하나의 연결된 이벤트로 변환
    const processed: ProcessedEvent[] = [];
    eventMap.forEach((eventGroup, id) => {
      const sortedEvents = eventGroup.sort((a, b) => a.dayOfWeek - b.dayOfWeek);
      const firstEvent = sortedEvents[0];
      const lastEvent = sortedEvents[sortedEvents.length - 1];

      processed.push({
        id,
        title: firstEvent.title,
        startDayOfWeek: firstEvent.dayOfWeek,
        endDayOfWeek: lastEvent.dayOfWeek,
        startTime: firstEvent.startTime,
        endTime: lastEvent.endTime,
        color: firstEvent.color,
      });
    });

    return processed;
  };

  const processedEvents = processEvents();

  // 해당 요일과 시간에 맞는 이벤트 찾기 (연결된 이벤트 기준)
  const getEventsForCell = (dayIndex: number, hour: number) => {
    return processedEvents.filter(
      (event) =>
        event.startDayOfWeek <= dayIndex &&
        event.endDayOfWeek >= dayIndex &&
        ((dayIndex === event.startDayOfWeek && event.startTime <= hour) ||
         (dayIndex > event.startDayOfWeek)) &&
        ((dayIndex === event.endDayOfWeek && event.endTime > hour) ||
         (dayIndex < event.endDayOfWeek))
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
                        {cellEvents.map((event) => {
                          // 이 셀이 이벤트의 시작 셀인지 확인
                          const isStartCell =
                            (dayIndex === event.startDayOfWeek && hourIndex + 1 === event.startTime) ||
                            (dayIndex > event.startDayOfWeek && hourIndex === 0);

                          // 시작 셀에만 렌더링 (CSS로 확장)
                          if (!isStartCell) return null;

                          // 이벤트가 차지하는 전체 셀 수 계산
                          const totalDays = event.endDayOfWeek - event.startDayOfWeek + 1;
                          const hoursInFirstDay = 24 - event.startTime;
                          const hoursInLastDay = event.endTime;
                          const hoursInMiddleDays = (totalDays - 2) * 24;
                          const totalHours = totalDays === 1
                            ? event.endTime - event.startTime
                            : hoursInFirstDay + hoursInMiddleDays + hoursInLastDay;

                          // width 계산 (7개 열, 각 열 사이 gap 고려)
                          const dayWidth = `calc((100% - 6 * 0.125rem) / 7)`;
                          const eventWidth = totalDays === 1
                            ? dayWidth
                            : `calc(${totalDays} * ${dayWidth} + ${totalDays - 1} * 0.125rem)`;

                          // height 계산
                          const cellHeight = 79.2; // px
                          const eventHeight = totalHours * cellHeight;

                          return (
                            <div
                              key={event.id}
                              className="absolute bg-alert rounded-xs px-0.5 py-0.5 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                              onClick={() => onEventClick?.(event.id)}
                              style={{
                                backgroundColor: event.color || "#f3335d",
                                width: eventWidth,
                                height: `${eventHeight}px`,
                                left: '0.25rem',
                                top: '0.25rem',
                                zIndex: 1,
                              }}
                            >
                              <p
                                className="text-white text-[11px] font-medium leading-4 overflow-hidden text-ellipsis"
                                style={{
                                  fontFamily: "'Roboto', 'Noto Sans KR', sans-serif",
                                  fontSize: "11px",
                                  letterSpacing: "0.5px",
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical',
                                }}
                              >
                                {event.title}
                              </p>
                            </div>
                          );
                        })}
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
