/**
 * 드레스 목록 조회/등록 API Route Handler
 * GET /api/dress - 목록 조회
 * POST /api/dress - 드레스 등록
 */

import { NextRequest } from 'next/server';
import { proxyToBackend, buildQueryString } from '@/lib/apiProxy';

export async function GET(request: NextRequest) {
  const queryString = buildQueryString(request.nextUrl.searchParams);
  return proxyToBackend(request, {
    path: `/api/dress${queryString}`,
    method: 'GET',
  });
}

export async function POST(request: NextRequest) {
  return proxyToBackend(request, {
    path: '/api/dress',
    method: 'POST',
  });
}
