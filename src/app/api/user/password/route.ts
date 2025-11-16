/**
 * 비밀번호 변경 API Route Handler
 * PATCH /api/user/password - 비밀번호 변경
 */

import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/apiProxy';

export async function PATCH(request: NextRequest) {
  return proxyToBackend(request, {
    path: '/api/user/password',
    method: 'PATCH',
  });
}
