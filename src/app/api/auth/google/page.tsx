"use client";

import React, { useEffect, useState } from 'react';
import { useGoogleLogin } from '@/hooks/useGoogleLogin';

export default function GoogleRedirectPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { handleOAuthCallback } = useGoogleLogin();

  useEffect(() => {
    console.log('구글 리디렉트 페이지 로드됨');

    // 이미 처리 중이면 중복 실행 방지
    if (isProcessing) return;

    // URL에서 인가 코드 추출 및 처리
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');

    if (error) {
      alert(`구글 로그인 오류: ${error}`);
      window.location.href = '/login';
      return;
    }

    if (code && !isProcessing) {
      setIsProcessing(true);
      // URL에서 코드 즉시 제거하여 중복 사용 방지
      window.history.replaceState({}, document.title, window.location.pathname);
      handleOAuthCallback(code);
    } else {
      alert('인가 코드가 없습니다.');
      window.location.href = '/login';
    }
  }, [handleOAuthCallback, isProcessing]);

  return (
    <div
      className="bg-white flex flex-col h-screen items-center justify-center mx-auto"
      style={{ width: "var(--app-width)" }}
    >
      <div className="text-center">
        <h2 className="headline-2 text-primary mb-4">🔄 구글 로그인 처리 중...</h2>
        <p className="body-1 text-on-surface-subtle">잠시만 기다려주세요.</p>
      </div>
    </div>
  );
}
