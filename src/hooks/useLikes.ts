/**
 * 찜 관련 Custom Hook
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { likesApi, weddingHallApi, dressShopApi, makeupShopApi, dressApi, hallApi } from '@/api';
import { LikesCategory, LikesType, LikesResponse } from '@/types';

/**
 * 찜 추가 훅
 */
export const useStoreLikes = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      category,
      postId,
    }: {
      category: LikesCategory;
      postId: number;
    }) => likesApi.store(category, postId),
    onSuccess: (_, variables) => {
      const { category, postId } = variables;

      // 상세 페이지 캐시를 직접 업데이트 (API 재호출 없이)
      if (category === 'wedding_hall') {
        queryClient.setQueryData(['weddingHall', 'detail', postId], (old: any) =>
          old ? { ...old, isLiked: true } : old
        );
      } else if (category === 'dress_shop') {
        queryClient.setQueryData(['dressShop', 'detail', postId], (old: any) =>
          old ? { ...old, isLiked: true } : old
        );
      } else if (category === 'makeup_shop') {
        queryClient.setQueryData(['makeupShop', 'detail', postId], (old: any) =>
          old ? { ...old, isLiked: true } : old
        );
      } else if (category === 'dress') {
        queryClient.setQueryData(['dress', 'detail', postId], (old: any) =>
          old ? { ...old, isLiked: true } : old
        );
      } else if (category === 'hall') {
        queryClient.setQueryData(['hall', 'detail', postId], (old: any) =>
          old ? { ...old, isLiked: true } : old
        );
      }

      // 목록 쿼리들은 무효화 (다음 조회 시 최신 데이터)
      queryClient.invalidateQueries({ queryKey: ['likes'] });
      queryClient.invalidateQueries({ queryKey: ['dress', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['dressShop', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['makeupShop', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['weddingHall', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['hall', 'list'] });
    },
  });
};

/**
 * 찜 삭제 훅
 */
export const useDeleteLikes = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      category,
      postId
    }: {
      category: LikesCategory;
      postId: number;
    }) => likesApi.delete(category, postId),
    onSuccess: (_, variables) => {
      const { category, postId } = variables;

      // 상세 페이지 캐시를 직접 업데이트 (API 재호출 없이)
      if (category === 'wedding_hall') {
        queryClient.setQueryData(['weddingHall', 'detail', postId], (old: any) =>
          old ? { ...old, isLiked: false } : old
        );
      } else if (category === 'dress_shop') {
        queryClient.setQueryData(['dressShop', 'detail', postId], (old: any) =>
          old ? { ...old, isLiked: false } : old
        );
      } else if (category === 'makeup_shop') {
        queryClient.setQueryData(['makeupShop', 'detail', postId], (old: any) =>
          old ? { ...old, isLiked: false } : old
        );
      } else if (category === 'dress') {
        queryClient.setQueryData(['dress', 'detail', postId], (old: any) =>
          old ? { ...old, isLiked: false } : old
        );
      } else if (category === 'hall') {
        queryClient.setQueryData(['hall', 'detail', postId], (old: any) =>
          old ? { ...old, isLiked: false } : old
        );
      }

      // 목록 쿼리들은 무효화 (다음 조회 시 최신 데이터)
      queryClient.invalidateQueries({ queryKey: ['likes'] });
      queryClient.invalidateQueries({ queryKey: ['dress', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['dressShop', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['makeupShop', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['weddingHall', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['hall', 'list'] });
    },
  });
};

/**
 * 찜 토글 훅 (추가/삭제 통합)
 */
export const useToggleLikes = () => {
  const storeLikes = useStoreLikes();
  const deleteLikes = useDeleteLikes();

  return {
    toggleLikes: ({
      isLiked,
      category,
      postId,
    }: {
      isLiked: boolean;
      category: LikesCategory;
      postId: number;
    }) => {
      if (isLiked) {
        return deleteLikes.mutate({ category, postId });
      } else {
        return storeLikes.mutate({ category, postId });
      }
    },
    isLoading: storeLikes.isPending || deleteLikes.isPending,
  };
};

/**
 * 아이템 상세 정보 가져오기
 */
const fetchItemDetails = async (likesType: LikesType, targetId: number) => {
  try {
    switch (likesType) {
      case LikesType.WEDDING_HALL:
        return await weddingHallApi.getDetail(targetId);
      case LikesType.DRESS_SHOP:
        return await dressShopApi.getDetail(targetId);
      case LikesType.MAKEUP_SHOP:
        return await makeupShopApi.getDetail(targetId);
      case LikesType.DRESS:
        return await dressApi.getDetail(targetId);
      case LikesType.HALL:
        return await hallApi.getDetail(targetId);
      default:
        return null;
    }
  } catch (error) {
    console.error(`Failed to fetch details for ${likesType} ${targetId}:`, error);
    return null;
  }
};

/**
 * 전체 찜 목록 조회 훅 (아이템 상세 정보 포함)
 */
export const useLikesList = () => {
  return useQuery({
    queryKey: ['likes', 'list'],
    queryFn: async () => {
      const likes = await likesApi.getAll();
      if (!likes || likes.length === 0) return [];

      // 각 찜 항목의 상세 정보를 병렬로 가져오기
      const likesWithDetails = await Promise.all(
        likes.map(async (like: LikesResponse) => {
          // itemDetails가 이미 있으면 그대로 사용
          if (like.itemDetails) return like;

          // 없으면 API로 가져오기
          const itemDetails = await fetchItemDetails(like.likesType, like.targetId);
          return { ...like, itemDetails };
        })
      );

      return likesWithDetails;
    },
  });
};

/**
 * 카테고리별 찜 목록 조회 훅 (아이템 상세 정보 포함)
 */
export const useLikesListByCategory = (category: string) => {
  return useQuery({
    queryKey: ['likes', 'list', category],
    queryFn: async () => {
      const likes = await likesApi.getByCategory(category);
      if (!likes || likes.length === 0) return [];

      // 각 찜 항목의 상세 정보를 병렬로 가져오기
      const likesWithDetails = await Promise.all(
        likes.map(async (like: LikesResponse) => {
          if (like.itemDetails) return like;
          const itemDetails = await fetchItemDetails(like.likesType, like.targetId);
          return { ...like, itemDetails };
        })
      );

      return likesWithDetails;
    },
  });
};
