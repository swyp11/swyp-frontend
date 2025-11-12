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
  dressShopId: number;      // @NotNull in backend
  dressName?: string;
  price?: number;           // Integer in backend
  description?: string;
  imageUrl?: string;
  length?: DressLength;
  season?: DressSeason;
  type?: DressType;
  neckline?: DressNeckline;
  mood?: DressMood;
  fabric?: DressFabric;
}

// 드레스 응답
export interface DressResponse {
  id: number;
  dressShopId: number;
  dressName?: string;
  price?: number;
  description?: string;
  imageUrl?: string;
  length?: DressLength;
  season?: DressSeason;
  type?: DressType;
  neckline?: DressNeckline;
  mood?: DressMood;
  fabric?: DressFabric;
  isLiked?: boolean;       // 찜 여부
}

// 드레스 검색 파라미터 (프론트엔드 전용)
export interface DressSearchParams {
  shopNameContains?: string;
  dressShopId?: number;
  sort?: 'RECENT' | 'FAVORITE';
  length?: DressLength;
  season?: DressSeason;
  type?: DressType;
}
