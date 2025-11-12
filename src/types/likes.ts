/**
 * 찜 관련 타입 정의
 * Backend DTO와 정확히 일치하도록 작성
 */

// Likes Type Enum (백엔드와 정확히 일치)
export enum LikesType {
  HALL = 'HALL',
  WEDDING_HALL = 'WEDDING_HALL',
  DRESS = 'DRESS',
  DRESS_SHOP = 'DRESS_SHOP',
  MAKEUP_SHOP = 'MAKEUP_SHOP',
}

// 백엔드 API에서 사용하는 category 문자열 타입
export type LikesCategory = 'hall' | 'wedding_hall' | 'dress' | 'dress_shop' | 'makeup_shop';

// 찜 추가/삭제 요청
export interface LikesRequest {
  userId: number;         // @NotNull in backend
  likesType: LikesType;   // @NotNull in backend
  targetId: number;       // @NotNull in backend
}

// 찜 목록 응답 (상세 정보 포함)
export interface LikesResponse {
  id: number;              // 찜 ID
  likesType: LikesType;    // 찜 타입
  targetId: number;        // 대상 ID
  updateDt: string;        // 업데이트 날짜 (ISO 8601 형식)
  itemDetails: any;        // 실제 아이템 정보 (WeddingHallResponse | DressShopResponse | MakeupShopResponse | DressResponse | HallResponse)
}
