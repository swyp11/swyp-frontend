/**
 * 찜 관련 Custom Hook
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { likesApi } from '@/api';
import { LikesCategory } from '@/types';

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
      id,
      category,
      postId
    }: {
      id: number;
      category?: LikesCategory;
      postId?: number;
    }) => likesApi.delete(id),
    onSuccess: (_, variables) => {
      const { category, postId } = variables;

      // 상세 페이지 캐시를 직접 업데이트 (API 재호출 없이)
      if (category && postId) {
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
      likesId,
      category,
      postId,
    }: {
      isLiked: boolean;
      likesId?: number;
      category: LikesCategory;
      postId: number;
    }) => {
      if (isLiked && likesId) {
        return deleteLikes.mutate({ id: likesId, category, postId });
      } else {
        return storeLikes.mutate({ category, postId });
      }
    },
    isLoading: storeLikes.isPending || deleteLikes.isPending,
  };
};

/**
 * 전체 찜 목록 조회 훅
 */
export const useLikesList = () => {
  return useQuery({
    queryKey: ['likes', 'list'],
    queryFn: () => likesApi.getAll(),
  });
};

/**
 * 카테고리별 찜 목록 조회 훅
 */
export const useLikesListByCategory = (category: string) => {
  return useQuery({
    queryKey: ['likes', 'list', category],
    queryFn: () => likesApi.getByCategory(category),
  });
};
