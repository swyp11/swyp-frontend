"use client";

import React, { ReactNode, useRef, useState, useEffect } from "react";

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);

  // 마우스 드래그 시작
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    e.preventDefault(); // 기본 드래그 동작 방지
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    setDragDistance(0);
  };

  // 마우스 드래그 중
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // 스크롤 속도 조절
    setDragDistance(Math.abs(walk));
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // 마우스 드래그 종료
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 터치 드래그 시작
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    setDragDistance(0);
  };

  // 터치 드래그 중
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    setDragDistance(Math.abs(walk));
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // 터치 드래그 종료
  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // 전역 마우스 이벤트 리스너 (드래그 중 마우스가 컨테이너 밖으로 나가도 처리)
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging || !scrollRef.current) return;
      e.preventDefault();
      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      setDragDistance(Math.abs(walk));
      scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, startX, scrollLeft]);

  // 클릭과 드래그를 구분하여 자식 요소의 이벤트 전파 제어
  const handleClick = (e: React.MouseEvent) => {
    if (dragDistance > 5) { // 5px 이상 드래그하면 클릭으로 인식하지 않음
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div
      ref={scrollRef}
      className={`flex overflow-x-auto scrollbar-hide select-none ${className} ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      style={{
        gap: `${gap}px`,
        scrollBehavior: isDragging ? "auto" : "smooth",
        WebkitOverflowScrolling: "touch",
        touchAction: "pan-x", // 수평 스크롤만 허용
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // 마우스가 컨테이너를 벗어나면 드래그 종료
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
      onDragStart={(e) => e.preventDefault()} // 이미지 드래그 방지
    >
      <div className="flex" style={{ gap: `${gap}px` }}>
        {children}
      </div>
    </div>
  );
};
