/**
 * 사용자 관련 Custom Hook
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userApi } from '@/api';
import { UserRequest, UserUpdateRequest, OAuthExtraInfoRequest, PasswordUpdateRequest } from '@/types';

/**
 * 회원가입 훅
 */
export const useJoin = () => {
  return useMutation({
    mutationFn: (data: UserRequest) => userApi.join(data),
  });
};

/**
 * OAuth 추가 정보 입력 훅
 */
export const useOAuthExtraInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: OAuthExtraInfoRequest) => userApi.oauthExtraInfo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'info'] });
    },
  });
};

/**
 * 사용자 정보 조회 훅
 */
export const useUserInfo = () => {
  return useQuery({
    queryKey: ['user', 'info'],
    queryFn: () => userApi.getUserInfo(),
    staleTime: 5 * 60 * 1000, // 5분
  });
};

/**
 * 사용자 정보 수정 훅
 */
export const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserUpdateRequest) => userApi.updateUserInfo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'info'] });
    },
  });
};

/**
 * 비밀번호 변경 훅 (로그인된 사용자)
 */
export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: (data: PasswordUpdateRequest) => userApi.updatePassword(data),
  });
};
