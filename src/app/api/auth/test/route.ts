import { NextRequest, NextResponse } from 'next/server';

// GET: 구글 OAuth 인증 시작 및 code 백엔드 전송
export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');

  // code가 없으면 구글 OAuth 인증 시작
  if (!code) {
    const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    if (!GOOGLE_CLIENT_ID) {
      return NextResponse.json(
        { error: 'Google Client ID is not configured' },
        { status: 500 }
      );
    }

    // 리디렉트 URI 설정 (자기 자신)
    const redirectUri = `${request.nextUrl.origin}/api/auth/test`;

    // 구글 OAuth 인증 URL 생성
    const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    googleAuthUrl.searchParams.set('client_id', GOOGLE_CLIENT_ID);
    googleAuthUrl.searchParams.set('redirect_uri', redirectUri);
    googleAuthUrl.searchParams.set('response_type', 'code');
    googleAuthUrl.searchParams.set('scope', 'openid email profile');
    googleAuthUrl.searchParams.set('grant_type', 'authorization_code');

    console.log('[Test Auth API] Redirecting to Google OAuth');
    console.log('[Test Auth API] Redirect URI:', redirectUri);

    // 구글 로그인 페이지로 리디렉트
    return NextResponse.redirect(googleAuthUrl.toString());
  }

  // code가 있으면 구글에서 토큰 받기
  try {
    const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
    const NEXT_PUBLIC_ORIGIN = process.env.NEXT_PUBLIC_ORIGIN;
    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
      return NextResponse.json(
        { error: 'Google OAuth credentials are not configured' },
        { status: 500 }
      );
    }

    console.log('[Test Auth API] Received code from Google:', code);
    console.log('[Test Auth API] Exchanging code for tokens...');

    const redirectUri = `${NEXT_PUBLIC_ORIGIN}/api/auth/google`;

    // 구글에 토큰 요청
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code: code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error('[Test Auth API] Token exchange failed:', errorData);
      return NextResponse.json(
        { error: 'Failed to exchange code for tokens', details: errorData },
        { status: tokenResponse.status }
      );
    }

    const tokenData = await tokenResponse.json();
    console.log('[Test Auth API] Token received:', {
      access_token: tokenData.access_token ? '✓' : '✗',
      id_token: tokenData.id_token ? '✓' : '✗',
      refresh_token: tokenData.refresh_token ? '✓' : '✗',
    });

    // 구글 사용자 정보 가져오기
    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    const userInfo = await userInfoResponse.json();
    console.log('[Test Auth API] User info received:', userInfo.email);

    // JSON 응답으로 토큰 반환
    return NextResponse.json(
      {
        success: true,
        token: tokenData,
        user: userInfo,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Test Auth API] Error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
