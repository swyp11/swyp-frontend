import { NextRequest, NextResponse } from 'next/server';

export interface Makeup {
  id: string;
  image: string;
  title: string;
  description: string;
}

// Mock 데이터 - 메이크업
const mockMakeups: Makeup[] = [
  // 인기
  {
    id: 'mk-pop-1',
    image: '/img/frame-482543-1.png',
    title: '메이크업포에버 강남점',
    description: '서울시 강남구',
  },
  {
    id: 'mk-pop-2',
    image: '/img/frame-482543-1.png',
    title: '뷰티풀메이크업 명동점',
    description: '서울시 중구',
  },
  {
    id: 'mk-pop-3',
    image: '/img/frame-482543-1.png',
    title: '글로우스튜디오 압구정점',
    description: '서울시 강남구',
  },
  {
    id: 'mk-pop-4',
    image: '/img/frame-482543-1.png',
    title: '엘레강스뷰티 청담점',
    description: '서울시 강남구',
  },
  {
    id: 'mk-pop-5',
    image: '/img/frame-482543-1.png',
    title: '프리미엄메이크업 홍대점',
    description: '서울시 마포구',
  },

  // 신규
  {
    id: 'mk-new-1',
    image: '/img/frame-482543-4.png',
    title: '로즈뷰티 서초점',
    description: '서울시 서초구',
  },
  {
    id: 'mk-new-2',
    image: '/img/frame-482543-4.png',
    title: '퍼펙트메이크업 송파점',
    description: '서울시 송파구',
  },
  {
    id: 'mk-new-3',
    image: '/img/frame-482543-5.png',
    title: '스타일리시뷰티 마포점',
    description: '서울시 마포구',
  },
  {
    id: 'mk-new-4',
    image: '/img/frame-482543-4.png',
    title: '샤이닝스튜디오 광진점',
    description: '서울시 광진구',
  },
  {
    id: 'mk-new-5',
    image: '/img/frame-482543-5.png',
    title: '블룸메이크업 성동점',
    description: '서울시 성동구',
  },
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type') as 'popular' | 'new' | null;

  // 타입이 없으면 전체 데이터 반환
  if (!type) {
    return NextResponse.json({
      success: true,
      data: mockMakeups,
    });
  }

  // 타입으로 필터링
  const typePrefix = type === 'popular' ? 'pop' : 'new';
  const filteredData = mockMakeups.filter(item =>
    item.id.startsWith(`mk-${typePrefix}`)
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
