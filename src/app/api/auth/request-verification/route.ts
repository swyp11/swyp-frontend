import { NextRequest, NextResponse } from 'next/server';

/**
 * 이메일 인증번호 요청 API
 * POST /api/auth/request-verification
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, purpose = 'SIGNUP' } = body;

    if (!email) {
      return NextResponse.json(
        { error: '이메일을 입력해주세요.' },
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
      `${BACKEND_URL}/api/v1/auth/email/send-code?email=${encodeURIComponent(email)}&purpose=${purpose}`,
      {
        method: 'POST',
      }
    );

    // 응답 텍스트를 먼저 확인
    const responseText = await response.text();
    let data;

    try {
      data = responseText ? JSON.parse(responseText) : {};
    } catch {
      // JSON 파싱 실패 시 텍스트 응답 처리
      if (!response.ok) {
        return NextResponse.json(
          { error: responseText || '인증번호 전송에 실패했습니다.' },
          { status: response.status }
        );
      }
      data = { data: responseText };
    }

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message || data.message || '인증번호 전송에 실패했습니다.' },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { success: true, message: data.data || '인증번호가 전송되었습니다.' },
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
