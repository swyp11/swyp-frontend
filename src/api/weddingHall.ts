/**
 * 웨딩홀 관련 API
 */

import { apiClient } from './client';
import {
  WeddingHallResponse,
  WeddingHallRequest,
  WeddingHallSearchParams,
  HallResponse,
} from '@/types/weddingHall';
import { ApiResponse, PageResponse } from '@/types/common';

export const weddingHallApi = {
  /**
   * 웨딩홀 목록 조회 (정렬, 페이지네이션)
   */
  getList: async (params?: WeddingHallSearchParams) => {
    const response = await apiClient.get<ApiResponse<PageResponse<WeddingHallResponse>>>(
      '/wedding',
      { params }
    );
    return response.data.data;
  },

  /**
   * 웨딩홀 상세 조회
   */
  getDetail: async (id: number) => {
    const response = await apiClient.get<ApiResponse<WeddingHallResponse>>(
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

  /**
   * 웨딩홀 키워드 검색
   */
  search: async (keyword: string) => {
    const response = await apiClient.get<ApiResponse<WeddingHallResponse[]>>(
      '/wedding/search',
      { params: { keyword } }
    );
    return response.data.data || [];
  },

  /**
   * 웨딩홀의 홀 목록 조회
   */
  getHalls: async (weddingHallId: number) => {
    const response = await apiClient.get<ApiResponse<HallResponse[]>>(
      `/wedding/${weddingHallId}/halls`
    );
    return response.data.data;
  },
};
