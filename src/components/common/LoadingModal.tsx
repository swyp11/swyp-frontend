"use client";

import React from "react";

interface LoadingModalProps {
  isOpen: boolean;
  message?: string;
}

export const LoadingModal = ({ isOpen, message = "로딩 중..." }: LoadingModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 9999 }}
    >
      <div
        className="bg-white rounded-lg p-8 mx-4 flex flex-col items-center gap-4"
        style={{ maxWidth: "320px", width: "90%" }}
      >
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />

        {/* Message */}
        <p className="body-2 text-on-surface text-center">{message}</p>
      </div>
    </div>
  );
};
