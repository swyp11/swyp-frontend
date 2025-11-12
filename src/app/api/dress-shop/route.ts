/**
 * 드레스샵 목록 조회/등록 API Route Handler
 */

import { NextRequest } from 'next/server';
import { proxyToBackend, buildQueryString } from '@/lib/apiProxy';

export async function GET(request: NextRequest) {
  const queryString = buildQueryString(request.nextUrl.searchParams);
  return proxyToBackend(request, {
    path: `/api/dress-shop${queryString}`,
    method: 'GET',
  });
}

export async function POST(request: NextRequest) {
  return proxyToBackend(request, {
    path: '/api/dress-shop',
    method: 'POST',
  });
}
