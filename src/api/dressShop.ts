/**
 * 드레스샵 관련 API
 */

import { apiClient } from './client';
import { DressShopResponse, DressShopRequest, ShopSearchParams } from '@/types/shop';
import { DressResponse } from '@/types/dress';
import { ApiResponse } from '@/types/common';

export const dressShopApi = {
  /**
   * 드레스샵 목록 조회 (검색/정렬)
   */
  getList: async (params?: ShopSearchParams) => {
    const response = await apiClient.get<ApiResponse<DressShopResponse[]>>(
      '/dress-shop',
      { params }
    );
    return response.data.data;
  },

  /**
   * 드레스샵 상세 조회
   */
  getDetail: async (id: number) => {
    const response = await apiClient.get<ApiResponse<DressShopResponse>>(
      `/dress-shop/${id}`
    );
    return response.data.data;
  },

  /**
   * 특정 샵의 드레스 목록 조회
   */
  getDresses: async (id: number) => {
    const response = await apiClient.get<ApiResponse<DressResponse[]>>(
      `/dress-shop/${id}/dresses`
    );
    return response.data.data;
  },

  /**
   * 드레스샵 등록
   */
  create: async (data: DressShopRequest) => {
    const response = await apiClient.post<ApiResponse<DressShopResponse>>(
      '/dress-shop',
      data
    );
    return response.data.data;
  },

  /**
   * 드레스샵 수정
   */
  update: async (id: number, data: DressShopRequest) => {
    const response = await apiClient.put<ApiResponse<DressShopResponse>>(
      `/dress-shop/${id}`,
      data
    );
    return response.data.data;
  },

  /**
   * 드레스샵 삭제
   */
  delete: async (id: number) => {
    const response = await apiClient.delete<ApiResponse<boolean>>(`/dress-shop/${id}`);
    return response.data.data;
  },
};
