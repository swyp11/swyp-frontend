/**
 * 일정 관련 Custom Hook
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { scheduleApi } from '@/api';
import { ScheduleRequest } from '@/types';

/**
 * 일정 생성 훅
 */
export const useCreateSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ScheduleRequest) => scheduleApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedule'] });
    },
  });
};

/**
 * 월별 일정 조회 훅
 */
export const useMonthSchedule = (year: number, month: number) => {
  return useQuery({
    queryKey: ['schedule', 'month', year, month],
    queryFn: () => scheduleApi.getMonthEvents(year, month),
    enabled: !!year && !!month,
  });
};

/**
 * 주별 일정 조회 훅
 */
export const useWeekSchedule = (startDate: string) => {
  return useQuery({
    queryKey: ['schedule', 'week', startDate],
    queryFn: () => scheduleApi.getWeekEvents(startDate),
    enabled: !!startDate,
  });
};

/**
 * 일별 일정 조회 훅
 */
export const useDaySchedule = (date: string) => {
  return useQuery({
    queryKey: ['schedule', 'day', date],
    queryFn: () => scheduleApi.getDayEvents(date),
    enabled: !!date,
  });
};

/**
 * 일정 상세 조회 훅
 */
export const useScheduleDetail = (id: number) => {
  return useQuery({
    queryKey: ['schedule', 'detail', id],
    queryFn: () => scheduleApi.getDetail(id),
    enabled: !!id,
  });
};

/**
 * 일정 수정 훅
 */
export const useUpdateSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ScheduleRequest }) =>
      scheduleApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['schedule'] });
      queryClient.invalidateQueries({
        queryKey: ['schedule', 'detail', variables.id],
      });
    },
  });
};

/**
 * 일정 삭제 훅
 */
export const useDeleteSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => scheduleApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedule'] });
    },
  });
};
