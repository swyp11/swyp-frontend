import { NextRequest, NextResponse } from 'next/server';

/**
 * 이메일 인증코드 검증 API
 * POST /api/auth/verify-code
 *
 * 인증코드를 검증하고 임시 토큰을 발급합니다.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, code, purpose = 'SIGNUP' } = body;

    if (!email || !code) {
      return NextResponse.json(
        { error: '이메일과 인증코드를 입력해주세요.' },
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

    const response = await fetch(
      `${BACKEND_URL}/user/email-auth/verify?purpose=${purpose}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || '인증코드 검증에 실패했습니다.' },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        token: data.data?.verificationToken || data.data?.token || data.verificationToken || data.token,
        message: data.data?.message || data.message || '이메일 인증이 완료되었습니다.',
      },
    });
  } catch (error) {
    console.error('Verify code error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
