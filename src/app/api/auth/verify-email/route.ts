import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // 입력값 검증
    if (!email) {
      return NextResponse.json(
        { success: false, error: "이메일을 입력해주세요." },
        { status: 400 }
      );
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "올바른 이메일 형식이 아닙니다." },
        { status: 400 }
      );
    }

    // Mock: 특정 이메일은 이미 사용 중으로 처리
    const existingEmails = ["test@example.com", "admin@example.com"];
    if (existingEmails.includes(email.toLowerCase())) {
      return NextResponse.json(
        { success: false, error: "이미 사용 중인 이메일입니다." },
        { status: 409 }
      );
    }

    // Mock: 인증 이메일 발송 성공
    // 실제로는 여기서 이메일 발송 서비스를 호출
    console.log(`Verification email sent to: ${email}`);

    return NextResponse.json({
      success: true,
      message: "인증 이메일이 발송되었습니다.",
      email,
    });
  } catch (error) {
    console.error("Verify email error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      },
      { status: 500 }
    );
  }
}
