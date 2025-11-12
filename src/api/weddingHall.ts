/**
 * 웨딩홀 관련 API
 */

import { apiClient } from './client';
import {
  WeddingHallResponse,
  WeddingHallRequest,
  WeddingHallSearchParams,
} from '@/types/weddingHall';
import { ApiResponse } from '@/types/common';

export const weddingHallApi = {
  /**
   * 웨딩홀 목록 조회 (정렬)
   */
  getList: async (params?: WeddingHallSearchParams) => {
    const response = await apiClient.get<WeddingHallResponse[]>(
      '/wedding',
      { params }
    );
    return response.data;
  },

  /**
   * 웨딩홀 상세 조회
   */
  getDetail: async (id: number) => {
    const response = await apiClient.get<WeddingHallResponse>(
      `/wedding/${id}`
    );
    return response.data;
  },

  /**
   * 웨딩홀 등록
   */
  create: async (data: WeddingHallRequest) => {
    const response = await apiClient.post<ApiResponse<boolean>>(
      '/wedding',
      data
    );
    return response.data;
  },

  /**
   * 웨딩홀 수정
   */
  update: async (id: number, data: WeddingHallRequest) => {
    const response = await apiClient.put<ApiResponse<boolean>>(
      `/wedding/${id}`,
      data
    );
    return response.data;
  },

  /**
   * 웨딩홀 삭제
   */
  delete: async (id: number) => {
    const response = await apiClient.delete<ApiResponse<boolean>>(
      `/wedding/${id}`
    );
    return response.data;
  },
};
