import React from "react";

/**
 * 페이지 스토리에서 사용할 레이아웃 데코레이터
 * preview.tsx의 글로벌 데코레이터에서 Header/Footer를 처리하므로
 * 여기서는 단순히 Story만 렌더링합니다.
 */
export const withAppLayout = (Story: React.ComponentType) => {
  return <Story />;
};

/**
 * 컴포넌트 스토리에서 사용할 간단한 레이아웃 데코레이터
 */
export const withSimpleLayout = (Story: React.ComponentType) => {
  return (
    <div
      className="bg-white p-4"
      style={{ width: "var(--app-width)" }}
    >
      <Story />
    </div>
  );
};