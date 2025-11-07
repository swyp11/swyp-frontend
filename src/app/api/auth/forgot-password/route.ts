import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, birthDate, phoneNumber, email } = body;

    // Validate required fields
    if (!name || !birthDate || !phoneNumber || !email) {
      return NextResponse.json(
        { error: "모든 필드를 입력해주세요." },
        { status: 400 }
      );
    }

    // TODO: Replace with actual backend API endpoint
    // Example backend API call:
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     name,
    //     birthDate,
    //     phoneNumber,
    //     email,
    //   }),
    // });

    // if (!response.ok) {
    //   const error = await response.json();
    //   return NextResponse.json(
    //     { error: error.message || '임시 비밀번호 발급에 실패했습니다.' },
    //     { status: response.status }
    //   );
    // }

    // For now, return success response
    // In production, the backend should:
    // 1. Verify user identity with provided information
    // 2. Generate temporary password
    // 3. Send email with temporary password
    // 4. Hash and store temporary password in database
    return NextResponse.json(
      {
        success: true,
        message: "임시 비밀번호가 이메일로 전송되었습니다.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
