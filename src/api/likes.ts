/**
 * 찜 관련 API
 */

import { apiClient } from './client';
import { LikesCategory, ApiResponse } from '@/types';

export const likesApi = {
  /**
   * 찜 추가
   */
  store: async (category: LikesCategory, postId: number) => {
    const response = await apiClient.post<ApiResponse<boolean>>(
      `/api/likes/${category}/${postId}`
    );
    return response.data;
  },

  /**
   * 찜 삭제
   */
  delete: async (id: number) => {
    const response = await apiClient.delete<ApiResponse<boolean>>(
      `/api/likes/${id}`
    );
    return response.data;
  },
};
