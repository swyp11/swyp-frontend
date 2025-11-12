/**
 * 찜 목록 조회 API Route Handler
 * GET /api/likes - 사용자의 모든 찜 목록 조회
 */

import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/apiProxy';

export async function GET(request: NextRequest) {
  return proxyToBackend(request, {
    path: '/api/likes',
    method: 'GET',
  });
}
