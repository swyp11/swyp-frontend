"use client";

import React from "react";

interface LoginRequiredModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const LoginRequiredModal = ({ isOpen, onConfirm, onCancel }: LoginRequiredModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 9999 }}
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-lg p-6 mx-4"
        style={{ maxWidth: "320px", width: "90%" }}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="body-2 text-on-surface text-center mb-6">
          로그인이 필요한 서비스입니다.<br />
          로그인 페이지로 이동하시겠습니까?
        </p>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 h-12 border border-border rounded-lg bg-white text-on-surface body-2-medium"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 h-12 bg-primary rounded-lg text-white body-2-medium"
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
};
