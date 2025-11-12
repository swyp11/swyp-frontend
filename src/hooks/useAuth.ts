/**
 * 인증 관련 Custom Hook
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/api';
import { OAuthCodeRequest, LoginRequest, OAuthProvider } from '@/types';

/**
 * OAuth 로그인 훅
 */
export const useOAuthLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      provider,
      data,
    }: {
      provider: OAuthProvider;
      data: OAuthCodeRequest;
    }) => authApi.oauthLogin(provider, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

/**
 * 일반 로그인 훅
 */
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

/**
 * 로그아웃 훅
 */
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      authApi.logout();
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });
};

/**
 * 로그인 상태 확인 훅
 */
export const useIsAuthenticated = () => {
  return useQuery({
    queryKey: ['auth', 'isAuthenticated'],
    queryFn: () => authApi.isAuthenticated(),
    staleTime: Infinity,
  });
};

/**
 * 이메일 인증 요청 훅
 */
export const useRequestEmailVerification = () => {
  return useMutation({
    mutationFn: (email: string) => authApi.requestEmailVerification(email),
  });
};

/**
 * 이메일 인증번호 확인 훅
 */
export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: ({ email, code }: { email: string; code: string }) =>
      authApi.verifyEmail(email, code),
  });
};
