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

// 드레스샵 응답 (백엔드 DressShopResponse 기준)
export interface DressShopResponse {
  id: number;
  shopName: string;
  description?: string;
  address?: string;
  phone?: string;
  snsUrl?: string;
  imageUrl?: string;
  coverImage?: string;     // 프론트 호환용
  specialty?: string;
  features?: string;
  avgRating?: number;
  bookmarkCount?: number;
  isLiked?: boolean;
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

// 메이크업샵 응답 (백엔드 MakeupShopResponse 기준)
export interface MakeupShopResponse {
  id: number;
  name: string;            // 백엔드는 name 사용 (shopName 아님)
  shopName?: string;       // 프론트 호환용 (deprecated)
  address: string;
  serviceType: string;     // MakeupServiceType enum
  basePrice?: number;
  coverImage?: string;     // 백엔드 이미지 필드
  imageUrl?: string;       // 프론트 호환용
  phone?: string;
  snsUrl?: string;
  specialty?: string;
  avgRating?: number;
  onSiteAvailable?: boolean;
  bookmarkCount?: number;
  isLiked?: boolean;
}

// 샵 검색 파라미터 (프론트엔드 전용)
export interface ShopSearchParams {
  shopName?: string;
  name?: string;          // 메이크업샵용
  address?: string;
  specialty?: string;
  sortType?: 'RECENT' | 'FAVORITE';
  page?: number;
  size?: number;
}
