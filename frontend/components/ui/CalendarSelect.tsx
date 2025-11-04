"use client";

import React from "react";
import Image from "next/image";

export interface CalendarSelectProps {
  /** Selected menu text */
  value: string;
  /** Click handler */
  onClick?: () => void;
  /** Whether select is active/open */
  isActive?: boolean;
  /** Additional className */
  className?: string;
}

export const CalendarSelect = React.forwardRef<HTMLDivElement, CalendarSelectProps>(
  (
    {
      value,
      onClick,
      isActive = false,
      className = "",
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`select ${isActive ? "select-active" : ""} ${className}`}
        style={{ justifyContent: 'center' }}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onClick?.();
          }
        }}
      >
        <span>{value}</span>
        <Image
          src="/keyboard_arrow_down.svg"
          alt="펼치기"
          width={24}
          height={24}
        />
      </div>
    );
  }
);

CalendarSelect.displayName = "CalendarSelect";
