import { NextRequest, NextResponse } from 'next/server';

// Mock 사용자 데이터
const MOCK_USERS = [
  {
    id: 1,
    username: 'alex2025',
    password: 'test1234',
    email: 'alex@example.com',
    name: 'Alex Kim',
  },
  {
    id: 2,
    username: 'testuser',
    password: 'password123',
    email: 'test@example.com',
    name: 'Test User',
  },
];

// Mock JWT 토큰 생성 (실제로는 서버에서 생성해야 함)
function generateMockToken(userId: number, username: string): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64');
  const payload = Buffer.from(
    JSON.stringify({
      userId,
      username,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24시간
    })
  ).toString('base64');
  const signature = Buffer.from('mock-signature').toString('base64');

  return `${header}.${payload}.${signature}`;
}

// POST: 로그인 요청 처리
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    console.log('[Login API] Login attempt:', { username });

    // 입력값 검증
    if (!username || !password) {
      return NextResponse.json(
        {
          success: false,
          error: '아이디와 비밀번호를 모두 입력해주세요.',
        },
        { status: 400 }
      );
    }

    // 사용자 찾기
    const user = MOCK_USERS.find(
      (u) => u.username === username && u.password === password
    );

    // 로그인 실패
    if (!user) {
      console.log('[Login API] Login failed: Invalid credentials');
      return NextResponse.json(
        {
          success: false,
          error: '아이디 혹은 비밀번호가 일치하지 않습니다.',
        },
        { status: 401 }
      );
    }

    // 로그인 성공
    console.log('[Login API] Login successful:', { userId: user.id, username: user.username });

    // Mock JWT 토큰 생성
    const token = generateMockToken(user.id, user.username);

    // 응답 데이터 (비밀번호는 제외)
    const userData = {
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
    };

    return NextResponse.json(
      {
        success: true,
        message: '로그인에 성공했습니다.',
        token,
        user: userData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Login API] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
