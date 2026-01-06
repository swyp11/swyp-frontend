import { NextRequest, NextResponse } from 'next/server';

/**
 * 이메일 인증 및 비밀번호 재설정 API
 * POST /api/auth/verify-and-reset
 *
 * MSA 구조에서는 두 단계로 분리됨:
 * 1. /api/v1/auth/password/verify-code - 인증 코드 검증
 * 2. /api/v1/auth/password/reset - 비밀번호 재설정
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

    const isDevelopment = process.env.NODE_ENV === 'development';

    // 개발 환경에서는 백엔드 호출 없이 bypass 체크만 수행
    if (isDevelopment) {
      const bypassCode = process.env.DEV_BYPASS_VERIFICATION_CODE;

      if (bypassCode && verificationCode === bypassCode) {
        console.log('✅ [DEV] 이메일 인증 확인 - Bypass 코드 사용');
        console.log('📧 [DEV] Email:', email);
        console.log('🔢 [DEV] Code:', verificationCode);
        return NextResponse.json(
          {
            success: true,
            message: '인증이 완료되었습니다. (개발 모드)',
            temporaryPassword: 'temp1234!',
          },
          { status: 200 }
        );
      } else {
        console.log('❌ [DEV] 잘못된 인증 코드');
        console.log('📧 [DEV] Email:', email);
        console.log('🔢 [DEV] Code:', verificationCode);
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

    // Step 1: 인증 코드 검증
    const verifyResponse = await fetch(`${BACKEND_URL}/api/v1/auth/password/verify-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, code: verificationCode }),
    });

    const verifyData = await verifyResponse.json();

    if (!verifyResponse.ok) {
      return NextResponse.json(
        { error: verifyData.message || '인증번호가 일치하지 않습니다.' },
        { status: verifyResponse.status }
      );
    }

    // Step 2: 임시 비밀번호 생성 및 비밀번호 재설정
    const temporaryPassword = generateTemporaryPassword();
    const resetToken = verifyData.data?.token;

    if (!resetToken) {
      return NextResponse.json(
        { error: '인증 토큰을 받지 못했습니다.' },
        { status: 500 }
      );
    }

    const resetResponse = await fetch(`${BACKEND_URL}/api/v1/auth/password/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: resetToken, newPassword: temporaryPassword }),
    });

    const resetData = await resetResponse.json();

    if (!resetResponse.ok) {
      return NextResponse.json(
        { error: resetData.message || '비밀번호 재설정에 실패했습니다.' },
        { status: resetResponse.status }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: '인증이 완료되었습니다.',
        temporaryPassword: temporaryPassword,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Verify and reset error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

function generateTemporaryPassword(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  let password = '';
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password + '!';
}
