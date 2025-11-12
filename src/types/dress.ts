/**
 * 드레스 관련 타입 정의
 */

// 드레스 응답
export interface DressResponse {
  id: number;
  shopName: string;
  dressName?: string;
  price?: number;
  description?: string;
  imageUrl?: string;
  images?: string[];
  style?: string;
  material?: string;
  size?: string;
  favorite?: number;
  createdAt?: string;
  updatedAt?: string;
}

// 드레스 등록/수정 요청
export interface DressRequest {
  shopName: string;
  dressName?: string;
  price?: number;
  description?: string;
  imageUrl?: string;
  images?: string[];
  style?: string;
  material?: string;
  size?: string;
}

// 드레스 검색 파라미터
export interface DressSearchParams {
  shopNameContains?: string;
  sort?: 'RECENT' | 'FAVORITE';
}
