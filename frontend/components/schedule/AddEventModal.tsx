"use client";

import React, { useState } from "react";

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

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (event: Omit<Event, "id">) => void;
  selectedDate?: Date;
}

export const AddEventModal: React.FC<AddEventModalProps> = ({
  isOpen,
  onClose,
  onAddEvent,
  selectedDate,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(
    selectedDate ? selectedDate.toISOString().split("T")[0] : ""
  );
  const [endDate, setEndDate] = useState(
    selectedDate ? selectedDate.toISOString().split("T")[0] : ""
  );
  const [startTime, setStartTime] = useState(9);
  const [endTime, setEndTime] = useState(10);
  const [selectedColor, setSelectedColor] = useState("#f3335d");

  const colors = [
    { name: "빨강", value: "#f3335d" },
    { name: "보라", value: "#562699" },
    { name: "초록", value: "#5bb16b" },
    { name: "파랑", value: "#1e88e5" },
    { name: "주황", value: "#fb8c00" },
    { name: "핑크", value: "#e91e63" },
  ];

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !startDate || !endDate) {
      alert("제목과 날짜를 입력해주세요.");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    onAddEvent({
      title: title.trim(),
      description: description.trim(),
      startDate: start,
      endDate: end,
      startTime,
      endTime,
      color: selectedColor,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setStartDate(selectedDate ? selectedDate.toISOString().split("T")[0] : "");
    setEndDate(selectedDate ? selectedDate.toISOString().split("T")[0] : "");
    setStartTime(9);
    setEndTime(10);
    setSelectedColor("#f3335d");

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white rounded-lg w-full mx-4 max-h-[90vh] overflow-y-auto"
        style={{ maxWidth: "var(--app-width)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#f1f1f1]">
          <h2 className="title-2 text-on-surface">일정 추가</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                fill="#1F1E1E"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Title */}
          <div>
            <label className="block body-2-medium text-on-surface mb-2">
              제목
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="일정 제목을 입력하세요"
              className="w-full px-4 py-3 border border-[#e5e5e5] rounded-lg focus:outline-none focus:border-primary"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block body-2-medium text-on-surface mb-2">
              설명 (선택)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="일정 설명을 입력하세요"
              rows={3}
              className="w-full px-4 py-3 border border-[#e5e5e5] rounded-lg focus:outline-none focus:border-primary resize-none"
            />
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block body-2-medium text-on-surface mb-2">
                시작 날짜
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-3 border border-[#e5e5e5] rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block body-2-medium text-on-surface mb-2">
                종료 날짜
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-3 border border-[#e5e5e5] rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Time Range */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block body-2-medium text-on-surface mb-2">
                시작 시간
              </label>
              <select
                value={startTime}
                onChange={(e) => setStartTime(Number(e.target.value))}
                className="w-full px-4 py-3 border border-[#e5e5e5] rounded-lg focus:outline-none focus:border-primary"
              >
                {hours.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour === 0
                      ? "12 AM"
                      : hour === 12
                      ? "12 PM"
                      : hour < 12
                      ? `${hour} AM`
                      : `${hour - 12} PM`}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block body-2-medium text-on-surface mb-2">
                종료 시간
              </label>
              <select
                value={endTime}
                onChange={(e) => setEndTime(Number(e.target.value))}
                className="w-full px-4 py-3 border border-[#e5e5e5] rounded-lg focus:outline-none focus:border-primary"
              >
                {hours.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour === 0
                      ? "12 AM"
                      : hour === 12
                      ? "12 PM"
                      : hour < 12
                      ? `${hour} AM`
                      : `${hour - 12} PM`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Color Selector */}
          <div>
            <label className="block body-2-medium text-on-surface mb-2">
              색상
            </label>
            <div className="flex gap-3">
              {colors.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setSelectedColor(color.value)}
                  className={`w-10 h-10 rounded-full transition-all ${
                    selectedColor === color.value
                      ? "ring-2 ring-offset-2 ring-primary scale-110"
                      : ""
                  }`}
                  style={{ backgroundColor: color.value }}
                  aria-label={color.name}
                />
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-surface-2 rounded-lg body-2-medium text-on-surface"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-primary rounded-lg body-2-medium text-white"
            >
              추가
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
