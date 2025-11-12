/**
 * 사용자 관련 타입 정의
 */

// 사용자 정보
export interface UserResponse {
  id: number;
  username: string;
  email: string;
  name?: string;
  phone?: string;
  weddingDate?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

// 회원가입 요청
export interface UserRequest {
  username: string;
  password: string;
  email: string;
  name?: string;
  phone?: string;
}

// 사용자 정보 수정 요청
export interface UserUpdateRequest {
  name?: string;
  phone?: string;
  weddingDate?: string;
  password?: string;
}

// OAuth 추가 정보 입력 요청
export interface OAuthExtraInfoRequest {
  name?: string;
  phone?: string;
  weddingDate?: string;
}
