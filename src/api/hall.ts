/**
 * 홀 관련 API (웨딩홀 내부 홀)
 */

import { apiClient } from './client';
import { HallResponse, HallRequest } from '@/types/weddingHall';
import { ApiResponse } from '@/types/common';

export const hallApi = {
  /**
   * 홀 목록 조회
   */
  getList: async () => {
    const response = await apiClient.get<HallResponse[]>('/hall');
    return response.data;
  },

  /**
   * 홀 상세 조회
   */
  getDetail: async (id: number) => {
    const response = await apiClient.get<HallResponse>(`/hall/${id}`);
    return response.data;
  },

  /**
   * 홀 등록
   */
  create: async (data: HallRequest) => {
    const response = await apiClient.post<ApiResponse<boolean>>(
      '/hall',
      data
    );
    return response.data;
  },

  /**
   * 홀 수정
   */
  update: async (id: number, data: HallRequest) => {
    const response = await apiClient.put<ApiResponse<boolean>>(
      `/hall/${id}`,
      data
    );
    return response.data;
  },

  /**
   * 홀 삭제
   */
  delete: async (id: number) => {
    const response = await apiClient.delete<ApiResponse<boolean>>(
      `/hall/${id}`
    );
    return response.data;
  },
};
