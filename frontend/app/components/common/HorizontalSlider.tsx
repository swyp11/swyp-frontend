"use client";

import React, { ReactNode } from "react";

interface HorizontalSliderProps {
  children: ReactNode;
  gap?: number;
  className?: string;
}

export const HorizontalSlider = ({
  children,
  gap = 12,
  className = "",
}: HorizontalSliderProps) => {
  return (
    <div
      className={`flex overflow-x-auto scrollbar-hide snap-x snap-mandatory ${className}`}
      style={{
        gap: `${gap}px`,
        scrollBehavior: "smooth",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {children}
    </div>
  );
};
