import { http, HttpResponse } from 'msw';
import { mockToken } from '../data';

export const authHandlers = [
  // 일반 로그인
  http.post('/api/auth/login', async ({ request }) => {
    const body = (await request.json()) as { userId?: string; password?: string };

    if (!body.userId || !body.password) {
      return HttpResponse.json(
        { success: false, error: '아이디와 비밀번호를 입력해주세요.' },
        { status: 400 }
      );
    }

    return HttpResponse.json(
      { success: true, data: mockToken },
      {
        headers: {
          Authorization: `Bearer ${mockToken.accessToken}`,
        },
      }
    );
  }),

  // OAuth 로그인
  http.post('/api/auth/oauth/:provider', async () => {
    return HttpResponse.json(
      { success: true, data: mockToken },
      {
        headers: {
          Authorization: `Bearer ${mockToken.accessToken}`,
        },
      }
    );
  }),

  // Google OAuth
  http.post('/api/auth/google', async () => {
    return HttpResponse.json(
      { success: true, data: mockToken },
      {
        headers: {
          Authorization: `Bearer ${mockToken.accessToken}`,
        },
      }
    );
  }),

  // 이메일 인증 요청
  http.post('/api/auth/request-verification', async () => {
    return HttpResponse.json({ success: true, data: true });
  }),

  // 이메일 인증 코드 확인
  http.post('/api/auth/verify-code', async () => {
    return HttpResponse.json({
      success: true,
      data: {
        token: 'mock-verification-token-xyz',
        message: '인증이 완료되었습니다.',
      },
    });
  }),

  // 비밀번호 재설정 (POST + PATCH 둘 다 지원)
  http.post('/api/auth/verify-and-reset', async () => {
    return HttpResponse.json({
      success: true,
      message: '인증이 완료되었습니다.',
      temporaryPassword: 'temp1234!',
    });
  }),
  http.patch('/api/auth/verify-and-reset', async () => {
    return HttpResponse.json({
      success: true,
      message: '인증이 완료되었습니다.',
      temporaryPassword: 'temp1234!',
    });
  }),
];
