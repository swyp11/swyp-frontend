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

// 웨딩홀 응답 (백엔드 WeddingHallResponse 기준)
export interface WeddingHallResponse {
  id: number;
  name: string;
  address: string;
  hallType: string;        // 백엔드 HallType enum (HOTEL, CONVENTION 등)
  description?: string;
  minGuarantee?: number;
  maxCapacity?: number;
  mealPrice?: number;
  hallRentalPrice?: number;
  coverImage?: string;     // 백엔드 이미지 필드
  imageUrl?: string;       // 프론트 호환용
  avgRating?: number;
  reviewCount?: number;
  bookmarkCount?: number;
  isLiked?: boolean;
  // 프론트 호환용 (deprecated)
  phone?: string;
  email?: string;
  parking?: number;
  venueType?: WeddingHallVenueType;
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

// 홀 응답 (백엔드 HallResponse 기준)
export interface HallResponse {
  id: number;
  weddingHallId?: number;     // 소속 웨딩홀 ID
  name: string;               // 홀 이름
  floor?: number;             // 층수 (백엔드: floor)
  minCapacity?: number;       // 최소 수용인원 (백엔드: minCapacity)
  maxCapacity?: number;       // 최대 수용인원 (백엔드: maxCapacity)
  rentalPrice?: number;       // 대관료
  mealPrice?: number;         // 식대
  description?: string;       // 설명 (백엔드: description)
  imageUrl?: string;          // 이미지 URL
  coverImage?: string;        // 프론트 호환용
  isAvailable?: boolean;      // 이용 가능 여부
  // 프론트 호환용 필드 (deprecated)
  capacityMin?: number;       // → minCapacity 사용
  capacityMax?: number;       // → maxCapacity 사용
  floorNo?: number;           // → floor 사용
  desc?: string;              // → description 사용
  hallType?: string;
  lightType?: string;
  areaM2?: number;
  ceilingHeight?: number;
  stage?: boolean;
  ledWall?: boolean;
  aisleLength?: number;
  pillar?: boolean;
  status?: boolean;
  regDt?: string;
}

// 웨딩홀 검색 파라미터 (프론트엔드 전용)
export interface WeddingHallSearchParams {
  name?: string;
  address?: string;
  venueType?: WeddingHallVenueType;
  sortType?: 'RECENT' | 'FAVORITE';
  page?: number;
  size?: number;
}
