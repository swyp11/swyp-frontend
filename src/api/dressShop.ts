/**
 * 드레스샵 관련 API
 */

import { apiClient } from './client';
import { DressShopResponse, DressShopRequest, ShopSearchParams } from '@/types/shop';
import { DressResponse } from '@/types/dress';

export const dressShopApi = {
  /**
   * 드레스샵 목록 조회 (검색/정렬)
   */
  getList: async (params?: ShopSearchParams) => {
    const response = await apiClient.get<DressShopResponse[]>(
      '/api/dress-shop',
      { params }
    );
    return response.data;
  },

  /**
   * 드레스샵 상세 조회
   */
  getDetail: async (id: number) => {
    const response = await apiClient.get<DressShopResponse>(
      `/api/dress-shop/${id}`
    );
    return response.data;
  },

  /**
   * 특정 샵의 드레스 목록 조회
   */
  getDresses: async (id: number) => {
    const response = await apiClient.get<DressResponse[]>(
      `/api/dress-shop/${id}/dresses`
    );
    return response.data;
  },

  /**
   * 드레스샵 등록
   */
  create: async (data: DressShopRequest) => {
    const response = await apiClient.post<DressShopResponse>(
      '/api/dress-shop',
      data
    );
    return response.data;
  },

  /**
   * 드레스샵 수정
   */
  update: async (id: number, data: DressShopRequest) => {
    const response = await apiClient.put<DressShopResponse>(
      `/api/dress-shop/${id}`,
      data
    );
    return response.data;
  },

  /**
   * 드레스샵 삭제
   */
  delete: async (id: number) => {
    const response = await apiClient.delete(`/api/dress-shop/${id}`);
    return response.data;
  },
};
