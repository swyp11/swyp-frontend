import { NextRequest, NextResponse } from 'next/server';

// Mock 사용자 데이터
const MOCK_USER = {
  id: 1,
  username: 'alex2025',
  email: 'alex@example.com',
  name: '김수지',
  birthDate: '1995-03-15',
  role: '신부',
  weddingDate: '2025-12-25',
};

// POST: 프로필 정보 수정
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { field, value } = body;

    console.log('[Profile Update API] Update attempt:', { field, value });

    // 입력값 검증
    if (!field || value === undefined) {
      return NextResponse.json(
        {
          success: false,
          error: '수정할 필드와 값을 입력해주세요.',
        },
        { status: 400 }
      );
    }

    // 필드별 유효성 검사
    switch (field) {
      case 'name':
        if (typeof value !== 'string' || value.length < 2) {
          return NextResponse.json(
            {
              success: false,
              error: '이름은 2자 이상이어야 합니다.',
            },
            { status: 400 }
          );
        }
        break;

      case 'birthDate':
        if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
          return NextResponse.json(
            {
              success: false,
              error: '올바른 생년월일 형식이 아닙니다.',
            },
            { status: 400 }
          );
        }
        break;

      case 'role':
        if (value !== '신랑' && value !== '신부') {
          return NextResponse.json(
            {
              success: false,
              error: '신랑 또는 신부를 선택해주세요.',
            },
            { status: 400 }
          );
        }
        break;

      case 'weddingDate':
        if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
          return NextResponse.json(
            {
              success: false,
              error: '올바른 날짜 형식이 아닙니다.',
            },
            { status: 400 }
          );
        }
        break;

      default:
        return NextResponse.json(
          {
            success: false,
            error: '지원하지 않는 필드입니다.',
          },
          { status: 400 }
        );
    }

    // Mock 데이터 업데이트 (실제로는 데이터베이스에 저장)
    console.log('[Profile Update API] Update successful:', { field, value });

    return NextResponse.json(
      {
        success: true,
        message: '프로필 정보가 업데이트되었습니다.',
        data: {
          ...MOCK_USER,
          [field]: value,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Profile Update API] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
