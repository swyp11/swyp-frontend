import { NextRequest, NextResponse } from "next/server";

/**
 * Mock API: 인증 코드 확인 및 임시 비밀번호 전송
 * POST /api/auth/verify-and-reset
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, verificationCode } = body;

    // Validation
    if (!email || !verificationCode) {
      return NextResponse.json(
        { error: "이메일과 인증번호를 입력해주세요." },
        { status: 400 }
      );
    }

    if (verificationCode.length !== 6) {
      return NextResponse.json(
        { error: "인증번호는 6자리여야 합니다." },
        { status: 400 }
      );
    }

    // Mock: 인증 코드 검증 (개발 환경에서는 123456으로 고정)
    const MOCK_VERIFICATION_CODE = "123456";

    if (verificationCode !== MOCK_VERIFICATION_CODE) {
      return NextResponse.json(
        { error: "인증번호가 올바르지 않습니다." },
        { status: 400 }
      );
    }

    // Mock: 임시 비밀번호 생성 및 전송
    const temporaryPassword = generateTemporaryPassword();
    console.log(`[Mock] Sending temporary password to: ${email}`);
    console.log(`[Mock] Temporary password: ${temporaryPassword}`);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json(
      {
        success: true,
        message: "임시 비밀번호가 이메일로 전송되었습니다.",
        // Mock data (실제로는 비밀번호를 반환하지 않음)
        _mockPassword: temporaryPassword,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Verify and reset error:", error);
    return NextResponse.json(
      { error: "인증 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

/**
 * 임시 비밀번호 생성 함수
 * 형식: 대문자 + 소문자 + 숫자 + 특수문자 조합 (8자리)
 */
function generateTemporaryPassword(): string {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const special = "!@#$%^&*";

  const getRandomChar = (chars: string) =>
    chars[Math.floor(Math.random() * chars.length)];

  // 각 카테고리에서 최소 1개씩
  const password = [
    getRandomChar(uppercase),
    getRandomChar(lowercase),
    getRandomChar(numbers),
    getRandomChar(special),
  ];

  // 나머지 4자리는 랜덤
  const allChars = uppercase + lowercase + numbers + special;
  for (let i = 0; i < 4; i++) {
    password.push(getRandomChar(allChars));
  }

  // 섞기
  return password.sort(() => Math.random() - 0.5).join("");
}
