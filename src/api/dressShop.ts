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
    try {
      const response = await apiClient.get<{ success: boolean; data: DressShopResponse[] }>(
        '/dress-shop',
        { params }
      );
      // 응답 구조 확인 및 안전한 반환
      if (response.data && 'data' in response.data) {
        return response.data.data || [];
      }
      // 응답이 직접 배열인 경우 (이전 형식)
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('드레스샵 목록 조회 실패:', error);
      return [];
    }
  },

  /**
   * 드레스샵 상세 조회
   */
  getDetail: async (id: number) => {
    const response = await apiClient.get<{ success: boolean; data: DressShopResponse }>(
      `/dress-shop/${id}`
    );
    return response.data.data;
  },

  /**
   * 특정 샵의 드레스 목록 조회
   */
  getDresses: async (id: number) => {
    const response = await apiClient.get<{ success: boolean; data: DressResponse[] }>(
      `/dress-shop/${id}/dresses`
    );
    return response.data.data;
  },

  /**
   * 드레스샵 등록
   */
  create: async (data: DressShopRequest) => {
    const response = await apiClient.post<{ success: boolean; data: DressShopResponse }>(
      '/dress-shop',
      data
    );
    return response.data.data;
  },

  /**
   * 드레스샵 수정
   */
  update: async (id: number, data: DressShopRequest) => {
    const response = await apiClient.put<{ success: boolean; data: DressShopResponse }>(
      `/dress-shop/${id}`,
      data
    );
    return response.data.data;
  },

  /**
   * 드레스샵 삭제
   */
  delete: async (id: number) => {
    const response = await apiClient.delete<{ success: boolean; data: boolean }>(`/dress-shop/${id}`);
    return response.data.data;
  },
};
