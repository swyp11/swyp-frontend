/**
 * 사용자 관련 API
 */

import { apiClient } from './client';
import {
  UserRequest,
  UserResponse,
  UserUpdateRequest,
  OAuthExtraInfoRequest,
  PasswordUpdateRequest,
} from '@/types/user';
import { ApiResponse } from '@/types/common';

export const userApi = {
  /**
   * 회원가입
   */
  join: async (data: UserRequest) => {
    const response = await apiClient.post<ApiResponse<string>>('/user/join', data);
    return response.data.data;
  },

  /**
   * OAuth 추가 정보 입력
   */
  oauthExtraInfo: async (data: OAuthExtraInfoRequest) => {
    const response = await apiClient.post<ApiResponse<UserResponse>>(
      '/user/oauth-extra-info',
      data
    );
    return response.data.data;
  },

  /**
   * 사용자 정보 조회
   */
  getUserInfo: async () => {
    const response = await apiClient.get<ApiResponse<UserResponse>>('/user/info');
    return response.data.data;
  },

  /**
   * 사용자 정보 수정
   */
  updateUserInfo: async (data: UserUpdateRequest) => {
    const response = await apiClient.put<ApiResponse<UserResponse>>('/user/info', data);
    return response.data.data;
  },

  /**
   * 비밀번호 변경 (로그인된 사용자)
   */
  updatePassword: async (data: PasswordUpdateRequest) => {
    const response = await apiClient.patch<ApiResponse<string>>('/user/password', data);
    return response.data.data;
  },
};
