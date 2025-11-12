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
};
