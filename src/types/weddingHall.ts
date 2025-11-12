/**
 * 웨딩홀 관련 타입 정의
 */

// 웨딩홀 응답
export interface WeddingHallResponse {
  id: number;
  name: string;
  venueType?: string;
  parking?: number;
  address?: string;
  phone?: string;
  email?: string;
  description?: string;
  imageUrl?: string;
  images?: string[];
  capacity?: number;
  facilities?: string[];
  priceRange?: string;
  parkingAvailable?: boolean;
  favorite?: number;
  createdAt?: string;
  updatedAt?: string;
}

// 웨딩홀 등록/수정 요청
export interface WeddingHallRequest {
  id?: number;
  hallName: string;
  address?: string;
  phone?: string;
  description?: string;
  imageUrl?: string;
  images?: string[];
  capacity?: number;
  facilities?: string[];
  priceRange?: string;
  parkingAvailable?: boolean;
}

// 홀 응답 (웨딩홀 내부 홀)
export interface HallResponse {
  id: number;
  weddingHallId?: number;
  hallName: string;
  capacity?: number;
  size?: string;
  description?: string;
  imageUrl?: string;
  images?: string[];
  facilities?: string[];
  createdAt?: string;
  updatedAt?: string;
}

// 홀 등록/수정 요청
export interface HallRequest {
  id?: number;
  weddingHallId?: number;
  hallName: string;
  capacity?: number;
  size?: string;
  description?: string;
  imageUrl?: string;
  images?: string[];
  facilities?: string[];
}

// 웨딩홀 검색 파라미터
export interface WeddingHallSearchParams {
  sort?: 'RECENT' | 'FAVORITE';
}
