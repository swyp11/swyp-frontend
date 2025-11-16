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

    const isDevelopment = process.env.NODE_ENV === 'development';

    // 개발 환경에서는 bypass 코드 사용
    if (isDevelopment) {
      const bypassCode = process.env.DEV_BYPASS_VERIFICATION_CODE || '999999';

      if (code === bypassCode) {
        console.log('✅ [DEV] 이메일 인증코드 검증 - Bypass 코드 사용');
        console.log('📧 [DEV] Email:', email);
        console.log('🎯 [DEV] Purpose:', purpose);
        console.log('🔢 [DEV] Code:', code);

        // 개발 모드에서는 임시 토큰 생성
        const devToken = `dev_token_${Date.now()}_${email.replace('@', '_at_')}`;

        return NextResponse.json({
          success: true,
          data: {
            token: devToken,
            message: '이메일 인증이 완료되었습니다. (개발 모드)',
          },
        });
      } else {
        console.log('❌ [DEV] 잘못된 인증 코드');
        console.log('📧 [DEV] Email:', email);
        console.log('🔢 [DEV] Code:', code);
        console.log('💡 [DEV] Bypass Code:', bypassCode);
        return NextResponse.json(
          { error: '인증번호가 일치하지 않습니다.' },
          { status: 400 }
        );
      }
    }

    // 프로덕션 환경에서만 백엔드 호출
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

    if (!BACKEND_URL) {
      return NextResponse.json(
        { error: '백엔드 서버가 설정되지 않았습니다.' },
        { status: 500 }
      );
    }

    const response = await fetch(
      `${BACKEND_URL}/api/user/email-auth/verify?purpose=${purpose}`,
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
        token: data.data?.token || data.token,
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
