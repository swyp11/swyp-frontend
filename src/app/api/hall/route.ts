/**
 * 홀 목록 조회/등록 API Route Handler
 */

import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/apiProxy';

export async function GET(request: NextRequest) {
  return proxyToBackend(request, {
    path: '/api/v1/halls',
    method: 'GET',
  });
}

export async function POST(request: NextRequest) {
  return proxyToBackend(request, {
    path: '/api/v1/halls',
    method: 'POST',
  });
}
