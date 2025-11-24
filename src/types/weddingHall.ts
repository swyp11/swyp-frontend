/**
 * 웨딩홀 관련 타입 정의
 * Backend DTO와 정확히 일치하도록 작성
 */

// Wedding Hall Enums
export enum WeddingHallVenueType {
  HOTEL = 'HOTEL',
  CONVENTION = 'CONVENTION',
  HOUSE = 'HOUSE',
  OUTDOOR = 'OUTDOOR',
  RESTAURANT = 'RESTAURANT',
}

export enum HallType {
  GRAND_BALLROOM = 'GRAND_BALLROOM',
  CONVENTION = 'CONVENTION',
  SKY_LOUNGE = 'SKY_LOUNGE',
  GARDEN = 'GARDEN',
  CHAPEL = 'CHAPEL',
  SMALL_GATHERING = 'SMALL_GATHERING',
}

export enum LightType {
  NATURAL = 'NATURAL',
  ARTIFICIAL = 'ARTIFICIAL',
  MIXED = 'MIXED',
}

// 웨딩홀 등록/수정 요청
export interface WeddingHallRequest {
  name: string;                  // @NotNull in backend
  address?: string;
  phone?: string;
  email?: string;
  parking?: number;              // Integer in backend
  imageUrl?: string;
  venueType?: WeddingHallVenueType;
}

// 웨딩홀 응답
export interface WeddingHallResponse {
  id: number;
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  parking?: number;
  imageUrl?: string;
  venueType?: WeddingHallVenueType;
  isLiked?: boolean;       // 찜 여부
}

// 홀 등록/수정 요청 (웨딩홀 내부 홀)
export interface HallRequest {
  weddingHallId: number;         // @NotNull in backend
  hallName?: string;
  maxCapacity?: number;          // Integer in backend
  description?: string;
  imageUrl?: string;
  hallType?: HallType;
  lightType?: LightType;
  ceilingHeight?: number;        // BigDecimal in backend
  area?: number;                 // BigDecimal in backend
}

// 홀 응답
export interface HallResponse {
  id: number;
  weddingHallId: number;
  hallName?: string;
  maxCapacity?: number;
  description?: string;
  imageUrl?: string;
  hallType?: HallType;
  lightType?: LightType;
  ceilingHeight?: number;
  area?: number;
}

// 웨딩홀 검색 파라미터 (프론트엔드 전용)
export interface WeddingHallSearchParams {
  name?: string;
  address?: string;
  venueType?: WeddingHallVenueType;
  sort?: 'RECENT' | 'FAVORITE';
}
