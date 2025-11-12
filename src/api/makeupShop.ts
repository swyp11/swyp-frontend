/**
 * 메이크업샵 관련 API
 */

import { apiClient } from './client';
import { MakeupShopResponse, MakeupShopRequest, ShopSearchParams } from '@/types/shop';

export const makeupShopApi = {
  /**
   * 메이크업샵 목록 조회 (검색/정렬)
   */
  getList: async (params?: ShopSearchParams) => {
    const response = await apiClient.get<MakeupShopResponse[]>(
      '/makeup-shop',
      { params }
    );
    return response.data;
  },

  /**
   * 메이크업샵 상세 조회
   */
  getDetail: async (id: number) => {
    const response = await apiClient.get<MakeupShopResponse>(
      `/makeup-shop/${id}`
    );
    return response.data;
  },

  /**
   * 메이크업샵 등록
   */
  create: async (data: MakeupShopRequest) => {
    const response = await apiClient.post<MakeupShopResponse>(
      '/makeup-shop',
      data
    );
    return response.data;
  },

  /**
   * 메이크업샵 수정
   */
  update: async (id: number, data: MakeupShopRequest) => {
    const response = await apiClient.put<MakeupShopResponse>(
      `/makeup-shop/${id}`,
      data
    );
    return response.data;
  },

  /**
   * 메이크업샵 삭제
   */
  delete: async (id: number) => {
    const response = await apiClient.delete(`/makeup-shop/${id}`);
    return response.data;
  },
};
