/**
 * 찜 관련 Custom Hook
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
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
    onSuccess: () => {
      // 관련된 목록 쿼리들 무효화
      queryClient.invalidateQueries({ queryKey: ['likes'] });
      queryClient.invalidateQueries({ queryKey: ['dress'] });
      queryClient.invalidateQueries({ queryKey: ['dressShop'] });
      queryClient.invalidateQueries({ queryKey: ['makeupShop'] });
      queryClient.invalidateQueries({ queryKey: ['weddingHall'] });
      queryClient.invalidateQueries({ queryKey: ['hall'] });
    },
  });
};

/**
 * 찜 삭제 훅
 */
export const useDeleteLikes = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => likesApi.delete(id),
    onSuccess: () => {
      // 관련된 목록 쿼리들 무효화
      queryClient.invalidateQueries({ queryKey: ['likes'] });
      queryClient.invalidateQueries({ queryKey: ['dress'] });
      queryClient.invalidateQueries({ queryKey: ['dressShop'] });
      queryClient.invalidateQueries({ queryKey: ['makeupShop'] });
      queryClient.invalidateQueries({ queryKey: ['weddingHall'] });
      queryClient.invalidateQueries({ queryKey: ['hall'] });
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
        return deleteLikes.mutate(likesId);
      } else {
        return storeLikes.mutate({ category, postId });
      }
    },
    isLoading: storeLikes.isPending || deleteLikes.isPending,
  };
};
