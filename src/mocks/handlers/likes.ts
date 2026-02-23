import { http, HttpResponse } from 'msw';
import { mockLikes } from '../data';
import type { LikesResponse } from '@/types/likes';

let likes: LikesResponse[] = [...mockLikes];
let nextId = likes.length + 1;

export const likesHandlers = [
  // 전체 찜 목록 조회
  http.get('/api/likes', () => {
    return HttpResponse.json({ success: true, data: likes });
  }),

  // 카테고리별 찜 목록
  http.get('/api/likes/category/:category', ({ params }) => {
    const categoryMap: Record<string, string> = {
      hall: 'HALL',
      wedding_hall: 'WEDDING_HALL',
      dress: 'DRESS',
      dress_shop: 'DRESS_SHOP',
      makeup_shop: 'MAKEUP_SHOP',
    };
    const likesType = categoryMap[params.category as string];
    const result = likes.filter((l) => l.likesType === likesType);
    return HttpResponse.json({ success: true, data: result });
  }),

  // 찜 추가
  http.post('/api/likes/:category/:postId', ({ params }) => {
    const categoryMap: Record<string, string> = {
      hall: 'HALL',
      wedding_hall: 'WEDDING_HALL',
      dress: 'DRESS',
      dress_shop: 'DRESS_SHOP',
      makeup_shop: 'MAKEUP_SHOP',
    };
    const newLike: LikesResponse = {
      id: nextId++,
      likesType: categoryMap[params.category as string] as LikesResponse['likesType'],
      targetId: Number(params.postId),
      updateDt: new Date().toISOString(),
      itemDetails: null,
    };
    likes.push(newLike);
    return HttpResponse.json({ success: true, data: true });
  }),

  // 찜 삭제
  http.delete('/api/likes/:category/:postId', ({ params }) => {
    const categoryMap: Record<string, string> = {
      hall: 'HALL',
      wedding_hall: 'WEDDING_HALL',
      dress: 'DRESS',
      dress_shop: 'DRESS_SHOP',
      makeup_shop: 'MAKEUP_SHOP',
    };
    const likesType = categoryMap[params.category as string];
    likes = likes.filter(
      (l) => !(l.likesType === likesType && l.targetId === Number(params.postId))
    );
    return HttpResponse.json({ success: true, data: true });
  }),

  // 찜 삭제 (ID 기반)
  http.delete('/api/likes/delete/:id', ({ params }) => {
    likes = likes.filter((l) => l.id !== Number(params.id));
    return HttpResponse.json({ success: true, data: true });
  }),
];
