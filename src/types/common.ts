/**
 * 공통 타입 정의
 */

// 정렬 타입
export type SortType = 'RECENT' | 'FAVORITE';

// API 공통 응답 타입 (백엔드 공통 응답 형식)
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// 성공 응답만 (타입 가드용)
export interface SuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

// 에러 응답만 (타입 가드용)
export interface ErrorResponse {
  success: false;
  error: string;
  message?: string;
}

// 페이지네이션 관련
export interface Pagination {
  page: number;
  size: number;
  total: number;
}

// 검색 파라미터
export interface SearchParams {
  sort?: SortType;
  page?: number;
  size?: number;
}
