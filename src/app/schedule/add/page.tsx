"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarSelect } from "../../../components/ui/CalendarSelect";
import Image from "next/image";
import { getAssetPath } from "@/utils/assetPath";
import { withAuth } from "@/components/auth/withAuth";
import { scheduleApi } from "@/api/schedule";

function AddSchedulePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("2025. 10. 25");
  const [endDate, setEndDate] = useState("2025. 10. 25");
  const [startTime, setStartTime] = useState("오전 9시");
  const [endTime, setEndTime] = useState("오전 10시");
  const [isLoading, setIsLoading] = useState(false);

  /**
   * 날짜 형식 변환: "2025. 10. 25" → "2025-10-25"
   */
  const formatDate = (dateStr: string): string => {
    const cleaned = dateStr.replace(/\s/g, '').replace(/\./g, '-');
    const parts = cleaned.split('-');
    if (parts.length === 3) {
      const [year, month, day] = parts;
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    return cleaned;
  };

  /**
   * 시간 형식 변환: "오전 9시" → "09:00:00"
   */
  const formatTime = (timeStr: string): string => {
    const isPM = timeStr.includes('오후');
    const hourMatch = timeStr.match(/(\d+)/);

    if (!hourMatch) return "00:00:00";

    let hour = parseInt(hourMatch[1]);

    // 12시간 형식을 24시간 형식으로 변환
    if (isPM && hour !== 12) {
      hour += 12;
    } else if (!isPM && hour === 12) {
      hour = 0;
    }

    return `${hour.toString().padStart(2, '0')}:00:00`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      // 일정 생성 API 호출
      await scheduleApi.create({
        title: title.trim(),
        memo: description.trim() || undefined,
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        startTime: formatTime(startTime),
        endTime: formatTime(endTime),
      });

      // 성공 시 캘린더로 돌아가기
      router.push('/schedule');
    } catch (error) {
      console.error('일정 생성 실패:', error);
      alert('일정 생성에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col h-full bg-white"
      style={{ width: "var(--app-width)", maxWidth: "var(--app-width)", margin: "0 auto" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-[13px] border-b border-[#f1f1f1] shrink-0">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center"
        >
          <Image
            className="relative w-6 h-6"
            alt=""
            src={getAssetPath("/img/arrow_back.svg")}
            width={24}
            height={24}
          />
        </button>
        <h1 className="body-3 font-semibold text-on-surface">일정 생성</h1>
        <div className="w-10 h-10 opacity-0" />
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
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
        <div className="p-4 border-t border-[#f1f1f1] shrink-0">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 bg-primary rounded-sm flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="body-2-medium text-white">
              {isLoading ? '저장 중...' : '완료'}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default withAuth(AddSchedulePage);
