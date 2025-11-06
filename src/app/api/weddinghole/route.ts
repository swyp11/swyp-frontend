import { NextRequest, NextResponse } from 'next/server';

export interface WeddingHole {
  id: string;
  image: string;
  title: string;
  description: string;
}

// Mock 데이터 - 웨딩홀
const mockWeddingHoles: WeddingHole[] = [
  // 인기
  {
    id: 'wh-pop-1',
    image: '/img/frame-482543-1.png',
    title: '그랜드 하얏트 서울',
    description: '서울시 용산구',
  },
  {
    id: 'wh-pop-2',
    image: '/img/frame-482543-1.png',
    title: '더 플라자',
    description: '서울시 중구',
  },
  {
    id: 'wh-pop-3',
    image: '/img/frame-482543-1.png',
    title: '신라호텔',
    description: '서울시 중구',
  },
  {
    id: 'wh-pop-4',
    image: '/img/frame-482543-1.png',
    title: '롯데호텔 서울',
    description: '서울시 중구',
  },
  {
    id: 'wh-pop-5',
    image: '/img/frame-482543-1.png',
    title: 'JW 메리어트 동대문',
    description: '서울시 중구',
  },

  // 신규
  {
    id: 'wh-new-1',
    image: '/img/frame-482543-4.png',
    title: '페어몬트 앰배서더',
    description: '서울시 강남구',
  },
  {
    id: 'wh-new-2',
    image: '/img/frame-482543-4.png',
    title: '파르나스타워',
    description: '서울시 서초구',
  },
  {
    id: 'wh-new-3',
    image: '/img/frame-482543-5.png',
    title: '반얀트리 클럽앤스파',
    description: '서울시 송파구',
  },
  {
    id: 'wh-new-4',
    image: '/img/frame-482543-4.png',
    title: '콘래드 서울',
    description: '서울시 마포구',
  },
  {
    id: 'wh-new-5',
    image: '/img/frame-482543-5.png',
    title: '임피리얼 팰리스',
    description: '서울시 영등포구',
  },
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type') as 'popular' | 'new' | null;

  // 타입이 없으면 전체 데이터 반환
  if (!type) {
    return NextResponse.json({
      success: true,
      data: mockWeddingHoles,
    });
  }

  // 타입으로 필터링
  const typePrefix = type === 'popular' ? 'pop' : 'new';
  const filteredData = mockWeddingHoles.filter(item =>
    item.id.startsWith(`wh-${typePrefix}`)
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
