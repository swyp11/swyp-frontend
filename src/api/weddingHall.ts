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
    try {
      const response = await apiClient.get<{ success: boolean; data: WeddingHallResponse[] }>(
        '/wedding',
        { params }
      );
      // 응답 구조 확인 및 안전한 반환
      if (response.data && 'data' in response.data) {
        return response.data.data || [];
      }
      // 응답이 직접 배열인 경우 (이전 형식)
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('웨딩홀 목록 조회 실패:', error);
      return [];
    }
  },

  /**
   * 웨딩홀 상세 조회
   */
  getDetail: async (id: number) => {
    const response = await apiClient.get<{ success: boolean; data: WeddingHallResponse }>(
      `/wedding/${id}`
    );
    return response.data.data;
  },

  /**
   * 웨딩홀 등록
   */
  create: async (data: WeddingHallRequest) => {
    const response = await apiClient.post<ApiResponse<boolean>>(
      '/wedding',
      data
    );
    return response.data.data;
  },

  /**
   * 웨딩홀 수정
   */
  update: async (id: number, data: WeddingHallRequest) => {
    const response = await apiClient.put<ApiResponse<boolean>>(
      `/wedding/${id}`,
      data
    );
    return response.data.data;
  },

  /**
   * 웨딩홀 삭제
   */
  delete: async (id: number) => {
    const response = await apiClient.delete<ApiResponse<boolean>>(
      `/wedding/${id}`
    );
    return response.data.data;
  },
};
