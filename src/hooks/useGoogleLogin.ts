import { useState, useCallback } from 'react';

interface GoogleLoginHookReturn {
  login: () => void;
  logout: () => void;
  isLoggedIn: boolean;
  userToken: string;
  error: string;
  isProcessing: boolean;
  handleOAuthCallback: (code: string) => Promise<void>;
}

export const useGoogleLogin = (): GoogleLoginHookReturn => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // 구글 OAuth 인증 URL로 리디렉션
  const redirectUri = `${window.location.origin}/api/auth/google`;

  // 구글 로그인 시작
  const login = useCallback(() => {
    const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    if (!GOOGLE_CLIENT_ID) {
      setError('Google Client ID가 설정되지 않았습니다.');
      return;
    }

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=openid%20email%20profile`;

    console.log('구글 로그인 URL:', googleAuthUrl);
    console.log('Redirect URI:', redirectUri);

    window.location.href = googleAuthUrl;
  }, []);

  // 로그아웃
  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserToken('');
    setError('');

    // 모든 쿠키 삭제
    document.cookie.split(";").forEach((cookie) => {
      const name = cookie.split("=")[0].trim();
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });

    localStorage.removeItem('userToken');
    sessionStorage.clear();
  }, []);

  // OAuth 콜백 처리
  const handleOAuthCallback = useCallback(async (code: string) => {
    try {
      setError('');
      setIsProcessing(true);

      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL + '/oauth/login/google';

      const response = await fetch(
        `${BACKEND_URL}?code=${code}&redirect_uri=${encodeURIComponent(redirectUri)}`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const token = data.token || data.accessToken || data.access_token || 'token_received';

        const access_token = token.access_token;
        setUserToken(access_token);
        setIsLoggedIn(true);
        localStorage.setItem('userToken', access_token);

        // 로그인 완료 후 메인 페이지로 리디렉션
        window.location.href = '/main';
      } else {
        const errorData = await response.text();
        throw new Error(`로그인 실패: ${response.status} - ${errorData}`);
      }
    } catch (err) {
      console.error('OAuth 로그인 오류:', err);
      setError(err instanceof Error ? err.message : '로그인 처리 중 오류가 발생했습니다.');

      // 3초 후 로그인 페이지로 이동
      setTimeout(() => {
        window.location.href = '/login';
      }, 3000);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return {
    login,
    logout,
    isLoggedIn,
    userToken,
    error,
    isProcessing,
    handleOAuthCallback,
  };
};
