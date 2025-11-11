import { NextRequest, NextResponse } from 'next/server';

// Mock 찜 목록 데이터
const MOCK_FAVORITES = {
  웨딩홀: [
    {
      id: 101,
      title: "그랜드 컨벤션 웨딩홀",
      category: "서울/강남",
      imageUrl: "/placeholder-hall.jpg",
      isFavorite: true,
      type: "웨딩홀"
    },
    {
      id: 102,
      title: "로맨틱 가든 웨딩홀",
      category: "경기/수원",
      imageUrl: "/placeholder-hall.jpg",
      isFavorite: true,
      type: "웨딩홀"
    },
    {
      id: 103,
      title: "스카이 뷰 웨딩홀",
      category: "서울/여의도",
      imageUrl: "/placeholder-hall.jpg",
      isFavorite: true,
      type: "웨딩홀"
    },
  ],
  드레스: [
    {
      id: 201,
      title: "로맨틱 레이스 드레스",
      category: "클래식/A라인",
      imageUrl: "/placeholder-dress.jpg",
      isFavorite: true,
      type: "드레스"
    },
    {
      id: 202,
      title: "모던 실크 드레스",
      category: "모던/머메이드",
      imageUrl: "/placeholder-dress.jpg",
      isFavorite: true,
      type: "드레스"
    },
    {
      id: 203,
      title: "프린세스 볼가운",
      category: "클래식/볼가운",
      imageUrl: "/placeholder-dress.jpg",
      isFavorite: true,
      type: "드레스"
    },
    {
      id: 204,
      title: "빈티지 튤 드레스",
      category: "빈티지/A라인",
      imageUrl: "/placeholder-dress.jpg",
      isFavorite: true,
      type: "드레스"
    },
  ]
};

// GET: 찜 목록 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tab = searchParams.get('tab') || '웨딩홀';

    console.log('[Favorites API] Get favorites:', { tab });

    if (tab !== '웨딩홀' && tab !== '드레스') {
      return NextResponse.json(
        {
          success: false,
          error: '올바른 탭을 선택해주세요.',
        },
        { status: 400 }
      );
    }

    const favorites = MOCK_FAVORITES[tab as keyof typeof MOCK_FAVORITES];

    return NextResponse.json(
      {
        success: true,
        data: favorites,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Favorites API] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: '서버 오류가 발생했습니다.',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
