import { http, HttpResponse } from 'msw';
import { mockDressShops, mockDresses } from '../data';
import { toPageResponse } from '../utils';
import type { DressShopResponse } from '@/types/shop';

let dressShops: DressShopResponse[] = [...mockDressShops];
let nextId = dressShops.length + 1;

export const dressShopHandlers = [
  // 드레스샵 목록 조회
  http.get('/api/dress-shop', ({ request }) => {
    const url = new URL(request.url);
    const sort = url.searchParams.get('sortType') || url.searchParams.get('sort');
    const shopName = url.searchParams.get('shopName');
    const page = Number(url.searchParams.get('page') || 0);
    const size = Number(url.searchParams.get('size') || 20);

    let result = [...dressShops];

    if (shopName) {
      result = result.filter((s) =>
        s.shopName.toLowerCase().includes(shopName.toLowerCase())
      );
    }

    if (sort === 'FAVORITE') {
      result = result.sort((a, b) => (b.bookmarkCount || 0) - (a.bookmarkCount || 0));
    }

    return HttpResponse.json({ success: true, data: toPageResponse(result, page, size) });
  }),

  // 드레스샵 상세 조회
  http.get('/api/dress-shop/:id', ({ params }) => {
    const shop = dressShops.find((s) => s.id === Number(params.id));
    if (!shop) {
      return HttpResponse.json(
        { success: false, error: '드레스샵을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }
    return HttpResponse.json({ success: true, data: shop });
  }),

  // 드레스샵의 드레스 목록
  http.get('/api/dress-shop/:id/dresses', ({ params, request }) => {
    const shopId = Number(params.id);
    const shop = dressShops.find((s) => s.id === shopId);
    if (!shop) {
      return HttpResponse.json(
        { success: false, error: '드레스샵을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || 0);
    const size = Number(url.searchParams.get('size') || 20);
    // 해당 샵 이름의 드레스 반환, 없으면 전체 드레스 반환
    const shopDresses = mockDresses.filter((d) => d.shopName === shop.shopName);
    const items = shopDresses.length > 0 ? shopDresses : mockDresses;
    return HttpResponse.json({
      success: true,
      data: toPageResponse(items, page, size),
    });
  }),

  // 드레스샵 등록
  http.post('/api/dress-shop', async ({ request }) => {
    const body = (await request.json()) as Partial<DressShopResponse>;
    const newShop: DressShopResponse = {
      ...body,
      id: nextId++,
      shopName: body.shopName || '새로운 드레스샵',
      isLiked: false,
    } as DressShopResponse;
    dressShops.push(newShop);
    return HttpResponse.json({ success: true, data: newShop });
  }),

  // 드레스샵 수정
  http.put('/api/dress-shop/:id', async ({ params, request }) => {
    const body = (await request.json()) as Partial<DressShopResponse>;
    const index = dressShops.findIndex((s) => s.id === Number(params.id));
    if (index === -1) {
      return HttpResponse.json(
        { success: false, error: '드레스샵을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }
    dressShops[index] = { ...dressShops[index], ...body };
    return HttpResponse.json({ success: true, data: dressShops[index] });
  }),

  // 드레스샵 삭제
  http.delete('/api/dress-shop/:id', ({ params }) => {
    dressShops = dressShops.filter((s) => s.id !== Number(params.id));
    return HttpResponse.json({ success: true, data: true });
  }),
];
