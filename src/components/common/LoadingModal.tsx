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
        <div
          className="w-12 h-12 rounded-full"
          style={{
            border: '4px solid #e5e7eb',
            borderTopColor: '#8B5CF6',
            animation: 'spin 1s linear infinite'
          }}
        />

        {/* Message */}
        <p className="body-2 text-on-surface text-center">{message}</p>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};
