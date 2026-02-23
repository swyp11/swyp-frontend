/**
 * 일별 일정 조회 API Route Handler
 */

import { NextRequest } from 'next/server';
import { proxyToBackend, buildQueryString } from '@/lib/apiProxy';

export async function GET(request: NextRequest) {
  const queryString = buildQueryString(request.nextUrl.searchParams);
  return proxyToBackend(request, {
    path: `/api/v1/schedules/day${queryString}`,
    method: 'GET',
  });
}
