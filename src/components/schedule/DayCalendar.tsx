"use client";

import React from "react";

interface Event {
  id: string;
  title: string;
  startTime: number; // 0-23 (hour)
  duration: number; // 시간 단위 (예: 2 = 2시간)
  color?: string;
}

interface DayCalendarProps {
  currentDate: Date;
  events?: Event[];
}

export const DayCalendar: React.FC<DayCalendarProps> = ({
  currentDate,
  events = [],
}) => {
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
                {getEventsForHour(index).map((event) => (
                  <div
                    key={event.id}
                    className="absolute left-0 right-0 mx-2 rounded-xs overflow-hidden"
                    style={{
                      backgroundColor: event.color || "#f3335d",
                      height: `${calculateEventHeight(event.duration)}px`,
                      top: 0,
                    }}
                  >
                    <div className="px-2 py-1.5">
                      <p
                        className="text-white text-[11px] font-medium leading-4"
                        style={{
                          fontFamily: "'Roboto', 'Noto Sans KR', sans-serif",
                          fontSize: "11px",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {event.title}
                      </p>
                      <p className="text-white text-[10px] opacity-90 mt-0.5">
                        {hour} - {hours[index + event.duration] || ""}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
