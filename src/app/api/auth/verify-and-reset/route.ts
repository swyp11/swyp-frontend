import { NextRequest, NextResponse } from 'next/server';

/**
 * 이메일 인증 및 비밀번호 재설정 API
 * POST /api/auth/verify-and-reset
 *
 * 개발 모드: .env의 DEV_BYPASS_VERIFICATION_CODE 값으로 bypass 가능
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, verificationCode } = body;

    if (!email || !verificationCode) {
      return NextResponse.json(
        { error: '이메일과 인증번호를 입력해주세요.' },
        { status: 400 }
      );
    }

    // 개발 환경 bypass 체크
    const bypassCode = process.env.DEV_BYPASS_VERIFICATION_CODE;
    const isDevelopment = process.env.NODE_ENV === 'development';

    if (isDevelopment && bypassCode && verificationCode === bypassCode) {
      console.log('✅ 개발 모드: Bypass 인증 코드 사용');
      return NextResponse.json(
        {
          success: true,
          message: '인증이 완료되었습니다. (개발 모드)',
          temporaryPassword: 'temp1234!',
        },
        { status: 200 }
      );
    }

    // 실제 백엔드 API로 요청 전달
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

    if (!BACKEND_URL) {
      console.log('⚠️ Backend URL not configured');
      return NextResponse.json(
        { error: '백엔드 서버가 설정되지 않았습니다.' },
        { status: 500 }
      );
    }

    try {
      const response = await fetch(`${BACKEND_URL}/auth/verify-and-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, verificationCode }),
      });

      const data = await response.json();

      if (!response.ok) {
        return NextResponse.json(
          { error: data.message || '인증에 실패했습니다.' },
          { status: response.status }
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: '인증이 완료되었습니다.',
          temporaryPassword: data.temporaryPassword,
        },
        { status: 200 }
      );
    } catch (backendError) {
      console.error('Backend request failed:', backendError);

      // 백엔드 연결 실패 시 개발 모드에서만 bypass 허용
      if (isDevelopment) {
        console.log('⚠️ 백엔드 연결 실패, 개발 모드 fallback 사용');
        return NextResponse.json(
          {
            success: true,
            message: '인증이 완료되었습니다. (개발 모드 fallback)',
            temporaryPassword: 'temp1234!',
          },
          { status: 200 }
        );
      }

      return NextResponse.json(
        { error: '백엔드 서버와 통신할 수 없습니다.' },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error('Verify and reset error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
