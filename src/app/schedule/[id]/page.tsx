"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { CalendarSelect } from "../../../components/ui/CalendarSelect";
import Image from "next/image";
import { getAssetPath } from "@/utils/assetPath";
import { withAuth } from "@/components/auth/withAuth";
import { useScheduleDetail, useDeleteSchedule } from "@/hooks/useSchedule";

function ScheduleDetailPage() {
  const router = useRouter();
  const params = useParams();
  const scheduleId = Number(params.id);

  const { data: schedule, isLoading } = useScheduleDetail(scheduleId);
  const deleteSchedule = useDeleteSchedule();

  /**
   * 날짜 형식 변환: "2025-10-25" → "2025. 10. 25"
   */
  const formatDateDisplay = (dateStr: string): string => {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const [year, month, day] = parts;
      return `${year}. ${parseInt(month)}. ${parseInt(day)}`;
    }
    return dateStr;
  };

  /**
   * 시간 형식 변환: "09:00:00" → "오전 9시"
   */
  const formatTimeDisplay = (timeStr: string): string => {
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

  const handleEdit = () => {
    router.push(`/schedule/${scheduleId}/edit`);
  };

  const handleDelete = async () => {
    if (!confirm('일정을 삭제하시겠습니까?')) {
      return;
    }

    try {
      await deleteSchedule.mutateAsync(scheduleId);
      router.push('/schedule');
    } catch (error) {
      console.error('일정 삭제 실패:', error);
      alert('일정 삭제에 실패했습니다. 다시 시도해주세요.');
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
        <h1 className="body-3 font-semibold text-on-surface">일정 상세</h1>
        <div className="w-10 h-10 opacity-0" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          {/* 날짜 섹션 */}
          <div className="space-y-1">
            <label className="body-3 font-medium text-on-surface">날짜</label>
            <div className="flex items-center gap-2">
              <CalendarSelect
                value={formatDateDisplay(schedule.startDate)}
                onClick={() => {}}
                className="flex-1 h-12 cursor-default"
                readOnly
              />
              <span className="body-2-medium text-on-surface">-</span>
              <CalendarSelect
                value={formatDateDisplay(schedule.endDate)}
                onClick={() => {}}
                className="flex-1 h-12 cursor-default"
                readOnly
              />
            </div>
          </div>

          {/* 시간 섹션 */}
          {schedule.startTime && schedule.endTime && (
            <div className="space-y-1">
              <label className="body-3 font-medium text-on-surface">시간</label>
              <div className="flex items-center gap-2">
                <CalendarSelect
                  value={formatTimeDisplay(schedule.startTime)}
                  onClick={() => {}}
                  className="flex-1 h-12 cursor-default"
                  readOnly
                />
                <span className="body-2-medium text-on-surface">-</span>
                <CalendarSelect
                  value={formatTimeDisplay(schedule.endTime)}
                  onClick={() => {}}
                  className="flex-1 h-12 cursor-default"
                  readOnly
                />
              </div>
            </div>
          )}

          {/* 제목 섹션 */}
          <div className="field-label">
            <div className="field-label-text">
              <span>제목</span>
            </div>
            <div className="field bg-surface-2 cursor-default">
              <span className="text-on-surface">{schedule.title}</span>
            </div>
          </div>

          {/* 설명 섹션 */}
          {schedule.memo && (
            <div className="field-label">
              <div className="field-label-text">
                <span>설명</span>
              </div>
              <div className="field field-textbox bg-surface-2 cursor-default min-h-[120px]">
                <span className="text-on-surface whitespace-pre-wrap">{schedule.memo}</span>
              </div>
            </div>
          )}
        </div>

        {/* 수정/삭제 버튼 */}
        <div className="p-4 border-t border-[#f1f1f1] shrink-0 space-y-2">
          <button
            onClick={handleEdit}
            className="w-full h-11 bg-primary rounded-sm flex items-center justify-center"
          >
            <span className="body-2-medium text-white">수정</span>
          </button>
          <button
            onClick={handleDelete}
            disabled={deleteSchedule.isPending}
            className="w-full h-11 bg-surface-2 rounded-sm flex items-center justify-center disabled:opacity-50"
          >
            <span className="body-2-medium text-on-surface">
              {deleteSchedule.isPending ? '삭제 중...' : '삭제'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default withAuth(ScheduleDetailPage);
