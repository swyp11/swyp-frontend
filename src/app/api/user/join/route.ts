/**
 * 회원가입 API Route Handler
 * POST /api/user/join
 */

import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/apiProxy';

export async function POST(request: NextRequest) {
  return proxyToBackend(request, {
    path: '/join',
    method: 'POST',
  });
}
