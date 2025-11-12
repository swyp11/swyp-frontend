/**
 * 특정 드레스샵의 드레스 목록 조회 API Route Handler
 */

import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/apiProxy';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return proxyToBackend(request, {
    path: `/api/dress-shop/${params.id}/dresses`,
    method: 'GET',
  });
}
