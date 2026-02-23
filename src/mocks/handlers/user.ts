import { http, HttpResponse } from 'msw';
import { mockUser } from '../data';
import type { UserResponse } from '@/types/user';

let currentUser: UserResponse = { ...mockUser };

export const userHandlers = [
  // 회원가입
  http.post('/api/user/join', async () => {
    return HttpResponse.json({
      success: true,
      data: '회원가입이 완료되었습니다.',
    });
  }),

  // OAuth 추가 정보
  http.post('/api/user/oauth-extra-info', async ({ request }) => {
    const body = (await request.json()) as Partial<UserResponse>;
    currentUser = { ...currentUser, ...body };
    return HttpResponse.json({ success: true, data: currentUser });
  }),

  // 사용자 정보 조회
  http.get('/api/user/info', () => {
    return HttpResponse.json({ success: true, data: currentUser });
  }),

  // 사용자 정보 수정
  http.put('/api/user/info', async ({ request }) => {
    const body = (await request.json()) as Partial<UserResponse>;
    currentUser = { ...currentUser, ...body };
    return HttpResponse.json({ success: true, data: currentUser });
  }),

  // 비밀번호 변경
  http.patch('/api/user/password', async () => {
    return HttpResponse.json({
      success: true,
      data: '비밀번호가 변경되었습니다.',
    });
  }),

  // 비밀번호 재설정 (POST + PATCH 둘 다 지원)
  http.post('/api/user/password/reset', async () => {
    return HttpResponse.json({
      success: true,
      data: '비밀번호가 재설정되었습니다.',
    });
  }),
  http.patch('/api/user/password/reset', async () => {
    return HttpResponse.json({
      success: true,
      data: '비밀번호가 재설정되었습니다.',
    });
  }),
];
