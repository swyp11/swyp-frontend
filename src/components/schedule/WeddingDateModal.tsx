"use client";

import React, { useState, useEffect } from "react";
import { useUpdateUserInfo } from "@/hooks/useUser";

interface WeddingDateModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentWeddingDate?: string;
}

export const WeddingDateModal = ({ isOpen, onClose, currentWeddingDate }: WeddingDateModalProps) => {
  const [weddingDate, setWeddingDate] = useState(currentWeddingDate || "");
  const updateUserMutation = useUpdateUserInfo();

  useEffect(() => {
    if (isOpen) {
      setWeddingDate(currentWeddingDate || "");
    }
  }, [isOpen, currentWeddingDate]);

  const handleSave = async () => {
    if (!weddingDate) {
      alert("결혼식 날짜를 선택해주세요");
      return;
    }

    try {
      await updateUserMutation.mutateAsync({ weddingDate });
      onClose();
    } catch (error) {
      console.error("Failed to update wedding date:", error);
      alert("결혼식 날짜 수정에 실패했습니다");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 9999 }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 mx-4"
        style={{ maxWidth: "320px", width: "90%" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4">
          <label className="block mb-3 body-2-medium text-on-surface">
            결혼식 날짜를 선택해주세요
          </label>
          <input
            type="date"
            value={weddingDate}
            onChange={(e) => setWeddingDate(e.target.value)}
            className="w-full px-4 py-3 border border-[#e0e0e0] rounded-lg body-2 focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 h-12 border border-border rounded-lg bg-white text-on-surface body-2-medium"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            disabled={updateUserMutation.isPending}
            className="flex-1 h-12 bg-primary rounded-lg text-white body-2-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {updateUserMutation.isPending ? "저장 중..." : "저장"}
          </button>
        </div>
      </div>
    </div>
  );
};
