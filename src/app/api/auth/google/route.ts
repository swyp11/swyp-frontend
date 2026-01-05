/**
 * Google OAuth Callback Handler
 * GET /api/auth/google?code=...
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  // 에러 처리
  if (error) {
    console.error('Google OAuth Error:', error);
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(error)}`, request.url)
    );
  }

  // 코드가 없으면 에러
  if (!code) {
    console.error('No authorization code received');
    return NextResponse.redirect(
      new URL('/login?error=no_code', request.url)
    );
  }

  try {
    const redirectUri = `${request.nextUrl.origin}/api/auth/google`;
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

    if (!backendUrl) {
      throw new Error('Backend API URL not configured');
    }

    const apiUrl = `${backendUrl}/v1/auth/oauth/login/google?code=${code}&redirectUri=${encodeURIComponent(redirectUri)}`;
    console.log('🔵 Calling backend OAuth API:', apiUrl);
    console.log('🔵 Code:', code);
    console.log('🔵 Redirect URI:', redirectUri);

    // 백엔드로 인증 코드 전송
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('🔵 Backend response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Backend OAuth Error:', response.status, errorText);
      throw new Error(`Backend authentication failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('🔵 Backend response data:', data);

    // 토큰 추출 - ApiResponse<TokenResponse> 구조
    const accessToken = data.data?.accessToken || data.accessToken;

    if (!accessToken) {
      console.error('❌ No access token in response:', data);
      throw new Error('No access token received from backend');
    }

    console.log('✅ Access token received successfully');

    // HTML 응답으로 토큰을 localStorage에 저장하고 리다이렉트
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>로그인 중...</title>
        </head>
        <body>
          <script>
            // AuthContext와 동일하게 accessToken 키 사용
            localStorage.setItem('accessToken', '${accessToken}');
            window.location.href = '/main';
          </script>
          <p>로그인 중입니다...</p>
        </body>
      </html>
    `;

    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
    });

  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.redirect(
      new URL(
        `/login?error=${encodeURIComponent(error instanceof Error ? error.message : 'authentication_failed')}`,
        request.url
      )
    );
  }
}
