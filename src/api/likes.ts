/**
 * 찜 관련 API
 */

import { apiClient } from './client';
import { LikesCategory, LikesResponse, ApiResponse } from '@/types';

export const likesApi = {
  /**
   * 찜 추가
   */
  store: async (category: LikesCategory, postId: number) => {
    const response = await apiClient.post<ApiResponse<boolean>>(
      `/likes/${category}/${postId}`
    );
    return response.data.data;
  },

  /**
   * 찜 삭제
   */
  delete: async (id: number) => {
    const response = await apiClient.delete<ApiResponse<boolean>>(
      `/likes/delete/${id}`
    );
    return response.data.data;
  },

  /**
   * 전체 찜 목록 조회
   */
  getAll: async () => {
    try {
      const response = await apiClient.get<{ success: boolean; data: LikesResponse[] }>(
        '/likes'
      );
      if (response.data && 'data' in response.data) {
        return response.data.data || [];
      }
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('찜 목록 조회 실패:', error);
      return [];
    }
  },

  /**
   * 카테고리별 찜 목록 조회
   */
  getByCategory: async (category: string) => {
    try {
      const response = await apiClient.get<{ success: boolean; data: LikesResponse[] }>(
        `/likes/category/${category}`
      );
      if (response.data && 'data' in response.data) {
        return response.data.data || [];
      }
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('카테고리별 찜 목록 조회 실패:', error);
      return [];
    }
  },
};
