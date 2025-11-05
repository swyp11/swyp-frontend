"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function SignupCompletePage() {
  const router = useRouter();

  // TODO: 실제로는 회원가입 시 입력한 닉네임을 가져와야 함
  // 예: localStorage, Context API, 또는 서버에서 받은 데이터
  const userName = "따뜻한고구마"; // 임시 닉네임

  const handleGoHome = () => {
    router.push("/main");
  };

  const handleGetRecommendation = () => {
    // TODO: 웨딩드레스 추천 페이지로 이동
    router.push("/recommend");
  };

  return (
    <div
      className="bg-white flex flex-col h-screen mx-auto"
      style={{ width: "var(--app-width)" }}
    >
      {/* Main Content - Centered */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 gap-6 min-h-0">
        {/* Logo */}
        <div className="headline-1 text-primary">LOGO</div>

        {/* Welcome Message */}
        <div className="title-1 text-on-surface text-center">
          {userName}에 오신것을 환영합니다
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="flex flex-col gap-2 px-4 pb-8 border-t border-[#f1f1f1] pt-4 shrink-0">
        {/* Home Button */}
        <button onClick={handleGoHome} className="btn btn-primary w-full">
          홈으로 이동하기
        </button>

        {/* Recommendation Button */}
        <button
          onClick={handleGetRecommendation}
          className="btn btn-secondary w-full"
        >
          웨딩드레스 추천 받기
        </button>
      </div>
    </div>
  );
}
