/**
 * Axios 인스턴스 및 인터셉터 설정
 */

import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

// API Base URL - Next.js API Route를 통해 프록시
const BASE_URL = '/api';

// Axios 인스턴스 생성
export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 로컬스토리지에서 토큰 가져오기
    const token = localStorage.getItem('accessToken');

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => {
    // Authorization 헤더가 있으면 토큰 저장
    const token = response.headers['authorization'];
    if (token) {
      const accessToken = token.replace('Bearer ', '');
      localStorage.setItem('accessToken', accessToken);
    }

    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // 401 에러 (인증 실패) 처리
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // 토큰 삭제 및 로그인 페이지로 리다이렉트
      localStorage.removeItem('accessToken');

      // 클라이언트 사이드에서만 실행
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

// API 에러 처리 헬퍼
export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || error.message;
    return message;
  }
  return '알 수 없는 오류가 발생했습니다.';
};
