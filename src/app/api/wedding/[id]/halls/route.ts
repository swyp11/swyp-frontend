/**
 * 특정 웨딩홀의 홀 목록 조회 API Route Handler
 */

import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/apiProxy';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  return proxyToBackend(request, {
    path: `/api/v1/wedding-halls/${id}/halls`,
    method: 'GET',
  });
}
