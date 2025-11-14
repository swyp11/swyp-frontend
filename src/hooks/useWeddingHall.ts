/**
 * 웨딩홀 관련 Custom Hook
 */

import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { weddingHallApi, hallApi } from '@/api';
import {
  WeddingHallRequest,
  WeddingHallResponse,
  HallRequest,
  WeddingHallSearchParams,
} from '@/types';

// ===== 웨딩홀 훅 =====

/**
 * 웨딩홀 목록 조회 훅
 */
export const useWeddingHallList = (
  params?: WeddingHallSearchParams,
  options?: Omit<UseQueryOptions<WeddingHallResponse[]>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['weddingHall', 'list', params],
    queryFn: () => weddingHallApi.getList(params),
    staleTime: 5 * 60 * 1000, // 5분
    ...options,
  });
};

/**
 * 웨딩홀 상세 조회 훅
 */
export const useWeddingHallDetail = (
  id: number,
  options?: Omit<UseQueryOptions<WeddingHallResponse>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['weddingHall', 'detail', id],
    queryFn: () => weddingHallApi.getDetail(id),
    enabled: !!id,
    ...options,
  });
};

/**
 * 웨딩홀 등록 훅
 */
export const useCreateWeddingHall = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: WeddingHallRequest) => weddingHallApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['weddingHall', 'list'] });
    },
  });
};

/**
 * 웨딩홀 수정 훅
 */
export const useUpdateWeddingHall = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: WeddingHallRequest }) =>
      weddingHallApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['weddingHall', 'list'] });
      queryClient.invalidateQueries({
        queryKey: ['weddingHall', 'detail', variables.id],
      });
    },
  });
};

/**
 * 웨딩홀 삭제 훅
 */
export const useDeleteWeddingHall = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => weddingHallApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['weddingHall', 'list'] });
    },
  });
};

/**
 * 웨딩홀 키워드 검색 훅
 */
export const useWeddingHallSearch = (
  keyword: string,
  options?: Omit<UseQueryOptions<WeddingHallResponse[]>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['weddingHall', 'search', keyword],
    queryFn: () => weddingHallApi.search(keyword),
    enabled: keyword.trim().length > 0,
    staleTime: 1 * 60 * 1000, // 1분
    ...options,
  });
};

// ===== 홀 훅 =====

/**
 * 홀 목록 조회 훅
 */
export const useHallList = () => {
  return useQuery({
    queryKey: ['hall', 'list'],
    queryFn: () => hallApi.getList(),
    staleTime: 5 * 60 * 1000, // 5분
  });
};

/**
 * 홀 상세 조회 훅
 */
export const useHallDetail = (id: number) => {
  return useQuery({
    queryKey: ['hall', 'detail', id],
    queryFn: () => hallApi.getDetail(id),
    enabled: !!id,
  });
};

/**
 * 홀 등록 훅
 */
export const useCreateHall = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: HallRequest) => hallApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hall', 'list'] });
    },
  });
};

/**
 * 홀 수정 훅
 */
export const useUpdateHall = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: HallRequest }) =>
      hallApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['hall', 'list'] });
      queryClient.invalidateQueries({
        queryKey: ['hall', 'detail', variables.id],
      });
    },
  });
};

/**
 * 홀 삭제 훅
 */
export const useDeleteHall = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => hallApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hall', 'list'] });
    },
  });
};
