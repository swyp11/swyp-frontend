"use client";

import React, { useState, useEffect } from "react";
import { useGoogleLogin } from "@/hooks/useGoogleLogin";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login: googleLogin } = useGoogleLogin();

  // 로그인 화면 진입 시 모든 쿠키 삭제
  useEffect(() => {
    // 모든 쿠키 삭제
    document.cookie.split(";").forEach((cookie) => {
      const name = cookie.split("=")[0].trim();
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });

    // localStorage와 sessionStorage도 초기화
    localStorage.removeItem('userToken');
    sessionStorage.clear();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 로그인 로직 구현
    console.log("Login:", { username, password });
  };

  const handleGoogleLogin = () => {
    googleLogin();
  };

  return (
    <div
      className="bg-white flex flex-col h-screen mx-auto"
      style={{ width: "var(--app-width)" }}
    >
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <h1 className="headline-1 text-primary">LOGO</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-2 w-full mb-4">
          {/* Username Field */}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="아이디"
            className="field w-full h-11"
          />

          {/* Password Field */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            className="field w-full h-11"
          />
        </form>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="btn btn-primary w-full opacity-40 mt-6"
          disabled
        >
          로그인
        </button>

        {/* Divider */}
        <div className="label-1 text-on-surface-subtle my-6">또는</div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="btn btn-default-tertiary w-full"
          style={{ paddingLeft: "12px", paddingRight: "16px" }}
        >
          <div className="w-6 h-6 shrink-0">
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          </div>
          <span className="body-2-medium ml-3">Google 계정으로 계속하기</span>
        </button>
      </div>

      {/* Footer Links */}
      <div className="flex items-center justify-center gap-1 px-4 py-4 label-1 text-on-surface-subtle">
        <a href="/forgot-password" className="underline">
          비밀번호 찾기
        </a>
        <span>・</span>
        <a href="/signup" className="underline">
          회원가입
        </a>
      </div>
    </div>
  );
}
