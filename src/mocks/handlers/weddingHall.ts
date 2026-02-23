import { http, HttpResponse } from 'msw';
import { mockWeddingHalls, mockHalls, weddingHallToHalls } from '../data';
import { toPageResponse } from '../utils';
import type { WeddingHallResponse } from '@/types/weddingHall';

let weddingHalls: WeddingHallResponse[] = [...mockWeddingHalls];
let nextId = weddingHalls.length + 1;

export const weddingHallHandlers = [
  // 웨딩홀 목록 조회
  http.get('/api/wedding', ({ request }) => {
    const url = new URL(request.url);
    const sort = url.searchParams.get('sortType') || url.searchParams.get('sort');
    const page = Number(url.searchParams.get('page') || 0);
    const size = Number(url.searchParams.get('size') || 20);

    let result = [...weddingHalls];

    if (sort === 'FAVORITE') {
      result = result.sort((a, b) => (b.bookmarkCount || 0) - (a.bookmarkCount || 0));
    }

    return HttpResponse.json({ success: true, data: toPageResponse(result, page, size) });
  }),

  // 웨딩홀 검색
  http.get('/api/wedding/search', ({ request }) => {
    const url = new URL(request.url);
    const keyword = url.searchParams.get('keyword') || '';

    const result = weddingHalls.filter(
      (h) =>
        h.name.toLowerCase().includes(keyword.toLowerCase()) ||
        h.address?.toLowerCase().includes(keyword.toLowerCase())
    );

    return HttpResponse.json({ success: true, data: result });
  }),

  // 웨딩홀 상세 조회
  http.get('/api/wedding/:id/halls', ({ params }) => {
    const hallIds = weddingHallToHalls[Number(params.id)] || [];
    const halls = mockHalls.filter((h) => hallIds.includes(h.id));
    return HttpResponse.json({ success: true, data: halls });
  }),

  http.get('/api/wedding/:id', ({ params }) => {
    const hall = weddingHalls.find((h) => h.id === Number(params.id));
    if (!hall) {
      return HttpResponse.json(
        { success: false, error: '웨딩홀을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }
    return HttpResponse.json({ success: true, data: hall });
  }),

  // 웨딩홀 등록
  http.post('/api/wedding', async ({ request }) => {
    const body = (await request.json()) as Partial<WeddingHallResponse>;
    const newHall: WeddingHallResponse = {
      ...body,
      id: nextId++,
      name: body.name || '새로운 웨딩홀',
      isLiked: false,
    } as WeddingHallResponse;
    weddingHalls.push(newHall);
    return HttpResponse.json({ success: true, data: true });
  }),

  // 웨딩홀 수정
  http.put('/api/wedding/:id', async ({ params, request }) => {
    const body = (await request.json()) as Partial<WeddingHallResponse>;
    const index = weddingHalls.findIndex((h) => h.id === Number(params.id));
    if (index === -1) {
      return HttpResponse.json(
        { success: false, error: '웨딩홀을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }
    weddingHalls[index] = { ...weddingHalls[index], ...body };
    return HttpResponse.json({ success: true, data: true });
  }),

  // 웨딩홀 삭제
  http.delete('/api/wedding/:id', ({ params }) => {
    weddingHalls = weddingHalls.filter((h) => h.id !== Number(params.id));
    return HttpResponse.json({ success: true, data: true });
  }),
];
