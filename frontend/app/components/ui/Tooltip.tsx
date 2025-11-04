"use client";

import React from "react";

export interface TooltipProps {
  /** Tooltip text content */
  text: string;
  /** Position of tooltip */
  position?: "top" | "bottom" | "left" | "right" | "top-start" | "top-end";
  /** Whether to show arrow */
  showArrow?: boolean;
  /** Additional className */
  className?: string;
  /** Children element that triggers tooltip */
  children?: React.ReactNode;
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      text,
      position = "top",
      showArrow = true,
      className = "",
      children,
    },
    ref
  ) => {
    return (
      <div ref={ref} className={`tooltip ${className}`}>
        {showArrow && (
          <div className="tooltip-arrow">
            <svg
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 0L12 8H0L6 0Z"
                fill="var(--color-secondary)"
              />
            </svg>
          </div>
        )}
        <div className="tooltip-content">
          {text}
        </div>
        {children}
      </div>
    );
  }
);

Tooltip.displayName = "Tooltip";
