/**
 * 샵(드레스샵, 메이크업샵) 관련 타입 정의
 * Backend DTO와 정확히 일치하도록 작성
 */

// 드레스샵 등록/수정 요청
export interface DressShopRequest {
  shopName: string;       // @NotNull in backend
  description?: string;
  address?: string;
  phone?: string;
  snsUrl?: string;
  imageUrl?: string;
  specialty?: string;
  features?: string;
}

// 드레스샵 응답
export interface DressShopResponse {
  id: number;
  shopName: string;
  description?: string;
  address?: string;
  phone?: string;
  snsUrl?: string;
  imageUrl?: string;
  specialty?: string;
  features?: string;
  isLiked?: boolean;       // 찜 여부
}

// 메이크업샵 등록/수정 요청
export interface MakeupShopRequest {
  shopName: string;       // @NotNull in backend
  description?: string;
  address?: string;
  phone?: string;
  snsUrl?: string;
  imageUrl?: string;
  specialty?: string;
  features?: string;
}

// 메이크업샵 응답
export interface MakeupShopResponse {
  id: number;
  shopName: string;
  description?: string;
  address?: string;
  phone?: string;
  snsUrl?: string;
  imageUrl?: string;
  specialty?: string;
  features?: string;
  isLiked?: boolean;       // 찜 여부
}

// 샵 검색 파라미터 (프론트엔드 전용)
export interface ShopSearchParams {
  shopName?: string;
  name?: string;          // 메이크업샵용
  address?: string;
  specialty?: string;
  sort?: 'RECENT' | 'FAVORITE';
  page?: number;
  size?: number;
}
