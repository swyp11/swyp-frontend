/**
 * 샵(드레스샵, 메이크업샵) 관련 Custom Hook
 */

import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { dressShopApi, makeupShopApi } from '@/api';
import { DressShopRequest, MakeupShopRequest, ShopSearchParams, DressShopResponse, MakeupShopResponse } from '@/types';

// ===== 드레스샵 훅 =====

/**
 * 드레스샵 목록 조회 훅
 */
export const useDressShopList = (
  params?: ShopSearchParams,
  options?: Omit<UseQueryOptions<DressShopResponse[]>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['dressShop', 'list', params],
    queryFn: () => dressShopApi.getList(params),
    staleTime: 5 * 60 * 1000, // 5분
    ...options,
  });
};

/**
 * 드레스샵 상세 조회 훅
 */
export const useDressShopDetail = (
  id: number,
  options?: Omit<UseQueryOptions<DressShopResponse>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['dressShop', 'detail', id],
    queryFn: () => dressShopApi.getDetail(id),
    enabled: !!id,
    ...options,
  });
};

/**
 * 드레스샵의 드레스 목록 조회 훅
 */
export const useDressShopDresses = (shopId: number) => {
  return useQuery({
    queryKey: ['dressShop', shopId, 'dresses'],
    queryFn: () => dressShopApi.getDresses(shopId),
    enabled: !!shopId,
  });
};

/**
 * 드레스샵 등록 훅
 */
export const useCreateDressShop = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DressShopRequest) => dressShopApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dressShop', 'list'] });
    },
  });
};

/**
 * 드레스샵 수정 훅
 */
export const useUpdateDressShop = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: DressShopRequest }) =>
      dressShopApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['dressShop', 'list'] });
      queryClient.invalidateQueries({
        queryKey: ['dressShop', 'detail', variables.id],
      });
    },
  });
};

/**
 * 드레스샵 삭제 훅
 */
export const useDeleteDressShop = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => dressShopApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dressShop', 'list'] });
    },
  });
};

// ===== 메이크업샵 훅 =====

/**
 * 메이크업샵 목록 조회 훅
 */
export const useMakeupShopList = (
  params?: ShopSearchParams,
  options?: Omit<UseQueryOptions<MakeupShopResponse[]>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['makeupShop', 'list', params],
    queryFn: () => makeupShopApi.getList(params),
    staleTime: 5 * 60 * 1000, // 5분
    ...options,
  });
};

/**
 * 메이크업샵 상세 조회 훅
 */
export const useMakeupShopDetail = (
  id: number,
  options?: Omit<UseQueryOptions<MakeupShopResponse>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['makeupShop', 'detail', id],
    queryFn: () => makeupShopApi.getDetail(id),
    enabled: !!id,
    ...options,
  });
};

/**
 * 메이크업샵 등록 훅
 */
export const useCreateMakeupShop = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MakeupShopRequest) => makeupShopApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['makeupShop', 'list'] });
    },
  });
};

/**
 * 메이크업샵 수정 훅
 */
export const useUpdateMakeupShop = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: MakeupShopRequest }) =>
      makeupShopApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['makeupShop', 'list'] });
      queryClient.invalidateQueries({
        queryKey: ['makeupShop', 'detail', variables.id],
      });
    },
  });
};

/**
 * 메이크업샵 삭제 훅
 */
export const useDeleteMakeupShop = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => makeupShopApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['makeupShop', 'list'] });
    },
  });
};
