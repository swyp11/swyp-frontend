/**
 * 인증 관련 Custom Hook
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/api';
import { OAuthCodeRequest, LoginRequest, OAuthProvider, AuthPurpose } from '@/types';

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
    mutationFn: ({ email, purpose = 'SIGNUP' }: { email: string; purpose?: AuthPurpose }) =>
      authApi.requestEmailVerification(email, purpose),
  });
};

/**
 * 이메일 인증번호 확인 훅 (토큰 반환)
 */
export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: ({ email, code, purpose = 'SIGNUP' }: { email: string; code: string; purpose?: AuthPurpose }) =>
      authApi.verifyEmail(email, code, purpose),
  });
};

/**
 * 비밀번호 재설정 훅
 */
export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({ email, newPassword, verificationToken }: { email: string; newPassword: string; verificationToken: string }) =>
      authApi.resetPassword(email, newPassword, verificationToken),
  });
};
