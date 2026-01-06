/**
 * 비밀번호 변경 API Route Handler
 * PUT/PATCH /api/user/password - 비밀번호 변경
 */

import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/apiProxy';

export async function PATCH(request: NextRequest) {
  return proxyToBackend(request, {
    path: '/api/v1/auth/password',
    method: 'PATCH',
  });
}

export async function PUT(request: NextRequest) {
  return proxyToBackend(request, {
    path: '/api/v1/auth/password',
    method: 'PUT',
  });
}
