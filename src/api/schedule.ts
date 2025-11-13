/**
 * 일정 관련 API
 */

import { apiClient } from './client';
import {
  ScheduleResponse,
  ScheduleRequest,
  ScheduleMonthResponse,
  ScheduleWeekResponse,
} from '@/types/schedule';
import { ApiResponse } from '@/types/common';

export const scheduleApi = {
  /**
   * 일정 생성
   */
  create: async (data: ScheduleRequest) => {
    const response = await apiClient.post<ApiResponse<ScheduleResponse>>(
      '/schedule',
      data
    );
    return response.data.data;
  },

  /**
   * 월별 일정 조회
   */
  getMonthEvents: async (year: number, month: number) => {
    const response = await apiClient.get<ApiResponse<ScheduleMonthResponse[]>>(
      '/schedule/month',
      {
        params: { year, month },
      }
    );
    return response.data.data || [];
  },

  /**
   * 주별 일정 조회
   */
  getWeekEvents: async (startDate: string) => {
    const response = await apiClient.get<ApiResponse<ScheduleWeekResponse[]>>(
      '/schedule/week',
      {
        params: { startDate },
      }
    );
    return response.data.data || [];
  },

  /**
   * 일별 일정 조회
   */
  getDayEvents: async (date: string) => {
    const response = await apiClient.get<ApiResponse<ScheduleResponse[]>>(
      '/schedule/day',
      {
        params: { date },
      }
    );
    return response.data.data || [];
  },

  /**
   * 일정 상세 조회
   */
  getDetail: async (id: number) => {
    const response = await apiClient.get<ApiResponse<ScheduleResponse>>(
      `/schedule/${id}`
    );
    return response.data.data;
  },

  /**
   * 일정 수정
   */
  update: async (id: number, data: ScheduleRequest) => {
    const response = await apiClient.put<ApiResponse<ScheduleResponse>>(
      `/schedule/${id}`,
      data
    );
    return response.data.data;
  },

  /**
   * 일정 삭제
   */
  delete: async (id: number) => {
    const response = await apiClient.delete<ApiResponse<boolean>>(`/schedule/${id}`);
    return response.data.data;
  },
};
