import { NextRequest, NextResponse } from 'next/server';

const mockWeddingHoles = [
  // 인기
  {
    id: 'wh-pop-1',
    image: '/img/placeholder.jpg',
    title: '그랜드 하얏트 서울',
    description: '서울시 용산구',
    phone: '02-1234-5678',
    address: '서울시 용산구 한남대로 322',
  },
  {
    id: 'wh-pop-2',
    image: '/img/placeholder.jpg',
    title: '더 플라자',
    description: '서울시 중구',
    phone: '02-1234-5679',
    address: '서울시 중구 소공로 119',
  },
  {
    id: 'wh-pop-3',
    image: '/img/placeholder.jpg',
    title: '신라호텔',
    description: '서울시 중구',
    phone: '02-1234-5680',
    address: '서울시 중구 동호로 249',
  },
  {
    id: 'wh-pop-4',
    image: '/img/placeholder.jpg',
    title: '롯데호텔 서울',
    description: '서울시 중구',
    phone: '02-1234-5681',
    address: '서울시 중구 을지로 30',
  },
  {
    id: 'wh-pop-5',
    image: '/img/placeholder.jpg',
    title: 'JW 메리어트 동대문',
    description: '서울시 중구',
    phone: '02-1234-5682',
    address: '서울시 중구 청계천로 279',
  },
  // 신규
  {
    id: 'wh-new-1',
    image: '/img/placeholder.jpg',
    title: '페어몬트 앰배서더',
    description: '서울시 강남구',
    phone: '02-1234-5683',
    address: '서울시 강남구 테헤란로 152',
  },
  {
    id: 'wh-new-2',
    image: '/img/placeholder.jpg',
    title: '파르나스타워',
    description: '서울시 서초구',
    phone: '02-1234-5684',
    address: '서울시 서초구 테헤란로 521',
  },
  {
    id: 'wh-new-3',
    image: '/img/placeholder.jpg',
    title: '반얀트리 클럽앤스파',
    description: '서울시 송파구',
    phone: '02-1234-5685',
    address: '서울시 송파구 올림픽로 300',
  },
  {
    id: 'wh-new-4',
    image: '/img/placeholder.jpg',
    title: '콘래드 서울',
    description: '서울시 마포구',
    phone: '02-1234-5686',
    address: '서울시 마포구 국제금융로 10',
  },
  {
    id: 'wh-new-5',
    image: '/img/placeholder.jpg',
    title: '임피리얼 팰리스',
    description: '서울시 영등포구',
    phone: '02-1234-5687',
    address: '서울시 영등포구 국회대로 640',
  },
];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const weddingHole = mockWeddingHoles.find(item => item.id === id);

    if (!weddingHole) {
      return NextResponse.json(
        {
          success: false,
          error: 'Wedding hall not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: weddingHole,
    });
  } catch (error) {
    console.error('Error fetching wedding hall details:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch wedding hall details',
      },
      { status: 500 }
    );
  }
}
