"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarSelect } from "../../../components/ui/CalendarSelect";

export default function AddSchedulePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("2025. 10. 25");
  const [endDate, setEndDate] = useState("2025. 10. 25");
  const [startTime, setStartTime] = useState("오전 9시");
  const [endTime, setEndTime] = useState("오전 10시");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    // TODO: 일정 저장 로직 추가
    console.log({
      title,
      description,
      startDate,
      endDate,
      startTime,
      endTime,
    });

    // 완료 후 캘린더로 돌아가기
    router.back();
  };

  return (
    <div
      className="flex flex-col h-screen bg-white"
      style={{ width: "var(--app-width)", maxWidth: "var(--app-width)", margin: "0 auto" }}
    >
      {/* System Bar */}
      <div className="h-[44px] shrink-0 bg-white" />

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-[13px] border-b border-[#f1f1f1]">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z"
              fill="#1F1E1E"
            />
          </svg>
        </button>
        <h1 className="body-3 font-semibold text-on-surface">드레스샵 찾기</h1>
        <div className="w-10 h-10 opacity-0" />
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          {/* 날짜 섹션 */}
          <div className="space-y-1">
            <label className="body-3 font-medium text-on-surface">날짜</label>
            <div className="flex items-center gap-2">
              <CalendarSelect
                value={startDate}
                onClick={() => {
                  // TODO: 날짜 선택 모달 열기
                }}
                className="flex-1 h-12"
              />
              <span className="body-2-medium text-on-surface">-</span>
              <CalendarSelect
                value={endDate}
                onClick={() => {
                  // TODO: 날짜 선택 모달 열기
                }}
                className="flex-1 h-12"
              />
            </div>
          </div>

          {/* 시간 섹션 */}
          <div className="space-y-1">
            <label className="body-3 font-medium text-on-surface">시간</label>
            <div className="flex items-center gap-2">
              <CalendarSelect
                value={startTime}
                onClick={() => {
                  // TODO: 시간 선택 모달 열기
                }}
                className="flex-1 h-12"
              />
              <span className="body-2-medium text-on-surface">-</span>
              <CalendarSelect
                value={endTime}
                onClick={() => {
                  // TODO: 시간 선택 모달 열기
                }}
                className="flex-1 h-12"
              />
            </div>
          </div>

          {/* 제목 섹션 */}
          <div className="field-label">
            <div className="field-label-text">
              <span>제목</span>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목"
              className="field"
            />
          </div>

          {/* 설명 섹션 */}
          <div className="field-label">
            <div className="field-label-text">
              <span>설명</span>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="설명"
              rows={5}
              className="field field-textbox resize-none"
            />
          </div>
        </div>

        {/* 완료 버튼 */}
        <div className="p-4 border-t border-[#f1f1f1]">
          <button
            type="submit"
            className="w-full h-11 bg-primary rounded-sm flex items-center justify-center"
          >
            <span className="body-2-medium text-white">완료</span>
          </button>
        </div>
      </form>
    </div>
  );
}
