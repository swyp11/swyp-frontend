"use client";

import React, { useState } from "react";

interface Event {
  id: string;
  title: string;
  startTime: number; // 0-23 (hour)
  duration: number; // 시간 단위 (예: 2 = 2시간)
  color?: string;
}

interface DayCalendarProps {
  currentDate: Date;
  daySchedule: any;
  onEventClick?: (eventId: string) => void;
}

export const DayCalendar: React.FC<DayCalendarProps> = ({
  currentDate,
  daySchedule,
  onEventClick,
}) => {
  // 일별 뷰용 이벤트 변환
  const getDailyEvents = (): Event[] => {
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

  const events = getDailyEvents();

  // 시간 라벨 생성 (12 AM부터)
  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = i;
    if (hour === 0) return "12 AM";
    if (hour === 12) return "12 PM";
    if (hour < 12) return `${hour} AM`;
    return `${hour - 12} PM`;
  });

  // 요일 라벨
  const weekdayLabels = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = currentDate.getDay();

  // 해당 시간에 시작하는 이벤트 찾기
  const getEventsForHour = (hour: number) => {
    return events.filter((event) => event.startTime === hour);
  };

  // 이벤트 블록 높이 계산 (79.2px per hour)
  const calculateEventHeight = (duration: number) => {
    return duration * 79.2;
  };

  // 같은 시간대에 겹치는 이벤트 수 계산 및 위치 결정
  const getEventLayout = (event: Event, eventsAtHour: Event[]) => {
    const index = eventsAtHour.findIndex((e) => e.id === event.id);
    const totalEvents = eventsAtHour.length;

    if (totalEvents === 1) {
      // 일정이 1개일 때: 좌우 8px 여백
      return {
        width: "calc(100% - 16px)",
        left: "8px",
        right: "8px",
        marginRight: "0px"
      };
    }

    // 여러 일정이 있을 때: 각 일정 사이 4px 간격
    const isLast = index === totalEvents - 1;
    const widthPercent = 100 / totalEvents;
    const gapSize = 4; // 일정 사이 간격

    return {
      width: `calc(${widthPercent}% - ${isLast ? 8 : gapSize}px)`,
      left: `calc(${widthPercent * index}% + 8px)`,
      right: "auto",
      marginRight: isLast ? "0px" : `${gapSize}px`
    };
  };


  return (
    <div className="flex flex-col bg-white w-full h-full overflow-hidden">
      {/* 캘린더 그리드 - 스크롤 가능 */}
      <div className="flex-1 overflow-y-auto">
        <div className="relative">
          {/* 시간 그리드 배경 */}
          {hours.map((hour, index) => (
            <div
              key={index}
              className="flex border-b border-[#f1f1f1] h-[79.2px]"
            >
              {/* 시간 라벨 */}
              <div className="flex-none w-[60px] flex items-start justify-end pr-3 pt-1">
                <p className="label-2 text-on-surface-subtle">{hour}</p>
              </div>

              {/* 이벤트 영역 */}
              <div className="flex-1 relative">
                {/* 해당 시간에 시작하는 이벤트들 */}
                {(() => {
                  const eventsAtHour = getEventsForHour(index);
                  return eventsAtHour.map((event) => {
                    const layout = getEventLayout(event, eventsAtHour);
                    return (
                      <div
                        key={event.id}
                        className="absolute rounded-xs overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => onEventClick?.(event.id)}
                        style={{
                          backgroundColor: event.color || "#f3335d",
                          height: `${calculateEventHeight(event.duration)}px`,
                          top: 0,
                          width: layout.width,
                          left: layout.left,
                          right: layout.right,
                          marginRight: layout.marginRight,
                        }}
                      >
                        <div className="px-2 py-1.5">
                          <p
                            className="text-white text-[11px] font-medium leading-4 truncate"
                            style={{
                              fontFamily: "'Roboto', 'Noto Sans KR', sans-serif",
                              fontSize: "11px",
                              letterSpacing: "0.5px",
                            }}
                          >
                            {event.title}
                          </p>
                          <p className="text-white text-[10px] opacity-90 mt-0.5 truncate">
                            {hour} - {hours[index + event.duration] || ""}
                          </p>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
