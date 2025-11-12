/**
 * 드레스 관련 API
 */

import { apiClient } from './client';
import { DressResponse, DressRequest, DressSearchParams } from '@/types/dress';
import { ApiResponse } from '@/types/common';

export const dressApi = {
  /**
   * 드레스 목록 조회 (검색/정렬)
   */
  getList: async (params?: DressSearchParams) => {
    const response = await apiClient.get<ApiResponse<DressResponse[]>>('/dress', {
      params,
    });
    return response.data.data;
  },

  /**
   * 드레스 상세 조회
   */
  getDetail: async (id: number) => {
    const response = await apiClient.get<ApiResponse<DressResponse>>(`/dress/${id}`);
    return response.data.data;
  },

  /**
   * 드레스 등록
   */
  create: async (data: DressRequest) => {
    const response = await apiClient.post<ApiResponse<DressResponse>>('/dress', data);
    return response.data.data;
  },

  /**
   * 드레스 수정
   */
  update: async (id: number, data: DressRequest) => {
    const response = await apiClient.put<ApiResponse<DressResponse>>(
      `/dress/${id}`,
      data
    );
    return response.data.data;
  },

  /**
   * 드레스 삭제
   */
  delete: async (id: number) => {
    const response = await apiClient.delete<ApiResponse<boolean>>(`/dress/${id}`);
    return response.data.data;
  },
};
