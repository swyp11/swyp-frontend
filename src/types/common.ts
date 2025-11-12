/**
 * 공통 타입 정의
 */

// 정렬 타입
export type SortType = 'RECENT' | 'FAVORITE';

// API 응답 기본 타입
export interface ApiResponse<T> {
  result?: T;
  message?: string;
  error?: string;
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
