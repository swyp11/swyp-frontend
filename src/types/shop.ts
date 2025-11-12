/**
 * 샵(드레스샵, 메이크업샵) 관련 타입 정의
 */

// 드레스샵 응답
export interface DressShopResponse {
  id: number;
  shopName: string;
  address?: string;
  phone?: string;
  description?: string;
  imageUrl?: string;
  images?: string[];
  specialty?: string;
  businessHours?: string;
  website?: string;
  favorite?: number;
  createdAt?: string;
  updatedAt?: string;
}

// 드레스샵 등록/수정 요청
export interface DressShopRequest {
  shopName: string;
  address?: string;
  phone?: string;
  description?: string;
  imageUrl?: string;
  images?: string[];
  specialty?: string;
  businessHours?: string;
  website?: string;
}

// 메이크업샵 응답
export interface MakeupShopResponse {
  id: number;
  shopName: string;
  address?: string;
  phone?: string;
  description?: string;
  imageUrl?: string;
  images?: string[];
  specialty?: string;
  businessHours?: string;
  website?: string;
  priceRange?: string;
  favorite?: number;
  createdAt?: string;
  updatedAt?: string;
}

// 메이크업샵 등록/수정 요청
export interface MakeupShopRequest {
  shopName: string;
  address?: string;
  phone?: string;
  description?: string;
  imageUrl?: string;
  images?: string[];
  specialty?: string;
  businessHours?: string;
  website?: string;
  priceRange?: string;
}

// 샵 검색 파라미터
export interface ShopSearchParams {
  shopName?: string;
  address?: string;
  specialty?: string;
  sort?: 'RECENT' | 'FAVORITE';
}
