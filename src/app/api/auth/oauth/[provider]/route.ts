/**
 * OAuth 로그인 API Route Handler
 * POST /api/auth/oauth/[provider]
 */

import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/apiProxy';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  const { provider } = await params;

  return proxyToBackend(request, {
    path: `/api/v1/auth/oauth/login/${provider}`,
    method: 'POST',
  });
}
