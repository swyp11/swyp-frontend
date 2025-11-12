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
    try {
      const response = await apiClient.get<{ success: boolean; data: MakeupShopResponse[] }>(
        '/makeup-shop',
        { params }
      );
      // 응답 구조 확인 및 안전한 반환
      if (response.data && 'data' in response.data) {
        return response.data.data || [];
      }
      // 응답이 직접 배열인 경우 (이전 형식)
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('메이크업샵 목록 조회 실패:', error);
      return [];
    }
  },

  /**
   * 메이크업샵 상세 조회
   */
  getDetail: async (id: number) => {
    try {
      const response = await apiClient.get<{ success: boolean; data: MakeupShopResponse }>(
        `/makeup-shop/${id}`
      );
      // 응답 구조 확인 및 안전한 반환
      if (response.data && 'data' in response.data) {
        return response.data.data;
      }
      // 응답이 직접 객체인 경우 (이전 형식)
      return response.data as any;
    } catch (error) {
      console.error('메이크업샵 상세 조회 실패:', error);
      throw error;
    }
  },

  /**
   * 메이크업샵 등록
   */
  create: async (data: MakeupShopRequest) => {
    const response = await apiClient.post<{ success: boolean; data: MakeupShopResponse }>(
      '/makeup-shop',
      data
    );
    return response.data.data;
  },

  /**
   * 메이크업샵 수정
   */
  update: async (id: number, data: MakeupShopRequest) => {
    const response = await apiClient.put<{ success: boolean; data: MakeupShopResponse }>(
      `/makeup-shop/${id}`,
      data
    );
    return response.data.data;
  },

  /**
   * 메이크업샵 삭제
   */
  delete: async (id: number) => {
    const response = await apiClient.delete<{ success: boolean; data: boolean }>(`/makeup-shop/${id}`);
    return response.data.data;
  },
};
