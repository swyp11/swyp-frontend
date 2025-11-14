"use client";

import React from "react";
import Image from "next/image";
import { getAssetPath } from "@/utils/assetPath";

interface Event {
  id: string;
  title: string;
  color: string;
  startDate: string;
  endDate: string;
}

interface DayEventsModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
  events: Event[];
  onEventClick: (eventId: string) => void;
}

export const DayEventsModal: React.FC<DayEventsModalProps> = ({
  isOpen,
  onClose,
  date,
  events,
  onEventClick,
}) => {
  if (!isOpen) return null;

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
    return `${year}년 ${month}월 ${day}일 (${dayOfWeek})`;
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[60] animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-md bg-white rounded-2xl shadow-2xl z-[60] max-h-[80vh] flex flex-col animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-subtlest">
          <h2 className="body-1-medium text-on-surface">
            {formatDate(date)}
          </h2>
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center"
          >
            <Image
              src={getAssetPath("/img/close.svg")}
              alt="닫기"
              width={24}
              height={24}
            />
          </button>
        </div>

        {/* Events List */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {events.length === 0 ? (
            <div className="flex items-center justify-center py-10">
              <p className="body-2 text-on-surface-subtle">
                일정이 없습니다.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {events.map((event) => {
                const startDate = new Date(event.startDate);
                const endDate = new Date(event.endDate);
                const isSameDay = startDate.toDateString() === endDate.toDateString();

                return (
                  <div
                    key={event.id}
                    onClick={() => {
                      onEventClick(event.id);
                      onClose();
                    }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-surface-2 cursor-pointer hover:bg-surface-3 transition-colors"
                  >
                    <div
                      className="w-1 h-full rounded-full flex-shrink-0"
                      style={{ backgroundColor: event.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="body-2-medium text-on-surface mb-1">
                        {event.title}
                      </p>
                      <p className="label-1 text-on-surface-subtle">
                        {isSameDay
                          ? `${startDate.getMonth() + 1}/${startDate.getDate()}`
                          : `${startDate.getMonth() + 1}/${startDate.getDate()} - ${endDate.getMonth() + 1}/${endDate.getDate()}`
                        }
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
