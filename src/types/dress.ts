/**
 * 드레스 관련 타입 정의
 * Backend DTO와 정확히 일치하도록 작성
 */

// Dress Enums
export enum DressLength {
  MINI = 'MINI',
  SHORT = 'SHORT',
  MIDI = 'MIDI',
  LONG = 'LONG',
  EXTRA_LONG = 'EXTRA_LONG',
}

export enum DressSeason {
  SPRING_SUMMER = 'SPRING_SUMMER',
  FALL_WINTER = 'FALL_WINTER',
  ALL_SEASON = 'ALL_SEASON',
}

export enum DressType {
  MERMAID = 'MERMAID',
  A_LINE = 'A_LINE',
  BALL_GOWN = 'BALL_GOWN',
  EMPIRE = 'EMPIRE',
  SHEATH = 'SHEATH',
  COLUMN = 'COLUMN',
}

export enum DressNeckline {
  SWEETHEART = 'SWEETHEART',
  V_NECK = 'V_NECK',
  ROUND = 'ROUND',
  OFF_SHOULDER = 'OFF_SHOULDER',
  HALTER = 'HALTER',
  SQUARE = 'SQUARE',
}

export enum DressMood {
  ROMANTIC = 'ROMANTIC',
  MODERN = 'MODERN',
  CLASSIC = 'CLASSIC',
  BOHEMIAN = 'BOHEMIAN',
  VINTAGE = 'VINTAGE',
  MINIMALIST = 'MINIMALIST',
}

export enum DressFabric {
  SATIN = 'SATIN',
  CHIFFON = 'CHIFFON',
  LACE = 'LACE',
  TULLE = 'TULLE',
  SILK = 'SILK',
  ORGANZA = 'ORGANZA',
  TAFFETA = 'TAFFETA',
}

// 드레스 등록/수정 요청
export interface DressRequest {
  name?: string;
  color?: string;
  shape?: string;
  priceRange?: string;
  length?: DressLength;
  season?: DressSeason;
  shopName?: string;
  designer?: string;
  type?: DressType;
  neckline?: DressNeckline;
  mood?: DressMood;
  fabric?: string;          // 여러 원단 타입을 콤마로 구분
  imageUrl?: string;
  features?: string;
}

// 드레스 응답
export interface DressResponse {
  id: number;
  name?: string;
  color?: string;
  shape?: string;
  priceRange?: string;
  length?: DressLength;
  season?: DressSeason;
  shopName?: string;        // DressShop 이름 (브랜드명)
  designer?: string;
  type?: DressType;
  neckLine?: DressNeckline;
  mood?: DressMood;
  fabric?: string;
  imageUrl?: string;
  features?: string;
  regDt?: string;
  updateDt?: string;
  isLiked?: boolean;       // 찜 여부
}

// 드레스 검색 파라미터 (프론트엔드 전용)
export interface DressSearchParams {
  keyword?: string;           // 검색 키워드
  shopNameContains?: string;
  dressShopId?: number;
  sort?: 'RECENT' | 'FAVORITE';
  length?: DressLength;
  season?: DressSeason;
  type?: DressType;
  page?: number;
  size?: number;
}
