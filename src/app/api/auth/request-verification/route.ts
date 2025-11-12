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

    // 개발 환경에서는 백엔드 호출 없이 바로 성공 응답
    const isDevelopment = process.env.NODE_ENV === 'development';

    if (isDevelopment) {
      console.log('✅ [DEV] 이메일 인증 요청 - 개발 모드 bypass');
      console.log('📧 [DEV] Email:', email);
      console.log('🔢 [DEV] 인증 코드: 999999');
      return NextResponse.json(
        { success: true, message: '인증번호가 전송되었습니다. (개발 모드: 999999 사용)' },
        { status: 200 }
      );
    }

    // 프로덕션 환경에서만 백엔드 호출
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

    if (!BACKEND_URL) {
      return NextResponse.json(
        { error: '백엔드 서버가 설정되지 않았습니다.' },
        { status: 500 }
      );
    }

    const response = await fetch(`${BACKEND_URL}/api/auth/request-verification`, {
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
  } catch (error) {
    console.error('Request verification error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
