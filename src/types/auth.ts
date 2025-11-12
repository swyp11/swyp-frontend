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
  userId: string;       // 사용자 ID
  password: string;
}

// 토큰 응답
export interface TokenResponse {
  accessToken: string;
  expiresIn: number;        // long → number
  tokenType: string;        // Bearer
}

// OAuth Provider
export type OAuthProvider = 'google' | 'kakao' | 'naver';
