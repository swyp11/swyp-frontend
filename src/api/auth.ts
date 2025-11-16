/**
 * 인증 관련 API
 */

import { apiClient } from './client';
import { OAuthCodeRequest, LoginRequest, TokenResponse, OAuthProvider, AuthPurpose, EmailVerificationResponse } from '@/types/auth';
import { ApiResponse } from '@/types/common';

export const authApi = {
  /**
   * OAuth 로그인
   */
  oauthLogin: async (provider: OAuthProvider, data: OAuthCodeRequest) => {
    const response = await apiClient.post<ApiResponse<TokenResponse>>(
      `/auth/oauth/${provider}`,
      data
    );
    return response.data.data;
  },

  /**
   * 일반 로그인
   */
  login: async (data: LoginRequest) => {
    const response = await apiClient.post<ApiResponse<TokenResponse>>('/auth/login', data);
    return response.data.data;
  },

  /**
   * 이메일 인증 요청
   */
  requestEmailVerification: async (email: string, purpose: AuthPurpose = 'SIGNUP') => {
    const response = await apiClient.post<ApiResponse<boolean>>(
      '/auth/request-verification',
      { email, purpose }
    );
    return response.data.data;
  },

  /**
   * 이메일 인증번호 확인 (토큰 반환)
   */
  verifyEmail: async (email: string, code: string, purpose: AuthPurpose = 'SIGNUP') => {
    const response = await apiClient.post<{ success: boolean; data: EmailVerificationResponse }>(
      '/auth/verify-code',
      { email, code, purpose }
    );
    return response.data.data;
  },

  /**
   * 비밀번호 재설정
   */
  resetPassword: async (email: string, newPassword: string, verificationToken: string) => {
    const response = await apiClient.patch<ApiResponse<string>>(
      '/user/password/reset',
      { email, newPassword, verificationToken }
    );
    return response.data.data;
  },

  /**
   * 로그아웃
   */
  logout: () => {
    localStorage.removeItem('accessToken');
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  },

  /**
   * 현재 로그인 상태 확인
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('accessToken');
  },
};
