import { NextRequest, NextResponse } from 'next/server';

/**
 * 비밀번호 재설정 API
 * PATCH /api/user/password/reset
 *
 * 이메일 인증 토큰과 함께 새 비밀번호를 설정합니다.
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, newPassword, verificationToken } = body;

    if (!email || !newPassword || !verificationToken) {
      return NextResponse.json(
        { error: '이메일, 새 비밀번호, 인증 토큰을 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

    if (!BACKEND_URL) {
      return NextResponse.json(
        { error: '백엔드 서버가 설정되지 않았습니다.' },
        { status: 500 }
      );
    }

    const response = await fetch(`${BACKEND_URL}/user/password/reset`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, newPassword, verificationToken }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message || data.message || '비밀번호 재설정에 실패했습니다.' },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      data: data.data || '비밀번호가 성공적으로 변경되었습니다.',
    });
  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
