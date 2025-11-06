import { NextRequest, NextResponse } from 'next/server';

export interface DressShop {
  id: string;
  image: string;
  title: string;
  description: string;
  category: 'dress';
}

// Mock 데이터 - 드레스샵 (업체)
const mockDressShops: DressShop[] = [
  // 인기
  {
    id: 'dr-pop-1',
    image: '/img/frame-482543-1.png',
    title: '아펠가모 광화문점',
    description: '서울시 종로구',
    category: 'dress',
  },
  {
    id: 'dr-pop-2',
    image: '/img/frame-482543-1.png',
    title: '규수당 문래점',
    description: '서울시 영등포구',
    category: 'dress',
  },
  {
    id: 'dr-pop-3',
    image: '/img/frame-482543-1.png',
    title: '루벨 강동',
    description: '서울시 강동구',
    category: 'dress',
  },
  {
    id: 'dr-pop-4',
    image: '/img/frame-482543-1.png',
    title: '라비앙로즈 명동점',
    description: '서울시 중구',
    category: 'dress',
  },
  {
    id: 'dr-pop-5',
    image: '/img/frame-482543-1.png',
    title: '샤랄라 강남점',
    description: '서울시 강남구',
    category: 'dress',
  },

  // 신규
  {
    id: 'dr-new-1',
    image: '/img/frame-482543-4.png',
    title: '엘레강스 서초점',
    description: '서울시 서초구',
    category: 'dress',
  },
  {
    id: 'dr-new-2',
    image: '/img/frame-482543-4.png',
    title: '프린세스 드레스 송파점',
    description: '서울시 송파구',
    category: 'dress',
  },
  {
    id: 'dr-new-3',
    image: '/img/frame-482543-5.png',
    title: '로맨틱웨딩 마포점',
    description: '서울시 마포구',
    category: 'dress',
  },
  {
    id: 'dr-new-4',
    image: '/img/frame-482543-4.png',
    title: '드림드레스 강서점',
    description: '서울시 강서구',
    category: 'dress',
  },
  {
    id: 'dr-new-5',
    image: '/img/frame-482543-5.png',
    title: '베네치아 웨딩 노원점',
    description: '서울시 노원구',
    category: 'dress',
  },
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type') as 'popular' | 'new' | null;

  // 타입이 없으면 전체 데이터 반환
  if (!type) {
    return NextResponse.json({
      success: true,
      data: mockDressShops,
    });
  }

  // 타입으로 필터링
  const typePrefix = type === 'popular' ? 'pop' : 'new';
  const filteredData = mockDressShops.filter(item =>
    item.id.startsWith(`dr-${typePrefix}`)
  );

  return NextResponse.json({
    success: true,
    data: filteredData,
    meta: {
      type,
      count: filteredData.length,
    },
  });
}
