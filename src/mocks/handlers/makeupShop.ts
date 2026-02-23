import { http, HttpResponse } from 'msw';
import { mockMakeupShops } from '../data';
import { toPageResponse } from '../utils';
import type { MakeupShopResponse } from '@/types/shop';

let makeupShops: MakeupShopResponse[] = [...mockMakeupShops];
let nextId = makeupShops.length + 1;

export const makeupShopHandlers = [
  // 메이크업샵 목록 조회
  http.get('/api/makeup-shop', ({ request }) => {
    const url = new URL(request.url);
    const sort = url.searchParams.get('sortType') || url.searchParams.get('sort');
    const shopName = url.searchParams.get('shopName') || url.searchParams.get('name');
    const page = Number(url.searchParams.get('page') || 0);
    const size = Number(url.searchParams.get('size') || 20);

    let result = [...makeupShops];

    if (shopName) {
      result = result.filter((s) =>
        s.name.toLowerCase().includes(shopName.toLowerCase())
      );
    }

    if (sort === 'FAVORITE') {
      result = result.sort((a, b) => (b.bookmarkCount || 0) - (a.bookmarkCount || 0));
    }

    return HttpResponse.json({ success: true, data: toPageResponse(result, page, size) });
  }),

  // 메이크업샵 상세 조회
  http.get('/api/makeup-shop/:id', ({ params }) => {
    const shop = makeupShops.find((s) => s.id === Number(params.id));
    if (!shop) {
      return HttpResponse.json(
        { success: false, error: '메이크업샵을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }
    return HttpResponse.json({ success: true, data: shop });
  }),

  // 메이크업샵 등록
  http.post('/api/makeup-shop', async ({ request }) => {
    const body = (await request.json()) as Partial<MakeupShopResponse>;
    const newShop: MakeupShopResponse = {
      ...body,
      id: nextId++,
      name: body.name || '새로운 메이크업샵',
      address: body.address || '',
      serviceType: body.serviceType || 'WEDDING',
      isLiked: false,
    } as MakeupShopResponse;
    makeupShops.push(newShop);
    return HttpResponse.json({ success: true, data: newShop });
  }),

  // 메이크업샵 수정
  http.put('/api/makeup-shop/:id', async ({ params, request }) => {
    const body = (await request.json()) as Partial<MakeupShopResponse>;
    const index = makeupShops.findIndex((s) => s.id === Number(params.id));
    if (index === -1) {
      return HttpResponse.json(
        { success: false, error: '메이크업샵을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }
    makeupShops[index] = { ...makeupShops[index], ...body };
    return HttpResponse.json({ success: true, data: makeupShops[index] });
  }),

  // 메이크업샵 삭제
  http.delete('/api/makeup-shop/:id', ({ params }) => {
    makeupShops = makeupShops.filter((s) => s.id !== Number(params.id));
    return HttpResponse.json({ success: true, data: true });
  }),
];
