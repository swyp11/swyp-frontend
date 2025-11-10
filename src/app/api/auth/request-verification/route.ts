import { NextRequest, NextResponse } from "next/server";

/**
 * Mock API: 비밀번호 찾기 인증 코드 요청
 * POST /api/auth/request-verification
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validation
    if (!email) {
      return NextResponse.json(
        { error: "이메일을 입력해주세요." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "올바른 이메일 형식이 아닙니다." },
        { status: 400 }
      );
    }

    // Mock: 실제로는 여기서 이메일로 인증 코드를 전송
    console.log(`[Mock] Sending verification code to: ${email}`);
    console.log(`[Mock] Verification code: 123456`);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json(
      {
        success: true,
        message: "인증번호가 이메일로 전송되었습니다.",
        // Mock data (실제로는 코드를 반환하지 않음)
        _mockCode: "123456",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Request verification error:", error);
    return NextResponse.json(
      { error: "인증 요청 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
