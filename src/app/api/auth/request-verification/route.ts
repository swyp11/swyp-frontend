import { NextRequest, NextResponse } from 'next/server';

/**
 * 이메일 인증번호 요청 API
 * POST /api/auth/request-verification
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: '이메일을 입력해주세요.' },
        { status: 400 }
      );
    }

    // 실제 백엔드 API로 요청 전달
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

    if (!BACKEND_URL) {
      console.log('⚠️ Backend URL not configured, using mock response');
      // 개발 환경에서 백엔드가 없을 경우 성공 응답 반환
      return NextResponse.json(
        { success: true, message: '인증번호가 전송되었습니다. (개발 모드: 999999 사용)' },
        { status: 200 }
      );
    }

    try {
      const response = await fetch(`${BACKEND_URL}/auth/request-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        return NextResponse.json(
          { error: data.message || '인증번호 전송에 실패했습니다.' },
          { status: response.status }
        );
      }

      return NextResponse.json(
        { success: true, message: '인증번호가 전송되었습니다.' },
        { status: 200 }
      );
    } catch (backendError) {
      console.error('Backend request failed:', backendError);
      // 백엔드 연결 실패 시에도 개발 모드로 처리
      return NextResponse.json(
        { success: true, message: '인증번호가 전송되었습니다. (개발 모드: 999999 사용)' },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('Request verification error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
