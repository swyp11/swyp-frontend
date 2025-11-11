import { NextResponse } from "next/server";

// Mock 사용자 데이터베이스 (이메일로 관리)
const MOCK_USERS: Record<
  string,
  {
    email: string;
    password: string;
    name?: string;
    birthdate?: string;
    gender?: string;
    weddingDate?: string;
  }
> = {};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, verificationCode, name, birthdate, gender, weddingDate } = body;

    // 입력값 검증
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "이메일과 비밀번호는 필수입니다." },
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

    // 비밀번호 유효성 검증 (영문, 숫자 포함 8자리 이상)
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const isLongEnough = password.length >= 8;

    if (!hasLetter || !hasNumber || !isLongEnough) {
      return NextResponse.json(
        { success: false, error: "비밀번호는 영문, 숫자 포함 8자리 이상이어야 합니다." },
        { status: 400 }
      );
    }

    // 이미 가입된 이메일인지 확인
    if (MOCK_USERS[email]) {
      return NextResponse.json(
        { success: false, error: "이미 가입된 이메일입니다." },
        { status: 409 }
      );
    }

    // Mock: 인증번호 검증 (실제로는 세션이나 Redis 등에 저장된 인증번호와 비교)
    // 여기서는 간단히 6자리 숫자면 통과
    if (verificationCode && verificationCode.length !== 6) {
      return NextResponse.json(
        { success: false, error: "올바른 인증번호를 입력해주세요." },
        { status: 400 }
      );
    }

    // 사용자 등록
    MOCK_USERS[email] = {
      email,
      password, // 실제로는 해싱해서 저장해야 함
      name,
      birthdate,
      gender,
      weddingDate,
    };

    console.log(`[Signup API] User registered successfully:`, email);
    console.log(`[Signup API] Current users:`, Object.keys(MOCK_USERS));

    // 회원가입 성공
    return NextResponse.json(
      {
        success: true,
        message: "회원가입이 완료되었습니다.",
        user: {
          email,
          name,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Signup API] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      },
      { status: 500 }
    );
  }
}
