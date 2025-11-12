/**
 * 찜 관련 타입 정의
 * Backend DTO와 정확히 일치하도록 작성
 */

// Likes Type Enum
export enum LikesType {
  DRESS = 'DRESS',
  DRESS_SHOP = 'DRESS_SHOP',
  MAKEUP_SHOP = 'MAKEUP_SHOP',
  WEDDING_HALL = 'WEDDING_HALL',
  HALL = 'HALL',
}

// Backward compatibility type alias (lowercase string version)
export type LikesCategory = 'dress' | 'dress-shop' | 'makeup-shop' | 'wedding' | 'hall';

// 찜 추가/삭제 요청
export interface LikesRequest {
  userId: number;         // @NotNull in backend
  likesType: LikesType;   // @NotNull in backend
  targetId: number;       // @NotNull in backend
}
