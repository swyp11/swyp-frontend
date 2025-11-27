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

// 홀 응답 (실제 백엔드 응답 기준)
export interface HallResponse {
  id: number;
  name?: string;              // 홀 이름
  capacityMin?: number;       // 최소 수용인원
  capacityMax?: number;       // 최대 수용인원
  hallType?: string;          // 홀 타입 (COMPLEX 등)
  floorNo?: number;           // 층수
  lightType?: string;         // 조명 타입 (DIM 등)
  areaM2?: number;            // 면적 (㎡)
  ceilingHeight?: number;     // 천장 높이
  stage?: boolean;            // 무대 유무
  ledWall?: boolean;          // LED 월 유무
  aisleLength?: number;       // 버진로드 길이
  pillar?: boolean;           // 기둥 유무
  status?: boolean;           // 상태
  desc?: string;              // 설명
  regDt?: string;             // 등록일
  imageUrl?: string;          // 이미지 URL
}

// 웨딩홀 검색 파라미터 (프론트엔드 전용)
export interface WeddingHallSearchParams {
  name?: string;
  address?: string;
  venueType?: WeddingHallVenueType;
  sort?: 'RECENT' | 'FAVORITE';
}
