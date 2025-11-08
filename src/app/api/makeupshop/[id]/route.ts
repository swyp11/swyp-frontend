import { NextRequest, NextResponse } from 'next/server';

const mockMakeups = [
  // 인기
  {
    id: 'mk-pop-1',
    image: '/img/frame-482543-1.png',
    title: '메이크업포에버 강남점',
    description: '서울시 강남구',
    phone: '02-2222-1111',
    address: '서울시 강남구 테헤란로 123',
  },
  {
    id: 'mk-pop-2',
    image: '/img/frame-482543-1.png',
    title: '뷰티풀메이크업 명동점',
    description: '서울시 중구',
    phone: '02-2222-1112',
    address: '서울시 중구 명동길 45',
  },
  {
    id: 'mk-pop-3',
    image: '/img/frame-482543-1.png',
    title: '글로우스튜디오 압구정점',
    description: '서울시 강남구',
    phone: '02-2222-1113',
    address: '서울시 강남구 압구정로 67',
  },
  {
    id: 'mk-pop-4',
    image: '/img/frame-482543-1.png',
    title: '엘레강스뷰티 청담점',
    description: '서울시 강남구',
    phone: '02-2222-1114',
    address: '서울시 강남구 청담동 89',
  },
  {
    id: 'mk-pop-5',
    image: '/img/frame-482543-1.png',
    title: '프리미엄메이크업 홍대점',
    description: '서울시 마포구',
    phone: '02-2222-1115',
    address: '서울시 마포구 홍대입구 12',
  },
  // 신규
  {
    id: 'mk-new-1',
    image: '/img/frame-482543-4.png',
    title: '로즈뷰티 서초점',
    description: '서울시 서초구',
    phone: '02-2222-1116',
    address: '서울시 서초구 서초대로 34',
  },
  {
    id: 'mk-new-2',
    image: '/img/frame-482543-4.png',
    title: '퍼펙트메이크업 송파점',
    description: '서울시 송파구',
    phone: '02-2222-1117',
    address: '서울시 송파구 송파대로 56',
  },
  {
    id: 'mk-new-3',
    image: '/img/frame-482543-5.png',
    title: '스타일리시뷰티 마포점',
    description: '서울시 마포구',
    phone: '02-2222-1118',
    address: '서울시 마포구 마포대로 78',
  },
  {
    id: 'mk-new-4',
    image: '/img/frame-482543-4.png',
    title: '샤이닝스튜디오 광진점',
    description: '서울시 광진구',
    phone: '02-2222-1119',
    address: '서울시 광진구 광나루로 90',
  },
  {
    id: 'mk-new-5',
    image: '/img/frame-482543-5.png',
    title: '블룸메이크업 성동점',
    description: '서울시 성동구',
    phone: '02-2222-1120',
    address: '서울시 성동구 왕십리로 12',
  },
];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const makeup = mockMakeups.find(item => item.id === id);

    if (!makeup) {
      return NextResponse.json(
        {
          success: false,
          error: 'Makeup shop not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: makeup,
    });
  } catch (error) {
    console.error('Error fetching makeup shop details:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch makeup shop details',
      },
      { status: 500 }
    );
  }
}
