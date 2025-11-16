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

// 인증 목적
export type AuthPurpose = 'SIGNUP' | 'PASSWORD_RESET';

// 이메일 인증 요청
export interface EmailAuthRequest {
  email: string;
  code: string;
}

// 이메일 인증 응답 (토큰 반환)
export interface EmailVerificationResponse {
  token: string;
  message: string;
}

// 비밀번호 재설정 요청
export interface PasswordResetRequest {
  email: string;
  newPassword: string;
  verificationToken: string;
}
