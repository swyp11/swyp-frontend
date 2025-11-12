/**
 * OAuth 로그인 API Route Handler
 * POST /api/auth/oauth/[provider]
 */

import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/apiProxy';

export async function POST(
  request: NextRequest,
  { params }: { params: { provider: string } }
) {
  return proxyToBackend(request, {
    path: `/api/auth/oauth/login/${params.provider}`,
    method: 'POST',
  });
}
