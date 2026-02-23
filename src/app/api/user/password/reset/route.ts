import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/apiProxy';

/**
 * 비밀번호 재설정 API
 * POST /api/user/password/reset
 *
 * 이메일 인증 토큰과 함께 새 비밀번호를 설정합니다.
 * Request body: { token: string, newPassword: string }
 */
export async function POST(request: NextRequest) {
  return proxyToBackend(request, {
    path: '/api/v1/auth/password/reset',
    method: 'POST',
  });
}
