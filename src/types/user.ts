/**
 * 사용자 관련 타입 정의
 */

// 결혼 역할
export type WeddingRole = 'GROOM' | 'BRIDE';

// 사용자 권한
export type UserAuth = 'USER' | 'ADMIN';

// 사용자 정보 응답
export interface UserResponse {
  id: number;
  userId: string;
  password?: string;        // 주의: 보안상 일반적으로 응답에 포함하지 않음
  nickname: string;
  birth?: string;           // LocalDate → string (YYYY-MM-DD)
  weddingDate?: string;     // LocalDate → string (YYYY-MM-DD)
  email: string;
  provider?: string;        // oauth provider
  providerId?: string;      // oauth provider id
  auth?: UserAuth;          // UserEnum
  weddingRole?: WeddingRole;
  phoneNumber?: string;
  address?: string;
}

// 회원가입 요청
export interface UserRequest {
  userId: string;           // 사용자 ID (이메일 사용)
  password: string;
  email: string;
  nickname?: string;        // 닉네임
  birth?: string;           // 생년월일 (YYYY-MM-DD)
  weddingDate?: string;     // 결혼 날짜 (YYYY-MM-DD)
  weddingRole?: WeddingRole;  // 신랑/신부
  verificationToken?: string; // 이메일 인증 토큰
}

// 사용자 정보 수정 요청
export interface UserUpdateRequest {
  nickname?: string;
  birth?: string;           // YYYY-MM-DD
  weddingDate?: string;     // YYYY-MM-DD
  email?: string;
  weddingRole?: WeddingRole;
  phoneNumber?: string;
  address?: string;
}

// OAuth 추가 정보 입력 요청
export interface OAuthExtraInfoRequest {
  nickname?: string;
  birth?: string;           // YYYY-MM-DD
  weddingDate?: string;     // YYYY-MM-DD
  weddingRole?: WeddingRole;
}
