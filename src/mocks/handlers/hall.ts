import { http, HttpResponse } from 'msw';
import { mockHalls } from '../data';
import type { HallResponse } from '@/types/weddingHall';

let halls: HallResponse[] = [...mockHalls];
let nextId = halls.length + 1;

export const hallHandlers = [
  // 홀 목록 조회
  http.get('/api/hall', () => {
    return HttpResponse.json({ success: true, data: halls });
  }),

  // 홀 상세 조회
  http.get('/api/hall/:id', ({ params }) => {
    const hall = halls.find((h) => h.id === Number(params.id));
    if (!hall) {
      return HttpResponse.json(
        { success: false, error: '홀을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }
    return HttpResponse.json({ success: true, data: hall });
  }),

  // 홀 등록
  http.post('/api/hall', async ({ request }) => {
    const body = (await request.json()) as Partial<HallResponse>;
    const newHall: HallResponse = {
      ...body,
      id: nextId++,
      status: true,
      regDt: new Date().toISOString(),
    } as HallResponse;
    halls.push(newHall);
    return HttpResponse.json({ success: true, data: true });
  }),

  // 홀 수정
  http.put('/api/hall/:id', async ({ params, request }) => {
    const body = (await request.json()) as Partial<HallResponse>;
    const index = halls.findIndex((h) => h.id === Number(params.id));
    if (index === -1) {
      return HttpResponse.json(
        { success: false, error: '홀을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }
    halls[index] = { ...halls[index], ...body };
    return HttpResponse.json({ success: true, data: true });
  }),

  // 홀 삭제
  http.delete('/api/hall/:id', ({ params }) => {
    halls = halls.filter((h) => h.id !== Number(params.id));
    return HttpResponse.json({ success: true, data: true });
  }),
];
