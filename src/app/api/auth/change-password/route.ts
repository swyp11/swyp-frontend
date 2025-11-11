import { NextRequest, NextResponse } from 'next/server';

// Mock 사용자 데이터 (실제로는 데이터베이스에서 가져와야 함)
const MOCK_USERS = [
  {
    id: 1,
    username: 'alex2025',
    password: 'test1234',
    email: 'alex@example.com',
    name: 'Alex Kim',
  },
  {
    id: 2,
    username: 'testuser',
    password: 'password123',
    email: 'test@example.com',
    name: 'Test User',
  },
];

// POST: 비밀번호 변경 요청 처리
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { currentPassword, newPassword } = body;

    console.log('[Change Password API] Password change attempt');

    // 입력값 검증
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        {
          success: false,
          error: '현재 비밀번호와 새 비밀번호를 모두 입력해주세요.',
        },
        { status: 400 }
      );
    }

    // 새 비밀번호 길이 검증
    if (newPassword.length < 8) {
      return NextResponse.json(
        {
          success: false,
          error: '새 비밀번호는 8자 이상이어야 합니다.',
        },
        { status: 400 }
      );
    }

    // TODO: 실제로는 토큰에서 사용자 정보를 가져와야 함
    // 여기서는 Mock으로 첫 번째 사용자를 사용
    const userId = 1;
    const user = MOCK_USERS.find((u) => u.id === userId);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: '사용자를 찾을 수 없습니다.',
        },
        { status: 404 }
      );
    }

    // 현재 비밀번호 확인
    if (user.password !== currentPassword) {
      console.log('[Change Password API] Current password mismatch');
      return NextResponse.json(
        {
          success: false,
          error: '현재 비밀번호가 일치하지 않습니다.',
        },
        { status: 401 }
      );
    }

    // 현재 비밀번호와 새 비밀번호가 같은지 확인
    if (currentPassword === newPassword) {
      return NextResponse.json(
        {
          success: false,
          error: '새 비밀번호는 현재 비밀번호와 달라야 합니다.',
        },
        { status: 400 }
      );
    }

    // 비밀번호 변경 (Mock이므로 실제로 변경되지는 않음)
    console.log('[Change Password API] Password changed successfully for user:', userId);

    // TODO: 실제로는 데이터베이스에 새 비밀번호를 업데이트해야 함
    // user.password = newPassword;

    return NextResponse.json(
      {
        success: true,
        message: '비밀번호가 성공적으로 변경되었습니다.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Change Password API] Error:', error);
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
