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
    const response = await apiClient.get<ApiResponse<LikesResponse[]>>(
      '/likes'
    );
    return response.data.data;
  },

  /**
   * 카테고리별 찜 목록 조회
   */
  getByCategory: async (category: string) => {
    const response = await apiClient.get<ApiResponse<LikesResponse[]>>(
      `/likes/category/${category}`
    );
    return response.data.data;
  },
};
