/**
 * 드레스 관련 Custom Hook
 */

import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { dressApi } from '@/api';
import { DressRequest, DressResponse, DressSearchParams, PageResponse } from '@/types';

/**
 * 드레스 목록 조회 훅 (페이지네이션)
 */
export const useDressList = (
  params?: DressSearchParams,
  options?: Omit<UseQueryOptions<PageResponse<DressResponse>>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['dress', 'list', params],
    queryFn: () => dressApi.getList(params),
    staleTime: 5 * 60 * 1000, // 5분
    ...options,
  });
};

/**
 * 드레스 상세 조회 훅
 */
export const useDressDetail = (
  id: number,
  options?: Omit<UseQueryOptions<DressResponse>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['dress', 'detail', id],
    queryFn: () => dressApi.getDetail(id),
    enabled: !!id,
    ...options,
  });
};

/**
 * 드레스 등록 훅
 */
export const useCreateDress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DressRequest) => dressApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dress', 'list'] });
    },
  });
};

/**
 * 드레스 수정 훅
 */
export const useUpdateDress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: DressRequest }) =>
      dressApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['dress', 'list'] });
      queryClient.invalidateQueries({
        queryKey: ['dress', 'detail', variables.id],
      });
    },
  });
};

/**
 * 드레스 삭제 훅
 */
export const useDeleteDress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => dressApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dress', 'list'] });
    },
  });
};
