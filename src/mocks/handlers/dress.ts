import { http, HttpResponse } from 'msw';
import { mockDresses } from '../data';
import type { DressResponse } from '@/types/dress';

let dresses: DressResponse[] = [...mockDresses];
let nextId = dresses.length + 1;

export const dressHandlers = [
  // 드레스 목록 조회
  http.get('/api/dress', ({ request }) => {
    const url = new URL(request.url);
    const sort = url.searchParams.get('sort');
    const shopNameContains = url.searchParams.get('shopNameContains');
    const dressShopId = url.searchParams.get('dressShopId');

    let result = [...dresses];

    if (shopNameContains) {
      result = result.filter((d) =>
        d.shopName?.toLowerCase().includes(shopNameContains.toLowerCase())
      );
    }

    if (dressShopId) {
      // dressShopId 기반 필터 (mock에서는 간단히 처리)
      result = result.filter((_, i) => (i % 4) + 1 === Number(dressShopId));
    }

    if (sort === 'FAVORITE') {
      result = result.filter((d) => d.isLiked);
    } else {
      result.sort((a, b) => (b.regDt || '').localeCompare(a.regDt || ''));
    }

    return HttpResponse.json({ success: true, data: result });
  }),

  // 드레스 상세 조회
  http.get('/api/dress/:id', ({ params }) => {
    const dress = dresses.find((d) => d.id === Number(params.id));
    if (!dress) {
      return HttpResponse.json(
        { success: false, error: '드레스를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }
    return HttpResponse.json({ success: true, data: dress });
  }),

  // 드레스 등록
  http.post('/api/dress', async ({ request }) => {
    const body = (await request.json()) as Partial<DressResponse>;
    const newDress: DressResponse = {
      ...body,
      id: nextId++,
      regDt: new Date().toISOString(),
      isLiked: false,
    } as DressResponse;
    dresses.push(newDress);
    return HttpResponse.json({ success: true, data: newDress });
  }),

  // 드레스 수정
  http.put('/api/dress/:id', async ({ params, request }) => {
    const body = (await request.json()) as Partial<DressResponse>;
    const index = dresses.findIndex((d) => d.id === Number(params.id));
    if (index === -1) {
      return HttpResponse.json(
        { success: false, error: '드레스를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }
    dresses[index] = { ...dresses[index], ...body, updateDt: new Date().toISOString() };
    return HttpResponse.json({ success: true, data: dresses[index] });
  }),

  // 드레스 삭제
  http.delete('/api/dress/:id', ({ params }) => {
    dresses = dresses.filter((d) => d.id !== Number(params.id));
    return HttpResponse.json({ success: true, data: true });
  }),
];
