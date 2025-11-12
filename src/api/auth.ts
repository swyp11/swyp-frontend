/**
 * 인증 관련 API
 */

import { apiClient } from './client';
import { OAuthCodeRequest, LoginRequest, TokenResponse, OAuthProvider } from '@/types/auth';
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
