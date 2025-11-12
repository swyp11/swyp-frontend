/**
 * OAuth 추가 정보 입력 API Route Handler
 * POST /api/user/oauth-extra-info
 */

import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/apiProxy';

export async function POST(request: NextRequest) {
  return proxyToBackend(request, {
    path: '/api/join/oAuth/extra-info',
    method: 'POST',
  });
}
