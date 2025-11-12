/**
 * 사용자 관련 API
 */

import { apiClient } from './client';
import {
  UserRequest,
  UserResponse,
  UserUpdateRequest,
  OAuthExtraInfoRequest,
} from '@/types/user';

export const userApi = {
  /**
   * 회원가입
   */
  join: async (data: UserRequest) => {
    const response = await apiClient.post<string>('/user/join', data);
    return response.data;
  },

  /**
   * OAuth 추가 정보 입력
   */
  oauthExtraInfo: async (data: OAuthExtraInfoRequest) => {
    const response = await apiClient.post<UserResponse>(
      '/user/oauth-extra-info',
      data
    );
    return response.data;
  },

  /**
   * 사용자 정보 조회
   */
  getUserInfo: async () => {
    const response = await apiClient.get<UserResponse>('/user/info');
    return response.data;
  },

  /**
   * 사용자 정보 수정
   */
  updateUserInfo: async (data: UserUpdateRequest) => {
    const response = await apiClient.put<UserResponse>('/user/info', data);
    return response.data;
  },
};
