/**
 * 일반 로그인 API Route Handler
 * POST /api/auth/login
 */

import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/apiProxy';

export async function POST(request: NextRequest) {
  return proxyToBackend(request, {
    path: '/api/auth/login',
    method: 'POST',
  });
}
