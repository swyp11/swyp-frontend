/**
 * 사용자 정보 조회/수정 API Route Handler
 * GET /api/user/info - 조회
 * PUT /api/user/info - 수정
 */

import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/apiProxy';

export async function GET(request: NextRequest) {
  return proxyToBackend(request, {
    path: '/user/info',
    method: 'GET',
  });
}

export async function PUT(request: NextRequest) {
  return proxyToBackend(request, {
    path: '/user/info',
    method: 'PUT',
  });
}
