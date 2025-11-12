/**
 * 인증 관련 타입 정의
 */

// OAuth 로그인 요청
export interface OAuthCodeRequest {
  code: string;
  redirectUri: string;
}

// 일반 로그인 요청
export interface LoginRequest {
  username: string;
  password: string;
}

// 토큰 응답
export interface TokenResponse {
  accessToken: string;
  refreshToken?: string;
  tokenType?: string;
  expiresIn?: number;
}

// OAuth Provider
export type OAuthProvider = 'google' | 'kakao' | 'naver';
