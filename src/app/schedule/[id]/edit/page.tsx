"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { DatePicker } from "../../../../components/common/DatePicker";
import { TimePicker } from "../../../../components/common/TimePicker";
import Image from "next/image";
import { getAssetPath } from "@/utils/assetPath";
import { withAuth } from "@/components/auth/withAuth";
import { useScheduleDetail, useUpdateSchedule } from "@/hooks/useSchedule";
import { scheduleApi } from "@/api/schedule";

function EditSchedulePage() {
  const router = useRouter();
  const params = useParams();
  const scheduleId = Number(params.id);

  const { data: schedule, isLoading } = useScheduleDetail(scheduleId);
  const updateSchedule = useUpdateSchedule();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  /**
   * 날짜 형식 변환: "2025-10-25" → "2025년 10월 25일"
   */
  const formatDateToDisplay = (dateStr: string): string => {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const [year, month, day] = parts;
      return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
    }
    return dateStr;
  };

  /**
   * 시간 형식 변환: "09:00:00" → "오전 9시"
   */
  const formatTimeToDisplay = (timeStr: string): string => {
    const parts = timeStr.split(':');
    if (parts.length < 1) return timeStr;

    let hour = parseInt(parts[0]);
    const isPM = hour >= 12;

    if (hour > 12) {
      hour -= 12;
    } else if (hour === 0) {
      hour = 12;
    }

    return `${isPM ? '오후' : '오전'} ${hour}시`;
  };

  /**
   * 날짜 형식 변환: "2025년 10월 25일" → "2025-10-25"
   */
  const formatDate = (dateStr: string): string => {
    if (!dateStr) return "";

    const match = dateStr.match(/(\d+)년\s*(\d+)월\s*(\d+)일/);
    if (match) {
      const [, year, month, day] = match;
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    return dateStr;
  };

  /**
   * 시간 형식 변환: "오전 9시" → "09:00:00"
   */
  const formatTime = (timeStr: string): string => {
    const isPM = timeStr.includes('오후');
    const hourMatch = timeStr.match(/(\d+)/);

    if (!hourMatch) return "00:00:00";

    let hour = parseInt(hourMatch[1]);

    if (isPM && hour !== 12) {
      hour += 12;
    } else if (!isPM && hour === 12) {
      hour = 0;
    }

    return `${hour.toString().padStart(2, '0')}:00:00`;
  };

  // 일정 데이터 로드 후 상태 초기화
  useEffect(() => {
    if (schedule) {
      setTitle(schedule.title);
      setDescription(schedule.memo || "");
      setStartDate(formatDateToDisplay(schedule.startDate));
      setEndDate(formatDateToDisplay(schedule.endDate));
      setStartTime(formatTimeToDisplay(schedule.startTime));
      setEndTime(formatTimeToDisplay(schedule.endTime));
    }
  }, [schedule]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!startDate || !endDate) {
      alert("날짜를 선택해주세요.");
      return;
    }

    if (!startTime || !endTime) {
      alert("시간을 선택해주세요.");
      return;
    }

    // 날짜/시간 변환
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);
    const formattedStartTime = formatTime(startTime);
    const formattedEndTime = formatTime(endTime);

    // 날짜 검증
    if (formattedStartDate > formattedEndDate) {
      alert("종료 날짜는 시작 날짜보다 이후여야 합니다.");
      return;
    }

    // 같은 날짜일 경우 시간 검증
    if (formattedStartDate === formattedEndDate) {
      if (formattedStartTime >= formattedEndTime) {
        alert("같은 날짜에서 종료 시간은 시작 시간보다 이후여야 합니다.");
        return;
      }
    }

    try {
      await updateSchedule.mutateAsync({
        id: scheduleId,
        data: {
          title: title.trim(),
          memo: description.trim() || undefined,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          startTime: formattedStartTime,
          endTime: formattedEndTime,
        }
      });

      router.replace(`/schedule/${scheduleId}`);
    } catch (error) {
      console.error('일정 수정 실패:', error);
      alert('일정 수정에 실패했습니다. 다시 시도해주세요.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="body-2-medium text-on-surface-subtle">로딩 중...</p>
      </div>
    );
  }

  if (!schedule) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="body-2-medium text-on-surface-subtle">일정을 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col h-full bg-white"
      style={{ width: "var(--app-width)", maxWidth: "var(--app-width)", margin: "0 auto" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-[13px] border-b border-[#f1f1f1] shrink-0">
        <button
          onClick={() => router.replace(`/schedule/${scheduleId}`)}
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
        <h1 className="body-3 font-semibold text-on-surface">일정 수정</h1>
        <div className="w-10 h-10 opacity-0" />
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          {/* 날짜 섹션 */}
          <div className="space-y-1">
            <label className="body-3 font-medium text-on-surface">날짜</label>
            <div className="flex items-center gap-2">
              <DatePicker
                value={startDate}
                onChange={setStartDate}
                placeholder="시작 날짜"
                className="flex-1"
              />
              <span className="body-2-medium text-on-surface">-</span>
              <DatePicker
                value={endDate}
                onChange={setEndDate}
                placeholder="종료 날짜"
                className="flex-1"
              />
            </div>
          </div>

          {/* 시간 섹션 */}
          <div className="space-y-1">
            <label className="body-3 font-medium text-on-surface">시간</label>
            <div className="flex items-center gap-2">
              <TimePicker
                value={startTime}
                onChange={setStartTime}
                placeholder="시작 시간"
                className="flex-1"
              />
              <span className="body-2-medium text-on-surface">-</span>
              <TimePicker
                value={endTime}
                onChange={setEndTime}
                placeholder="종료 시간"
                className="flex-1"
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
            disabled={updateSchedule.isPending}
            className="w-full h-11 bg-primary rounded-sm flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="body-2-medium text-white">
              {updateSchedule.isPending ? '저장 중...' : '완료'}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default withAuth(EditSchedulePage);
