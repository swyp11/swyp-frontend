/**
 * 찜 관련 타입 정의
 */

// 찜 카테고리
export type LikesCategory = 'dress' | 'dress-shop' | 'makeup-shop' | 'wedding' | 'hall';

// 찜 응답
export interface LikesResponse {
  id: number;
  userId: number;
  category: LikesCategory;
  postId: number;
  createdAt?: string;
}

// 찜 추가 요청
export interface LikesRequest {
  category: LikesCategory;
  postId: number;
}
